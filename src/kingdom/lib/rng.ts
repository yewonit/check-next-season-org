/** 문자열 시드로 항상 같은 결과를 내는 난수 (돌 배치가 렌더마다 바뀌지 않도록) */
export function seeded(seed: string): () => number {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

export interface StoneShape {
  grow: number;
  tone: number;
  /** 네 모서리의 [이빠진 깊이(px, 0이면 온전), 기울기(deg)] */
  chips: [number, number][];
  /** 면 텍스처를 돌마다 다른 자리에서 시작해 반복이 드러나지 않게 */
  offsetX: number;
  offsetY: number;
}

export function stoneShape(rand: () => number, grow?: number): StoneShape {
  return {
    grow: grow ?? 0.7 + rand() * 1.6,
    tone: Math.floor(rand() * 5),
    offsetX: -Math.floor(rand() * 192),
    offsetY: -Math.floor(rand() * 192),
    chips: Array.from({ length: 4 }, (): [number, number] => [
      rand() < 0.4 ? 0 : Math.round((1.5 + rand() * 6.5) * 10) / 10,
      Math.round((rand() - 0.5) * 34),
    ]),
  };
}

/** 장식용 성벽 줄: 줄마다 3~5개의 돌, 줄눈이 겹치지 않게 엇갈린다 */
export function buildCourses(
  seed: string,
  count: number,
  min = 3,
  max = 5
): StoneShape[][] {
  const rand = seeded(seed);
  return Array.from({ length: count }, (_, row) => {
    const n = min + Math.floor(rand() * (max - min + 1));
    const stones = Array.from({ length: n }, () => stoneShape(rand));
    // 홀수 줄은 첫 돌을 작게 해서 줄눈을 엇갈리게 한다
    if (row % 2 === 1) stones[0] = { ...stones[0], grow: 0.45 };
    return stones;
  });
}
