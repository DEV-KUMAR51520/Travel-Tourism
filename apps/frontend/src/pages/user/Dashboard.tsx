import React from "react";
import { useMyBookings, useCancelBooking } from "../../lib/hooks/bookings";
import { queryClient } from "../../lib/queryClient";

const Dashboard = () => {
  const { data: bookings, isLoading } = useMyBookings();
  const cancelBooking = useCancelBooking();

  const handleCancel = async (id: number) => {
    if (!confirm("Cancel this booking?")) return;
    await cancelBooking.mutateAsync(id);
    await queryClient.invalidateQueries({ queryKey: ["myBookings"] });
  };

  if (isLoading) return <div className="p-6">Loading your bookings...</div>;

  return (
    <div className="p-6 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-blue-800">My Bookings</h1>

      {bookings?.length === 0 && (
        <div className="text-gray-600">No bookings yet. Go explore destinations!</div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bookings?.map((b: any) => (
          <div
            key={b.id}
            className="bg-white shadow-lg rounded-xl p-5 hover:shadow-2xl transition-shadow"
          >
            <img
              src={b.destination.imageUrl}
              alt={b.destination.name}
              className="rounded-lg mb-4 h-40 w-full object-cover"
            />
            <h2 className="text-xl font-semibold text-gray-800">
              {b.destination.name}
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              {new Date(b.startDate).toDateString()} →{" "}
              {new Date(b.endDate).toDateString()}
            </p>
            <p className="mt-2 text-blue-600 font-medium">₹ {b.totalPrice}</p>
            <span
              className={`inline-block mt-3 px-3 py-1 rounded text-xs font-semibold ${
                b.status === "CONFIRMED"
                  ? "bg-green-200 text-green-800"
                  : b.status === "PENDING"
                  ? "bg-yellow-200 text-yellow-800"
                  : b.status === "CANCELLED"
                  ? "bg-gray-300 text-gray-700"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {b.status}
            </span>

            {b.status === "PENDING" && (
              <button
                onClick={() => handleCancel(b.id)}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all"
              >
                Cancel Booking
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
