import { ModelType } from "@/types/types";

export const approveStatus = async (id: string, type: ModelType) => {
  try {
    const res = await fetch(`/api/${type}s/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "APPROVED" }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || `Failed to approve ${type}`);
    }
  } catch (err) {
    console.error(`Error approving ${type}:`, err);
  }
};

export const rejectStatus = async (id: string, type: ModelType) => {
  try {
    const res = await fetch(`/api/${type}s/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "REJECTED" }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || `Failed to reject ${type}`);
    }
  } catch (err) {
    console.error(`Error rejecting ${type}:`, err);
  }
};
