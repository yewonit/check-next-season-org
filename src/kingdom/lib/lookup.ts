import axios from 'axios';
import { checkNameApiRequest } from '../../api/name';
import {
  getAllNation,
  getAllNationNext,
  getAllNationSoonMember,
} from '../../api/allNation';
import {
  isMockEnabled,
  mockAllNationMembers,
  mockAllNationNext,
  mockAllNations,
  mockCheckName,
} from './mock';

export type LookupProblem = 'not-found' | 'network' | 'server';

export class LookupError extends Error {
  readonly problem: LookupProblem;
  constructor(problem: LookupProblem) {
    super(problem);
    this.problem = problem;
  }
}

export function problemOf(error: unknown): LookupProblem {
  if (error instanceof LookupError) return error.problem;
  if (axios.isAxiosError(error)) {
    if (!error.response) return 'network';
    if (error.response.status === 404) return 'not-found';
  }
  return 'server';
}

export const PROBLEM_MESSAGE: Record<LookupProblem, string> = {
  'not-found':
    '등록된 이름을 찾지 못했어요. 성과 이름을 정확히 썼는지 확인해 주세요.',
  network: '연결이 잠시 불안정해요. 다시 한번 눌러 주세요.',
  server: '접속이 몰려 확인이 늦어지고 있어요. 잠시 뒤 다시 시도해 주세요.',
};

const mock = import.meta.env.DEV && isMockEnabled();

export async function lookupByName(name: string) {
  const res = mock
    ? await mockCheckName(name)
    : await checkNameApiRequest(name);
  const people = res.data ?? [];
  if (people.length === 0) throw new LookupError('not-found');
  return people;
}

export async function lookupAllNations() {
  const res = mock ? await mockAllNations() : await getAllNation();
  return res.data ?? [];
}

export async function lookupAllNationMembers(id: number) {
  const res = mock
    ? await mockAllNationMembers(id)
    : await getAllNationSoonMember(id);
  return res.members ?? [];
}

export async function lookupAllNationNext(userId: number) {
  const res = mock
    ? await mockAllNationNext(userId)
    : await getAllNationNext(userId);
  const people = res.data ?? [];
  if (people.length === 0) throw new LookupError('not-found');
  return people[0];
}
