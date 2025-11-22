import { useQuery } from '@tanstack/react-query';
import {
  getAllNation,
  getAllNationSoonMember,
  getAllNationNext,
} from './allNation';

// Query Key Factory
export const allNationKeys = {
  all: ['allNation'] as const,
  soonList: () => [...allNationKeys.all, 'soonList'] as const,
  soonMember: (id: number) => [...allNationKeys.all, 'soonMember', id] as const,
  nextByUserId: (userId: number) =>
    [...allNationKeys.all, 'next', userId] as const,
};

// 올네이션 순 리스트 조회
export const useAllNationQuery = () => {
  return useQuery({
    queryKey: allNationKeys.soonList(),
    queryFn: () => getAllNation(),
    staleTime: 1000 * 60 * 10, // 10분
  });
};

// 특정 순의 멤버 조회
export const useAllNationSoonMemberQuery = (id: number) => {
  return useQuery({
    queryKey: allNationKeys.soonMember(id),
    queryFn: () => getAllNationSoonMember(id),
    enabled: !!id, // id가 있을 때만 쿼리 실행
    staleTime: 1000 * 60 * 5, // 5분
  });
};

// 올네국 id로 결과 검색
export const useAllNationNextQuery = (userId: number) => {
  return useQuery({
    queryKey: allNationKeys.nextByUserId(userId),
    queryFn: () => getAllNationNext(userId),
    enabled: !!userId, // userId가 있을 때만 쿼리 실행
    staleTime: 1000 * 60 * 5, // 5분
  });
};
