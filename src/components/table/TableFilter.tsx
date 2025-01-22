import { Table } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";

interface TableSearchProps<TData> {
  table: Table<TData>;
  option: {
    name: string;
    data: string[];
  }[];
}

export default function <TData>({ table, option }: TableSearchProps<TData>) {
  const [selectedValues, setSelectedValues] = useState<{
    [key: string]: string;
  }>({});

  const handleClear = () => {
    setSelectedValues({});
    table.resetColumnFilters();
  };
  return (
    <>
      {option.map((select, index) => (
        <Select
          key={index}
          value={selectedValues[select.name] || ""}
          onValueChange={(value) => {
            setSelectedValues((prev) => ({ ...prev, [select.name]: value }));
            table.getColumn(select.name)?.setFilterValue(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={`Filter ${select.name}`} />
          </SelectTrigger>
          <SelectContent>
            {select.data.map((item, index) => (
              <SelectItem key={index} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
      <button onClick={handleClear}>Clear</button>
    </>
  );
}
