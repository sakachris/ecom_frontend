// src/components/ui/Button.tsx
export default function MyButton({
  children,
  onClick,
  className = "",
}: React.PropsWithChildren<{ onClick?: () => void; className?: string }>) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm transition focus:outline-none focus:ring ${className}`}
    >
      {children}
    </button>
  );
}
