// apps/frontend/src/pages/admin/DestinationsList.tsx
import React, { useState } from "react";
import { useDestinations, useCreateDestination, useUpdateDestination, useDeleteDestination } from "../../lib/hooks/destinations";
import { queryClient } from "../../lib/queryClient";
import DestinationForm from "./DestinationForm";

const DestinationsList: React.FC = () => {
  const { data: destinations, isLoading, isError } = useDestinations();
  const createMutation = useCreateDestination();
  const updateMutation = useUpdateDestination();
  const deleteMutation = useDeleteDestination();

  const [editing, setEditing] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);

  const openCreate = () => {
    setEditing(null);
    setShowForm(true);
  };

  const onCreate = async (payload: any) => {
    await createMutation.mutateAsync(payload);
    await queryClient.invalidateQueries({ queryKey: ["destinations"] });
    setShowForm(false);
  };

  const onUpdate = async (payload: any) => {
    await updateMutation.mutateAsync(payload);
    await queryClient.invalidateQueries({ queryKey: ["destinations"] });
    setEditing(null);
    setShowForm(false);
  };

  const onDelete = async (id: number) => {
    if (!confirm("Delete this destination?")) return;
    await deleteMutation.mutateAsync(id);
    await queryClient.invalidateQueries({ queryKey: ["destinations"] });
  };

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError) return <div className="p-6 text-red-600">Failed to load</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Destinations</h1>
        <button onClick={openCreate} className="px-4 py-2 bg-blue-600 text-white rounded">Create Destination</button>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {destinations?.map((d: any) => (
          <div key={d.id} className="bg-white shadow rounded p-4">
            <img src={d.imageUrl || "/placeholder.jpg"} alt={d.name} className="h-40 w-full object-cover rounded mb-3" />
            <h2 className="font-semibold text-lg">{d.name}</h2>
            <p className="text-sm text-gray-600">{d.description}</p>
            <div className="mt-3 flex gap-2">
              <button onClick={() => { setEditing(d); setShowForm(true); }} className="px-3 py-1 bg-yellow-500 rounded text-white">Edit</button>
              <button onClick={() => onDelete(d.id)} className="px-3 py-1 bg-red-500 rounded text-white">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg w-full max-w-2xl p-6">
            <DestinationForm initial={editing} onCancel={() => setShowForm(false)} onSubmit={editing ? onUpdate : onCreate} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationsList;
