export async function handleApprove(id: string) {
  try {
    const response = await fetch(`/api/request/approve/${id}`, {
      method: "POST",
    });

    const data = await response.json();

    if (!data) throw new Error("Failed to approve request");

    window.location.reload();
  } catch (error) {
    return console.error(error);
  }
}

export async function handleReject(id: string) {
  try {
    const response = await fetch(`/api/request/reject/${id}`, {
      method: "POST",
    });

    const data = await response.json();

    if (!data) throw new Error("Failed to reject request");

    window.location.reload();
  } catch (error) {
    return console.error(error);
  }
}
