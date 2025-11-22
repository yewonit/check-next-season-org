import axiosInstance from './axios';

// 조직 구성원 인터페이스
export interface OrganizationPerson {
  name: string;
  role: string;
  phoneNumber: string;
  birthYear: string;
}

// 사용자 정보 인터페이스
export interface UserInfo {
  name: string;
  birthYear: string;
  phoneNumber: string;
  role: string;
  organization: string;
  organizationPeople: OrganizationPerson[];
}

// API 응답 인터페이스
export interface CheckNameResponse {
  data: UserInfo[];
}

export const checkNameApiRequest = async (
  name: string
): Promise<CheckNameResponse> => {
  const response = await axiosInstance.get<CheckNameResponse>(
    `/seasons/next?name=${name}`
  );
  return response.data;
};
