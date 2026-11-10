import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { UserInfo } from '../api/name';

interface UserState {
  selectedUser: UserInfo | null;
  setSelectedUser: (user: UserInfo) => void;
  clearSelectedUser: () => void;
}

/**
 * 조회한 결과를 세션 동안 보관한다.
 * 리빌이나 결과 화면에서 새로고침해도 처음으로 튕겨 나가지 않도록 sessionStorage에 둔다.
 */
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      selectedUser: null,
      setSelectedUser: (user: UserInfo) => set({ selectedUser: user }),
      clearSelectedUser: () => set({ selectedUser: null }),
    }),
    {
      name: 'kb-2027-selected-user',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ selectedUser: state.selectedUser }),
    }
  )
);
