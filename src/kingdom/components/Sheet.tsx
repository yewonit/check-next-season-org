import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  labelledBy: string;
}

/**
 * 하단에서 올라오는 바텀시트. 네이티브 <dialog>로 포커스 가두기와 Esc 닫기를 맡긴다.
 */
export function Sheet({
  open,
  onClose,
  title,
  description,
  children,
  labelledBy,
}: SheetProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="kb-sheet"
      aria-labelledby={labelledBy}
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        // 바깥(백드롭) 클릭 시 닫기
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="kb-sheet__body">
        <span className="kb-sheet__handle" aria-hidden="true" />
        <header className="kb-sheet__head">
          <h2 id={labelledBy} className="kb-sheet__title">
            {title}
          </h2>
          {description ? <p className="kb-sheet__desc">{description}</p> : null}
          <button
            type="button"
            className="kb-sheet__close"
            onClick={onClose}
            aria-label="닫기"
          >
            <X size={22} strokeWidth={2.25} aria-hidden="true" />
          </button>
        </header>
        <div className="kb-sheet__list">{children}</div>
      </div>
    </dialog>
  );
}
