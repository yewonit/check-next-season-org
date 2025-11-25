/**
 * Loader 컴포넌트
 * 로딩 상태를 표시하는 컴포넌트
 */

import { type ReactNode, type CSSProperties } from 'react';
import { colors, spacing } from '../../../styles/foundation';
import { Typography5_Regular } from '../Typography';

export type LoaderSize = 'small' | 'medium' | 'large';

export interface LoaderProps {
  size?: LoaderSize;
  fullscreen?: boolean;
  children?: ReactNode;
  className?: string;
}

const sizeMap: Record<LoaderSize, number> = {
  small: 20,
  medium: 32,
  large: 48,
};

export const Loader = ({
  size = 'medium',
  fullscreen = false,
  children,
  className,
}: LoaderProps) => {
  const spinnerSize = sizeMap[size];

  const spinnerStyle: CSSProperties = {
    width: `${spinnerSize}px`,
    height: `${spinnerSize}px`,
    border: `3px solid ${colors.grey200}`,
    borderTopColor: colors.primary500,
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  };

  const containerStyle: CSSProperties = fullscreen
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.md,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        zIndex: 9999,
      }
    : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.md,
      };

  return (
    <div style={containerStyle} className={className}>
      <div style={spinnerStyle} />
      {children && (
        <Typography5_Regular as="span" style={{ color: colors.grey600 }}>
          {children}
        </Typography5_Regular>
      )}
    </div>
  );
};

/**
 * Spinner만 표시하는 컴포넌트
 */
export const LoaderSpinner = ({ size = 'medium' }: { size?: LoaderSize }) => {
  const spinnerSize = sizeMap[size];
  const spinnerStyle: CSSProperties = {
    width: `${spinnerSize}px`,
    height: `${spinnerSize}px`,
    border: `3px solid ${colors.grey200}`,
    borderTopColor: colors.primary500,
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  };

  return <div style={spinnerStyle} />;
};

// CSS 애니메이션
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
if (!document.head.querySelector('style[data-loader-spinner]')) {
  style.setAttribute('data-loader-spinner', 'true');
  document.head.appendChild(style);
}
