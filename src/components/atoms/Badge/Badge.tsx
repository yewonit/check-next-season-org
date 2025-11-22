/**
 * Badge 컴포넌트
 * 상태 표시용 뱃지 컴포넌트
 */

import { ReactNode, CSSProperties } from 'react';
import { colors, spacing, typography } from '../../../styles/foundation';
import { Typography7_Regular } from '../Typography';

export type BadgeColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'green'
  | 'red'
  | 'yellow'
  | 'blue'
  | 'grey';
export type BadgeVariant = 'fill' | 'weak';
export type BadgeSize = 'small' | 'medium' | 'large';

export interface BadgeProps {
  children: ReactNode;
  color?: BadgeColor;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  style?: CSSProperties;
}

const getBadgeColorStyles = (
  color: BadgeColor,
  variant: BadgeVariant
): CSSProperties => {
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
      case 'green':
        return {
          backgroundColor: colors.green500,
          color: 'white',
        };
      case 'red':
        return {
          backgroundColor: colors.red500,
          color: 'white',
        };
      case 'yellow':
        return {
          backgroundColor: colors.yellow500,
          color: colors.grey900,
        };
      case 'blue':
        return {
          backgroundColor: colors.blue500,
          color: 'white',
        };
      case 'grey':
        return {
          backgroundColor: colors.grey500,
          color: 'white',
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
      case 'green':
        return {
          backgroundColor: colors.green50,
          color: colors.green600,
        };
      case 'red':
        return {
          backgroundColor: colors.red50,
          color: colors.red600,
        };
      case 'yellow':
        return {
          backgroundColor: colors.yellow50,
          color: colors.yellow600,
        };
      case 'blue':
        return {
          backgroundColor: colors.blue50,
          color: colors.blue600,
        };
      case 'grey':
        return {
          backgroundColor: colors.grey100,
          color: colors.grey700,
        };
      default:
        return {
          backgroundColor: colors.primary50,
          color: colors.primary700,
        };
    }
  }
};

const getBadgeSizeStyles = (size: BadgeSize): CSSProperties => {
  switch (size) {
    case 'small':
      return {
        padding: `2px ${spacing.sm}px`,
        fontSize: typography.typography7.fontSize,
        lineHeight: typography.typography7.lineHeight,
      };
    case 'medium':
      return {
        padding: `4px ${spacing.md}px`,
        fontSize: typography.typography6.fontSize,
        lineHeight: typography.typography6.lineHeight,
      };
    case 'large':
      return {
        padding: `6px ${spacing.md}px`,
        fontSize: typography.typography5.fontSize,
        lineHeight: typography.typography5.lineHeight,
      };
    default:
      return {
        padding: `4px ${spacing.md}px`,
        fontSize: typography.typography6.fontSize,
        lineHeight: typography.typography6.lineHeight,
      };
  }
};

export const Badge = ({
  children,
  color = 'primary',
  variant = 'fill',
  size = 'small',
  className,
  style,
}: BadgeProps) => {
  const badgeStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    ...getBadgeColorStyles(color, variant),
    ...getBadgeSizeStyles(size),
    ...style,
  };

  return (
    <span className={className} style={badgeStyle}>
      {children}
    </span>
  );
};
