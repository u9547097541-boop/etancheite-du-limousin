"use client";

import { useAdmin } from "./AdminContext";
import { useState, useRef, useEffect } from "react";
import { Pencil, Upload, Check, X } from "lucide-react";

/* ─── Editable Text ─── */
export function EditableText({
  fieldKey,
  as: Tag = "span",
  className = "",
  children,
}: {
  fieldKey: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
}) {
  const { isAdmin, getField, setField } = useAdmin();
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);
  const value = String(getField(fieldKey) || "");

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  if (!isAdmin) {
    // Render normally using children or value
    const Component = Tag as React.ElementType;
    return <Component className={className}>{children || value}</Component>;
  }

  if (editing) {
    const isLong = value.length > 80;
    return (
      <div className="relative inline-block w-full">
        {isLong ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={value}
            onChange={(e) => setField(fieldKey, e.target.value)}
            onBlur={() => setEditing(false)}
            onKeyDown={(e) => { if (e.key === "Escape") setEditing(false); }}
            rows={4}
            className={`${className} w-full bg-yellow-50 border-2 border-yellow-400 rounded-lg px-2 py-1 outline-none resize-y ring-2 ring-yellow-300/50`}
            style={{ minHeight: "60px" }}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={value}
            onChange={(e) => setField(fieldKey, e.target.value)}
            onBlur={() => setEditing(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "Escape") setEditing(false);
            }}
            className={`${className} w-full bg-yellow-50 border-2 border-yellow-400 rounded-lg px-2 py-0.5 outline-none ring-2 ring-yellow-300/50`}
          />
        )}
      </div>
    );
  }

  const Component = Tag as React.ElementType;
  return (
    <Component
      className={`${className} cursor-pointer relative group/edit`}
      onClick={() => setEditing(true)}
      title="Cliquer pour modifier"
    >
      {children || value}
      <span className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center opacity-0 group-hover/edit:opacity-100 transition-opacity shadow-lg z-50 pointer-events-none">
        <Pencil size={10} className="text-yellow-900" />
      </span>
      <span className="absolute inset-0 border-2 border-dashed border-yellow-400/0 group-hover/edit:border-yellow-400/60 rounded-lg transition-colors pointer-events-none" />
    </Component>
  );
}

/* ─── Editable Image ─── */
export function EditableImage({
  fieldKey,
  src,
  alt,
  fill,
  className = "",
  width,
  height,
}: {
  fieldKey: string;
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  width?: number;
  height?: number;
}) {
  const { isAdmin, getField, setField } = useAdmin();
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentSrc = String(getField(fieldKey) || src);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) setField(fieldKey, data.url);
    } catch (err) {
      console.error("Upload failed:", err);
    }
    setUploading(false);
  }

  if (!isAdmin) {
    if (fill) {
      return <img src={currentSrc} alt={alt} className={`${className} absolute inset-0 w-full h-full object-cover`} />;
    }
    return <img src={currentSrc} alt={alt} className={className} width={width} height={height} />;
  }

  return (
    <div className="relative group/img cursor-pointer" onClick={() => fileInputRef.current?.click()}>
      {fill ? (
        <img src={currentSrc} alt={alt} className={`${className} absolute inset-0 w-full h-full object-cover`} />
      ) : (
        <img src={currentSrc} alt={alt} className={className} width={width} height={height} />
      )}
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/40 transition-colors flex items-center justify-center z-30 rounded-inherit">
        <div className="opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center gap-1">
          {uploading ? (
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Upload size={24} className="text-white drop-shadow-lg" />
              <span className="text-xs text-white font-bold drop-shadow-lg">Changer l&apos;image</span>
            </>
          )}
        </div>
      </div>
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
    </div>
  );
}
