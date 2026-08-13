import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { CaretDown, Check } from "@phosphor-icons/react";

/** Select propio (sin cromo del navegador), mismo lenguaje visual que ProvinceCombobox. */
export default function SelectField({ id, options, value, onChange, placeholder }) {
  const selected = options.find((o) => o.value === value);

  return (
    <Listbox value={value} onChange={onChange}>
      {/* `id` en el botón: es un elemento etiquetable, así que un `<label for>`
          externo lo nombra igual que a un select nativo. */}
      <ListboxButton
        id={id}
        className="group flex h-11 w-full items-center justify-between gap-2 rounded-lg border border-navy-900/12 bg-white px-3.5 text-left text-sm outline-none transition-colors hover:border-navy-900/25 focus:border-navy-500 focus:ring-2 focus:ring-sky-400/30 data-[open]:border-navy-500 data-[open]:ring-2 data-[open]:ring-sky-400/30"
      >
        <span className={selected ? "text-navy-950" : "text-gray-400"}>
          {selected ? selected.label : placeholder}
        </span>
        <CaretDown className="h-3.5 w-3.5 shrink-0 text-gray-400 transition-transform duration-150 group-data-[open]:rotate-180" />
      </ListboxButton>

      <ListboxOptions
        anchor="bottom start"
        transition
        className="z-50 w-[var(--button-width)] rounded-lg border border-gray-200 bg-white py-1.5 shadow-[0_12px_28px_-6px_rgba(11,29,51,0.18)] outline-none transition-opacity [--anchor-gap:6px] data-[closed]:opacity-0 data-[leave]:duration-100 data-[leave]:ease-in"
      >
        {options.map((o) => (
          <ListboxOption
            key={o.value}
            value={o.value}
            className="group flex cursor-pointer items-center justify-between gap-2 px-3.5 py-2 text-sm text-navy-900 outline-none data-[focus]:bg-navy-50 data-[selected]:font-semibold"
          >
            {o.label}
            <Check className="hidden h-4 w-4 shrink-0 text-navy-700 group-data-[selected]:block" />
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}
