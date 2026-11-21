import React from "react";
import { Field, TextInput, TextArea, Card, AddButton, ImageUploader, SimpleListEditor } from "../components";

export default function LeadersSection({ content, update }) {
  const leaders = content.leaders || [];

  function updateItem(i, key, value) {
    const next = [...leaders];
    next[i] = { ...next[i], [key]: value };
    update("leaders", next);
  }
  function removeItem(i) {
    update("leaders", leaders.filter((_, idx) => idx !== i));
  }
  function addItem() {
    update("leaders", [...leaders, { name: "", title: "", image: "", summary: "", highlights: [] }]);
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-slate-800 mb-4">Leadership</h2>
      {leaders.map((l, i) => (
        <Card key={i} title={l.name || `Leader ${i + 1}`} onRemove={() => removeItem(i)}>
          <Field label="Photo">
            <ImageUploader value={l.image} onChange={(v) => updateItem(i, "image", v)} shape="round" />
          </Field>
          <Field label="Name">
            <TextInput value={l.name} onChange={(v) => updateItem(i, "name", v)} />
          </Field>
          <Field label="Title">
            <TextInput value={l.title} onChange={(v) => updateItem(i, "title", v)} />
          </Field>
          <Field label="Summary">
            <TextArea value={l.summary} onChange={(v) => updateItem(i, "summary", v)} rows={3} />
          </Field>
          <Field label="Highlights">
            <SimpleListEditor
              items={l.highlights || []}
              onChange={(v) => updateItem(i, "highlights", v)}
              placeholder="Highlight"
            />
          </Field>
        </Card>
      ))}
      <AddButton onClick={addItem} label="Add leader" />
    </div>
  );
}
