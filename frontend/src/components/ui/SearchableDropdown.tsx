"use client";

import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface Option {
  id: string | number;
  name?: string;
  [key: string]: any;
}

interface SearchableDropdownProps {
  options: Option[];
  value: Option | null;
  onChange: (value: Option | null) => void;
  placeholder?: string;
  displayKey?: string;
  className?: string;
  disabled?: boolean;
}

export default function SearchableDropdown({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  displayKey = "name",
  className = "",
  disabled = false,
}: SearchableDropdownProps) {
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

  return (
    <div className={`w-full ${className}`}>
      <Combobox value={value} onChange={onChange} disabled={disabled}>
        {({ open }) => (
          <div className="relative mt-1">
          <div
            className={`searchable-dropdown-container relative w-full cursor-default overflow-hidden rounded-2xl text-left flex items-center border transition-all sm:text-sm ${
              disabled
                ? "border-white/5 bg-slate-900/50 opacity-60"
                : value
                  ? "border-[var(--accent-color)] shadow-[0_0_10px_var(--accent-soft-bg)]"
                  : "bg-slate-900/50 border-white/10 hover:border-[var(--accent-border)]/50 focus-within:border-[var(--accent-color)] focus-within:ring-1 focus-within:ring-[var(--accent-shadow)]"
            }`}
          >
            <Combobox.Input
              className={`w-full border-none py-4 pl-4 pr-10 text-sm leading-5 focus:ring-0 outline-none ${
                disabled
                  ? "text-slate-500 bg-transparent cursor-not-allowed"
                  : "text-white bg-transparent"
              }`}
              displayValue={(option: any) => (option ? option[displayKey] : "")}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={placeholder}
              onClick={(e) => {
                if (!disabled && !open) {
                  const button = e.currentTarget
                    .closest('.searchable-dropdown-container')
                    ?.querySelector('.dropdown-trigger-btn') as HTMLButtonElement | null;
                  if (button) button.click();
                }
              }}
            />
            <Combobox.Button className="dropdown-trigger-btn absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer">
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
                    value={option}
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
