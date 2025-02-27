import { toast } from "@/hooks/use-toast";
import { fetchData } from "@/utils/FetchData";
import { AssetStatus, AuditLogType } from "@prisma/client";

export const handleSubmit = async (data: any, status: any) => {
  if (!status) return;

  if (AssetStatus.Maintenance) {
    await onRepair(data);
  } else if (AssetStatus.Returned) {
    await onReturn(data);
  }

  return;
};

const onRepair = async (data: any) => {
  const res = await fetchData({
    method: "POST",
    path: "/audit",
    body: {
      asset_id: data.id,
      user_id: data.user_id,
      type: AuditLogType.Maintenance,
    },
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
};

const onReturn = async (data: any) => {};
