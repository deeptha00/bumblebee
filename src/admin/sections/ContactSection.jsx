import React from "react";
import { Field, TextInput, SimpleListEditor } from "../components";

export default function ContactSection({ content, update }) {
  const contact = content.contact || {};
  function updateContact(key, value) {
    update("contact", { ...contact, [key]: value });
  }
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-800 mb-4">Contact Details</h2>

      <Field label="Phone numbers">
        <SimpleListEditor
          items={contact.phones || []}
          onChange={(v) => updateContact("phones", v)}
          placeholder="Phone number"
        />
      </Field>

      <Field label="Email">
        <TextInput value={contact.email} onChange={(v) => updateContact("email", v)} />
      </Field>

      <Field label="Address">
        <TextInput value={contact.address} onChange={(v) => updateContact("address", v)} />
      </Field>

      <Field label="Website">
        <TextInput value={contact.website} onChange={(v) => updateContact("website", v)} />
      </Field>
    </div>
  );
}
