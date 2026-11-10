import { useId, useMemo, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ChevronDown, ChevronLeft } from 'lucide-react';
import type { OrganizationPerson } from '../../api/name';
import { useUserStore } from '../../stores/userStore';
import { Logo } from '../components/Logo';
import { stoneVars } from '../lib/stone';
import {
  formatPhone,
  isSamePerson,
  lastFour,
  parseOrganization,
  pickLeaders,
  pickMembers,
  shortBirthYear,
} from '../lib/org';
import { seeded, stoneShape } from '../lib/rng';

interface LeaderRowProps {
  roleKo: string;
  roleEn: string;
  person: OrganizationPerson;
  seed: string;
  /** 줄마다 세로 줄눈이 엇갈리도록 역할 돌의 폭을 바꾼다 */
  roleWidth: string;
}

function LeaderRow({
  roleKo,
  roleEn,
  person,
  seed,
  roleWidth,
}: LeaderRowProps) {
  const rand = seeded(seed);
  const phone = formatPhone(person.phoneNumber);
  return (
    <div className="kb-leader">
      <div
        className="kb-stone kb-leader__role"
        style={{ ...stoneVars(stoneShape(rand), false), flexBasis: roleWidth }}
      >
        <span className="kb-leader__role-ko kb-carved">{roleKo}</span>
        <span className="kb-leader__role-en" lang="en">
          {roleEn}
        </span>
      </div>
      <div
        className="kb-stone kb-leader__who"
        style={stoneVars(stoneShape(rand), false)}
      >
        <span className="kb-leader__name kb-carved">{person.name}</span>
        {phone ? <span className="kb-leader__phone">{phone}</span> : null}
      </div>
    </div>
  );
}

export default function ResultPage() {
  const user = useUserStore((s) => s.selectedUser);
  const [open, setOpen] = useState(false);
  const listId = useId();

  const people = useMemo(() => user?.organizationPeople ?? [], [user]);
  const members = useMemo(() => pickMembers(people), [people]);
  const shapes = useMemo(() => {
    const rand = seeded(`members-${user?.organization ?? ''}`);
    return members.map(() => stoneShape(rand));
  }, [members, user?.organization]);

  if (!user) return <Navigate to="/" replace />;

  const org = parseOrganization(user.organization);
  const { cellLeader, assistantCellLeader, groupLeader } = pickLeaders(people);
  const path = [
    org.nation,
    org.group && `${org.group} 그룹`,
    org.cell && `${org.cell} 순`,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <main className="kb kb-result">
      <header className="kb-result__sky">
        <div className="kb-result__bar">
          <Link to="/" className="kb-back">
            <ChevronLeft size={22} aria-hidden="true" />
            처음으로
          </Link>
          <Logo />
        </div>
        <h1 className="kb-result__place">
          {org.cell ? `${org.cell} 순` : '우리 순'}
        </h1>
        <p className="kb-result__tail">2027년, 이 자리에서 함께 세워 가요</p>
      </header>

      <div className="kb-result__wall">
        <div
          className="kb-stone kb-plaque"
          style={stoneVars(stoneShape(seeded('plaque')), false, 'fresh')}
        >
          <p className="kb-plaque__path kb-carved">
            {path || user.organization}
          </p>
          <p className="kb-plaque__theme" lang="en">
            Kingdom Builders 2027
          </p>
        </div>

        <section aria-labelledby={`${listId}-leaders`} className="kb-courses">
          <div
            className="kb-stone kb-lintel"
            style={stoneVars(stoneShape(seeded('lintel-a')), false)}
          >
            <span className="kb-lintel__titles">
              <h2
                id={`${listId}-leaders`}
                className="kb-lintel__title kb-carved"
              >
                함께 세울 리더
              </h2>
              <span className="kb-lintel__en" lang="en">
                Leaders for 2027
              </span>
            </span>
          </div>
          {cellLeader ? (
            <LeaderRow
              roleKo="순장"
              roleEn="Leader"
              person={cellLeader}
              seed="leader-1"
              roleWidth="34%"
            />
          ) : null}
          {assistantCellLeader ? (
            <LeaderRow
              roleKo="부순장"
              roleEn="Support Leader"
              person={assistantCellLeader}
              seed="leader-2"
              roleWidth="42%"
            />
          ) : null}
          {groupLeader ? (
            <LeaderRow
              roleKo="그룹장"
              roleEn="Group Leader"
              person={groupLeader}
              seed="leader-3"
              roleWidth="30%"
            />
          ) : null}
          {!cellLeader && !assistantCellLeader && !groupLeader ? (
            <div className="kb-stone kb-leader__who" style={{ minHeight: 64 }}>
              <span className="kb-leader__phone">
                리더 정보가 아직 등록되지 않았어요.
              </span>
            </div>
          ) : null}
        </section>

        {members.length > 0 ? (
          <section className="kb-courses">
            <button
              type="button"
              className="kb-stone kb-lintel kb-on-stone"
              style={stoneVars(stoneShape(seeded('lintel-b')), false)}
              aria-expanded={open}
              aria-controls={`${listId}-members`}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="kb-lintel__titles">
                <span className="kb-lintel__title kb-carved">
                  2027년 함께할 믿음의 동역자들
                </span>
                <span className="kb-lintel__en" lang="en">
                  Partners We’ll Serve With in 2027
                </span>
              </span>
              <span className="kb-lintel__count">{members.length}명</span>
              <ChevronDown size={22} aria-hidden="true" />
            </button>
            <ul id={`${listId}-members`} className="kb-members" hidden={!open}>
              {open
                ? members.map((m, i) => {
                    const me = isSamePerson(user, m);
                    const year = shortBirthYear(m.birthYear);
                    const four = lastFour(m.phoneNumber);
                    return (
                      <li
                        key={`${m.name}-${m.phoneNumber ?? i}`}
                        className={['kb-stone', 'kb-member', me ? 'is-me' : '']
                          .filter(Boolean)
                          .join(' ')}
                        style={{
                          ...stoneVars(shapes[i], false, me ? 'fresh' : 'wall'),
                          flex: `${shapes[i].grow} 1 128px`,
                          ['--i' as string]: i,
                        }}
                      >
                        <span className="kb-member__name kb-carved">
                          {m.name}
                          {year ? (
                            <span className="kb-member__year">({year})</span>
                          ) : null}
                          {me ? <span className="kb-me-tag">나</span> : null}
                        </span>
                        {four ? (
                          <span className="kb-member__phone">
                            <span className="sr-only">전화번호 끝자리 </span>
                            {four}
                          </span>
                        ) : null}
                      </li>
                    );
                  })
                : null}
            </ul>
          </section>
        ) : null}

        <Link
          to="/"
          className="kb-stone kb-cta kb-cta--quiet kb-on-stone"
          style={stoneVars(stoneShape(seeded('home-link')), false)}
        >
          처음으로 돌아가기
        </Link>
      </div>
      <footer className="kb-result__ground">
        <Logo />
      </footer>
    </main>
  );
}
