import { Eye, EyeOff } from "lucide-react";

export function FormField({ icon: Icon, type, placeholder, value, onChange, toggle, disabled }) {
  return (
    <div className="group relative">
      <Icon className="pointer-events-none absolute right-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-zinc-400 transition-colors group-focus-within:text-indigo-500" />
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-13 w-full rounded-2xl border-none bg-zinc-100 py-2 pr-12 pl-12 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:ring-2 focus:ring-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500 dark:focus:ring-indigo-500/40"
      />
      {toggle && (
        <button
          type="button"
          onClick={toggle.onToggle}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
        >
          {toggle.value ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
        </button>
      )}
    </div>
  );
}