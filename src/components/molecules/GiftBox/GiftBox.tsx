/**
 * GiftBox 컴포넌트
 * 선물 박스 인터랙션 컴포넌트 (애니메이션 페이지용)
 */

import { useState, CSSProperties } from 'react';
import { colors, spacing } from '../../../styles/foundation';
import { Typography5_Regular } from '../../atoms/Typography';
import { Gift } from 'lucide-react';

export interface GiftBoxProps {
  onComplete: () => void;
  minTaps?: number;
  maxTaps?: number;
  className?: string;
}

export const GiftBox = ({
  onComplete,
  minTaps = 3,
  maxTaps = 4,
  className,
}: GiftBoxProps) => {
  const [tapCount, setTapCount] = useState(0);
  const [scale, setScale] = useState(1);
  const [isExploding, setIsExploding] = useState(false);

  const handleTap = () => {
    if (isExploding) return;

    const newTapCount = tapCount + 1;
    setTapCount(newTapCount);

    // 점진적 확대
    const newScale = 1 + newTapCount * 0.15;
    setScale(newScale);

    // 진동 피드백
    if ('vibrate' in navigator) {
      const intensity = Math.min(newTapCount * 10, 50);
      navigator.vibrate(intensity);
    }

    // 최소 탭 횟수 도달 시 폭발
    if (newTapCount >= minTaps && newTapCount <= maxTaps) {
      setIsExploding(true);
      
      // 폭발 애니메이션 후 완료 콜백
      setTimeout(() => {
        onComplete();
      }, 500);
    }
  };

  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xl,
    cursor: isExploding ? 'default' : 'pointer',
    userSelect: 'none',
  };

  const giftBoxStyle: CSSProperties = {
    width: `${60 * scale}px`,
    height: `${60 * scale}px`,
    color: colors.primary500,
    transition: isExploding ? 'none' : 'transform 0.2s ease',
    transform: isExploding ? 'scale(2) rotate(360deg)' : `scale(${scale})`,
    animation: isExploding ? 'explode 0.5s ease' : undefined,
  };

  const textStyle: CSSProperties = {
    color: colors.grey700,
    textAlign: 'center',
  };

  return (
    <div className={className} style={containerStyle} onClick={handleTap}>
      <div style={giftBoxStyle}>
        <Gift size="100%" />
      </div>
      {!isExploding && (
        <Typography5_Regular style={textStyle}>
          {tapCount === 0
            ? '탭하여 선물을 열어보세요'
            : tapCount < minTaps
            ? `${minTaps - tapCount}번 더 탭하세요`
            : '펑!'}
        </Typography5_Regular>
      )}

      {/* 파티클 효과 (간단한 구현) */}
      {isExploding && (
        <div
          style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            pointerEvents: 'none',
          }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '8px',
                height: '8px',
                backgroundColor: [
                  colors.primary500,
                  colors.secondary500,
                  colors.accent500,
                  colors.green500,
                ][i % 4],
                borderRadius: '50%',
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${(i * 18) * (Math.PI / 180)}deg) translateY(-100px)`,
                animation: `particle 0.5s ease forwards`,
                animationDelay: `${i * 0.02}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* CSS 애니메이션 */}
      <style>{`
        @keyframes explode {
          0% {
            transform: scale(${scale}) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: scale(${scale * 1.5}) rotate(180deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(${scale * 2}) rotate(360deg);
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
            transform: translate(-50%, -50%) rotate(var(--rotation)) translateY(-100px);
          }
        }
      `}</style>
    </div>
  );
};

