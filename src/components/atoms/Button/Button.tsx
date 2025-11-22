/**
 * Button 컴포넌트
 * 토스 디자인 시스템 기반의 버튼 컴포넌트
 */

import { ReactNode, ButtonHTMLAttributes, CSSProperties } from 'react';
import { colors, spacing, shadows } from '../../../styles/foundation';
import clsx from 'clsx';

export type ButtonColor = 'primary' | 'dark' | 'danger' | 'light' | 'secondary' | 'accent';
export type ButtonVariant = 'fill' | 'weak';
export type ButtonSize = 'xlarge' | 'large' | 'medium' | 'small';
export type ButtonDisplay = 'full' | 'block' | 'inline';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  children: ReactNode;
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  display?: ButtonDisplay;
  loading?: boolean;
  disabled?: boolean;
  'aria-label'?: string;
}

/**
 * 버튼 색상 스타일 생성
 */
const getButtonColorStyles = (color: ButtonColor, variant: ButtonVariant): CSSProperties => {
  if (variant === 'fill') {
    switch (color) {
      case 'primary':
        return {
          backgroundColor: colors.primary500,
          color: 'white',
        };
      case 'secondary':
        return {
          backgroundColor: colors.secondary500,
          color: 'white',
        };
      case 'accent':
        return {
          backgroundColor: colors.accent500,
          color: 'white',
        };
      case 'dark':
        return {
          backgroundColor: colors.grey900,
          color: 'white',
        };
      case 'danger':
        return {
          backgroundColor: colors.red500,
          color: 'white',
        };
      case 'light':
        return {
          backgroundColor: 'white',
          color: colors.grey900,
        };
      default:
        return {
          backgroundColor: colors.primary500,
          color: 'white',
        };
    }
  } else {
    // weak variant
    switch (color) {
      case 'primary':
        return {
          backgroundColor: colors.primary50,
          color: colors.primary700,
        };
      case 'secondary':
        return {
          backgroundColor: colors.secondary50,
          color: colors.secondary700,
        };
      case 'accent':
        return {
          backgroundColor: colors.accent50,
          color: colors.accent700,
        };
      case 'dark':
        return {
          backgroundColor: colors.grey100,
          color: colors.grey900,
        };
      case 'danger':
        return {
          backgroundColor: colors.red50,
          color: colors.red600,
        };
      case 'light':
        return {
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          color: 'white',
        };
      default:
        return {
          backgroundColor: colors.primary50,
          color: colors.primary700,
        };
    }
  }
};

/**
 * 버튼 크기 스타일 생성
 */
const getButtonSizeStyles = (size: ButtonSize): CSSProperties => {
  switch (size) {
    case 'xlarge':
      return {
        height: '56px',
        padding: `0 ${spacing.xl}px`,
        fontSize: '20px',
        lineHeight: '29px',
      };
    case 'large':
      return {
        height: '52px',
        padding: `0 ${spacing.xl}px`,
        fontSize: '17px',
        lineHeight: '25.5px',
      };
    case 'medium':
      return {
        height: '48px',
        padding: `0 ${spacing.lg}px`,
        fontSize: '17px',
        lineHeight: '25.5px',
      };
    case 'small':
      return {
        height: '40px',
        padding: `0 ${spacing.md}px`,
        fontSize: '15px',
        lineHeight: '22.5px',
      };
    default:
      return {
        height: '52px',
        padding: `0 ${spacing.xl}px`,
        fontSize: '17px',
        lineHeight: '25.5px',
      };
  }
};

/**
 * 버튼 Display 스타일 생성
 */
const getButtonDisplayStyles = (display: ButtonDisplay): CSSProperties => {
  switch (display) {
    case 'full':
      return {
        width: '100%',
      };
    case 'block':
      return {
        display: 'block',
        width: '100%',
      };
    case 'inline':
      return {
        display: 'inline-flex',
      };
    default:
      return {
        display: 'inline-flex',
      };
  }
};

export const Button = ({
  children,
  color = 'primary',
  variant = 'fill',
  size = 'large',
  display = 'inline',
  loading = false,
  disabled = false,
  className,
  style,
  'aria-label': ariaLabel,
  onClick,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  const buttonStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    border: 'none',
    borderRadius: '12px',
    fontWeight: 600,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    minWidth: '44px', // 최소 터치 영역
    minHeight: '44px',
    ...getButtonColorStyles(color, variant),
    ...getButtonSizeStyles(size),
    ...getButtonDisplayStyles(display),
    ...style,
  };

  // 호버 상태 (disabled가 아닐 때만)
  const hoverStyle: CSSProperties = !isDisabled
    ? {
        opacity: 0.9,
        transform: 'scale(0.98)',
        boxShadow: shadows.small,
      }
    : {};

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <button
      type="button"
      className={clsx('button', className)}
      style={buttonStyle}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-busy={loading}
      onClick={handleClick}
      onMouseEnter={(e) => {
        if (!isDisabled) {
          Object.assign(e.currentTarget.style, hoverStyle);
        }
      }}
      onMouseLeave={(e) => {
        if (!isDisabled) {
          e.currentTarget.style.opacity = '';
          e.currentTarget.style.transform = '';
          e.currentTarget.style.boxShadow = '';
        }
      }}
      {...props}
    >
      {loading ? (
        <>
          <span
            style={{
              width: '16px',
              height: '16px',
              border: '2px solid currentColor',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 0.6s linear infinite',
            }}
          />
          <span>처리 중...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

// CSS 애니메이션 (global.css에 추가하거나 styled-components 사용)
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
if (!document.head.querySelector('style[data-button-spinner]')) {
  style.setAttribute('data-button-spinner', 'true');
  document.head.appendChild(style);
}

