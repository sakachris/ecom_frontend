// src/components/ui/Input.tsx
export default function MyInput({
  placeholder = "",
  value,
  onChange,
}: {
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring"
    />
  );
}
