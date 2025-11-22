/**
 * ListRow 컴포넌트
 * 리스트 아이템 컴포넌트
 */

import { ReactNode, CSSProperties } from 'react';
import { colors, spacing } from '../../../styles/foundation';
import {
  Typography5_Medium,
  Typography5_Regular,
  Typography6_Regular,
  Typography7_Regular,
} from '../../atoms/Typography';

export type ListRowBorder = 'none' | 'full' | 'indented';

export interface ListRowProps {
  contents: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  border?: ListRowBorder;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

const getBorderStyle = (border: ListRowBorder): CSSProperties => {
  switch (border) {
    case 'full':
      return {
        borderBottom: `1px solid ${colors.grey200}`,
      };
    case 'indented':
      return {
        borderBottom: `1px solid ${colors.grey200}`,
        marginLeft: spacing.xl,
      };
    case 'none':
    default:
      return {};
  }
};

export const ListRow = ({
  contents,
  left,
  right,
  border = 'indented',
  onClick,
  className,
  style,
}: ListRowProps) => {
  const rowStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    padding: `${spacing.md}px 0`,
    cursor: onClick ? 'pointer' : 'default',
    transition: 'background-color 0.2s ease',
    ...getBorderStyle(border),
    ...style,
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={className}
      style={rowStyle}
      onClick={handleClick}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.backgroundColor = colors.grey50;
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.backgroundColor = 'transparent';
        }
      }}
    >
      {left && (
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
          {left}
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>{contents}</div>
      {right && (
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
          {right}
        </div>
      )}
    </div>
  );
};

/**
 * ListRow.Texts 서브컴포넌트
 */
export type ListRowTextsType = '1RowTypeA' | '2RowTypeA' | '3RowTypeA';

export interface ListRowTextsProps {
  type: ListRowTextsType;
  top: ReactNode;
  bottom?: ReactNode;
  label?: ReactNode;
}

const ListRowTexts = ({ type, top, bottom, label }: ListRowTextsProps) => {
  switch (type) {
    case '1RowTypeA':
      return (
        <Typography5_Medium style={{ color: colors.grey900 }}>
          {top}
        </Typography5_Medium>
      );

    case '2RowTypeA':
      return (
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}
        >
          <Typography5_Medium style={{ color: colors.grey900 }}>
            {top}
          </Typography5_Medium>
          {bottom && (
            <Typography6_Regular style={{ color: colors.grey500 }}>
              {bottom}
            </Typography6_Regular>
          )}
        </div>
      );

    case '3RowTypeA':
      return (
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}
        >
          {label && (
            <Typography7_Regular style={{ color: colors.grey500 }}>
              {label}
            </Typography7_Regular>
          )}
          <Typography5_Medium style={{ color: colors.grey900 }}>
            {top}
          </Typography5_Medium>
          {bottom && (
            <Typography6_Regular style={{ color: colors.grey500 }}>
              {bottom}
            </Typography6_Regular>
          )}
        </div>
      );

    default:
      return null;
  }
};

// ListRow에 Texts 서브컴포넌트 추가
(ListRow as any).Texts = ListRowTexts;

export { ListRowTexts };
