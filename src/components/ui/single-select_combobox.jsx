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

const weapons = [
  { value: "greatspear", label: "Greatspear" },
  { value: "death-knight-axe", label: "Death Knight Axe" },
  { value: "claymore", label: "Claymore" },
  { value: "longsword", label: "Longsword" },
  { value: "dagger", label: "Dagger" },
];

export function SingleSelectCombobox( { equipmentType } ) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const selectedWeapon = React.useMemo(
    () => weapons.find((weapon) => weapon.value === value),
    [value]
  );

  return (
    <div className="min-h-[5rem] max-h-[5rem] over-y-auto">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {selectedWeapon
              ? selectedWeapon.label
              : `Select ${equipmentType}...`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder={`Search ${equipmentType}...`}
            />
            <CommandList className="max-h-[200px]">
              <CommandEmpty>No weapon found.</CommandEmpty>
              <CommandGroup>
                {weapons.map((weapon) => (
                  <CommandItem
                    key={weapon.value}
                    value={weapon.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {weapon.label}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === weapon.value ? "opacity-100" : "opacity-0"
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
          <h3 className="text-lg font-semibold mb-2">Selected Weapons:</h3>
          <ul className="space-y-2">
            <li
              key={value}
              className="flex items-center justify-between bg-secondary p-2 rounded-md"
            >
              <span>{value}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setValue(value === value ? "" : currentValue)}
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
