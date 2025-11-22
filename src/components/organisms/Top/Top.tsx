/**
 * Top 컴포넌트
 * 상단 헤더 컴포넌트
 */

import { ReactNode, CSSProperties } from 'react';
import { colors, spacing } from '../../../styles/foundation';
import { Typography3_Semibold } from '../../atoms/Typography';
import { Icon } from '../../atoms/Icon';
import { ArrowLeft, X } from 'lucide-react';

export interface TopProps {
  title: string;
  left?: ReactNode;
  right?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const Top = ({ title, left, right, className, style }: TopProps) => {
  const containerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${spacing.md}px ${spacing.xl}px`,
    paddingTop: `calc(${spacing.md}px + env(safe-area-inset-top))`,
    backgroundColor: colors.background,
    borderBottom: `1px solid ${colors.grey200}`,
    minHeight: '56px',
    ...style,
  };

  const leftStyle: CSSProperties = {
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    minWidth: '44px',
  };

  const centerStyle: CSSProperties = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  };

  const rightStyle: CSSProperties = {
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minWidth: '44px',
  };

  return (
    <header className={className} style={containerStyle}>
      <div style={leftStyle}>{left}</div>
      <div style={centerStyle}>
        <Typography3_Semibold style={{ color: colors.grey900 }}>
          {title}
        </Typography3_Semibold>
      </div>
      <div style={rightStyle}>{right}</div>
    </header>
  );
};

/**
 * Top.BackButton 서브컴포넌트
 */
const TopBackButton = ({
  onClick,
  'aria-label': ariaLabel = '뒤로가기',
}: {
  onClick?: () => void;
  'aria-label'?: string;
}) => {
  const buttonStyle: CSSProperties = {
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    padding: spacing.sm,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '44px',
    minHeight: '44px',
  };

  return (
    <button onClick={onClick} style={buttonStyle} aria-label={ariaLabel}>
      <Icon icon={ArrowLeft} size="md" color={colors.grey900} />
    </button>
  );
};

/**
 * Top.Icon 서브컴포넌트
 */
const TopIcon = ({
  icon,
  onClick,
  'aria-label': ariaLabel,
}: {
  icon: any;
  onClick?: () => void;
  'aria-label': string;
}) => {
  const buttonStyle: CSSProperties = {
    border: 'none',
    background: 'none',
    cursor: onClick ? 'pointer' : 'default',
    padding: spacing.sm,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '44px',
    minHeight: '44px',
  };

  return (
    <button onClick={onClick} style={buttonStyle} aria-label={ariaLabel}>
      <Icon icon={icon} size="md" color={colors.grey900} />
    </button>
  );
};

// 서브컴포넌트 추가
(Top as any).BackButton = TopBackButton;
(Top as any).Icon = TopIcon;

export { TopBackButton, TopIcon };
