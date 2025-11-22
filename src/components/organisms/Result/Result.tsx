/**
 * Result 컴포넌트
 * 성공/에러 결과 화면 컴포넌트
 */

import { ReactNode, CSSProperties } from 'react';
import { colors, spacing } from '../../../styles/foundation';
import {
  Typography2_Semibold,
  Typography5_Regular,
} from '../../atoms/Typography';
import { Icon } from '../../atoms/Icon';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export type ResultType = 'success' | 'error' | 'empty';

export interface ResultProps {
  type: ResultType;
  title: string;
  description: string;
  button?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const getResultStyles = (type: ResultType) => {
  const baseStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxxl,
    textAlign: 'center',
    minHeight: '400px',
  };

  switch (type) {
    case 'success':
      return {
        ...baseStyle,
        color: colors.green600,
      };
    case 'error':
      return {
        ...baseStyle,
        color: colors.red600,
      };
    case 'empty':
      return {
        ...baseStyle,
        color: colors.grey600,
      };
    default:
      return baseStyle;
  }
};

const getIcon = (type: ResultType) => {
  switch (type) {
    case 'success':
      return CheckCircle;
    case 'error':
      return XCircle;
    case 'empty':
      return AlertCircle;
    default:
      return AlertCircle;
  }
};

const getIconColor = (type: ResultType): string => {
  switch (type) {
    case 'success':
      return colors.green500;
    case 'error':
      return colors.red500;
    case 'empty':
      return colors.grey400;
    default:
      return colors.grey400;
  }
};

export const Result = ({
  type,
  title,
  description,
  button,
  className,
  style,
}: ResultProps) => {
  const containerStyle = {
    ...getResultStyles(type),
    ...style,
  };

  const IconComponent = getIcon(type);
  const iconColor = getIconColor(type);

  return (
    <div className={className} style={containerStyle}>
      <Icon icon={IconComponent} size={64} color={iconColor} />
      <Typography2_Semibold
        style={{
          color: colors.grey900,
          marginTop: spacing.lg,
          marginBottom: spacing.md,
        }}
      >
        {title}
      </Typography2_Semibold>
      <Typography5_Regular
        style={{
          color: colors.grey600,
          marginBottom: spacing.xl,
        }}
      >
        {description}
      </Typography5_Regular>
      {button && <div>{button}</div>}
    </div>
  );
};
