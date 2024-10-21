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

const allWeapons = [
  "Greatspear",
  "Death Knight Axe",
  "Claymore",
  "Longsword",
  "Dagger",
];

const availableTags = [
  "Strength, Dexterity, Intelligence, Faith, Arcane, Incantation, Sorcery, Magic, Fire, Bleed, Holy, Lightning, Frostbite",
];

export function Combobox() {
  const [open, setOpen] = React.useState(false);
  const [selectedWeapons, setSelectedWeapons] = React.useState([]);

  const availableWeapons = allWeapons.filter(
    (weapon) => !selectedWeapons.includes(weapon)
  );

  const toggleWeapon = (weapon) => {
    setSelectedWeapons((prev) =>
      prev.includes(weapon)
        ? prev.filter((w) => w !== weapon)
        : [...prev, weapon]
    );
  };

  return (
    <div className="min-h-[5rem] max-h-[5rem] over-y-auto space-y-4 space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {selectedWeapons.length > 0
              ? `${selectedWeapons.length} weapon(s) selected`
              : "Select weapon(s)..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search weapons..." />
            <CommandList>
              <CommandEmpty>No weapons found.</CommandEmpty>
              <CommandGroup>
                {availableWeapons.map((weapon) => (
                  <CommandItem
                    key={weapon}
                    onSelect={() => toggleWeapon(weapon)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedWeapons.includes(weapon)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {weapon}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedWeapons.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Selected Weapons:</h3>
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
                  onClick={() => toggleWeapon(weapon)}
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
