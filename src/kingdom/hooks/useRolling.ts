import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * 2026과 같은 다국어 롤링: 2.5초마다 0.5초 페이드로 다음 언어로 넘어간다.
 * 모션 줄이기 설정에서는 첫 번째(한국어)에 머문다.
 */
export function useRolling(length: number, paused = false) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const still = reduced || paused || length < 2;

  useEffect(() => {
    if (still) return;
    let swap: ReturnType<typeof setTimeout>;
    const tick = setInterval(() => {
      setVisible(false);
      swap = setTimeout(() => {
        setIndex((i) => (i + 1) % length);
        setVisible(true);
      }, 500);
    }, 2500);
    return () => {
      clearInterval(tick);
      clearTimeout(swap);
    };
  }, [still, length]);

  return { index: still ? 0 : index, visible: still ? true : visible };
}
