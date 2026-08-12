import { useState } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CaretDown, Check, MagnifyingGlass, X } from "@phosphor-icons/react";

/** Select buscable: cerrado se ve como un select normal; al hacer clic se despliega el buscador. */
export default function ProvinceCombobox({ provinces, value, onChange, placeholder = "Todas las provincias" }) {
  const [query, setQuery] = useState("");

  const filtered =
    query === ""
      ? provinces
      : provinces.filter((p) => p.toLocaleLowerCase("es-DO").includes(query.toLocaleLowerCase("es-DO")));

  return (
    <Combobox
      value={value || null}
      onChange={(next) => {
        onChange(next || "");
        setQuery("");
      }}
    >
      {({ open }) => (
        <div className="relative">
          {open ? (
            <>
              <MagnifyingGlass
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              />
              <ComboboxInput
                autoFocus
                className="w-full rounded-lg border border-navy-400 bg-white py-2 pl-9 pr-8 text-sm text-navy-950 outline-none ring-2 ring-navy-400/20 placeholder:text-gray-400"
                displayValue={(p) => p ?? ""}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar provincia..."
                autoComplete="off"
              />
            </>
          ) : (
            <>
              <ComboboxButton className="flex w-full items-center rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-8 text-left text-sm outline-none transition-colors hover:border-gray-300 focus:border-navy-400 focus:ring-2 focus:ring-navy-400/20">
                <span className={`truncate ${value ? "text-navy-950" : "text-gray-400"}`}>
                  {value || placeholder}
                </span>
              </ComboboxButton>
              {value ? (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onChange("");
                  }}
                  aria-label="Quitar filtro de provincia"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-sm text-gray-400 outline-none transition-colors hover:text-navy-700 focus-visible:ring-2 focus-visible:ring-navy-400"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : (
                <CaretDown
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400"
                />
              )}
            </>
          )}

          <ComboboxOptions
            anchor="bottom start"
            transition
            className="z-50 max-h-64 w-[var(--input-width)] overflow-y-auto rounded-lg border border-gray-200 bg-white py-1.5 shadow-[0_12px_28px_-6px_rgba(11,29,51,0.18)] outline-none transition-opacity [--anchor-gap:6px] empty:invisible data-[closed]:opacity-0 data-[leave]:duration-100 data-[leave]:ease-in"
          >
            {filtered.length === 0 ? (
              <p className="px-3.5 py-2.5 text-sm text-gray-400">Sin resultados</p>
            ) : (
              filtered.map((p) => (
                <ComboboxOption
                  key={p}
                  value={p}
                  className="group flex cursor-pointer items-center justify-between gap-2 px-3.5 py-2 text-sm text-navy-900 outline-none data-[focus]:bg-navy-50 data-[selected]:font-semibold"
                >
                  {p}
                  <Check className="hidden h-4 w-4 shrink-0 text-navy-700 group-data-[selected]:block" />
                </ComboboxOption>
              ))
            )}
          </ComboboxOptions>
        </div>
      )}
    </Combobox>
  );
}
