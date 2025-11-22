import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { checkNameApiRequest } from "./name";
import type { CheckNameResponse } from "./name";

// Query Key Factory
export const checkNameKeys = {
  all: ["checkName"] as const,
  byName: (name: string) => [...checkNameKeys.all, name] as const,
};

// 모킹 데이터 생성 함수
const mockCheckNameApi = async (name: string): Promise<CheckNameResponse> => {
  // 네트워크 지연 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 800));

  // 실패 케이스
  if (name === "실패" || name === "에러") {
    throw new Error("사용자를 찾을 수 없습니다.");
  }

  // 중복 사용자 케이스 (2개 이상)
  if (name === "이여진" || name === "홍길동" || name === "김철수") {
    return {
      data: [
        {
          name: name,
          birth_year: "95",
          phone_number: "01012345272",
          role: "순원",
          organization: "1국_김민수그룹_김민수순",
          organization_people: [
            {
              name: "김민수",
              role: "그룹장",
              phone_number: "01098765432",
              birth_year: "93",
            },
            {
              name: "박지영",
              role: "부순장",
              phone_number: "01087654321",
              birth_year: "94",
            },
          ],
        },
        {
          name: name,
          birth_year: "90",
          phone_number: "01098761234",
          role: "부순장",
          organization: "2국_이영희그룹_이영희순",
          organization_people: [
            {
              name: "이영희",
              role: "그룹장",
              phone_number: "01055556666",
              birth_year: "89",
            },
          ],
        },
        {
          name: name,
          birth_year: "88",
          phone_number: "01011118472",
          role: "그룹장",
          organization: "3국_" + name + "그룹_" + name + "순",
          organization_people: [
            {
              name: "정수현",
              role: "부순장",
              phone_number: "01044445555",
              birth_year: "87",
            },
          ],
        },
      ],
    };
  }

  // 단일 사용자 케이스 (1개)
  return {
    data: [
      {
        name: name,
        birth_year: "96",
        phone_number: "01098847662",
        role: "순원",
        organization: "3국_김보연그룹_김보연순",
        organization_people: [
          {
            name: "김보연",
            role: "그룹장",
            phone_number: "01042331206",
            birth_year: "94",
          },
          {
            name: "이진수",
            role: "부순장",
            phone_number: "01099896005",
            birth_year: "94",
          },
        ],
      },
    ],
  };
};

// useCheckNameMutation 훅 - 버튼 클릭 시 사용
export const useCheckNameMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<CheckNameResponse, Error, string>({
    // 실제 API 연동 시 아래 주석 해제
    // mutationFn: (name: string) => checkNameApiRequest(name),

    // 모킹 API 사용
    mutationFn: (name: string) => mockCheckNameApi(name),

    onSuccess: (data, name) => {
      // 성공 시 캐시에 데이터 저장
      queryClient.setQueryData(checkNameKeys.byName(name), data);
    },
  });
};
