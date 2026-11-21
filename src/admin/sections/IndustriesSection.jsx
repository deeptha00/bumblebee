import React from "react";
import { Field, SimpleListEditor } from "../components";

export default function IndustriesSection({ content, update }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-800 mb-4">Industries We Serve</h2>
      <Field label="Industries">
        <SimpleListEditor
          items={content.industries || []}
          onChange={(v) => update("industries", v)}
          placeholder="Industry"
        />
      </Field>
    </div>
  );
}
