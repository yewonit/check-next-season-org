/**
 * GiftBox 컴포넌트
 * 선물 박스 인터랙션 컴포넌트 (애니메이션 페이지용)
 */

import { useState, useMemo, useImperativeHandle, forwardRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { colors, spacing } from '../../../styles/foundation';
import { Typography5_Regular } from '../../atoms/Typography';
import { Gift } from 'lucide-react';

export interface GiftBoxProps {
  onComplete: () => void;
  minTaps?: number;
  className?: string;
  showGuideText?: boolean;
  children?: ReactNode;
}

export interface GiftBoxHandle {
  handleTap: () => void;
}

export const GiftBox = forwardRef<GiftBoxHandle, GiftBoxProps>(({
  onComplete,
  minTaps = 1,
  className,
  showGuideText = false,
  children,
}, ref) => {
  const [tapCount, setTapCount] = useState(0);
  const [isExploding, setIsExploding] = useState(false);
  const scaleList = [60, 100, 150, 180];

  const particleData = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, i) => ({
        color: [
          colors.primary500,
          colors.secondary500,
          '#FFD700',
          colors.green500,
          '#FF69B4',
        ][i % 5],
        borderRadius: i % 2 === 0 ? '50%' : '0',
        rotation: i * 12,
        distance: 100 + ((i * 7) % 100),
        delay: (i * 0.007) % 0.2,
      })),
    []
  );

  const handleTap = () => {
    if (isExploding) return;

    const nextTapCount = tapCount + 1;
    setTapCount(nextTapCount);

    // 진동 피드백
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(40);
      } catch {
        // ignore
      }
    }

    // 최소 탭 횟수 도달 시 폭발
    if (nextTapCount >= minTaps) {
      setIsExploding(true);

      // 폭발 애니메이션 후 완료 콜백
      setTimeout(() => {
        onComplete();
      }, 800);
    }
  };

  useImperativeHandle(ref, () => ({
    handleTap,
  }));

  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xl,
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    touchAction: 'manipulation',
    pointerEvents: 'none', // 외부에서 클릭 처리하므로 pointer events 비활성화
  };
  const currentGiftSize = scaleList[Math.min(tapCount, scaleList.length - 1)];
  const rotationAngle = tapCount * 15;
  const giftBoxStyle: CSSProperties = {
    width: children ? 'auto' : `${currentGiftSize}px`,
    height: children ? 'auto' : `${currentGiftSize}px`,
    color: colors.primary500,
    transition: isExploding
      ? 'none'
      : 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    transform: isExploding
      ? 'scale(3) rotate(360deg)'
      : `scale(${currentGiftSize / 60}) rotate(${rotationAngle}deg)`,
    opacity: isExploding ? 0 : 1,
    animation: isExploding ? 'explode 0.8s forwards infinite' : undefined,
  };

  const textStyle: CSSProperties = {
    color: colors.grey700,
    textAlign: 'center',
  };

  return (
    <div className={className} style={containerStyle}>
      <div style={giftBoxStyle}>
        {children ? children : <Gift size="100%" />}
      </div>
      {showGuideText && !isExploding && (
        <Typography5_Regular style={textStyle}>
          {tapCount === 0
            ? '탭하여 선물을 열어보세요'
            : tapCount < minTaps
              ? `${minTaps - tapCount}번 더 탭하세요`
              : '펑!'}
        </Typography5_Regular>
      )}

      {/* 파티클 효과 */}
      {isExploding && (
        <div
          style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          {particleData.map((particle, i) => (
            <div
              key={i}
              style={
                {
                  position: 'absolute',
                  width: '10px',
                  height: '10px',
                  backgroundColor: particle.color,
                  borderRadius: particle.borderRadius,
                  left: '50%',
                  top: '50%',
                  animation: `particle 0.8s ease-out forwards`,
                  animationDelay: `${particle.delay}s`,
                  ['--rotation']: `${particle.rotation}deg`,
                  ['--distance']: `${particle.distance}px`,
                } as CSSProperties & Record<string, string>
              }
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes explode {
          0% {
            transform: scale(${currentGiftSize / 60}) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: scale(${(currentGiftSize / 60) * 1.5}) rotate(180deg);
            opacity: 0.5;
          }
          100% {
            transform: scale(${(currentGiftSize / 60) * 2}) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes particle {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(var(--rotation)) translateY(0);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(var(--rotation)) translateY(calc(var(--distance) * -1));
          }
        }
      `}</style>
    </div>
  );
});
