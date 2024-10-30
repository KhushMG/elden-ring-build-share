"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { SingleSelectCombobox } from "@/components/ui/single-select_combobox";
import { TagsCombobox } from "./TagsCombobox";
import { useState } from "react";

import { useUser } from "@clerk/nextjs";

export default function BuildCreation({ weapons, helmets, chests, gauntlets, legs, talismans}) {

  // supabase query returns array of objects with "name" field
  // This is just getting the list of strings.
  weapons = weapons.map((weapon) => weapon.name);
  talismans = talismans.map((talisman) => talisman.name);
  helmets = helmets.map((helmet) => helmet.name);
  chests = chests.map((chest) => chest.name);
  gauntlets = gauntlets.map((gauntlet) => gauntlet.name);
  legs = legs.map((leg) => leg.name);

  const { user, isLoaded } = useUser();
  if (isLoaded && !user) {
    redirect("/sign-in");
  }

  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedWeapons, setSelectedWeapons] = useState([]);
  const [selectedGreatRune, setSelectedGreatRune] = useState("");
  const [selectedTalismans, setSelectedTalismans] = useState([]);
  const [selectedHelmet, setSelectedHelmet] = useState("");
  const [selectedChest, setSelectedChest] = useState("");
  const [selectedGauntlets, setSelectedGauntlets] = useState("");
  const [selectedLegs, setSelectedLegs] = useState("");

  const handleTagsChange = (tags) => {
    setSelectedTags(tags);
  };

  const handleWeaponsChange = (weapons) => {
    setSelectedWeapons(weapons);
  };

  const handleTalismanChange = (talismans) => {
    setSelectedWeapons(talismans);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Build Name</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Select Build Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 h-48 rounded-md overflow-y-auto">
              <TagsCombobox onTagsChange={handleTagsChange} />
            </div>
          </CardContent>
        </Card>
        <Card className="">
          <CardHeader>
            <CardTitle>Select Talismans</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <SingleSelectCombobox 
              onSelectionChange={handleTalismanChange}
              equipmentType={"Talismans"} 
              equipment={talismans}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Select Great Rune</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <SingleSelectCombobox equipmentType={"Great Rune"} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Select Weapons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 h-48 rounded-md overflow-y-auto">
              <Combobox
                onWeaponsChange={handleWeaponsChange}
                weapons={weapons}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="sm:min-w-[78.4vw]">
          <CardHeader>
            <CardTitle>Select Armor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-x-[2rem]">
              <div>
                <h3 className="font-semibold mb-1">Select helmet</h3>
                <div className="bg-gray-100 h-24 rounded-md">
                  <SingleSelectCombobox equipmentType={"Helmet"} />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Select chestpiece</h3>
                <div className="bg-gray-100 h-24 rounded-md">
                  <SingleSelectCombobox equipmentType={"Chest Armor"} />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Select gauntlets</h3>
                <div className="bg-gray-100 h-24 rounded-md">
                  <SingleSelectCombobox equipmentType={"Gauntlets"} />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Select leg armor</h3>
                <div className="bg-gray-100 h-24 rounded-md">
                  <SingleSelectCombobox equipmentType={"Legs"} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
