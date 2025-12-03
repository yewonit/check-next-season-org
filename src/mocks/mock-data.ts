import type {
  AllNationSoonItem,
  AllNationSoonMemberItem,
} from '../api/allNation';
import type { UserInfo, OrganizationPerson } from '../api/name';

// 모킹 데이터에서 사용할 확장 타입 (null 허용)
type MockUserInfo = Omit<UserInfo, 'birthYear' | 'phoneNumber'> & {
  birthYear: string | null;
  phoneNumber: string | null;
};

// 조직 구성원 모킹 데이터
const mockOrganizationPeople1: OrganizationPerson[] = [
  {
    name: '김철수',
    role: '멤버',
    phoneNumber: '010-2345-6789',
    birthYear: '1992',
  },
  {
    name: '이영희',
    role: '멤버',
    phoneNumber: '010-3456-7890',
    birthYear: '1993',
  },
];

const mockOrganizationPeople2: OrganizationPerson[] = [
  {
    name: '박민수',
    role: '멤버',
    phoneNumber: '010-4567-8901',
    birthYear: '1994',
  },
  {
    name: '최지영',
    role: '멤버',
    phoneNumber: '010-5678-9012',
    birthYear: '1995',
  },
];

const mockOrganizationPeople3: OrganizationPerson[] = [
  {
    name: '정수진',
    role: '멤버',
    phoneNumber: '010-6789-0123',
    birthYear: '1996',
  },
];

const mockUsersNormalCase: MockUserInfo[] = [
  // 기본 케이스: 모든 정보가 있는 유저
  {
    name: '홍길동',
    birthYear: '1990',
    phoneNumber: '010-1234-5678',
    role: '리더',
    organization: '1순',
    organizationPeople: mockOrganizationPeople1,
  },
  {
    name: '최민지',
    birthYear: '1992',
    phoneNumber: '010-7777-8888',
    role: '리더',
    organization: '2순',
    organizationPeople: mockOrganizationPeople1,
  },
  {
    name: '정다은',
    birthYear: '1993',
    phoneNumber: '010-9999-0000',
    role: '멤버',
    organization: '1순',
    organizationPeople: mockOrganizationPeople2,
  },
];

const mockUsersWithDuplicateName: MockUserInfo[] = [
  {
    name: '홍중복',
    birthYear: '1985',
    phoneNumber: '010-1111-2222',
    role: '멤버',
    organization: '2순',
    organizationPeople: mockOrganizationPeople2,
  },
  {
    name: '홍중복',
    birthYear: '1995',
    phoneNumber: '010-3333-4444',
    role: '멤버',
    organization: '3순',
    organizationPeople: mockOrganizationPeople3,
  },
];

const errorMockUserHasNullValue: MockUserInfo[] = [
  // 에러 케이스: 중복이름인데, birthYear가 null인 케이스
  {
    name: '윤승록',
    birthYear: null,
    phoneNumber: '010-1111-2222',
    role: '멤버',
    organization: '2순',
    organizationPeople: mockOrganizationPeople2,
  },
  {
    name: '윤승록',
    birthYear: null,
    phoneNumber: '010-1111-2223',
    role: '멤버',
    organization: '3순',
    organizationPeople: mockOrganizationPeople3,
  },
  {
    name: '윤승록',
    birthYear: '1993',
    phoneNumber: '010-1111-2224',
    role: '멤버',
    organization: '3순',
    organizationPeople: mockOrganizationPeople3,
  },
  // 에러 케이스: phoneNumber가 null인 케이스
  {
    name: '윤승순',
    birthYear: '1985',
    phoneNumber: null,
    role: '멤버',
    organization: '2순',
    organizationPeople: mockOrganizationPeople2,
  },
  // birthYear와 phoneNumber 모두 null인 케이스
  {
    name: '유승준',
    birthYear: null,
    phoneNumber: null,
    role: '멤버',
    organization: '3순',
    organizationPeople: [],
  },
];

// 다양한 시나리오의 유저 모킹 데이터
const mockUsersData: MockUserInfo[] = [
  ...mockUsersNormalCase,
  ...mockUsersWithDuplicateName,
  ...errorMockUserHasNullValue,
];

// 원본 MockUserInfo 타입 데이터 (null 값 포함, 실제 API 응답과 동일)
export const mockUsers: MockUserInfo[] = mockUsersData;

// 이름으로 유저 검색 헬퍼 함수 (null 값 포함된 원본 데이터 반환)
export const findUsersByName = (name: string): MockUserInfo[] => {
  return mockUsers.filter((user) => user.name === name);
};

