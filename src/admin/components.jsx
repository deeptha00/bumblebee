import React, { useRef, useState } from "react";
import { Plus, Trash2, ImageUp, Loader2, GripVertical } from "lucide-react";
import { uploadImage } from "./adminApi";

export function Field({ label, hint, children }) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-bold text-slate-800 mb-1 tracking-tight">{label}</label>
      {hint && <p className="text-xs text-slate-400 mb-1.5">{hint}</p>}
      {children}
    </div>
  );
}

export function TextInput({ value, onChange, className = "", ...rest }) {
  return (
    <input
      type="text"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 focus:outline-none focus:ring-4 focus:ring-yellow-400/20 focus:border-yellow-400 focus:bg-white text-sm text-slate-800 transition-all placeholder:text-slate-400 ${className}`}
      {...rest}
    />
  );
}

export function TextArea({ value, onChange, rows = 4, className = "", ...rest }) {
  return (
    <textarea
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className={`w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 focus:outline-none focus:ring-4 focus:ring-yellow-400/20 focus:border-yellow-400 focus:bg-white text-sm text-slate-800 transition-all leading-relaxed placeholder:text-slate-400 ${className}`}
      {...rest}
    />
  );
}

export function Card({ title, children, onRemove }) {
  return (
    <div className="group relative mb-4 rounded-2xl border border-slate-200 bg-white pl-5 pr-4 py-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_24px_-12px_rgba(15,23,42,0.12)] hover:border-slate-300 transition-all">
      <span className="absolute left-0 top-4 bottom-4 w-1 rounded-full bg-gradient-to-b from-yellow-400 to-amber-500 opacity-70 group-hover:opacity-100 transition-opacity" />
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          title="Remove"
          className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full flex items-center justify-center text-slate-300 hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          <Trash2 size={15} />
        </button>
      )}
      <div className="flex items-center gap-2 pr-8 mb-3">
        <GripVertical size={14} className="text-slate-300 shrink-0" />
        {title && <div className="font-bold text-slate-800 truncate">{title}</div>}
      </div>
      {children}
    </div>
  );
}

export function AddButton({ onClick, label = "Add item" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 pl-2 pr-4 py-2 rounded-full border-2 border-dashed border-slate-200 text-slate-500 text-sm font-bold hover:border-yellow-400 hover:text-slate-900 hover:bg-yellow-50/60 transition-colors"
    >
      <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center">
        <Plus size={12} strokeWidth={3} />
      </span>
      {label}
    </button>
  );
}

export function SimpleListEditor({ items, onChange, placeholder = "Enter text" }) {
  function update(i, val) {
    const next = [...items];
    next[i] = val;
    onChange(next);
  }
  function remove(i) {
    onChange(items.filter((_, idx) => idx !== i));
  }
  function add() {
    onChange([...items, ""]);
  }
  return (
    <div>
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 mb-2 items-center">
          <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 text-[11px] font-bold flex items-center justify-center shrink-0">
            {i + 1}
          </span>
          <TextInput value={item} onChange={(v) => update(i, v)} placeholder={placeholder} />
          <button
            type="button"
            onClick={() => remove(i)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ))}
      <AddButton onClick={add} />
    </div>
  );
}

export function ImageUploader({ value, onChange, shape = "square" }) {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={`relative w-20 h-20 bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden shrink-0 hover:border-yellow-400 transition-colors ${
          shape === "round" ? "rounded-full" : "rounded-2xl"
        }`}
      >
        {value ? (
          <img src={value} alt="preview" className="w-full h-full object-cover" />
        ) : (
          <ImageUp className="text-slate-300" size={22} />
        )}
      </button>
      <div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 disabled:opacity-60 transition-colors"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <ImageUp size={14} />}
          {loading ? "Uploading…" : "Upload image"}
        </button>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        {value && (
          <TextInput value={value} onChange={onChange} placeholder="Image URL" className="mt-2 !w-56 !py-1.5" />
        )}
        {error && <p className="text-xs text-red-600 mt-1 font-medium">{error}</p>}
      </div>
    </div>
  );
}
