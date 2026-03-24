"use client";

import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

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
}

export default function PremiumSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
  disabled = false,
}: PremiumSelectProps) {
  const selectedOption = options.find((opt) => opt.id === value) || null;

  return (
    <div className={`w-full ${className}`}>
      <Listbox value={value} onChange={onChange} disabled={disabled}>
        <div className="relative mt-1">
          <Listbox.Button
            className={`relative w-full cursor-default rounded-2xl border bg-slate-900/50 py-4 pl-4 pr-10 text-left transition-all sm:text-sm focus:outline-none ${
              disabled
                ? "border-white/5 opacity-60 cursor-not-allowed"
                : selectedOption
                  ? "border-[var(--accent-color)] shadow-[0_0_10px_var(--accent-soft-bg)]"
                  : "border-white/10 hover:border-[var(--accent-border)]/50 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-shadow)]"
            }`}
          >
            <span
              className={`block truncate ${!selectedOption ? "text-slate-500" : "text-white"}`}
            >
              {selectedOption ? selectedOption.name : placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
              <ChevronUpDownIcon
                className="h-5 w-5 text-slate-400"
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
            <Listbox.Options className="absolute isolate z-50 mt-2 max-h-60 w-full overflow-auto rounded-2xl bg-slate-900/95 border border-white/10 py-2 text-base shadow-2xl backdrop-blur-2xl focus:outline-none sm:text-sm">
              {options.map((option) => (
                <Listbox.Option
                  key={option.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-3 pl-10 pr-4 transition-colors ${
                      active
                        ? "bg-[var(--accent-soft-bg)] text-white"
                        : "text-slate-300"
                    }`
                  }
                  value={option.id}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? "font-bold text-white" : "font-normal"}`}
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
