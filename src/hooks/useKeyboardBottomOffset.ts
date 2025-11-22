import { useEffect, useState } from 'react';

export function useKeyboardBottomOffset() {
  const [bottomOffset, setBottomOffset] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initialHeight = window.innerHeight;

    const handleResize = () => {
      const diff = initialHeight - window.innerHeight;
      // 키보드가 올라오면 diff > 0 이 됨
      setBottomOffset(diff > 0 ? diff : 0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return bottomOffset;
}
