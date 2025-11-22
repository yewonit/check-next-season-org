/**
 * ToastProvider 컴포넌트
 * Toast를 관리하는 Context Provider
 */

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import { Toast } from './Toast';
import type { ToastType } from './Toast';
import type { CSSProperties } from 'react';
import { spacing } from '../../../styles/foundation';

interface ToastItem {
  id: string;
  type: ToastType;
  message: ReactNode;
  duration?: number;
}

interface ToastContextType {
  showToast: (type: ToastType, message: ReactNode, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback(
    (type: ToastType, message: ReactNode, duration = 3000) => {
      const id = Math.random().toString(36).substring(7);
      const newToast: ToastItem = { id, type, message, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, duration);
      }
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const containerStyle: CSSProperties = {
    position: 'fixed',
    top: spacing.xl,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 10000,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
    pointerEvents: 'none',
  };

  const toastWrapperStyle: CSSProperties = {
    pointerEvents: 'auto',
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={containerStyle}>
        {toasts.map((toast) => (
          <div key={toast.id} style={toastWrapperStyle}>
            <Toast type={toast.type} onClose={() => removeToast(toast.id)}>
              {toast.message}
            </Toast>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
