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


export function Combobox({ onWeaponsChange, equipmentType, weapons }) {
  const [open, setOpen] = React.useState(false);
  const [selectedWeapons, setSelectedWeapons] = React.useState([]);


  const availableWeapons = weapons.filter((tag) => !selectedWeapons.includes(tag));

  const toggleWeapon = (weapon) => {
    setSelectedWeapons((prev) => {
      const newSelectedWeapons = prev.includes(weapon)
        ? prev.filter((w) => w !== weapon)
        : [...prev, weapon];

      // Pass the updated weapons to the parent component
      onWeaponsChange(newSelectedWeapons);

      return newSelectedWeapons;
    });
  };

  return (
    <div className="min-h-[5rem] max-h-[5rem] w-[300px] ">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[300px] justify-between "
          >
            {selectedWeapons.length > 0
              ? `${selectedWeapons.length} + ${equipmentType}(s) selected`
              : `Select ${equipmentType}...`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search weapons..." />
            <CommandList className="max-h-[200px]">
              <CommandEmpty>No weapons found.</CommandEmpty>
              <CommandGroup>
                {availableWeapons.map((weapon) => (
                  <div key={weapon} className="">
                    <CommandItem
                      key={weapon}
                      onSelect={() => toggleWeapon(weapon)}
                    >
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedWeapons.includes(weapon)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                        color="green"
                      />
                      {weapon.toUpperCase()}
                    </CommandItem>
                  </div>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedWeapons.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-green-700">
            Selected Weapons:
          </h3>
          <ul className="space-y-2">
            {selectedWeapons.map((weapon) => (
              <li
                key={weapon}
                className="flex items-center justify-between bg-secondary p-2 rounded-md"
              >
                <span>{weapon}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    toggleWeapon(weapon);
                  }}
                  className="hover:bg-destructive hover:text-destructive-foreground"
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
