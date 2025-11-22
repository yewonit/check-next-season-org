import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { checkNameApiRequest, type CheckNameResponse } from "./name";

// Query Key Factory
export const checkNameKeys = {
  all: ["checkName"] as const,
  byName: (name: string) => [...checkNameKeys.all, name] as const,
};

// useCheckNameQuery 훅 - 버튼 클릭 시 refetch 방식
export const useCheckNameQuery = (name: string) => {
  return useQuery<CheckNameResponse, Error>({
    queryKey: checkNameKeys.byName(name),
    queryFn: () => checkNameApiRequest(name),
    enabled: false, // 자동 실행 비활성화 (수동으로 refetch 호출)
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
  });
};

// useCheckNameMutation 훅 - 기존 mutation 방식 (호환성 유지)
export const useCheckNameMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<CheckNameResponse, Error, string>({
    mutationFn: (name: string) => checkNameApiRequest(name),
    onSuccess: (data, name) => {
      // 성공 시 캐시에 데이터 저장
      queryClient.setQueryData(checkNameKeys.byName(name), data);
    },
  });
};
