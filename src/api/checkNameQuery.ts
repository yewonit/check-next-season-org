import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkNameApiRequest } from "./name";
import type { CheckNameResponse } from "./name";

// Query Key Factory
export const checkNameKeys = {
  all: ["checkName"] as const,
  byName: (name: string) => [...checkNameKeys.all, name] as const,
};

// useCheckNameMutation 훅 - 버튼 클릭 시 사용
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
