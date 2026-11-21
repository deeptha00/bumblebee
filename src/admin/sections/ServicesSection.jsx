import React from "react";
import { Field, SimpleListEditor } from "../components";

export default function ServicesSection({ content, update }) {
  const services = content.services || {};
  function updateServices(key, value) {
    update("services", { ...services, [key]: value });
  }
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-800 mb-4">Services</h2>

      <Field label="Corporate Learning">
        <SimpleListEditor
          items={services.corporateLearning || []}
          onChange={(v) => updateServices("corporateLearning", v)}
          placeholder="Service item"
        />
      </Field>

      <Field label="Academic Enablement">
        <SimpleListEditor
          items={services.academicEnablement || []}
          onChange={(v) => updateServices("academicEnablement", v)}
          placeholder="Service item"
        />
      </Field>

      <Field label="Centre of Excellence">
        <SimpleListEditor
          items={services.centreOfExcellence || []}
          onChange={(v) => updateServices("centreOfExcellence", v)}
          placeholder="Service item"
        />
      </Field>
    </div>
  );
}
