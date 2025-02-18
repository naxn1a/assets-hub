"use client";
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
}: {
  form: any;
  name: string;
  placeholder?: string;
  type?: string;
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
