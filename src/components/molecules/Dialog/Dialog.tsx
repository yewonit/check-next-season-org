/**
 * Dialog 컴포넌트
 * 중앙 모달 다이얼로그 컴포넌트
 */

import { ReactNode, CSSProperties, useEffect } from 'react';
import { colors, spacing, shadows } from '../../../styles/foundation';
import { Typography3_Semibold, Typography5_Regular } from '../../atoms/Typography';
import { Button } from '../../atoms/Button';

export interface DialogButton {
  text: string;
  onClick: () => void;
}

export interface DialogProps {
  open: boolean;
  title: string;
  description: string;
  primaryButton: DialogButton;
  secondaryButton?: DialogButton;
  onClose?: () => void;
  className?: string;
}

export const Dialog = ({
  open,
  title,
  description,
  primaryButton,
  secondaryButton,
  onClose,
  className,
}: DialogProps) => {
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    animation: 'fadeIn 0.2s ease',
  };

  const dialogStyle: CSSProperties = {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: colors.background,
    borderRadius: '16px',
    padding: spacing.xxl,
    boxShadow: shadows.xlarge,
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.lg,
    animation: 'scaleIn 0.2s ease',
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && onClose) {
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
        style={dialogStyle}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <div>
          <Typography3_Semibold
            id="dialog-title"
            style={{ color: colors.grey900, marginBottom: spacing.sm }}
          >
            {title}
          </Typography3_Semibold>
          <Typography5_Regular
            id="dialog-description"
            style={{ color: colors.grey600 }}
          >
            {description}
          </Typography5_Regular>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: spacing.md,
          }}
        >
          {secondaryButton && (
            <Button
              color="dark"
              variant="weak"
              size="large"
              display="full"
              onClick={secondaryButton.onClick}
            >
              {secondaryButton.text}
            </Button>
          )}
          <Button
            color="primary"
            variant="fill"
            size="large"
            display="full"
            onClick={primaryButton.onClick}
          >
            {primaryButton.text}
          </Button>
        </div>
      </div>

      {/* CSS 애니메이션 */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
};

