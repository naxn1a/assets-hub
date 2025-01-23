import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import ComboBox from "../combobox/ComboBox";
import DatePicker from "../date/DatePicker";

interface FormContainerProps {
  form: any;
  name: string;
  placeholder: string;
  type: string;
  setSelected?: any;
  options?: any;
}

export default function FormContainer({
  form,
  name,
  placeholder,
  type,
  setSelected,
  options,
}: FormContainerProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{placeholder}</FormLabel>
          <FormControl>
            {type === "text" ? (
              <Input {...field} placeholder={placeholder} />
            ) : type === "select" ? (
              <ComboBox
                label={name}
                value={field.value}
                onChange={(text: string) => {
                  field.onChange(text);
                  setSelected && setSelected(text);
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
      )}
    />
  );
}
