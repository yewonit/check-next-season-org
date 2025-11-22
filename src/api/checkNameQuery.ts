import { useQuery } from "@tanstack/react-query";
import { checkNameApiRequest } from "./name";
import type { CheckNameResponse } from "./name";

// Query Key Factory
export const checkNameKeys = {
  all: ["checkName"] as const,
  byName: (name: string) => [...checkNameKeys.all, name] as const,
};

// useCheckNameQuery 훅
export const useCheckNameQuery = (name: string) => {
  return useQuery<CheckNameResponse, Error>({
    queryKey: checkNameKeys.byName(name),
    queryFn: () => checkNameApiRequest(name),
    enabled: !!name, // name이 있을 때만 쿼리 실행
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분 (구 cacheTime)
  });
};
