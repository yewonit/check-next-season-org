/**
 * Checkbox 컴포넌트
 * 토스 디자인 시스템 기반의 원형 체크박스 컴포넌트
 */

import { type CSSProperties } from 'react';
import { colors } from '../../../styles/foundation';
import { Icon } from '../Icon';
import { Check } from 'lucide-react';

export interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  'aria-label': string;
  className?: string;
}

export const Checkbox = {
  /**
   * 원형 체크박스 (토스 스타일)
   */
  Circle: ({
    checked,
    onCheckedChange,
    disabled = false,
    'aria-label': ariaLabel,
    className,
  }: CheckboxProps) => {
    const handleClick = () => {
      if (!disabled) {
        onCheckedChange(!checked);
      }
    };

    const containerStyle: CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '24px',
      height: '24px',
      minWidth: '24px',
      minHeight: '24px',
      borderRadius: '50%',
      border: `2px solid ${checked ? colors.primary500 : colors.grey300}`,
      backgroundColor: checked ? colors.primary500 : 'transparent',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      opacity: disabled ? 0.5 : 1,
    };

    return (
      <div
        role="checkbox"
        aria-checked={checked}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        className={className}
        style={containerStyle}
        onClick={handleClick}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
            e.preventDefault();
            onCheckedChange(!checked);
          }
        }}
        tabIndex={disabled ? -1 : 0}
      >
        {/* 접근성 정보 aria-hidden이 여기서 true인 이유는, Checkbox에서 Icon은 장식요소일 뿐이기 때문이다. 이미 상위 div에 aria-label이 있기 때문에,
        시각적 장식요소인 Icon은 숨겨야 한다. */}
        {checked && <Icon icon={Check} size={16} color="white" aria-hidden />}
      </div>
    );
  },
};
