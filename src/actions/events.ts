export const approveEvent = async (id: string) => {
  try {
    const res = await fetch(`/api/events/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "APPROVED" }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to approve event");
    }

    console.log(`✅ Event ${id} approved`);
  } catch (err) {
    console.error("Error approving event:", err);
  }
};

export const rejectEvent = async (id: string) => {
  try {
    const res = await fetch(`/api/events/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "REJECTED" }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to reject event");
    }

    console.log(`❌ Event ${id} rejected`);
  } catch (err) {
    console.error("Error rejecting event:", err);
  }
};
