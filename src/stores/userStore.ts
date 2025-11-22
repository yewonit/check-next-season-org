import { create } from 'zustand';
import type { UserInfo } from '../api/name';

interface UserState {
  selectedUser: UserInfo | null;
  setSelectedUser: (user: UserInfo) => void;
  clearSelectedUser: () => void;
}

export const useUserStore = create<UserState>(
  (set: (partial: Partial<UserState>) => void) => ({
    selectedUser: null,
    setSelectedUser: (user: UserInfo) => set({ selectedUser: user }),
    clearSelectedUser: () => set({ selectedUser: null }),
  })
);
