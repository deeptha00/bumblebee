import React from "react";
import { Field, TextInput, TextArea, Card, AddButton } from "../components";

export default function ChallengesSection({ content, update }) {
  const challenges = content.challenges || [];

  function updateItem(i, key, value) {
    const next = [...challenges];
    next[i] = { ...next[i], [key]: value };
    update("challenges", next);
  }
  function removeItem(i) {
    update("challenges", challenges.filter((_, idx) => idx !== i));
  }
  function addItem() {
    update("challenges", [...challenges, { title: "", solution: "" }]);
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-slate-800 mb-4">Business Challenges We Solve</h2>
      {challenges.map((c, i) => (
        <Card key={i} onRemove={() => removeItem(i)}>
          <Field label="Challenge title">
            <TextInput value={c.title} onChange={(v) => updateItem(i, "title", v)} />
          </Field>
          <Field label="Our solution">
            <TextArea value={c.solution} onChange={(v) => updateItem(i, "solution", v)} rows={2} />
          </Field>
        </Card>
      ))}
      <AddButton onClick={addItem} label="Add challenge" />
    </div>
  );
}
