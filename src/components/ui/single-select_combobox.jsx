"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

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


export function SingleSelectCombobox( { onSelectionChange, equipmentType, equipment = [] } ) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const availableItems = equipment.filter(val => val !== value);

  const selectedItem = React.useMemo(
    () => equipment?.find((weapon) => weapon.value === value) || null,
    [equipment, value]
  );

 const toggleSelection = (item) => {
   const newValue = item === value ? "" : item; 
   setValue(newValue);
 };

  React.useEffect(() => {
    onSelectionChange(value);
  }, [value, onSelectionChange]);

  return (
    <div className="sm:min-h-[5rem] sm:max-h-[5rem]">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="sm:w-[250px] gap-x-4"
          >
            {selectedItem ? selectedItem.label : `Select ${equipmentType}...`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0">
          <Command>
            <CommandInput placeholder={`Search ${equipmentType}(s)...`} />
            <CommandList className="max-h-[200px]">
              <CommandEmpty>{`No ${equipmentType}(s) found.`}</CommandEmpty>
              <CommandGroup>
                {availableItems?.map((item) => (
                  <CommandItem
                    key={item}
                    value={item}
                    onSelect={() => {
                      toggleSelection(item);
                      setOpen(false);
                    }}
                  >
                    {item.toUpperCase()}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === item ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {value && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-green-700">{`Selected ${equipmentType}:`}</h3>
          <ul className="space-y-2">
            <li
              key={value}
              className="flex items-center justify-between bg-secondary p-2 rounded-md"
            >
              <span>{value}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setValue("");
                  onSelectionChange("");
                }}
                className="hover:bg-destructive hover:text-destructive-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
