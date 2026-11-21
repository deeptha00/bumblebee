import React, { useRef, useState } from "react";
import { Plus, Trash2, ImageUp, Loader2 } from "lucide-react";
import { uploadImage } from "./adminApi";

export function Field({ label, hint, children }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-slate-700 mb-1">{label}</label>
      {hint && <p className="text-xs text-slate-400 mb-1">{hint}</p>}
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
      className={`w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-sm ${className}`}
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
      className={`w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-sm ${className}`}
      {...rest}
    />
  );
}

export function Card({ title, children, onRemove }) {
  return (
    <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 relative mb-4">
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          title="Remove"
          className="absolute top-3 right-3 text-slate-400 hover:text-red-600 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      )}
      {title && <div className="font-semibold text-slate-700 mb-3 pr-6">{title}</div>}
      {children}
    </div>
  );
}

export function AddButton({ onClick, label = "Add item" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-slate-300 text-slate-600 text-sm font-medium hover:border-yellow-400 hover:text-slate-900 transition-colors"
    >
      <Plus size={16} /> {label}
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
        <div key={i} className="flex gap-2 mb-2">
          <TextInput value={item} onChange={(v) => update(i, v)} placeholder={placeholder} />
          <button type="button" onClick={() => remove(i)} className="text-slate-400 hover:text-red-600 px-2">
            <Trash2 size={16} />
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
      <div
        className={`w-20 h-20 bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden ${
          shape === "round" ? "rounded-full" : "rounded-lg"
        }`}
      >
        {value ? (
          <img src={value} alt="preview" className="w-full h-full object-cover" />
        ) : (
          <ImageUp className="text-slate-300" size={24} />
        )}
      </div>
      <div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 disabled:opacity-60"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <ImageUp size={14} />}
          {loading ? "Uploading…" : "Upload image"}
        </button>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        {value && (
          <TextInput
            value={value}
            onChange={onChange}
            placeholder="Image URL"
            className="mt-2 !w-56"
          />
        )}
        {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
      </div>
    </div>
  );
}
