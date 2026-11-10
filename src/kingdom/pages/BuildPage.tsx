import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/userStore';
import { Scaffold } from '../components/Scaffold';
import { ArrowRight } from 'lucide-react';
import { stoneVars } from '../lib/stone';
import { BUILD_COPY } from '../lib/i18n';
import { parseOrganization } from '../lib/org';
import { seeded, stoneShape } from '../lib/rng';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useRolling } from '../hooks/useRolling';

const STEPS = 4;
const AUTO_ADVANCE_MS = 2800;

interface Particle {
  id: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  s: number;
}

function vibrate(pattern: number | number[]) {
  try {
    navigator.vibrate?.(pattern);
  } catch {
    // 진동을 지원하지 않는 기기에서는 화면 피드백만 준다
  }
}

export default function BuildPage() {
  const user = useUserStore((s) => s.selectedUser);
  if (!user) return <Navigate to="/" replace />;
  return <BuildScene key={`${user.name}-${user.phoneNumber}`} />;
}

function BuildScene() {
  const navigate = useNavigate();
  const user = useUserStore((s) => s.selectedUser)!;
  const reduced = useReducedMotion();

  const org = parseOrganization(user.organization);
  const labels = [
    org.nation || '우리 국',
    org.group ? `${org.group} 그룹` : '우리 그룹',
    org.cell ? `${org.cell} 순` : '우리 순',
    user.name,
  ];

  // 줄마다 양옆 돌의 폭을 조금씩 다르게 (가운데 돌 폭은 도르래의 돌과 같게 유지)
  const courses = useMemo(() => {
    const rand = seeded(`build-${user.name}`);
    return Array.from({ length: STEPS }, () => {
      const shift = (rand() - 0.5) * 0.12;
      return {
        left: 18 + shift * 100,
        right: 18 - shift * 100,
        l: stoneShape(rand),
        r: stoneShape(rand),
        block: stoneShape(rand),
      };
    });
  }, [user.name]);

  const [placed, setPlaced] = useState(0);
  const [landed, setLanded] = useState(0);
  const [dust, setDust] = useState<Particle[]>([]);
  const [shaking, setShaking] = useState(false);
  const done = landed >= STEPS;

  const placedRef = useRef(0);
  const busyRef = useRef(false);
  const queueRef = useRef(0);
  const siteRef = useRef<HTMLDivElement>(null);
  const hoistStoneRef = useRef<HTMLSpanElement>(null);
  const blockRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const animations = useRef<Animation[]>([]);

  const lay = useCallback(() => {
    if (placedRef.current >= STEPS) return;
    if (busyRef.current) {
      queueRef.current = Math.min(
        queueRef.current + 1,
        STEPS - placedRef.current
      );
      return;
    }
    busyRef.current = true;
    placedRef.current += 1;
    vibrate(placedRef.current === STEPS ? [24, 40, 60] : 12);
    setPlaced(placedRef.current);
  }, []);

  const onLanded = useCallback(
    (idx: number) => {
      setLanded(idx + 1);
      const site = siteRef.current;
      const block = blockRefs.current[idx];
      const final = idx === STEPS - 1;
      if (site && block && !reduced) {
        const s = site.getBoundingClientRect();
        const b = block.getBoundingClientRect();
        const rand = seeded(`dust-${idx}`);
        const count = final ? 22 : 10;
        const burst = Array.from({ length: count }, (_, i): Particle => {
          const side = i % 2 === 0 ? -1 : 1;
          const along = rand();
          return {
            id: `${idx}-${i}`,
            x:
              b.left -
              s.left +
              (side < 0 ? along * 0.35 : 1 - along * 0.35) * b.width,
            y: b.bottom - s.top - 4,
            dx: side * (16 + rand() * (final ? 70 : 40)),
            dy: -(8 + rand() * (final ? 60 : 30)),
            s: 3 + rand() * (final ? 8 : 5),
          };
        });
        setDust((prev) => [...prev, ...burst]);
        window.setTimeout(() => {
          setDust((prev) => prev.filter((p) => !p.id.startsWith(`${idx}-`)));
        }, 900);
        if (final) {
          setShaking(true);
          window.setTimeout(() => setShaking(false), 420);
        }
      }
      busyRef.current = false;
      if (queueRef.current > 0) {
        queueRef.current -= 1;
        window.setTimeout(lay, 80);
      }
    },
    [lay, reduced]
  );

  // 새로 놓인 돌을 도르래의 위치에서 제자리로 떨어뜨린다
  useLayoutEffect(() => {
    if (placed === 0) return;
    const idx = placed - 1;
    const block = blockRefs.current[idx];
    if (!block) return;
    const final = idx === STEPS - 1;
    const hoist = hoistStoneRef.current;
    let anim: Animation;
    if (reduced || !hoist) {
      anim = block.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200 });
    } else {
      const from = hoist.getBoundingClientRect();
      const to = block.getBoundingClientRect();
      const dx = from.left + from.width / 2 - (to.left + to.width / 2);
      const dy = from.top + from.height / 2 - (to.top + to.height / 2);
      anim = block.animate(
        [
          {
            transform: `translate(${dx}px, ${dy}px)`,
            easing: 'cubic-bezier(.5,0,.9,.35)',
          },
          {
            transform: 'translate(0, 5px) scaleY(.96)',
            offset: 0.78,
            easing: 'cubic-bezier(.2,.8,.3,1)',
          },
          { transform: 'translate(0, -2px)', offset: 0.9 },
          { transform: 'translate(0, 0)' },
        ],
        { duration: final ? 760 : 540, easing: 'linear' }
      );
    }
    animations.current.push(anim);
    anim.onfinish = () => onLanded(idx);
  }, [placed, reduced, onLanded]);

  useEffect(() => {
    const running = animations.current;
    return () => running.forEach((a) => a.cancel());
  }, []);

  // 마지막 돌이 놓이면 잠시 머문 뒤 결과로 넘어간다
  useEffect(() => {
    if (!done) return;
    const timer = window.setTimeout(
      () => navigate('/result', { replace: true }),
      AUTO_ADVANCE_MS
    );
    return () => window.clearTimeout(timer);
  }, [done, navigate]);

  const rolling = useRolling(BUILD_COPY.length, done);
  const copy = BUILD_COPY[rolling.index];
  const fade: CSSProperties = { opacity: rolling.visible ? 1 : 0 };
  const lowering = placed > landed;
  const nextIsFinal = landed === STEPS - 1;
  const path = [
    org.nation,
    org.group && `${org.group} 그룹`,
    org.cell && `${org.cell} 순`,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <main
      className={['kb', 'kb-build', done ? 'is-done' : '']
        .filter(Boolean)
        .join(' ')}
    >
      <div className="kb-dawn" aria-hidden="true" />

      <header className="kb-build__sky">
        {done ? (
          <>
            <h1 className="kb-build__title">{`${user.name}님의 자리가 세워졌어요!`}</h1>
            {path ? <p className="kb-build__path">{path}</p> : null}
          </>
        ) : (
          <>
            <h1 className="kb-build__title" lang={copy.lang} style={fade}>
              {copy.title}
            </h1>
            <p className="kb-build__hint" lang={copy.lang} style={fade}>
              {copy.hint}
            </p>
          </>
        )}
      </header>

      <div
        ref={siteRef}
        className={['kb-build__site', shaking ? 'is-shaking' : '']
          .filter(Boolean)
          .join(' ')}
        onClick={lay}
        aria-hidden="true"
      >
        <Scaffold />

        <div
          className={[
            'kb-hoist',
            lowering ? 'is-lowering' : '',
            done ? 'is-resting' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <span className="kb-hoist__rope" />
          <span className="kb-hoist__hook" />
          <svg
            className="kb-hoist__sling"
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
          >
            <path
              d="M50 0 L22 20 M50 0 L78 20"
              stroke="#e2cfa6"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              fill="none"
            />
          </svg>
          <span
            key={`hoist-${landed}`}
            ref={hoistStoneRef}
            className={[
              'kb-stone',
              'kb-hoist__stone',
              nextIsFinal ? 'kb-bblock--final' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={{
              ...stoneVars(
                courses[Math.min(landed, STEPS - 1)].block,
                false,
                nextIsFinal ? 'fresh' : 'wall'
              ),
              ...(nextIsFinal
                ? { height: 'calc(var(--course-h) * 1.36)' }
                : null),
              animation:
                landed > 0 && !reduced
                  ? 'kb-lower 420ms var(--ease-out) both'
                  : undefined,
            }}
          />
        </div>

        <div className="kb-bwall">
          {courses.map((c, idx) => {
            const final = idx === STEPS - 1;
            const set = idx < placed;
            return (
              <div
                key={idx}
                className={[
                  'kb-bslot',
                  final ? 'kb-bslot--final' : '',
                  set ? 'is-set' : '',
                  idx === placed ? 'is-next' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {set ? (
                  <div className="kb-bcourse">
                    <span
                      className="kb-stone kb-bflank"
                      style={{
                        ...stoneVars(c.l, false),
                        flex: `0 0 ${c.left}%`,
                        animationDelay: final ? '700ms' : '480ms',
                      }}
                    />
                    <span
                      ref={(el) => {
                        blockRefs.current[idx] = el;
                      }}
                      className={[
                        'kb-stone',
                        'kb-bblock',
                        final ? 'kb-bblock--final' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      style={stoneVars(
                        c.block,
                        false,
                        final ? 'fresh' : 'wall'
                      )}
                    >
                      {idx < landed ? (
                        <span
                          className="kb-bblock__text kb-carved kb-carve-in"
                          style={
                            {
                              '--len': Math.max(labels[idx].length, 3),
                            } as CSSProperties
                          }
                        >
                          {labels[idx]}
                        </span>
                      ) : null}
                    </span>
                    <span
                      className="kb-stone kb-bflank"
                      style={{
                        ...stoneVars(c.r, false),
                        flex: `0 0 ${c.right}%`,
                        animationDelay: final ? '700ms' : '480ms',
                      }}
                    />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        {dust.map((p) => (
          <span
            key={p.id}
            className="kb-dust"
            style={
              {
                left: p.x,
                top: p.y,
                '--dx': `${p.dx}px`,
                '--dy': `${p.dy}px`,
                '--s': `${p.s}px`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <footer className="kb-build__foot">
        <p className="sr-only" role="status" aria-live="polite">
          {landed > 0
            ? `${labels[landed - 1]} 돌이 놓였어요. ${STEPS}개 중 ${landed}개를 쌓았어요.`
            : ''}
        </p>
        {done ? (
          <button
            type="button"
            className="kb-stone kb-cta"
            style={stoneVars(courses[0].block, false)}
            onClick={() => navigate('/result', { replace: true })}
          >
            우리 순 보러 가기
            <ArrowRight size={20} strokeWidth={2.5} aria-hidden="true" />
          </button>
        ) : (
          <button
            type="button"
            className="kb-stone kb-cta"
            style={stoneVars(courses[1].block, false)}
            onClick={lay}
          >
            돌 쌓기
            <span
              className="kb-build__count"
              aria-label={`${STEPS}개 중 ${landed}개`}
            >
              {landed} / {STEPS}
            </span>
          </button>
        )}
        <p
          className="kb-build__bottom"
          lang={done ? 'ko' : copy.lang}
          style={done ? undefined : fade}
        >
          {done ? '잠시 뒤 우리 순 화면으로 넘어가요' : copy.bottom}
        </p>
      </footer>
    </main>
  );
}
