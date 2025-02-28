import { toast } from "@/hooks/use-toast";
import { fetchData } from "@/utils/FetchData";
import { AssetStatus, AuditLogStatus, AuditLogType } from "@prisma/client";

export async function onSubmit(data: any, status: string) {
  if (!status) return;

  try {
    if (status === AuditLogStatus.Approved) {
      if (data.type === AuditLogType.Assignment) {
        await handleAssign(data);
      } else if (data.type === AuditLogType.Return) {
        await handleReturn(data);
      }
    } else if (status === AuditLogStatus.InProgress) {
      await handleInProgress(data);
    } else if (status === AuditLogStatus.Completed) {
      await handleCompleted(data);
    } else if (status === AuditLogStatus.Cancelled) {
      await handleCancel(data);
    }

    const audit = await fetchData({
      method: "PUT",
      path: `/audit/${data.id}`,
      body: {
        status,
      },
    });

    if (audit.status === "error") throw new Error(audit.message);

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
}

async function handleAssign(data: any) {
  const res = await fetchData({
    method: "PUT",
    path: `/asset/status/${data.asset_id}`,
    body: {
      status: AssetStatus.Assigned,
      user_id: data.user_id,
    },
  });

  if (res.status === "error") throw new Error(res.message);
}

async function handleReturn(data: any) {
  const res = await fetchData({
    method: "PUT",
    path: `/asset/status/${data.asset_id}`,
    body: {
      status: AssetStatus.Available,
      user_id: null,
    },
  });

  if (res.status === "error") throw new Error(res.message);
}

async function handleInProgress(data: any) {
  const res = await fetchData({
    method: "PUT",
    path: `/asset/status/${data.asset_id}`,
    body: {
      status: AssetStatus.Maintenance,
    },
  });

  if (res.status === "error") throw new Error(res.message);
}

async function handleCompleted(data: any) {
  const res = await fetchData({
    method: "PUT",
    path: `/asset/status/${data.asset_id}`,
    body: {
      status: AssetStatus.Assigned,
    },
  });

  if (res.status === "error") throw new Error(res.message);
}

async function handleCancel(data: any) {
  const res = await fetchData({
    method: "PUT",
    path: `/asset/status/${data.asset_id}`,
    body: {
      status: AssetStatus.Disposed,
    },
  });

  if (res.status === "error") throw new Error(res.message);
}
