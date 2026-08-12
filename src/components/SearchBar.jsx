import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PROVINCES } from "../data/provinces";
import { TYPES } from "../data/properties";

export default function SearchBar({ className = "" }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [tipo, setTipo] = useState("");
  const [provincia, setProvincia] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (tipo) params.set("tipo", tipo);
    if (provincia) params.set("provincia", provincia);
    navigate(`/inmuebles${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white rounded-2xl shadow-xl p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_auto] gap-3 ${className}`}
    >
      <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-navy-400">
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          type="text"
          placeholder="Parcela, dirección, ciudad..."
          className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-400"
        />
      </div>

      <select
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
        className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-navy-400"
      >
        <option value="">Tipo de inmueble</option>
        {TYPES.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <select
        value={provincia}
        onChange={(e) => setProvincia(e.target.value)}
        className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-navy-400"
      >
        <option value="">Provincia</option>
        {PROVINCES.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy-800 shadow-[0_1px_3px_rgba(0,23,51,0.12)] hover:-translate-y-0.5 hover:bg-navy-900 hover:shadow-[0_10px_24px_-6px_rgba(0,23,51,0.4)] active:translate-y-0 active:shadow-[0_2px_6px_rgba(0,23,51,0.2)] text-white font-semibold text-sm px-6 py-2.5 transition-[transform,box-shadow,background-color] duration-200"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        Buscar
      </button>
    </form>
  );
}
