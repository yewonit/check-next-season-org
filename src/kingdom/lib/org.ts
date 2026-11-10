import type { OrganizationPerson, UserInfo } from '../../api/name';

export interface OrgPath {
  /** 예: "3국" */
  nation: string;
  /** 그룹장 이름, 예: "인드라" */
  group: string;
  /** 순장 이름, 예: "인드라" */
  cell: string;
}

/** "N국_OOO그룹_OOO순" → { nation, group, cell } */
export function parseOrganization(raw: string | null | undefined): OrgPath {
  if (!raw) return { nation: '', group: '', cell: '' };
  const [nation = '', group = '', cell = ''] = raw.split('_');
  return {
    nation: nation.trim(),
    group: group.replace(/그룹$/, '').trim(),
    cell: cell.replace(/순$/, '').trim(),
  };
}

/** 올네이션 순 목록 이름 "237국_인드라그룹_인드라순" → 화면 표기 */
export function parseAllNationName(raw: string): {
  group: string;
  cell: string;
} {
  const parts = raw.split('_');
  if (parts.length >= 3) {
    return {
      group: `${parts[1].replace(/그룹$/, '')} 그룹`,
      cell: parts[2],
    };
  }
  return { group: '', cell: raw };
}

export function formatPhone(phone: string | null | undefined): string {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 11) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phone;
}

export function lastFour(phone: string | null | undefined): string {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 4 ? digits.slice(-4) : '';
}

export function shortBirthYear(year: string | null | undefined): string {
  if (!year) return '';
  const digits = String(year).replace(/\D/g, '');
  return digits.length >= 2 ? digits.slice(-2) : '';
}

export interface Leaders {
  cellLeader?: OrganizationPerson;
  assistantCellLeader?: OrganizationPerson;
  groupLeader?: OrganizationPerson;
}

const LEADER_ROLES = new Set(['순장', '부순장', '그룹장']);

/**
 * 리더 추출 (2026과 동일한 규칙)
 * 순장이 없으면 부그룹장, 부그룹장도 없으면 그룹장이 순장 자리를 대신한다.
 */
export function pickLeaders(people: OrganizationPerson[]): Leaders {
  const byRole = (role: string) => people.find((p) => p.role === role);
  const groupLeader = byRole('그룹장');
  return {
    cellLeader: byRole('순장') || byRole('부그룹장') || groupLeader,
    assistantCellLeader: byRole('부순장'),
    groupLeader,
  };
}

/** 순원 목록: 순장·부순장·그룹장을 뺀 나머지 (2026과 동일) */
export function pickMembers(
  people: OrganizationPerson[]
): OrganizationPerson[] {
  return people.filter((p) => !LEADER_ROLES.has(p.role));
}

export function isSamePerson(
  a: Pick<UserInfo, 'name' | 'phoneNumber'>,
  b: Pick<OrganizationPerson, 'name' | 'phoneNumber'>
): boolean {
  if (a.name !== b.name) return false;
  if (!a.phoneNumber || !b.phoneNumber) return true;
  return lastFour(a.phoneNumber) === lastFour(b.phoneNumber);
}
