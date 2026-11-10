import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { AlertCircle, ArrowRight, ChevronRight, Globe } from 'lucide-react';
import type { UserInfo } from '../../api/name';
import { useUserStore } from '../../stores/userStore';
import { Logo } from '../components/Logo';
import { Sheet } from '../components/Sheet';
import { Skyline } from '../components/Skyline';
import { WallCourses } from '../components/Stone';
import { stoneVars } from '../lib/stone';
import { ALL_NATIONS_LINK } from '../lib/i18n';
import { PROBLEM_MESSAGE, lookupByName, problemOf } from '../lib/lookup';
import { lastFour, shortBirthYear } from '../lib/org';
import { seeded, stoneShape } from '../lib/rng';
import { useRolling } from '../hooks/useRolling';

function validate(value: string): string {
  const name = value.trim();
  if (!name) return '이름을 다시 한번 써 주세요';
  if (name.length < 2) return '이름을 계속 완성시켜볼까요?';
  if (name === '김삼순97') return '정신 차리세요 ❤️';
  return '';
}

export default function HomePage() {
  const navigate = useNavigate();
  const setSelectedUser = useUserStore((s) => s.setSelectedUser);
  const [name, setName] = useState('');
  const [touched, setTouched] = useState(false);
  const [duplicates, setDuplicates] = useState<UserInfo[]>([]);
  const [slow, setSlow] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const sheetTitleId = useId();
  const noteId = useId();

  const flanks = useMemo(() => {
    const rand = seeded('home-flanks');
    return Array.from({ length: 6 }, () => stoneShape(rand));
  }, []);
  const slotShape = useMemo(() => stoneShape(seeded('home-slot')), []);
  const ctaShape = useMemo(
    () => ({ ...stoneShape(seeded('home-cta')), tone: 0 }),
    []
  );

  const lookup = useMutation({
    mutationFn: lookupByName,
    onMutate: () => setSlow(false),
    onSuccess: (people) => {
      if (people.length > 1) {
        setDuplicates(people);
        return;
      }
      setSelectedUser(people[0]);
      navigate('/build');
    },
  });

  // 접속이 몰려 응답이 늦어지면 기다리는 중이라고 솔직하게 알린다
  useEffect(() => {
    if (!lookup.isPending) return;
    const timer = setTimeout(() => setSlow(true), 2500);
    return () => clearTimeout(timer);
  }, [lookup.isPending]);

  const validation = validate(name);
  const showValidation = touched && validation !== '';
  const problem = lookup.isError ? problemOf(lookup.error) : null;
  const canSubmit = validation === '' && !lookup.isPending;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!canSubmit) return;
    lookup.mutate(name.trim());
  };

  const choose = (user: UserInfo) => {
    setDuplicates([]);
    setSelectedUser(user);
    navigate('/build');
  };

  const keepFormVisible = () => {
    // 키보드가 올라와도 이름 칸과 확인 버튼이 함께 보이도록
    window.setTimeout(() => {
      formRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }, 320);
  };

  const rolling = useRolling(ALL_NATIONS_LINK.length);
  const gateLine = ALL_NATIONS_LINK[rolling.index];

  let note: { tone: 'error' | 'wait'; text: string } | null = null;
  if (showValidation) note = { tone: 'error', text: validation };
  else if (problem) note = { tone: 'error', text: PROBLEM_MESSAGE[problem] };
  else if (lookup.isPending && slow)
    note = {
      tone: 'wait',
      text: '지금 접속한 사람이 많아요. 자리를 찾고 있으니 조금만 기다려 주세요.',
    };

  return (
    <main className="kb kb-home">
      <header className="kb-home__sky">
        <span className="kb-stars" aria-hidden="true" />
        <Skyline />
        <Logo />
        <div className="kb-home__hero">
          <h1 className="kb-title" lang="en">
            <span>Kingdom</span>
            <span>Builders</span>
          </h1>
          <p className="kb-verse">
            “일어나 건축하자” <cite>느헤미야 2:18</cite>
          </p>
          <p className="kb-lede">
            코람데오 청년회 2027 순배치, 내가 함께 세울 자리를 확인해요
          </p>
        </div>
      </header>

      <section className="kb-home__wall" aria-label="이름으로 2027 순 확인하기">
        <WallCourses seed="home-top" count={1} ragged />

        <form ref={formRef} onSubmit={submit} noValidate className="kb-courses">
          <div className="kb-course" style={{ height: 'auto' }}>
            <span
              className="kb-stone kb-flank"
              style={stoneVars(flanks[0], false)}
              aria-hidden="true"
            />
            <label
              className={[
                'kb-stone',
                'kb-slot',
                'kb-on-stone',
                name.trim() ? 'is-filled' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              style={stoneVars(slotShape, false, 'fresh')}
            >
              <span className="kb-slot__label">이름 (성과 이름 모두)</span>
              <input
                className="kb-slot__input"
                type="text"
                name="name"
                inputMode="text"
                autoComplete="name"
                autoCapitalize="off"
                spellCheck={false}
                enterKeyHint="go"
                maxLength={30}
                placeholder="예) 홍길동"
                value={name}
                aria-invalid={
                  showValidation || problem === 'not-found' ? true : undefined
                }
                aria-describedby={note ? noteId : undefined}
                onChange={(e) => {
                  setName(e.target.value);
                  setTouched(true);
                  if (lookup.isError) lookup.reset();
                }}
                onFocus={keepFormVisible}
              />
            </label>
            <span
              className="kb-stone kb-flank"
              style={stoneVars(flanks[1], false)}
              aria-hidden="true"
            />
          </div>

          {note ? (
            <p
              id={noteId}
              className={
                note.tone === 'wait' ? 'kb-note kb-note--wait' : 'kb-note'
              }
              role={note.tone === 'error' ? 'alert' : 'status'}
            >
              {note.tone === 'error' ? (
                <AlertCircle size={17} aria-hidden="true" />
              ) : null}
              {note.text}
            </p>
          ) : null}

          <div className="kb-course" style={{ height: 'auto' }}>
            <span
              className="kb-stone kb-flank"
              style={stoneVars(flanks[2], false)}
              aria-hidden="true"
            />
            <button
              type="submit"
              className="kb-stone kb-cta kb-home__cta"
              style={stoneVars(ctaShape, false)}
              disabled={!lookup.isPending && validation !== ''}
              aria-busy={lookup.isPending || undefined}
            >
              {lookup.isPending ? (
                <>
                  자리를 찾는 중
                  <span className="kb-dots" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                </>
              ) : (
                <>
                  내 자리 확인하기
                  <ArrowRight size={20} strokeWidth={2.5} aria-hidden="true" />
                </>
              )}
            </button>
            <span
              className="kb-stone kb-flank"
              style={stoneVars(flanks[3], false)}
              aria-hidden="true"
            />
          </div>
        </form>

        <div className="kb-gate-course">
          <span
            className="kb-stone kb-flank"
            style={stoneVars(flanks[4], false)}
            aria-hidden="true"
          />
          <a
            className="kb-gate"
            href="/all-nations"
            aria-label="올네이션국 All Nations: 작년 그룹으로 2027 순 확인하기"
            onClick={(e) => {
              e.preventDefault();
              navigate('/all-nations');
            }}
          >
            <span className="kb-gate__opening">
              <Globe size={18} aria-hidden="true" style={{ flex: 'none' }} />
              <span
                className="kb-gate__text"
                lang={gateLine.lang}
                style={{ opacity: rolling.visible ? 1 : 0 }}
                aria-hidden="true"
              >
                {gateLine.text}
              </span>
              <ChevronRight
                size={18}
                aria-hidden="true"
                style={{ flex: 'none' }}
              />
            </span>
          </a>
          <span
            className="kb-stone kb-flank"
            style={stoneVars(flanks[5], false)}
            aria-hidden="true"
          />
        </div>
        <div className="kb-ground" aria-hidden="true" />
      </section>

      <Sheet
        open={duplicates.length > 0}
        onClose={() => setDuplicates([])}
        labelledBy={sheetTitleId}
        title={`같은 이름이 ${duplicates.length}명 있어요`}
        description="나의 정보를 눌러 그룹과 순을 확인해 보세요"
      >
        {duplicates.map((user, i) => {
          const year = shortBirthYear(user.birthYear);
          const four = lastFour(user.phoneNumber);
          const meta = [
            year && `${year}년생`,
            four && `전화번호 끝자리 ${four}`,
          ]
            .filter(Boolean)
            .join(' · ');
          return (
            <button
              key={`${user.phoneNumber || user.name}-${i}`}
              type="button"
              className="kb-stone kb-pick kb-on-stone"
              style={stoneVars(stoneShape(seeded(`dup-${i}`)), false)}
              onClick={() => choose(user)}
            >
              <span className="kb-pick__main">
                <span className="kb-pick__name kb-carved">{user.name}</span>
                <span className="kb-pick__meta">
                  {meta || '추가 정보 없음'}
                </span>
              </span>
              <ChevronRight size={22} aria-hidden="true" />
            </button>
          );
        })}
      </Sheet>
    </main>
  );
}
