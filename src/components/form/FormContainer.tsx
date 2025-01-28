import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import ComboBox from "../combobox/ComboBox";
import DatePicker from "../date/DatePicker";

interface FormContainerProps {
  field: any;
  name: string;
  placeholder: string;
  type: string;
  options?: any;
  onSelected?: (value: string) => void;
}

export default function FormContainer({
  field,
  name,
  placeholder,
  type,
  options,
  onSelected,
}: FormContainerProps) {
  return (
    <FormItem>
      <FormLabel>{placeholder}</FormLabel>
      <FormControl>
        {type === "text" ? (
          <Input {...field} placeholder={placeholder} className="w-2/3" />
        ) : type === "select" ? (
          <ComboBox
            label={name}
            value={field.value}
            onChange={(text: string) => {
              if (field.value !== text) {
                field.onChange(text);
                onSelected && onSelected(text);
              }
            }}
            options={options}
          />
        ) : type === "date" ? (
          <div>
            <DatePicker
              value={field.value}
              onChange={(date: Date) => field.onChange(date)}
            />
          </div>
        ) : null}
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
