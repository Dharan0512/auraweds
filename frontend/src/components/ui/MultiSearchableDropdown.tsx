"use client";

import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";

interface Option {
  id: string | number;
  name?: string;
  [key: string]: any;
}

interface MultiSearchableDropdownProps {
  options: Option[];
  value: string[]; // Array of IDs
  onChange: (value: string[]) => void;
  placeholder?: string;
  displayKey?: string;
  className?: string;
  disabled?: boolean;
}

export default function MultiSearchableDropdown({
  options,
  value = [],
  onChange,
  placeholder = "Select options",
  displayKey = "name",
  className = "",
  disabled = false,
}: MultiSearchableDropdownProps) {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) => {
          const displayValue = option[displayKey];
          return (
            displayValue &&
            displayValue
              .toString()
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, ""))
          );
        });

  const selectedOptions = options.filter((opt) =>
    value.includes(opt.id.toString()),
  );

  const toggleOption = (optionId: string) => {
    if (value.includes(optionId)) {
      onChange(value.filter((id) => id !== optionId));
    } else {
      onChange([...value, optionId]);
    }
  };

  const removeOption = (optionId: string) => {
    onChange(value.filter((id) => id !== optionId));
  };

  return (
    <div className={`w-full ${className}`}>
      <Combobox value={value} onChange={onChange} disabled={disabled} multiple>
        {({ open }) => (
          <div className="relative mt-1">
          <div
            className={`searchable-dropdown-container relative w-full cursor-default overflow-hidden rounded-2xl text-left flex flex-wrap items-center border transition-all sm:text-sm p-1 min-h-[56px] ${
              disabled
                ? "border-white/5 bg-slate-900/50 opacity-60"
                : value.length > 0
                  ? "border-[var(--accent-color)] shadow-[0_0_10px_var(--accent-soft-bg)]"
                  : "bg-slate-900/50 border-white/10 hover:border-[var(--accent-border)]/50 focus-within:border-[var(--accent-color)] focus-within:ring-1 focus-within:ring-[var(--accent-shadow)]"
            }`}
          >
            <div className="flex flex-wrap gap-2 p-1">
              {selectedOptions.map((opt) => (
                <span
                  key={opt.id}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--accent-soft-bg)] text-white rounded-full text-xs font-semibold border border-[var(--accent-border)]/30"
                >
                  {opt[displayKey]}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeOption(opt.id.toString());
                    }}
                    className="hover:text-white transition-colors"
                  >
                    <XMarkIcon className="h-3 w-3" />
                  </button>
                </span>
              ))}
              <Combobox.Input
                className={`flex-1 border-none py-2 pl-2 pr-10 text-sm leading-5 focus:ring-0 outline-none ${
                  disabled
                    ? "text-slate-500 bg-transparent cursor-not-allowed"
                    : "text-white bg-transparent"
                }`}
                placeholder={value.length === 0 ? placeholder : ""}
                onChange={(event) => setQuery(event.target.value)}
                onClick={(e) => {
                  if (!disabled && !open) {
                    const button = e.currentTarget
                      .closest('.searchable-dropdown-container')
                      ?.querySelector('.dropdown-trigger-btn') as HTMLButtonElement | null;
                    if (button) button.click();
                  }
                }}
              />
            </div>
            <Combobox.Button className="dropdown-trigger-btn absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer  justify-end">
              <ChevronUpDownIcon
                className="h-5 w-5 text-slate-400"
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
            <Combobox.Options className="absolute isolate z-50 mt-2 max-h-60 w-full overflow-auto rounded-2xl bg-slate-900/90 border border-white/10 py-2 text-base shadow-2xl backdrop-blur-xl focus:outline-none sm:text-sm">
              {filteredOptions.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-slate-400">
                  Nothing found.
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <Combobox.Option
                    key={option.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-3 pl-10 pr-4 transition-colors ${
                        active
                          ? "bg-[var(--accent-soft-bg)] text-white"
                          : "text-slate-300"
                      }`
                    }
                    value={option.id.toString()}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-bold text-white" : "font-normal"
                          }`}
                        >
                          {option[displayKey]}
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
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
        )}
      </Combobox>
    </div>
  );
}
