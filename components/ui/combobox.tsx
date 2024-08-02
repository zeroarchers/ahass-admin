"use client";
import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useDebouncedCallback } from "use-debounce";

type ComboboxItem = {
  value: string;
  label: string;
  description?: string;
};

export function Combobox({
  form,
  label,
  name,
  apiEndpoint,
  searchParam = "search",
  itemToComboboxItem,
}: {
  form: any;
  label: string;
  name: string;
  apiEndpoint: string;
  searchParam?: string;
  itemToComboboxItem: (item: any) => ComboboxItem;
}) {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState<ComboboxItem[]>([]);

  const loadItems = useDebouncedCallback(async (search: string = "") => {
    try {
      const response = await fetch(
        `${apiEndpoint}?${searchParam}=${encodeURIComponent(search)}`,
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch items from ${apiEndpoint}`);
      }
      const data = await response.json();
      setItems(data.map(itemToComboboxItem));
    } catch (error) {
      console.error(`Error loading items from ${apiEndpoint}:`, error);
    }
  }, 300);

  React.useEffect(() => {
    loadItems();
  }, [loadItems]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className="w-full">
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    !field.value && "text-muted-foreground",
                    "justify-between",
                  )}
                >
                  {field.value
                    ? items.find((item) => item.value === field.value)?.label
                    : `Select ${label}`}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-0">
              <Command>
                <CommandInput
                  placeholder={`Search ${label.toLowerCase()}...`}
                  className="h-9"
                  onValueChange={(search) => {
                    loadItems(search);
                  }}
                />
                <CommandList>
                  <CommandGroup>
                    {items.map((item) => (
                      <CommandItem
                        value={item.label}
                        key={item.value}
                        onSelect={() => {
                          form.setValue(name, item.value);
                          setOpen(false);
                        }}
                      >
                        {item.label}
                        {item.description && ` | ${item.description}`}
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            item.value === field.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
