import { toast } from "@/hooks/use-toast";
import { fetchData } from "@/utils/FetchData";

export async function handleApprove(id: string) {
  const res = await fetchData({
    method: "PUT",
    path: `/asset/approve/${id}`,
  });

  if (res.status === "error") {
    toast({
      title: "Failed",
      description: res.message,
    });
  } else {
    toast({
      title: "Success",
      description: "Asset has been approved",
    });
  }

  setTimeout(() => {
    window.location.reload();
  }, 1000);
}

export async function handleReject(id: string) {
  const res = await fetchData({
    method: "PUT",
    path: `/asset/reject/${id}`,
  });

  if (res.status === "error") {
    toast({
      title: "Failed",
      description: res.message,
    });
  } else {
    toast({
      title: "Success",
      description: "Asset has been rejected",
    });
  }

  setTimeout(() => {
    window.location.reload();
  }, 1000);
}
