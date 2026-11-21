import React from "react";
import { Field, SimpleListEditor } from "../components";

export default function IndustriesSection({ content, update }) {
  return (
    <div>
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
