import { useKeyboardBottomOffset } from "./useKeyboardBottomOffset";

export default function BottomOffsetContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const bottomOffset = useKeyboardBottomOffset();
  return (
    <div style={{ paddingBottom: bottomOffset, width: "100%" }}>{children}</div>
  );
}
