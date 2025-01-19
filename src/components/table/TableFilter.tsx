import { Table } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface TableSearchProps<TData> {
  table: Table<TData>;
  option: {
    name: string;
    data: string[];
  }[];
}

export default function <TData>({ table, option }: TableSearchProps<TData>) {
  return (
    <>
      {option.map((select, index) => (
        <Select
          key={index}
          onValueChange={(value) => {
            table.getColumn(select.name)?.setFilterValue(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={select.name} />
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
      <button onClick={() => table.resetColumnFilters()}>Clear</button>
    </>
  );
}