// userId로 유저 검색 헬퍼 함수 (인덱스 기반, null 값 포함된 원본 데이터 반환)
export const findUserById = (userId: number): MockUserInfo | undefined => {
  return mockUsers[userId];
};

// 올네이션 순 리스트 모킹 데이터
export const mockAllNationSoonList: AllNationSoonItem[] = [
  {
    id: 129,
    name: '237국_인드라그룹_인드라순',
  },
  {
    id: 130,
    name: '237국_인드라그룹_박규현순',
  },
  {
    id: 131,
    name: '237국_인드라그룹_장지영순',
  },
  {
    id: 133,
    name: '237국_권진이그룹_권진이순',
  },
];

const mockAllNationMembers: AllNationSoonMemberItem[] = [
  {
    id: 101,
    name: '김민수',
    roleName: '멤버',
    email: '010-1001-1001',
  },
  {
    id: 102,
    name: '이지은',
    roleName: '멤버',
    email: '010-1002-1002',
  },
  {
    id: 103,
    name: '박준호',
    roleName: '멤버',
    email: '010-1003-1003',
  },
  {
    id: 104,
    name: '최수진',
    roleName: '멤버',
    email: '010-1004-1004',
  },
  {
    id: 105,
    name: '정다혜',
    roleName: '멤버',
    email: '010-1005-1005',
  },
  {
    id: 106,
    name: '강민석',
    roleName: '멤버',
    email: '010-1001-1001',
  },
  {
    id: 107,
    name: '윤서연',
    roleName: '멤버',
    email: '010-1002-1002',
  },
  {
    id: 108,
    name: '임동현',
    roleName: '멤버',
    email: '010-1003-1003',
  },
  {
    id: 109,
    name: '한소영',
    roleName: '멤버',
    email: '010-1004-1004',
  },
  {
    id: 110,
    name: '송태영',
    roleName: '멤버',
    email: '010-1005-1005',
  },
  {
    id: 111,
    name: '조현우',
    roleName: '멤버',
    email: '010-3001-3001',
  },
  {
    id: 112,
    name: '오지혜',
    roleName: '멤버',
    email: '010-3002-3002',
  },
  {
    id: 113,
    name: '신영수',
    roleName: '멤버',
    email: '010-3003-3003',
  },
  {
    id: 114,
    name: '유미라',
    roleName: '멤버',
    email: '010-3004-3004',
  },
  {
    id: 115,
    name: '배성호',
    roleName: '멤버',
    email: '010-3005-3005',
  },
  {
    id: 116,
    name: '전혜진',
    roleName: '멤버',
    email: '010-4001-4001',
  },
  {
    id: 117,
    name: '류정민',
    roleName: '멤버',
    email: '010-4002-4002',
  },
  {
    id: 118,
    name: '곽민규',
    roleName: '멤버',
    email: '010-4003-4003',
  },
  {
    id: 119,
    name: '남지현',
    roleName: '멤버',
    email: '010-4004-4004',
  },
  {
    id: 120,
    name: '문상우',
    roleName: '멤버',
    email: '010-4005-4005',
  },
];

// 올네이션 - 특정 순에 속하는 구성원 모킹 데이터 (각각 5명씩, 안겹치게)
const SOON_PARTITION_SIZE = 4;
export const [
  mockSoonMembers1,
  mockSoonMembers2,
  mockSoonMembers3,
  mockSoonMembers4,
] = mockAllNationMembers.reduce((acc, curr, index) => {
  const groupIdx = Math.floor(index / SOON_PARTITION_SIZE);
  acc[groupIdx] = [...(acc[groupIdx] || []), curr];
  return acc;
}, [] as AllNationSoonMemberItem[][]);

// soon id별 멤버 리스트 매핑
export const getAllNationMembersById = (
  id: number
): AllNationSoonMemberItem[] => {
  const memberMap: Record<number, AllNationSoonMemberItem[]> = {
    129: mockSoonMembers1, // 237국_인드라그룹_인드라순
    130: mockSoonMembers2, // 237국_인드라그룹_박규현순
    131: mockSoonMembers3, // 237국_인드라그룹_장지영순
    133: mockSoonMembers4, // 237국_권진이그룹_권진이순
  };

  return memberMap[id] || [];
};

export const findNextAllNationMemberByUserId = (
  userId: number
): MockUserInfo[] => {
  return mockUsers.filter((_, index) => index % 3 === userId % 3);
};
