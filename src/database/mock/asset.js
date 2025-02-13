import { generateUUIDv4 } from "@/utils/GenerateUUID";
import { formatDate } from "@/utils/Date";

export const MockAsset = [
  {
    lot_number: "LOT2025010001",
    serial_number: generateUUIDv4(),
    name: `Macbook Pro2025`,
    purchase_date: formatDate(new Date("2021-01-01")),
    warranty_expiry: formatDate(new Date()),
    status: "Available",
  },
  {
    lot_number: "LOT2025010001",
    serial_number: generateUUIDv4(),
    name: `Macbook Pro2025`,
    purchase_date: formatDate(new Date("2021-01-01")),
    warranty_expiry: formatDate(new Date()),
    status: "Available",
  },
  {
    lot_number: "LOT2025010001",
    serial_number: generateUUIDv4(),
    name: `Macbook Pro2025`,
    purchase_date: formatDate(new Date("2021-01-01")),
    status: "Available",
  },
  {
    lot_number: "LOT2025010001",
    serial_number: generateUUIDv4(),
    name: `Macbook Pro2025`,
    purchase_date: formatDate(new Date("2021-01-01")),
    status: "Available",
  },
  {
    lot_number: "LOT2025010001",
    serial_number: generateUUIDv4(),
    name: `Notebook 2019`,
    purchase_date: formatDate(new Date("2021-03-03")),
    warranty_expiry: formatDate(new Date()),
    status: "Available",
  },
  {
    lot_number: "LOT2025010001",
    serial_number: generateUUIDv4(),
    name: `Notebook 2019`,
    purchase_date: formatDate(new Date("2021-03-03")),
    warranty_expiry: formatDate(new Date()),
    status: "Available",
  },
];
