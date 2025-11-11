// apps/frontend/src/pages/admin/DestinationForm.tsx
import React, { useState } from "react";

const DestinationForm: React.FC<{ initial?: any; onSubmit: (data: any) => Promise<void>; onCancel: () => void }> = ({ initial, onSubmit, onCancel }) => {
  const [name, setName] = useState(initial?.name || "");
  const [slug, setSlug] = useState(initial?.slug || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { name, slug, description, imageUrl };
      if (initial?.id) await onSubmit({ id: initial.id, ...payload });
      else await onSubmit(payload);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">{initial ? "Edit Destination" : "Create Destination"}</h3>
        <button type="button" onClick={onCancel} className="text-gray-500">Close</button>
      </div>

      <div className="grid gap-3">
        <input className="border p-2 rounded" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="border p-2 rounded" placeholder="Slug (unique e.g. paris-france)" value={slug} onChange={(e) => setSlug(e.target.value)} required />
        <textarea className="border p-2 rounded" placeholder="Description" value={description || ""} onChange={(e) => setDescription(e.target.value)} />
        <input className="border p-2 rounded" placeholder="Image URL" value={imageUrl || ""} onChange={(e) => setImageUrl(e.target.value)} />
      </div>

      <div className="mt-4 flex gap-2">
        <button type="submit" disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded">{loading ? "Saving..." : "Save"}</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
      </div>
    </form>
  );
};

export default DestinationForm;
