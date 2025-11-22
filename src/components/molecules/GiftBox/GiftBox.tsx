/**
 * GiftBox 컴포넌트
 * 선물 박스 인터랙션 컴포넌트 (애니메이션 페이지용)
 */

import { useState, CSSProperties, ReactNode, useEffect } from "react";
import { colors, spacing } from "../../../styles/foundation";
import { Typography5_Regular } from "../../atoms/Typography";
import { Gift } from "lucide-react";

export interface GiftBoxProps {
  onComplete: () => void;
  minTaps?: number;
  maxTaps?: number;
  className?: string;
  showGuideText?: boolean;
  children?: ReactNode;
}

export const GiftBox = ({
  onComplete,
  minTaps = 10,
  maxTaps = 20,
  className,
  showGuideText = false,
  children,
}: GiftBoxProps) => {
  const [tapCount, setTapCount] = useState(0);
  const [scale, setScale] = useState(1);
  const [isExploding, setIsExploding] = useState(false);

  const handleTap = () => {
    if (isExploding) return;

    const newTapCount = tapCount + 1;
    setTapCount(newTapCount);

    // 점진적 확대 (최대 1.3배까지)
    const progress = Math.min(newTapCount / minTaps, 1);
    const newScale = 1 + progress * 0.3;
    setScale(newScale);

    // 진동 피드백
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      try {
        navigator.vibrate(40);
      } catch (e) {
        // ignore
      }
    }

    // 최소 탭 횟수 도달 시 폭발
    if (newTapCount >= minTaps) {
      setIsExploding(true);

      // 폭발 애니메이션 후 완료 콜백
      setTimeout(() => {
        onComplete();
      }, 800);
    }
  };

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xl,
    cursor: isExploding ? "default" : "pointer",
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
    touchAction: "manipulation",
  };

  const giftBoxStyle: CSSProperties = {
    width: children ? "auto" : `${60 * scale}px`,
    height: children ? "auto" : `${60 * scale}px`,
    color: colors.primary500,
    transition: isExploding
      ? "none"
      : "transform 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    transform: isExploding
      ? "scale(3) rotate(360deg)"
      : `scale(${scale}) rotate(${
          (tapCount % 2 === 0 ? 1 : -1) * Math.min(tapCount * 2, 10)
        }deg)`, // 탭할 때마다 살짝 회전
    opacity: isExploding ? 0 : 1,
    animation: isExploding ? "explode 0.8s forwards" : undefined,
  };

  const textStyle: CSSProperties = {
    color: colors.grey700,
    textAlign: "center",
  };

  return (
    <div className={className} style={containerStyle} onClick={handleTap}>
      <div style={giftBoxStyle}>
        {children ? children : <Gift size="100%" />}
      </div>
      {showGuideText && !isExploding && (
        <Typography5_Regular style={textStyle}>
          {tapCount === 0
            ? "탭하여 선물을 열어보세요"
            : tapCount < minTaps
            ? `${minTaps - tapCount}번 더 탭하세요`
            : "펑!"}
        </Typography5_Regular>
      )}

      {/* 파티클 효과 */}
      {isExploding && (
        <div
          style={{
            position: "absolute",
            width: "200px",
            height: "200px",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              style={
                {
                  position: "absolute",
                  width: "10px",
                  height: "10px",
                  backgroundColor: [
                    colors.primary500,
                    colors.secondary500,
                    "#FFD700", // Gold
                    colors.green500,
                    "#FF69B4", // Pink
                  ][i % 5],
                  borderRadius: i % 2 === 0 ? "50%" : "0", // 원과 사각형 섞기
                  left: "50%",
                  top: "50%",
                  "--rotation": `${i * 12}deg`,
                  "--distance": `${100 + Math.random() * 100}px`,
                  animation: `particle 0.8s ease-out forwards`,
                  animationDelay: `${Math.random() * 0.2}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes explode {
          0% {
            transform: scale(${scale}) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: scale(${scale * 1.5}) rotate(180deg);
            opacity: 0.5;
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
            transform: translate(-50%, -50%) rotate(var(--rotation)) translateY(calc(var(--distance) * -1));
          }
        }
      `}</style>
    </div>
  );
};
