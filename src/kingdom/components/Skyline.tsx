/** 해 질 녘 하늘 아래 멀리 보이는 성벽과 망대 실루엣 */
function battlements(from: number, to: number, top: number): string {
  let d = '';
  for (let x = from; x < to; x += 14) {
    const end = Math.min(x + 8, to);
    d += `L${x} ${top - 6} L${end} ${top - 6} L${end} ${top} L${Math.min(x + 14, to)} ${top} `;
  }
  return d;
}

function tower(x: number, w: number, top: number, base: number): string {
  return `L${x} ${base} L${x} ${top} ${battlements(x, x + w, top)}L${x + w} ${base} `;
}

const WALL_TOP = 64;
const PATH =
  `M0 92 L0 ${WALL_TOP} ` +
  battlements(0, 34, WALL_TOP) +
  tower(34, 30, 30, WALL_TOP) +
  battlements(64, 156, WALL_TOP) +
  tower(156, 52, 18, WALL_TOP) +
  battlements(208, 300, WALL_TOP) +
  tower(300, 26, 36, WALL_TOP) +
  battlements(326, 390, WALL_TOP) +
  'L390 92 Z';

export function Skyline() {
  return (
    <svg
      className="kb-skyline"
      viewBox="0 0 390 92"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATH} fill="#11296a" />
      {/* 성문 아치 */}
      <path d="M170 92 L170 58 Q182 42 194 58 L194 92 Z" fill="#0b1c4c" />
      <rect
        x="44"
        y="42"
        width="6"
        height="10"
        rx="3"
        fill="#f4d58f"
        opacity="0.8"
      />
      <rect
        x="310"
        y="46"
        width="5"
        height="9"
        rx="2.5"
        fill="#f4d58f"
        opacity="0.6"
      />
    </svg>
  );
}
