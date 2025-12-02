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
export const mockAllNationList = [
  { id: 1, name: '1순' },
  { id: 2, name: '2순' },
  { id: 3, name: '3순' },
];

// 멤버 모킹 데이터
export const mockMembers = [
  {
    id: 1,
    name: '홍길동',
    email: 'hong@example.com',
    roleName: '리더',
  },
  {
    id: 2,
    name: '김철수',
    email: 'kim@example.com',
    roleName: '멤버',
  },
  {
    id: 3,
    name: '이영희',
    email: 'lee@example.com',
    roleName: '멤버',
  },
  {
    id: 4,
    name: '최민지',
    email: 'choi@example.com',
    roleName: '리더',
  },
  {
    id: 5,
    name: '정다은',
    email: 'jung@example.com',
    roleName: '멤버',
  },
];
