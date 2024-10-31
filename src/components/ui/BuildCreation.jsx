"use client"
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { SingleSelectCombobox } from "@/components/ui/single-select_combobox";
import { TagsCombobox } from "./TagsCombobox";
import { useState } from "react";

import { useUser, useAuth } from "@clerk/nextjs";

import { BuildDialog } from './BuildDialog';
import { supabase } from '@/lib/supabase';
import { Button } from './button';


export default function BuildCreation({ weapons, helmets, chests, gauntlets, legs, talismans, greatRunes}) {

  // supabase query returns array of objects with "name" field
  // This is just getting the list of strings.
  weapons = weapons.map((weapon) => weapon.name);
  talismans = talismans.map((talisman) => talisman.name);
  helmets = helmets.map((helmet) => helmet.name);
  chests = chests.map((chest) => chest.name);
  gauntlets = gauntlets.map((gauntlet) => gauntlet.name);
  legs = legs.map((leg) => leg.name);
  greatRunes = greatRunes.map((greatRune) => greatRune.name);
  

  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  if (isLoaded && !user) {
    redirect("/sign-in");
  }

  const createBuild = async () => { 
    const token = await getToken({ template: "supabase" });
    try {
      const build = {
      clerk_user_id: user.id,
      build_name: buildName || "New build",
      stats: "No stats selected",
      weapons: selectedWeapons || "No weapons were selected",
      armor: { 
        helmet: selectedHelmet,
        chest: selectedChest,
        gauntlets: selectedGauntlets,
        legs: selectedLegs,
        buffs: "",
        created_at: Date.now(),
        tags: selectedTags
      }
    };
    supabase.auth.setSession({access_token})
    const { data, error } = await supabase.from("builds").insert(build);
    
    if (error) { 
      console.error("error inserting build ", error.message)
    } else { 
      console.log("Build Created ", data)
    }
    } catch (error) {
       console.error(
         "Error with Clerk auth or Supabase insert:",
         error.message
       );
    }
    
  }

  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedWeapons, setSelectedWeapons] = useState([]);
  const [selectedGreatRune, setSelectedGreatRune] = useState("");
  const [selectedTalismans, setSelectedTalismans] = useState([]);
  const [selectedHelmet, setSelectedHelmet] = useState("");
  const [selectedChest, setSelectedChest] = useState("");
  const [selectedGauntlets, setSelectedGauntlets] = useState("");
  const [selectedLegs, setSelectedLegs] = useState("");
  const [buildName, setBuildName] = useState("")

  const handleTagsChange = (tags) => {
    setSelectedTags(tags);
  };

  const handleWeaponsChange = (weapons) => {
    setSelectedWeapons(weapons);
  };

  const handleTalismanChange = (talismans) => {
    setSelectedTalismans(talismans);
  };

  const handleGreatRuneChange = (greatRune) => {
    setSelectedGreatRune(greatRune);
  };

  const handleHelmetChange = (helmet) => {
    setSelectedHelmet(helmet);
  };

  const handleChestChange = (chest) => {
    setSelectedChest(chest);
  };

  const handleGauntletChange = (gauntlet) => {
    setSelectedGauntlets(gauntlet);
  };

  const handleLegsChange = (leg) => {
    setSelectedLegs(leg);
  };

  const handleBuildNameChange = (buildName) => { 
    setBuildName(buildName)
  }

  {/* Test useEffect for Watching All Selections */}
  useEffect(() => {
    console.log("State changed:", {
      selectedTags,
      selectedWeapons,
      selectedTalismans,
      selectedGreatRune,
      selectedHelmet,
      selectedChest,
      selectedGauntlets,
      selectedLegs,
      buildName,
    });
  }, [
    selectedTags,
    selectedWeapons,
    selectedTalismans,
    selectedGreatRune,
    selectedHelmet,
    selectedChest,
    selectedGauntlets,
    selectedLegs,
    buildName
  ]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex space-x-4 mb-4">
        <h1 className="text-2xl font-bold">
          {buildName ? `${buildName}` : "Build Name"}
        </h1>
        <BuildDialog onBuildNameChange={handleBuildNameChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-gray-400 h-[300px] flex flex-col ">
          <CardHeader>
            <CardTitle>Select Build Tags</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden ">
            <div className="bg-gray-100 h-full rounded-md overflow-y-auto overflow-x-hidden w-[400px]">
              <TagsCombobox onTagsChange={handleTagsChange} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-400 h-[300px] flex flex-col">
          <CardHeader>
            <CardTitle>Select Talismans</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden">
            <div className="bg-gray-100 h-full rounded-md overflow-y-auto overflow-x-hidden">
              <Combobox
                onWeaponsChange={handleTalismanChange}
                equipmentType={"Talisman"}
                weapons={talismans}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-400 h-[300px] flex flex-col">
          <CardHeader>
            <CardTitle>Select Great Rune</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden">
            <SingleSelectCombobox
              onSelectionChange={handleGreatRuneChange}
              equipmentType={"Great Rune"}
              equipment={greatRunes}
            />
          </CardContent>
        </Card>

        <Card className="border-gray-400 h-[300px] flex flex-col">
          <CardHeader>
            <CardTitle>Select Weapons</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden">
            <div className="bg-gray-100 h-full rounded-md overflow-y-auto overflow-x-hidden">
              <Combobox
                onWeaponsChange={handleWeaponsChange}
                weapons={weapons}
                equipmentType={"Weapons"}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-400 h-[300px] flex flex-col col-span-full ">
          <CardHeader>
            <CardTitle>Select Armor</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 h-full">
              <div className="flex flex-col">
                <h3 className="font-semibold mb-1 text-xl">Select helmet</h3>
                <div className="bg-gray-100 flex-grow rounded-md overflow-y-auto">
                  <SingleSelectCombobox
                    onSelectionChange={handleHelmetChange}
                    equipmentType={"Helmet"}
                    equipment={helmets}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <h3 className="font-semibold mb-1 text-xl">
                  Select chestpiece
                </h3>
                <div className="bg-gray-100 flex-grow rounded-md overflow-y-auto">
                  <SingleSelectCombobox
                    onSelectionChange={handleChestChange}
                    equipmentType={"Chest Armor"}
                    equipment={chests}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <h3 className="font-semibold mb-1 text-xl">Select gauntlets</h3>
                <div className="bg-gray-100 flex-grow rounded-md overflow-y-auto">
                  <SingleSelectCombobox
                    equipmentType={"Gauntlets"}
                    equipment={gauntlets}
                    onSelectionChange={handleGauntletChange}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <h3 className="font-semibold mb-1 text-xl">Select leg armor</h3>
                <div className="bg-gray-100 flex-grow rounded-md overflow-y-auto">
                  <SingleSelectCombobox
                    equipment={legs}
                    onSelectionChange={handleLegsChange}
                    equipmentType={"Legs"}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-center sm:justify-end mt-4">
        <Button
          variant="outline"
          className="border-gray-300 border-2 hover:bg-black hover:text-white transition ease-in-out duration-200"
          onClick={createBuild}
        >
          Create Build
        </Button>
      </div>
    </div>
  );
}
