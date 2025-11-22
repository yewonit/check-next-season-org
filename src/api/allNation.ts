import axiosInstance from "./axios";
import type { UserInfo } from "./name";

interface AllNationSoonItem {
  id: number;
  name: string;
}

interface AllNationSoonMemberItem {
  id: number;
  name: string;
  email: string | null;
  roleName: string;
}

//GET https://attendance-dev.icoramdeo.com/api/seasons/all-nations
interface AllNationSoonResponse {
  data: AllNationSoonItem[];
}

export const getAllNation = async (): Promise<AllNationSoonResponse> => {
  const response = await axiosInstance.get<AllNationSoonResponse>(
    "/seasons/all-nations"
  );
  return response.data;
};

//GET https://attendance-dev.icoramdeo.com/api/organizations/{id}{id} 는 올네국 순 리스트 API의 id
interface AllNationSoonMemberResponse {
  members: AllNationSoonMemberItem[];
}

export const getAllNationSoonMember = async (
  id: number
): Promise<AllNationSoonMemberResponse> => {
  const response = await axiosInstance.get<AllNationSoonMemberResponse>(
    `/organizations/${id}/members`
  );
  return response.data;
};

//올네국 id로 결과를 검색하는 탭 API GET https://attendance-dev.icoramdeo.com/api/seasons/next?userId={userId}
interface AllNationNextResponse {
  data: UserInfo[];
}

export const getAllNationNext = async (
  userId: number
): Promise<AllNationNextResponse> => {
  const response = await axiosInstance.get<AllNationNextResponse>(
    `/seasons/next?userId=${userId}`
  );
  return response.data;
};
