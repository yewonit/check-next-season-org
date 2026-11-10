import type { CSSProperties } from 'react';
import type { StoneShape } from './rng';
import faceHoney from '../assets/stones/face-honey.webp';
import faceGold from '../assets/stones/face-gold.webp';
import faceAmber from '../assets/stones/face-amber.webp';
import faceOchre from '../assets/stones/face-ochre.webp';
import faceWheat from '../assets/stones/face-wheat.webp';
import faceFresh from '../assets/stones/face-fresh.webp';

/** 성벽의 다섯 가지 석회암 색조 */
const TONES = [faceHoney, faceGold, faceAmber, faceOchre, faceWheat];

/** 새로 깎은 돌: 이름 칸, 내 이름 돌, 명판 */
const FRESH = faceFresh;

/**
 * 모서리 이빠짐: 네 모서리를 돌마다 다른 각도와 깊이로 비스듬히 깎는다.
 * 각 모서리는 그 모서리에서 시작하는 선형 그라디언트 마스크 한 장이고, 넷을 교차시킨다.
 */
function chipMask(chips: StoneShape['chips']): string {
  const base = [135, 225, 315, 45]; // 왼쪽 위, 오른쪽 위, 오른쪽 아래, 왼쪽 아래
  return chips
    .map(([depth, tilt], i) =>
      depth <= 0
        ? 'linear-gradient(#000, #000)'
        : `linear-gradient(${base[i] + tilt}deg, transparent ${depth}px, #000 ${depth + 0.7}px)`
    )
    .join(', ');
}

/** 돌 하나의 면·모서리·폭을 CSS 변수로 넘긴다 */
export function stoneVars(
  shape: StoneShape,
  withGrow = true,
  tone: 'wall' | 'fresh' = 'wall'
): CSSProperties {
  const face = tone === 'fresh' ? FRESH : TONES[shape.tone % TONES.length];
  return {
    '--face': `url(${face})`,
    '--chips': chipMask(shape.chips),
    backgroundPosition: `${shape.offsetX}px ${shape.offsetY}px`,
    ...(withGrow ? { flexGrow: shape.grow, flexBasis: 0 } : {}),
  } as CSSProperties;
}
