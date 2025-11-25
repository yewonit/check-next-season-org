import { createContext } from 'react';
import type { ReactNode } from 'react';
import type { ToastType } from './Toast';

interface ToastContextType {
  showToast: (type: ToastType, message: ReactNode, duration?: number) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);
