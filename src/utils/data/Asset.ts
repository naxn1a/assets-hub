import { z } from "zod";

export type AssetType = {
  id: string;
  lot: string;
  serial: string;
  name: string;
  purchasedate: string;
  warrantyexpiry?: string;
  status: string;
};

export const formSchema = z.object({
  lot: z.optional(z.string().max(50)),
  serial: z.optional(z.string().max(50)),
  name: z.string().min(2).max(50),
  purchasedate: z.string().nonempty({ message: "Purchase date is required" }),
  warrantyexpiry: z.optional(z.string()),
  status: z.string().nonempty({ message: "Status is required" }),
});

export const Data = [
  {
    name: "lot",
    placeholder: "Lot",
    type: "text",
  },
  {
    name: "serial",
    placeholder: "Serial",
    type: "text",
  },
  {
    name: "name",
    placeholder: "Name",
    type: "text",
  },
  {
    name: "purchasedate",
    placeholder: "Purchase Date",
    type: "date",
  },
  {
    name: "warrantyexpiry",
    placeholder: "Warranty Expiry",
    type: "date",
  },
  {
    name: "status",
    placeholder: "Status",
    type: "select",
  },
];

export const Status = [
  {
    id: "Available",
    name: "Available",
  },
  {
    id: "Assigned",
    name: "Assigned",
  },
  {
    id: "UnderRepair",
    name: "UnderRepair",
  },
  {
    id: "Disposed",
    name: "Disposed",
  },
];
