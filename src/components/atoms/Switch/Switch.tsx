/**
 * Switch 컴포넌트
 * 토스 디자인 시스템 기반의 토글 스위치 컴포넌트
 */

import { CSSProperties } from 'react';
import { colors, spacing } from '../../../styles/foundation';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  'aria-label': string;
  className?: string;
}

export const Switch = ({
  checked,
  onChange,
  disabled = false,
  'aria-label': ariaLabel,
  className,
}: SwitchProps) => {
  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const trackStyle: CSSProperties = {
    position: 'relative',
    width: '44px',
    height: '24px',
    borderRadius: '12px',
    backgroundColor: checked ? colors.primary500 : colors.grey300,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background-color 0.2s ease',
    opacity: disabled ? 0.5 : 1,
  };

  const thumbStyle: CSSProperties = {
    position: 'absolute',
    top: '2px',
    left: checked ? '22px' : '2px',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    transition: 'left 0.2s ease',
  };

  return (
    <div
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      className={className}
      style={trackStyle}
      onClick={handleClick}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
          e.preventDefault();
          onChange(!checked);
        }
      }}
      tabIndex={disabled ? -1 : 0}
    >
      <div style={thumbStyle} />
    </div>
  );
};
