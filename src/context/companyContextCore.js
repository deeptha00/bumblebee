import { createContext, useContext } from "react";
import { COMPANY as DEFAULT_COMPANY } from "../data/company";

export const CompanyContext = createContext({
  company: DEFAULT_COMPANY,
  loading: false,
  refresh: () => {},
});

export function useCompany() {
  return useContext(CompanyContext).company;
}

export function useCompanyContext() {
  return useContext(CompanyContext);
}
