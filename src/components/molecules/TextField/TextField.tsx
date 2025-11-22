/**
 * TextField 컴포넌트
 * 입력 필드 컴포넌트
 */

import type { InputHTMLAttributes, CSSProperties, ReactNode } from 'react';
import { colors, spacing } from '../../../styles/foundation';
import { Typography7_Regular } from '../../atoms/Typography';

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  helperText?: string;
  suffix?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const TextField = ({
  value,
  onChange,
  error,
  helperText,
  suffix,
  leftIcon,
  rightIcon,
  className,
  style,
  disabled,
  ...props
}: TextFieldProps) => {
  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
    ...style,
  };

  const inputWrapperStyle: CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  };

  const inputStyle: CSSProperties = {
    width: '100%',
    height: '52px',
    padding: `0 ${rightIcon || suffix ? '48px' : spacing.xl}px 0 ${
      leftIcon ? '48px' : spacing.xl
    }px`,
    border: `1px solid ${error ? colors.red500 : colors.grey300}`,
    borderRadius: '12px',
    backgroundColor: disabled ? colors.grey100 : colors.background,
    color: colors.grey900,
    fontSize: '17px',
    lineHeight: '25.5px',
    transition: 'all 0.2s ease',
    ...(disabled && {
      cursor: 'not-allowed',
      opacity: 0.5,
    }),
  };

  const leftIconStyle: CSSProperties = {
    position: 'absolute',
    left: spacing.md,
    display: 'flex',
    alignItems: 'center',
    color: colors.grey500,
  };

  const rightIconStyle: CSSProperties = {
    position: 'absolute',
    right: spacing.md,
    display: 'flex',
    alignItems: 'center',
    color: colors.grey500,
  };

  const suffixStyle: CSSProperties = {
    position: 'absolute',
    right: spacing.md,
    color: colors.grey600,
    fontSize: '17px',
    lineHeight: '25.5px',
  };

  return (
    <div className={className} style={containerStyle}>
      <div style={inputWrapperStyle}>
        {leftIcon && <div style={leftIconStyle}>{leftIcon}</div>}
        <input
          {...props}
          type={props.type || 'text'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.borderColor = error
              ? colors.red500
              : colors.primary500;
            e.target.style.boxShadow = `0 0 0 3px ${
              error ? colors.red50 : colors.primary50
            }`;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error ? colors.red500 : colors.grey300;
            e.target.style.boxShadow = 'none';
          }}
        />
        {rightIcon && <div style={rightIconStyle}>{rightIcon}</div>}
        {suffix && !rightIcon && <div style={suffixStyle}>{suffix}</div>}
      </div>
      {(error || helperText) && (
        <Typography7_Regular
          style={{ color: error ? colors.red500 : colors.grey500 }}
        >
          {error || helperText}
        </Typography7_Regular>
      )}
    </div>
  );
};
