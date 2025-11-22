/**
 * Accordion 컴포넌트
 * 접었다 펼칠 수 있는 아코디언 컴포넌트
 */

import { ReactNode, useState, CSSProperties } from 'react';
import { colors, spacing } from '../../../styles/foundation';
import { Typography5_Medium, Typography5_Regular } from '../../atoms/Typography';
import { Icon } from '../../atoms/Icon';
import { ChevronDown } from 'lucide-react';

export interface AccordionItemProps {
  header: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}

export const AccordionItem = ({
  header,
  children,
  defaultOpen = false,
}: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const itemStyle: CSSProperties = {
    borderBottom: `1px solid ${colors.grey200}`,
  };

  const headerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${spacing.md}px 0`,
    cursor: 'pointer',
    userSelect: 'none',
  };

  const contentStyle: CSSProperties = {
    maxHeight: isOpen ? '1000px' : '0',
    overflow: 'hidden',
    transition: 'max-height 0.3s ease',
    paddingBottom: isOpen ? spacing.md : 0,
  };

  const iconStyle: CSSProperties = {
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.3s ease',
    color: colors.grey500,
  };

  return (
    <div style={itemStyle}>
      <div
        style={headerStyle}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <div style={{ flex: 1 }}>{header}</div>
        <Icon icon={ChevronDown} size="md" style={iconStyle} />
      </div>
      <div style={contentStyle}>{children}</div>
    </div>
  );
};

export interface AccordionProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const Accordion = ({ children, className, style }: AccordionProps) => {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

// Accordion에 Item 서브컴포넌트 추가
(Accordion as any).Item = AccordionItem;

