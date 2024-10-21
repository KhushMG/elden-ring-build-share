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

const allTags = [
  "Strength",
  "Dexterity",
  "Intelligence",
  "Faith",
  "Arcane",
  "Incantation",
  "Sorcery",
  "Magic",
  "Fire",
  "Bleed",
  "Holy",
  "Lightning",
  "Frostbite",
];


export function TagsCombobox() {
  const [open, setOpen] = React.useState(false);
  const [selectedTags, setselectedTags] = React.useState([]);

  const availableTags = allTags.filter(
    (tag) => !selectedTags.includes(tag)
  );

  const toggleTags = (weapon) => {
    setselectedTags((prev) =>
      prev.includes(weapon)
        ? prev.filter((w) => w !== weapon)
        : [...prev, weapon]
    );
  };

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
            {selectedTags.length > 0
              ? `${selectedTags.length} tag(s) selected`
              : "Select tag(s)..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search tags..." />
            <CommandList className="max-h-[200px]">
              <CommandEmpty>No weapons found.</CommandEmpty>
              <CommandGroup>
                {availableTags.map((tag) => (
                  <CommandItem
                    key={tag}
                    onSelect={() => toggleTags(tag)}
                  >
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedTags.includes(tag)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {tag}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedTags.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Selected Tags:</h3>
          <ul className="space-y-2">
            {selectedTags.map((tag) => (
              <li
                key={tag}
                className="flex items-center justify-between bg-secondary p-2 rounded-md"
              >
                <span>{tag}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleTags(tag)}
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
