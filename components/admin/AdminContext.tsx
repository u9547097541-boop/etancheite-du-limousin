"use client";

import React, { createContext, useContext, useState, useCallback, useRef } from "react";

interface AdminContextType {
  isAdmin: boolean;
  data: Record<string, unknown>;
  setField: (key: string, value: unknown) => void;
  getField: (key: string) => unknown;
  saving: boolean;
  saved: boolean;
  save: () => Promise<void>;
  hasChanges: boolean;
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  data: {},
  setField: () => {},
  getField: () => "",
  saving: false,
  saved: false,
  save: async () => {},
  hasChanges: false,
});

export function useAdmin() {
  return useContext(AdminContext);
}

export function AdminProvider({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData: Record<string, unknown>;
}) {
  const [data, setData] = useState<Record<string, unknown>>(initialData);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const originalRef = useRef(JSON.stringify(initialData));

  const hasChanges = JSON.stringify(data) !== originalRef.current;

  const setField = useCallback((key: string, value: unknown) => {
    setData((prev) => {
      // Support nested keys like "services.0.title"
      const keys = key.split(".");
      if (keys.length === 1) {
        return { ...prev, [key]: value };
      }
      const newData = JSON.parse(JSON.stringify(prev));
      let obj: Record<string, unknown> = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        if (Array.isArray(obj[k])) {
          obj = (obj[k] as unknown[])[Number(keys[i + 1])] as Record<string, unknown>;
          // Skip the index
          i++;
          if (i === keys.length - 1) {
            // We're at the final key but arrived via array
            break;
          }
        } else {
          obj = obj[k] as Record<string, unknown>;
        }
      }
      obj[keys[keys.length - 1]] = value;
      return newData;
    });
  }, []);

  const getField = useCallback((key: string): unknown => {
    const keys = key.split(".");
    let val: unknown = data;
    for (const k of keys) {
      if (val == null) return "";
      if (Array.isArray(val)) {
        val = val[Number(k)];
      } else if (typeof val === "object") {
        val = (val as Record<string, unknown>)[k];
      }
    }
    return val ?? "";
  }, [data]);

  const save = useCallback(async () => {
    setSaving(true);
    try {
      await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file: "home", data }),
      });
      originalRef.current = JSON.stringify(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Save failed:", err);
    }
    setSaving(false);
  }, [data]);

  return (
    <AdminContext.Provider value={{ isAdmin: true, data, setField, getField, saving, saved, save, hasChanges }}>
      {children}
    </AdminContext.Provider>
  );
}
