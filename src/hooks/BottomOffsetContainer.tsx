import { useKeyboardBottomOffset } from "./useKeyboardBottomOffset";

export function BottomOffsetContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const bottomOffset = useKeyboardBottomOffset();
  return <div style={{ paddingBottom: bottomOffset }}>{children}</div>;
}
