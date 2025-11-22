/**
 * GradientBackground 컴포넌트
 * 재사용 가능한 그라데이션 배경 컴포넌트
 */

import { ReactNode, CSSProperties } from 'react';
import { gradients, GradientKey } from '../../../styles/foundation';

export interface GradientBackgroundProps {
  children?: ReactNode;
  gradient?: GradientKey | string;
  className?: string;
  style?: CSSProperties;
}

export const GradientBackground = ({
  children,
  gradient = 'primary',
  className,
  style,
}: GradientBackgroundProps) => {
  const backgroundStyle: CSSProperties = {
    background: typeof gradient === 'string' && gradient.startsWith('linear-gradient')
      ? gradient
      : gradients[gradient as GradientKey] || gradients.primary,
    ...style,
  };

  return (
    <div style={backgroundStyle} className={className}>
      {children}
    </div>
  );
};

