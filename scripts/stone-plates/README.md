# 석회암 돌 이미지 생성기

2027 Kingdom Builders 화면의 돌 질감(`src/kingdom/assets/stones/*.webp`)은 외부 이미지 없이
`generator.html`이 절차적으로 만든다. 시드가 고정되어 있어 다시 만들어도 같은 결과가 나온다.

- `face-*.webp`: 돌 가운데 면 (사방으로 이어 붙는 384px 타일)
- `wood-h.webp`, `wood-v.webp`: 크레인과 비계의 목재 결
- `chalk-line.webp`: 주요 버튼 아래의 먹줄

## 다시 만들기

1. `generator.html`을 Chrome에서 연다.
2. 개발자 도구 콘솔에서 `renderAll()`을 실행하면 이름별 WebP data URL이 나온다.
3. 각 data URL을 같은 이름의 `.webp` 파일로 `src/kingdom/assets/stones/`에 저장한다.

색조(`TONES`)와 시드를 바꾸면 돌의 인상이 달라진다. 돌의 베벨과 모서리 이빠짐은 이미지가 아니라
`src/kingdom/kingdom.css`의 `.kb-stone`(inset 그늘)과 `src/kingdom/lib/stone.ts`의 `chipMask`가 그린다.
