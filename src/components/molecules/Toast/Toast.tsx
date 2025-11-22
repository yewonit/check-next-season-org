/**
 * Toast 컴포넌트
 * 알림 메시지를 표시하는 컴포넌트
 */

import { ReactNode, CSSProperties } from 'react';
import { colors, spacing, shadows } from '../../../styles/foundation';
import { Typography5_Regular } from '../../atoms/Typography';
import { Icon } from '../../atoms/Icon';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastProps {
  type: ToastType;
  children: ReactNode;
  onClose?: () => void;
  duration?: number;
  className?: string;
}

const getToastStyles = (type: ToastType): CSSProperties => {
  const baseStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    padding: `${spacing.md}px ${spacing.lg}px`,
    borderRadius: '12px',
    boxShadow: shadows.medium,
    minWidth: '280px',
    maxWidth: '400px',
  };

  switch (type) {
    case 'success':
      return {
        ...baseStyle,
        backgroundColor: colors.green50,
        border: `1px solid ${colors.green200}`,
      };
    case 'error':
      return {
        ...baseStyle,
        backgroundColor: colors.red50,
        border: `1px solid ${colors.red200}`,
      };
    case 'info':
      return {
        ...baseStyle,
        backgroundColor: colors.blue50,
        border: `1px solid ${colors.blue200}`,
      };
    default:
      return baseStyle;
  }
};

const getIcon = (type: ToastType) => {
  switch (type) {
    case 'success':
      return CheckCircle;
    case 'error':
      return XCircle;
    case 'info':
      return Info;
    default:
      return Info;
  }
};

const getIconColor = (type: ToastType): string => {
  switch (type) {
    case 'success':
      return colors.green600;
    case 'error':
      return colors.red600;
    case 'info':
      return colors.blue600;
    default:
      return colors.blue600;
  }
};

const getTextColor = (type: ToastType): string => {
  switch (type) {
    case 'success':
      return colors.green700;
    case 'error':
      return colors.red700;
    case 'info':
      return colors.blue700;
    default:
      return colors.blue700;
  }
};

export const Toast = ({
  type,
  children,
  onClose,
  className,
}: ToastProps) => {
  const toastStyle = getToastStyles(type);
  const IconComponent = getIcon(type);
  const iconColor = getIconColor(type);
  const textColor = getTextColor(type);

  return (
    <div className={className} style={toastStyle} role="alert">
      <Icon icon={IconComponent} size="md" color={iconColor} />
      <Typography5_Regular style={{ flex: 1, color: textColor }}>
        {children}
      </Typography5_Regular>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            padding: spacing.xs,
            display: 'flex',
            alignItems: 'center',
            color: colors.grey500,
          }}
          aria-label="닫기"
        >
          <Icon icon={X} size="sm" color={colors.grey500} />
        </button>
      )}
    </div>
  );
};

