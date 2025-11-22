/**
 * Skeleton 컴포넌트
 * 로딩 중 콘텐츠의 플레이스홀더를 표시하는 컴포넌트
 */

import { CSSProperties } from 'react';
import { colors, spacing } from '../../../styles/foundation';

export type SkeletonType = 'text' | 'circular' | 'rectangular' | 'list' | 'card';

export interface SkeletonProps {
  type?: SkeletonType;
  width?: number | string;
  height?: number | string;
  count?: number;
  className?: string;
}

const baseStyle: CSSProperties = {
  backgroundColor: colors.grey200,
  borderRadius: '4px',
  animation: 'skeleton-pulse 1.5s ease-in-out infinite',
};

const getSkeletonStyle = (
  type: SkeletonType,
  width?: number | string,
  height?: number | string
): CSSProperties => {
  const style: CSSProperties = { ...baseStyle };

  switch (type) {
    case 'text':
      return {
        ...style,
        width: width || '100%',
        height: height || '16px',
        borderRadius: '4px',
      };
    case 'circular':
      const size = typeof width === 'number' ? width : typeof height === 'number' ? height : 40;
      return {
        ...style,
        width: size,
        height: size,
        borderRadius: '50%',
      };
    case 'rectangular':
      return {
        ...style,
        width: width || '100%',
        height: height || '200px',
        borderRadius: '8px',
      };
    case 'list':
      return {
        ...style,
        width: width || '100%',
        height: height || '60px',
        borderRadius: '8px',
      };
    case 'card':
      return {
        ...style,
        width: width || '100%',
        height: height || '200px',
        borderRadius: '12px',
      };
    default:
      return {
        ...style,
        width: width || '100%',
        height: height || '16px',
      };
  }
};

export const Skeleton = ({
  type = 'text',
  width,
  height,
  count = 1,
  className,
}: SkeletonProps) => {
  const style = getSkeletonStyle(type, width, height);

  if (count > 1) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} style={style} className={className} />
        ))}
      </div>
    );
  }

  return <div style={style} className={className} />;
};

// CSS 애니메이션
const style = document.createElement('style');
style.textContent = `
  @keyframes skeleton-pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;
if (!document.head.querySelector('style[data-skeleton-pulse]')) {
  style.setAttribute('data-skeleton-pulse', 'true');
  document.head.appendChild(style);
}

