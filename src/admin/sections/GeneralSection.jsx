import React from "react";
import { Field, TextInput, TextArea, ImageUploader, SimpleListEditor } from "../components";

export default function GeneralSection({ content, update }) {
  return (
    <div>

      <Field label="Logo" hint="Shown in the site header, footer, and workshop page.">
        <ImageUploader value={content.logoUrl} onChange={(v) => update("logoUrl", v)} shape="round" />
      </Field>

      <Field label="Company name">
        <TextInput value={content.name} onChange={(v) => update("name", v)} />
      </Field>

      <Field label="Short name" hint="Used in the navigation bar.">
        <TextInput value={content.short} onChange={(v) => update("short", v)} />
      </Field>

      <Field label="Tagline">
        <TextInput value={content.tagline} onChange={(v) => update("tagline", v)} />
      </Field>

      <Field label="About (short teaser)" hint="Shown on the home page teaser card.">
        <TextArea value={content.aboutbb} onChange={(v) => update("aboutbb", v)} rows={2} />
      </Field>

      <Field label="About (full)" hint="Shown on the About page.">
        <TextArea value={content.about} onChange={(v) => update("about", v)} rows={5} />
      </Field>

      <Field label="Vision">
        <TextArea value={content.vision} onChange={(v) => update("vision", v)} rows={3} />
      </Field>

      <Field label="Mission points">
        <SimpleListEditor
          items={content.missionPoints || []}
          onChange={(v) => update("missionPoints", v)}
          placeholder="Mission point"
        />
      </Field>
    </div>
  );
}
