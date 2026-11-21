import React from "react";
import { Field, TextInput, TextArea, Card, AddButton } from "../components";

export default function TestimonialsSection({ content, update }) {
  const testimonials = content.testimonials || [];

  function updateItem(i, key, value) {
    const next = [...testimonials];
    next[i] = { ...next[i], [key]: value };
    update("testimonials", next);
  }
  function removeItem(i) {
    update("testimonials", testimonials.filter((_, idx) => idx !== i));
  }
  function addItem() {
    update("testimonials", [...testimonials, { quote: "", name: "" }]);
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-slate-800 mb-4">Testimonials</h2>
      {testimonials.map((t, i) => (
        <Card key={i} onRemove={() => removeItem(i)}>
          <Field label="Quote">
            <TextArea value={t.quote} onChange={(v) => updateItem(i, "quote", v)} rows={2} />
          </Field>
          <Field label="Client name">
            <TextInput value={t.name} onChange={(v) => updateItem(i, "name", v)} />
          </Field>
        </Card>
      ))}
      <AddButton onClick={addItem} label="Add testimonial" />
    </div>
  );
}
