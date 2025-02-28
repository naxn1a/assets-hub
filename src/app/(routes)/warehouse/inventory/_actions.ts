import { toast } from "@/hooks/use-toast";
import { fetchData } from "@/utils/FetchData";
import { AuditLogType } from "@prisma/client";

export const handleSubmit = async (data: any, status: any) => {
  if (!status) return;

  try {
    if (status === AuditLogType.Maintenance) {
      await handleRepair(data);
    } else if (status === AuditLogType.Return) {
      await handleReturn(data);
    }

    toast({
      title: "Success",
      description: "Data has been saved",
    });

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (error) {
    return toast({
      title: "Failed",
      description: `${error}`,
    });
  }
};

const handleRepair = async (data: any) => {
  const res = await fetchData({
    method: "POST",
    path: "/audit",
    body: {
      asset_id: data.id,
      user_id: data.user_id,
      type: AuditLogType.Maintenance,
    },
  });

  if (res.status === "error") throw new Error(res.message);
};

const handleReturn = async (data: any) => {
  const res = await fetchData({
    method: "POST",
    path: "/audit",
    body: {
      asset_id: data.id,
      user_id: data.user_id,
      type: AuditLogType.Return,
    },
  });

  if (res.status === "error") throw new Error(res.message);
};
