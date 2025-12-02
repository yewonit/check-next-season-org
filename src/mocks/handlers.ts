import { http, HttpResponse } from 'msw';
import type { CheckNameResponse } from '../api/name';
import {
  findUsersByName,
  findUserById,
  mockAllNationList,
  mockMembers,
} from './mock-data';

/**
 * @author SeungrokYoon
 * @description 브라우저에서 외부로 요청하는 경우 모킹 데이터를 반환합니다.
 * 여기서 주의해야 할 점은, API base url입니다.
 * production 환경의 VITE_API_BASE_URL 환경변수는 실제 서버의 base url입니다.
 * development 환경의 VITE_API_BASE_URL 환경변수는 mock server의 base url입니다.
 * 따라서, production 환경에서는 실제 서버의 base url로 요청을 보내고,
 * development 환경에서는 mock server의 base url로 요청을 보냅니다.
 * 우리가 원하는 것은 development 환경에서만 mock server의 base url로 요청을 보내는 것인데요, 건 main.tsx에서 환경변수를 판단하여 처리하니 걱정하지 말고,
 * http.get/ http.post 등의 메서드를 사용하되, base url 뒤에 오는 경로만 작성하여 모킹합니다.
 *
 * 모킹이 제대로 동작하게 하려면, .env.development 파일에 VITE_API_BASE_URL 환경변수에 로컬호스트와포트가 포함된 url을 설정해야 합니다.
 * ex) VITE_API_BASE_URL=http://localhost:5173
 */
export const handlers = [
  // 이름으로 검색: GET /seasons/next?name={name}
  http.get('/seasons/next', ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get('name');
    const userId = url.searchParams.get('userId');

    // userId로 검색하는 경우
    if (userId) {
      const user = findUserById(Number(userId));
      // 실제 API 응답처럼 null 값을 포함한 데이터를 반환 (타입 단언 사용)
      const response = {
        data: user ? [user] : [],
      } as CheckNameResponse;
      return HttpResponse.json(response);
    }

    // name으로 검색하는 경우
    if (name) {
      const users = findUsersByName(name);
      // 실제 API 응답처럼 null 값을 포함한 데이터를 반환 (타입 단언 사용)
      const response = {
        data: users,
      } as CheckNameResponse;
      return HttpResponse.json(response);
    }

    return HttpResponse.json({ data: [] }, { status: 400 });
  }),

  // 올네이션 순 리스트: GET /seasons/all-nations
  http.get('/seasons/all-nations', () => {
    return HttpResponse.json({
      data: mockAllNationList,
    });
  }),

  // 특정 순의 멤버 조회: GET /organizations/{id}/members
  http.get('/organizations/:id/members', ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      members: mockMembers.map((member, index) => ({
        ...member,
        id: Number(id) * 10 + index + 1,
      })),
    });
  }),
];
