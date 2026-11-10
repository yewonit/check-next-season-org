---
version: 1
slug: "src-kingdom-pages-homepage-tsx"
primary_target: "src/kingdom/pages/HomePage.tsx"
related_targets: ["src/kingdom/pages/BuildPage.tsx","src/kingdom/pages/ResultPage.tsx","src/kingdom/pages/AllNationsPage.tsx"]
---

# 2027 순배치 확인 (Kingdom Builders)

## Scope
- 전체 플로우: 메인(`/`), 동명이인 바텀시트, 올네이션(`/all-nations`), 리빌(`/build`), 결과(`/result`)
- 모드: Experience. 리빌이 의식의 중심이고, 이름 입력과 결과는 업무 화면 수준으로 분명해야 한다.
- 범위: 바로 배포해도 되는 프로토타입. 피드백 받은 뒤 수정 예정.

## Audience and job
- 공개 시각에 폰으로 접속하는 청년회 회원과 올네이션국. 이름 하나로 3~4단계 안에 2027 그룹·순, 리더 연락처, 순원 명단까지 도달한다.

## Confirmed decisions (2026-11-09)
- 테마 키워드: Kingdom Builders. 성경 구절 "일어나 건축하자 (느 2:18)"를 쓴다 (추후 피드백으로 조정 가능).
- 리더 전화번호는 링크 없이 텍스트로만 보여 준다. 노출 범위는 2026과 같다.
- 다국어는 2026과 같은 언어(한/영/중/일/스)와 같은 위치: 메인 올네이션 진입, 리빌 안내, 올네이션 그룹 선택 제목. 결과 화면 제목은 한/영 병기.
- 결과 화면 정보 구성은 2026과 같다.

## Open decisions
- 확정 카피 (현재 문구는 초안)
- 실제 순원 수 범위 (3~20명 가정)
- 공유·인증샷 기능 (이번 범위 아님)

## Direction contract
THESIS: 순배치는 2027년의 느헤미야 3장, 곧 누가 성벽의 어느 구간을 맡아 세우는지 적은 명단이다. 방문자는 크레인에 매달린 돌을 직접 내려 쌓고, 마지막에 자기 이름이 새겨진 돌을 놓는다. 선물상자·컨페티·흰 카드 결과로 이루어진 이벤트 페이지 틀을 거부한다.

OWN-WORLD: 해 진 직후의 짙은 코발트 하늘(별 몇 개, 멀리 보이는 성벽과 망대 실루엣)과 꿀빛 석회암 성벽. 돌은 노이즈 질감, 모서리마다 다른 둥글기, 위가 밝고 아래가 어두운 베벨, 회반죽 줄눈으로 맞물린다. 글씨는 돌에 새긴 Hahmlet, 본문은 Pretendard. 빨강(먹줄)은 주요 행동과 '나'에게만 쓴다. 나무 지브 크레인과 비계가 공사 현장을 만든다. 크림 종이, 검은 화강암, 비석 같은 단독 판은 쓰지 않는다.

STORY: 방문자는 하늘 아래 반쯤 쌓인 성벽에서 비어 있는 돌 자리에 이름을 넣는다. 크레인에 매달린 돌을 네 번 내려 국, 그룹, 순, 내 이름 순으로 쌓아 가며 결과를 한 단계씩 알게 되고, 성벽에 빛이 번지는 순간 자기 자리를 믿게 된다. 결과에서 리더 연락처와 순원 명단을 확인한다.

FIRST VIEWPORT: 위쪽 약 60%는 코발트 하늘. 왼쪽 위에 코람데오 로고, 지평선 가까이에 화면 폭을 채우는 "KINGDOM / BUILDERS" 금빛 대문자, 그 아래 "“일어나 건축하자” 느헤미야 2:18"과 한 줄 안내, 그 아래 멀리 보이는 성벽 실루엣. 아래 약 40%는 성벽이다. 들쭉날쭉한 윗단, 점선 먹줄로 표시된 빈 돌 자리가 곧 이름 입력칸, 바로 아래 줄의 넓은 돌이 확인 버튼(입력이 유효하면 먹줄 빨강), 맨 아래 아치형 All Nations 문 안에 다국어 안내가 돌아간다. 주요 행동은 엄지가 닿는 하단 성벽 안에 있다.
- Signature interaction: 리빌의 크레인 돌 쌓기. 돌이 밧줄에 매달려 흔들리고, 탭할 때마다 중력처럼 가속해 떨어져 살짝 튀며 놓이고, 먼지가 일고, 새김 글씨가 왼쪽에서 오른쪽으로 파인다. 빈 자리는 점선 먹줄로 남은 단계를 보여 준다. 네 번째 돌(내 이름, 새 돌 색, 아래에 먹줄)은 더 무겁게 떨어지며 화면이 흔들리고, 성벽 뒤로 새벽빛이 번진 뒤 결과로 넘어간다. 연타는 대기열로 쌓인다.
- Motion grammar: 놓이기(위에서 아래로, ease-in 후 짧은 바운스)가 유일한 모션 어휘다. 순원 명단을 펼칠 때 돌이 차례로 내려앉고, 바텀시트는 아래에서 올라온다. 모션 줄이기에서는 흔들림·먼지·낙하 없이 나타나기만 한다.

FORM: 느헤미야의 성벽. 재굴림(round 1)에서 내 순위 목록 1번(IMPECCABLE'S PICK, 주사위 배정은 6번 성경 지도). seed:33c7f2560ed2c47d

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
