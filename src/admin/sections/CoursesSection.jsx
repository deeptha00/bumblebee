import React from "react";
import { Field, TextInput, TextArea, Card, AddButton, ImageUploader, SimpleListEditor } from "../components";

function slugify(text) {
  return (text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function CoursesSection({ content, update }) {
  const courses = content.courses || [];

  function updateItem(i, key, value) {
    const next = [...courses];
    next[i] = { ...next[i], [key]: value };
    if (key === "title" && !next[i].slugEdited) {
      next[i].slug = slugify(value);
    }
    update("courses", next);
  }
  function markSlugEdited(i, value) {
    const next = [...courses];
    next[i] = { ...next[i], slug: value, slugEdited: true };
    update("courses", next);
  }
  function removeItem(i) {
    update("courses", courses.filter((_, idx) => idx !== i));
  }
  function addItem() {
    update("courses", [
      ...courses,
      {
        slug: "",
        title: "",
        category: "",
        format: "",
        duration: "",
        level: "",
        price: "",
        image: "",
        description: "",
        outcomes: [],
      },
    ]);
  }

  return (
    <div>
      {courses.map((c, i) => (
        <Card key={i} title={c.title || `Course ${i + 1}`} onRemove={() => removeItem(i)}>
          <Field label="Course image">
            <ImageUploader value={c.image} onChange={(v) => updateItem(i, "image", v)} />
          </Field>
          <Field label="Title">
            <TextInput value={c.title} onChange={(v) => updateItem(i, "title", v)} />
          </Field>
          <Field label="URL slug" hint="Used in the course page link. Auto-generated from the title, but you can override it.">
            <TextInput value={c.slug} onChange={(v) => markSlugEdited(i, v)} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Category">
              <TextInput value={c.category} onChange={(v) => updateItem(i, "category", v)} />
            </Field>
            <Field label="Format">
              <TextInput value={c.format} onChange={(v) => updateItem(i, "format", v)} />
            </Field>
            <Field label="Duration">
              <TextInput value={c.duration} onChange={(v) => updateItem(i, "duration", v)} />
            </Field>
            <Field label="Level">
              <TextInput value={c.level} onChange={(v) => updateItem(i, "level", v)} />
            </Field>
            <Field label="Price">
              <TextInput value={c.price} onChange={(v) => updateItem(i, "price", v)} />
            </Field>
          </div>
          <Field label="Description">
            <TextArea value={c.description} onChange={(v) => updateItem(i, "description", v)} rows={2} />
          </Field>
          <Field label="Learning outcomes">
            <SimpleListEditor
              items={c.outcomes || []}
              onChange={(v) => updateItem(i, "outcomes", v)}
              placeholder="Outcome"
            />
          </Field>
        </Card>
      ))}
      <AddButton onClick={addItem} label="Add course" />
    </div>
  );
}
