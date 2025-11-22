/**
 * BottomSheet 컴포넌트
 * 하단에서 올라오는 모달 컴포넌트
 */

import { ReactNode, CSSProperties, useEffect } from 'react';
import { colors, spacing, shadows } from '../../../styles/foundation';
import {
  Typography3_Semibold,
  Typography5_Regular,
} from '../../atoms/Typography';
import { Icon } from '../../atoms/Icon';
import { X } from 'lucide-react';

export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  header?: ReactNode;
  headerDescription?: ReactNode;
  cta?: ReactNode;
  hasTextField?: boolean;
  expandBottomSheet?: boolean;
  maxHeight?: number;
  expandedMaxHeight?: number;
  children?: ReactNode;
  className?: string;
  'aria-labelled-by'?: string;
  'aria-described-by'?: string;
}

export const BottomSheet = ({
  open,
  onClose,
  header,
  headerDescription,
  cta,
  hasTextField = false,
  expandBottomSheet = false,
  maxHeight = 400,
  expandedMaxHeight,
  children,
  className,
  'aria-labelled-by': ariaLabelledBy,
  'aria-described-by': ariaDescribedBy,
}: BottomSheetProps) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const overlayStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9998,
    animation: 'fadeIn 0.2s ease',
  };

  const sheetStyle: CSSProperties = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: `${maxHeight}px`,
    backgroundColor: colors.background,
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    boxShadow: shadows.large,
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    animation: 'slideUp 0.3s ease',
    ...(hasTextField && {
      paddingBottom: 'env(safe-area-inset-bottom)',
    }),
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div
        style={overlayStyle}
        onClick={handleOverlayClick}
        aria-hidden="true"
      />
      <div
        className={className}
        style={sheetStyle}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
      >
        {/* 드래그 핸들 */}
        <div
          style={{
            width: '40px',
            height: '4px',
            backgroundColor: colors.grey300,
            borderRadius: '2px',
            margin: `${spacing.md}px auto`,
            cursor: 'grab',
          }}
        />

        {/* 헤더 */}
        {header && (
          <div style={{ padding: `0 ${spacing.xl}px ${spacing.md}px` }}>
            {header}
          </div>
        )}

        {/* 헤더 설명 */}
        {headerDescription && (
          <div style={{ padding: `0 ${spacing.xl}px ${spacing.md}px` }}>
            {headerDescription}
          </div>
        )}

        {/* 콘텐츠 */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: `0 ${spacing.xl}px`,
            paddingBottom: spacing.md,
          }}
        >
          {children}
        </div>

        {/* CTA */}
        {cta && (
          <div
            style={{
              padding: `${spacing.md}px ${spacing.xl}px`,
              paddingBottom: `calc(${spacing.xl}px + env(safe-area-inset-bottom))`,
              borderTop: `1px solid ${colors.grey200}`,
            }}
          >
            {cta}
          </div>
        )}
      </div>

      {/* CSS 애니메이션 */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

/**
 * BottomSheet.Header 서브컴포넌트
 */
const BottomSheetHeader = ({ children }: { children: ReactNode }) => (
  <Typography3_Semibold style={{ color: colors.grey900 }}>
    {children}
  </Typography3_Semibold>
);

/**
 * BottomSheet.HeaderDescription 서브컴포넌트
 */
const BottomSheetHeaderDescription = ({
  children,
}: {
  children: ReactNode;
}) => (
  <Typography5_Regular style={{ color: colors.grey600, marginTop: spacing.sm }}>
    {children}
  </Typography5_Regular>
);

/**
 * BottomSheet.CTA 서브컴포넌트
 */
const BottomSheetCTA = ({ children }: { children: ReactNode }) => (
  <div>{children}</div>
);

/**
 * BottomSheet.DoubleCTA 서브컴포넌트
 */
const BottomSheetDoubleCTA = ({
  leftButton,
  rightButton,
}: {
  leftButton: ReactNode;
  rightButton: ReactNode;
}) => (
  <div style={{ display: 'flex', gap: spacing.md }}>
    {leftButton}
    {rightButton}
  </div>
);

/**
 * BottomSheet.Select 서브컴포넌트
 */
interface BottomSheetSelectOption {
  name: string;
  value: string;
}

interface BottomSheetSelectProps {
  value?: string;
  onChange: (value: string) => void;
  options: BottomSheetSelectOption[];
}

const BottomSheetSelect = ({
  value,
  onChange,
  options,
}: BottomSheetSelectProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          style={{
            width: '100%',
            padding: spacing.md,
            textAlign: 'left',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            borderRadius: '8px',
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.grey50;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <Typography5_Regular
            style={{
              color:
                value === option.value ? colors.primary500 : colors.grey900,
            }}
          >
            {option.name}
          </Typography5_Regular>
        </button>
      ))}
    </div>
  );
};

// 서브컴포넌트 추가
(BottomSheet as any).Header = BottomSheetHeader;
(BottomSheet as any).HeaderDescription = BottomSheetHeaderDescription;
(BottomSheet as any).CTA = BottomSheetCTA;
(BottomSheet as any).DoubleCTA = BottomSheetDoubleCTA;
(BottomSheet as any).Select = BottomSheetSelect;

export {
  BottomSheetHeader,
  BottomSheetHeaderDescription,
  BottomSheetCTA,
  BottomSheetDoubleCTA,
  BottomSheetSelect,
};
