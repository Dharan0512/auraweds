"use client";

import { Fragment, useState } from "react";
import { Listbox, Combobox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";

interface Option {
  id: string | number;
  name: string;
}

interface PremiumSelectProps {
  options: Option[];
  value: string | number | null;
  onChange: (value: string | number) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  /** When true, renders a type-to-filter combobox instead of a plain dropdown. */
  searchable?: boolean;
}

export default function PremiumSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
  disabled = false,
  searchable = false,
}: PremiumSelectProps) {
  if (searchable) {
    return (
      <SearchableSelect
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        disabled={disabled}
      />
    );
  }

  const selectedOption = options.find((opt) => opt.id === value) || null;

  return (
    <div className={`w-full ${className}`}>
      <Listbox value={value} onChange={onChange} disabled={disabled}>
        <div className="relative mt-1">
          <Listbox.Button
            className={`relative w-full cursor-default rounded-2xl border bg-[var(--surface-2)] py-4 pl-4 pr-10 text-left transition-all sm:text-sm focus:outline-none ${
              disabled
                ? "border-[var(--border)] opacity-60 cursor-not-allowed"
                : selectedOption
                  ? "border-[var(--accent-color)] shadow-[0_0_10px_var(--accent-soft-bg)]"
                  : "border-[var(--border)] hover:border-[var(--accent-border)] focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-shadow)]"
            }`}
          >
            <span
              className={`block truncate ${!selectedOption ? "text-[var(--text-subtle)]" : "text-[var(--text)]"}`}
            >
              {selectedOption ? selectedOption.name : placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
              <ChevronUpDownIcon
                className="h-5 w-5 text-[var(--text-muted)]"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute isolate z-50 mt-2 max-h-60 w-full overflow-auto rounded-2xl bg-[var(--surface-solid)] border border-[var(--border)] py-2 text-base shadow-2xl backdrop-blur-2xl focus:outline-none sm:text-sm">
              {options.map((option) => (
                <Listbox.Option
                  key={option.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-3 pl-10 pr-4 transition-colors ${
                      active
                        ? "bg-[var(--accent-soft-bg)] text-[var(--text)]"
                        : "text-[var(--text-muted)]"
                    }`
                  }
                  value={option.id}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? "font-bold text-[var(--text)]" : "font-normal"}`}
                      >
                        {option.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 text-[var(--accent-color)]`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

/* ---------------- Searchable (type-to-filter) variant ---------------- */
function SearchableSelect({
  options,
  value,
  onChange,
  placeholder,
  className,
  disabled,
}: Required<
  Pick<
    PremiumSelectProps,
    "options" | "value" | "onChange" | "placeholder" | "className" | "disabled"
  >
>) {
  const [query, setQuery] = useState("");
  const selectedOption = options.find((opt) => opt.id === value) || null;

  const filtered =
    query.trim() === ""
      ? options
      : options.filter((opt) =>
          opt.name.toLowerCase().includes(query.trim().toLowerCase()),
        );

  return (
    <div className={`w-full ${className}`}>
      <Combobox value={value} onChange={onChange} disabled={disabled}>
        <div className="relative mt-1">
          <div
            className={`relative w-full cursor-default rounded-2xl border bg-[var(--surface-2)] transition-all ${
              disabled
                ? "border-[var(--border)] opacity-60 cursor-not-allowed"
                : selectedOption
                  ? "border-[var(--accent-color)] shadow-[0_0_10px_var(--accent-soft-bg)]"
                  : "border-[var(--border)] hover:border-[var(--accent-border)] focus-within:border-[var(--accent-color)] focus-within:ring-2 focus-within:ring-[var(--accent-shadow)]"
            }`}
          >
            <Combobox.Input
              className="w-full border-none bg-transparent rounded-2xl py-4 pl-4 pr-10 text-sm text-[var(--text)] placeholder:text-[var(--text-subtle)] focus:outline-none focus:ring-0"
              displayValue={() => selectedOption?.name ?? ""}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              autoComplete="off"
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-4">
              <ChevronUpDownIcon
                className="h-5 w-5 text-[var(--text-muted)]"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute isolate z-50 mt-2 max-h-60 w-full overflow-auto rounded-2xl bg-[var(--surface-solid)] border border-[var(--border)] py-2 text-base shadow-2xl backdrop-blur-2xl focus:outline-none sm:text-sm">
              {filtered.length === 0 ? (
                <div className="relative cursor-default select-none px-4 py-3 text-sm text-[var(--text-subtle)]">
                  <span className="flex items-center gap-2">
                    <MagnifyingGlassIcon className="h-4 w-4" />
                    No matches found
                  </span>
                </div>
              ) : (
                filtered.map((option) => (
                  <Combobox.Option
                    key={option.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-3 pl-10 pr-4 transition-colors ${
                        active
                          ? "bg-[var(--accent-soft-bg)] text-[var(--text)]"
                          : "text-[var(--text-muted)]"
                      }`
                    }
                    value={option.id}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? "font-bold text-[var(--text)]" : "font-normal"}`}
                        >
                          {option.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[var(--accent-color)]">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
