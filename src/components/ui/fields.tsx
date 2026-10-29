import type { ReactNode } from "react";
import { IconSearch } from "@/components/ui/icons";

/** Labelled form fields. Every input has a visible label, so screen readers can announce it. */

const INPUT_BASE =
  "h-11 w-full rounded-card border bg-white px-3 text-base text-ink placeholder:text-muted/70 hover:border-brand/50";

interface ShellProps {
  id: string;
  label: string;
  error?: string | null;
  className?: string;
  children: ReactNode;
}

function FieldShell({ id, label, error, className = "", children }: ShellProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1 block text-base font-medium text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-base font-medium text-brand">
          {error}
        </p>
      )}
    </div>
  );
}

interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "date";
  min?: string;
  max?: string;
  error?: string | null;
  withSearchIcon?: boolean;
  className?: string;
}

export function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  min,
  max,
  error,
  withSearchIcon = false,
  className,
}: TextFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error} className={className}>
      <div className="relative">
        {withSearchIcon && (
          <IconSearch
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
        )}
        <input
          id={id}
          type={type}
          value={value}
          min={min}
          max={max}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${INPUT_BASE} ${withSearchIcon ? "pl-10" : ""} ${error ? "border-2 border-brand" : "border-line"}`}
        />
      </div>
    </FieldShell>
  );
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  hideLabel?: boolean;
  className?: string;
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
  hideLabel = false,
  className = "",
}: SelectFieldProps) {
  const select = (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${INPUT_BASE} border-line`}
    >
      {placeholder !== undefined && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );

  if (hideLabel) {
    return (
      <div className={className}>
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
        {select}
      </div>
    );
  }
  return (
    <FieldShell id={id} label={label} className={className}>
      {select}
    </FieldShell>
  );
}
