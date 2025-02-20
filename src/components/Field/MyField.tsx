"use client";
import ComboBox from "../combobox/ComboBox";
import DatePicker from "../date/DatePicker";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export default function MyField({
  form,
  name,
  placeholder,
  type,
  options,
}: {
  form: any;
  name: string;
  placeholder?: string;
  type?: string;
  options?: any;
}) {
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
                label={placeholder}
                value={field.value}
                onChange={(text: string) => field.onChange(text)}
                options={options}
              />
            ) : type === "date" ? (
              <div>
                <DatePicker
                  value={field.value}
                  change={(date: Date) => field.onChange(date)}
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
