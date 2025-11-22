/**
 * BottomCTA 컴포넌트
 * 화면 하단 고정 CTA 영역 컴포넌트
 */

import { ReactNode, CSSProperties } from 'react';
import { colors, spacing } from '../../../styles/foundation';

export interface BottomCTAProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const BottomCTA = ({ children, className, style }: BottomCTAProps) => {
  const containerStyle: CSSProperties = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    padding: `${spacing.lg}px ${spacing.xl}px`,
    paddingBottom: `calc(${spacing.xl}px + env(safe-area-inset-bottom))`,
    backgroundColor: colors.background,
    borderTop: `1px solid ${colors.grey200}`,
    boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.05)',
    zIndex: 100,
    ...style,
  };

  return (
    <div className={className} style={containerStyle}>
      {children}
    </div>
  );
};
