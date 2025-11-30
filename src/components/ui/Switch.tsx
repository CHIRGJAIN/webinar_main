"use client";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const Switch = ({ checked, onChange, label }: SwitchProps) => (
  <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-(--text-secondary)">
    <div
      role="switch"
      aria-checked={checked}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onChange(!checked);
        }
      }}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full border border-(--border-subtle) transition ${
        checked ? "bg-secondary shadow-[0_0_25px_rgba(30,111,168,0.4)]" : "bg-surface-alt"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${checked ? "translate-x-5" : "translate-x-1"}`}
      />
    </div>
    {label}
  </label>
);
