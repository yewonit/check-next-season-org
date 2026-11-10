/**
 * 개발용 예시 데이터 (실제 청년회 정보가 아닙니다)
 *
 * 개발 서버에서만 동작한다. 주소 뒤에 ?mock=on 을 붙이면 켜지고 ?mock=off 로 끈다.
 * 이름 입력 규칙:
 *   김하늘   → 동명이인 3명
 *   없는사람 → 검색 결과 없음
 *   느린사람 → 4초 뒤 응답
 *   오류     → 네트워크 오류
 *   그 외    → 입력한 이름으로 한 명
 */
import { AxiosError } from 'axios';
import type { OrganizationPerson, UserInfo } from '../../api/name';

const KEY = 'kb-mock';

export function isMockEnabled(): boolean {
  if (!import.meta.env.DEV || typeof window === 'undefined') return false;
  const param = new URLSearchParams(window.location.search).get('mock');
  try {
    if (param === 'off') window.sessionStorage.removeItem(KEY);
    else if (param) window.sessionStorage.setItem(KEY, 'on');
    return window.sessionStorage.getItem(KEY) === 'on';
  } catch {
    return param !== null && param !== 'off';
  }
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

const PEOPLE: OrganizationPerson[] = [
  {
    name: '이서준',
    role: '그룹장',
    phoneNumber: '01012340001',
    birthYear: '1993',
  },
  {
    name: '박지우',
    role: '부그룹장',
    phoneNumber: '01012340002',
    birthYear: '1995',
  },
  {
    name: '최하린',
    role: '순장',
    phoneNumber: '01023450003',
    birthYear: '1997',
  },
  {
    name: '정도윤',
    role: '부순장',
    phoneNumber: '01034560004',
    birthYear: '1999',
  },
  {
    name: '강민서',
    role: '순원',
    phoneNumber: '01045670005',
    birthYear: '2000',
  },
  {
    name: '윤채원',
    role: '순원',
    phoneNumber: '01056780006',
    birthYear: '2001',
  },
  {
    name: '장예준',
    role: '순원',
    phoneNumber: '01067890007',
    birthYear: '1998',
  },
  {
    name: '임수아',
    role: '순원',
    phoneNumber: null as unknown as string,
    birthYear: '2002',
  },
  {
    name: '한지호',
    role: '순원',
    phoneNumber: '01089010009',
    birthYear: '1996',
  },
  {
    name: '오가은',
    role: '순원',
    phoneNumber: '01090120010',
    birthYear: '2003',
  },
  {
    name: '알렉산드라 페트로바',
    role: '순원',
    phoneNumber: '01001230011',
    birthYear: '1999',
  },
];

function personAsUser(
  name: string,
  phone: string,
  birthYear: string
): UserInfo {
  const me: OrganizationPerson = {
    name,
    role: '순원',
    phoneNumber: phone,
    birthYear,
  };
  return {
    name,
    birthYear,
    phoneNumber: phone,
    role: '순원',
    organization: '3국_이서준그룹_최하린순',
    organizationPeople: [...PEOPLE, me],
  };
}

function networkError(): AxiosError {
  return new AxiosError('Network Error', AxiosError.ERR_NETWORK);
}

export async function mockCheckName(
  name: string
): Promise<{ data: UserInfo[] }> {
  if (name === '느린사람') await wait(4000);
  else await wait(500);
  if (name === '오류') throw networkError();
  if (name === '없는사람') return { data: [] };
  if (name === '김하늘') {
    return {
      data: [
        personAsUser('김하늘', '01077771234', '1998'),
        personAsUser('김하늘', '01055555678', '2001'),
        personAsUser('김하늘', '', '1996'),
      ],
    };
  }
  return { data: [personAsUser(name, '01011112222', '1999')] };
}

const ALL_NATION_NAMES = [
  '아드리안',
  '응우옌 티 마이',
  '사토 유키',
  '루시아 고메스',
  '왕 웨이',
  '존 스미스',
];

export async function mockAllNations() {
  await wait(400);
  return {
    data: [
      { id: 1, name: '237국_인드라그룹_인드라순' },
      { id: 2, name: '237국_인드라그룹_다니엘순' },
      { id: 3, name: '237국_권진이그룹_마리아순' },
      { id: 4, name: '237국_권진이그룹_요셉순' },
      { id: 5, name: '237국_김주현그룹_사무엘순' },
    ],
  };
}

export async function mockAllNationMembers(id: number) {
  await wait(400);
  const names = ALL_NATION_NAMES;
  return {
    members: names.map((name, i) => ({
      id: id * 100 + i,
      name,
      email: null,
      roleName: '순원',
    })),
  };
}

export async function mockAllNationNext(userId: number) {
  await wait(600);
  const name = ALL_NATION_NAMES[userId % 100] ?? `올네이션 ${userId}`;
  const user = personAsUser(name, '01033334444', '2000');
  return { data: [{ ...user, organization: '237국_인드라그룹_인드라순' }] };
}
