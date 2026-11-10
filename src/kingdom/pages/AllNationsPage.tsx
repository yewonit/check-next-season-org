import { useId, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useUserStore } from '../../stores/userStore';
import { Sheet } from '../components/Sheet';
import { WallCourses } from '../components/Stone';
import { stoneVars } from '../lib/stone';
import { ALL_NATIONS_TITLE } from '../lib/i18n';
import {
  PROBLEM_MESSAGE,
  lookupAllNationMembers,
  lookupAllNationNext,
  lookupAllNations,
  problemOf,
} from '../lib/lookup';
import { parseAllNationName } from '../lib/org';
import { seeded, stoneShape } from '../lib/rng';
import { useRolling } from '../hooks/useRolling';

export default function AllNationsPage() {
  const navigate = useNavigate();
  const setSelectedUser = useUserStore((s) => s.setSelectedUser);
  const [groupId, setGroupId] = useState<number | null>(null);
  const sheetTitleId = useId();

  const groups = useQuery({
    queryKey: ['kb', 'all-nations'],
    queryFn: lookupAllNations,
    staleTime: 1000 * 60 * 10,
  });

  const members = useQuery({
    queryKey: ['kb', 'all-nations', 'members', groupId],
    queryFn: () => lookupAllNationMembers(groupId as number),
    enabled: groupId !== null,
    staleTime: 1000 * 60 * 5,
  });

  const next = useMutation({
    mutationFn: lookupAllNationNext,
    onSuccess: (user) => {
      setSelectedUser(user);
      setGroupId(null);
      navigate('/build');
    },
  });

  const rolling = useRolling(ALL_NATIONS_TITLE.length);
  const title = ALL_NATIONS_TITLE[rolling.index];

  const rand = seeded('all-nations-wall');
  const shapes = (groups.data ?? []).map(() => stoneShape(rand));

  return (
    <main className="kb kb-an">
      <header className="kb-an__sky">
        <Link to="/" className="kb-back">
          <ChevronLeft size={22} aria-hidden="true" />
          처음으로
        </Link>
        <h1 className="kb-an__title">
          <span className="sr-only">
            2026년 어떤 그룹에 있었나요? Which group was I in for 2026?
          </span>
          <span
            aria-hidden="true"
            lang={title.lang}
            style={{ opacity: rolling.visible ? 1 : 0 }}
          >
            {title.text}
          </span>
        </h1>
      </header>

      <section className="kb-an__wall" aria-label="2026년 그룹 목록">
        {groups.isPending ? (
          <ul
            className="kb-an__list"
            aria-busy="true"
            aria-label="그룹 목록을 불러오는 중"
          >
            {Array.from({ length: 6 }, (_, i) => {
              const s = stoneShape(seeded(`sk-${i}`));
              return (
                <li key={i} style={{ flex: `${s.grow} 1 140px` }}>
                  <span
                    className="kb-stone kb-an__skeleton"
                    style={{ ...stoneVars(s, false), flex: 1 }}
                  />
                </li>
              );
            })}
          </ul>
        ) : groups.isError ? (
          <div
            className="kb-stone kb-wall-message kb-on-stone"
            style={stoneVars(stoneShape(seeded('err')), false)}
          >
            <p className="kb-carved" role="alert">
              {PROBLEM_MESSAGE[problemOf(groups.error)]}
            </p>
            <button
              type="button"
              className="kb-stone kb-cta"
              onClick={() => groups.refetch()}
            >
              다시 불러오기
            </button>
          </div>
        ) : groups.data.length === 0 ? (
          <div
            className="kb-stone kb-wall-message"
            style={stoneVars(stoneShape(seeded('empty')), false)}
          >
            <p className="kb-carved">
              아직 등록된 그룹이 없어요. 청년회 임원에게 문의해 주세요.
            </p>
          </div>
        ) : (
          <ul className="kb-an__list">
            {groups.data.map((g, i) => {
              const { group, cell } = parseAllNationName(g.name);
              return (
                <li key={g.id} style={{ flex: `${shapes[i].grow} 1 140px` }}>
                  <button
                    type="button"
                    className="kb-stone kb-an__stone kb-on-stone"
                    style={stoneVars(shapes[i], false)}
                    onClick={() => {
                      next.reset();
                      setGroupId(g.id);
                    }}
                  >
                    <span className="kb-an__cell kb-carved">{cell}</span>
                    {group ? (
                      <span className="kb-an__group">{group}</span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        <div className="kb-an__fill" aria-hidden="true">
          <WallCourses seed="all-nations-fill" count={14} />
        </div>
      </section>

      <Sheet
        open={groupId !== null}
        onClose={() => setGroupId(null)}
        labelledBy={sheetTitleId}
        title={'나의 정보를 클릭하여\n그룹과 순을 확인해보세요'}
      >
        {members.isPending ? (
          <p className="kb-sheet__state" role="status">
            명단을 불러오는 중이에요…
          </p>
        ) : members.isError ? (
          <p className="kb-sheet__state" role="alert">
            {PROBLEM_MESSAGE[problemOf(members.error)]}
          </p>
        ) : members.data.length === 0 ? (
          <p className="kb-sheet__state">이 그룹에 등록된 명단이 없어요.</p>
        ) : (
          <>
            {next.isError ? (
              <p className="kb-sheet__state" role="alert">
                {PROBLEM_MESSAGE[problemOf(next.error)]}
              </p>
            ) : null}
            {members.data.map((m, i) => {
              const pending = next.isPending && next.variables === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  className="kb-stone kb-pick kb-on-stone"
                  style={stoneVars(stoneShape(seeded(`m-${i}`)), false)}
                  disabled={next.isPending}
                  aria-busy={pending || undefined}
                  onClick={() => next.mutate(m.id)}
                >
                  <span className="kb-pick__main">
                    <span className="kb-pick__name kb-carved">{m.name}</span>
                    {pending ? (
                      <span className="kb-pick__meta">자리를 찾는 중…</span>
                    ) : null}
                  </span>
                  <ChevronRight size={22} aria-hidden="true" />
                </button>
              );
            })}
          </>
        )}
      </Sheet>
    </main>
  );
}
