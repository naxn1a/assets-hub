import { toast } from "@/hooks/use-toast";
import { fetchData } from "@/utils/FetchData";
import { AssetStatus, AuditLogStatus } from "@prisma/client";

export async function handleApprove(data: any) {
  const res_asset = await fetchData({
    method: "PUT",
    path: `/asset/status/${data.asset_id}`,
    body: {
      status: AssetStatus.Assigned,
      user_id: data.user_id,
    },
  });

  if (res_asset.status === "error") {
    return toast({
      title: "Failed",
      description: res_asset.message,
    });
  }

  const res_audit = await fetchData({
    method: "PUT",
    path: `/audit/${data.id}`,
    body: {
      status: AuditLogStatus.Approved,
    },
  });

  if (res_audit.status === "error") {
    return toast({
      title: "Failed",
      description: res_audit.message,
    });
  }

  toast({
    title: "Success",
    description: "Asset has been approved",
  });

  setTimeout(() => {
    window.location.reload();
  }, 1000);
}

export async function handleReject(data: any) {
  const res_audit = await fetchData({
    method: "PUT",
    path: `/audit/${data.id}`,
    body: {
      status: AuditLogStatus.Rejected,
    },
  });

  if (res_audit.status === "error") {
    return toast({
      title: "Failed",
      description: res_audit.message,
    });
  }

  toast({
    title: "Success",
    description: "Asset has been rejected",
  });

  setTimeout(() => {
    window.location.reload();
  }, 1000);
}
