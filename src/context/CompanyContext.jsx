import React, { useEffect, useState, useCallback } from "react";
import { COMPANY as DEFAULT_COMPANY } from "../data/company";
import { CompanyContext } from "./companyContextCore";

const API_URL = import.meta.env.VITE_API_URL || "";

export function CompanyProvider({ children }) {
  const [company, setCompany] = useState(DEFAULT_COMPANY);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    if (!API_URL) {
      setLoading(false);
      return;
    }
    fetch(`${API_URL}/api/content`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("bad response"))))
      .then((data) => setCompany({ ...DEFAULT_COMPANY, ...data }))
      .catch(() => {
        // Keep the bundled default content if the API is unreachable.
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <CompanyContext.Provider value={{ company, loading, refresh }}>
      {children}
    </CompanyContext.Provider>
  );
}
