"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
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

interface Wilayah {
  id: string;
  name: string;
}

export function ComboboxStatic({
  items,
  form,
  name,
}: {
  items: Wilayah[];
  form: any;
  name: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{name}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "justify-between w-full",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value
                    ? items.find(
                        (item: Wilayah) =>
                          item.id === field.value ||
                          item.name === field.value.toUpperCase(),
                      )?.name
                    : "Select " + name}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput
                  placeholder={`Search ${name}...`}
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>Tidak ada {name} yang ditemukan.</CommandEmpty>
                  <CommandGroup>
                    {items.map((item: Wilayah) => (
                      <CommandItem
                        value={item.name}
                        key={item.name}
                        onSelect={() => {
                          form.setValue(name, item.id);
                          setOpen(false);
                        }}
                      >
                        {item.name}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            item.id === field.value
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
