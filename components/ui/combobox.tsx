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
import { Badge } from "./badge";

type ComboboxItem = {
  value: string;
  label: string;
  description?: string;
  data?: any;
};

export function Combobox({
  form,
  label,
  name,
  apiEndpoint,
  searchParam = "search",
  itemToComboboxItem,
  onSelectItem,
  is_static_data = false,
}: {
  form: any;
  label: string;
  name: string;
  apiEndpoint: string;
  searchParam?: string;
  itemToComboboxItem: (item: any) => ComboboxItem;
  onSelectItem?: (item: any) => void;
  is_static_data?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState<ComboboxItem[]>([]);

  const loadItems = useDebouncedCallback(async (search: string = "") => {
    try {
      const response = await fetch(
        `${apiEndpoint}?${searchParam}=${encodeURIComponent(search)}`,
        {
          cache: "no-cache",
        },
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
      render={({ field }) => {
        const item = items.find((item) => item.value === field.value)?.label;
        const displayValue = item || field.value;
        return (
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
                    {field.value ? displayValue : `Select ${label}`}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-96 p-0">
                <Command shouldFilter={is_static_data}>
                  <CommandInput
                    placeholder={`Search ${label.toLowerCase()}...`}
                    className="h-9"
                    onValueChange={(search) => {
                      loadItems(search);
                    }}
                  />
                  <CommandList>
                    <CommandGroup>
                      {items.map((item, index) => (
                        <CommandItem
                          value={item.label}
                          key={index}
                          onSelect={() => {
                            form.setValue(name, item.value);
                            setOpen(false);
                            if (onSelectItem) {
                              onSelectItem(item);
                            }
                          }}
                        >
                          {item.label}
                          {item.description && (
                            <Badge className="ms-3">{item.description}</Badge>
                          )}
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
        );
      }}
    />
  );
}
