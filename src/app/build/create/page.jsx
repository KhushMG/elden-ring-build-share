
import React from 'react'
import BuildCreation from '@/components/ui/BuildCreation'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { supabase } from '@/lib/supabase';

const CreateBuildPage = async () => {

 const [
   { data: weapons, error: weaponsError },
   { data: helmets, error: helmetsError },
   { data: chests, error: chestsError },
   { data: gauntlets, error: gauntletsError },
   { data: legs, error: legsError },
   { data: talismans, error: talismansError },
   { data: greatRunes, error: greatRunesError },
 ] = await Promise.all([
   supabase.from("weapons").select("name"),
   supabase.from("helmets").select("name"),
   supabase.from("chest_armor").select("name"),
   supabase.from("gauntlets").select("name"),
   supabase.from("legs").select("name"),
   supabase.from("talismans").select("name"),
   supabase.from("great_runes").select("name"),
 ]);

 // Handle errors if any exist
 if (
   weaponsError ||
   helmetsError ||
   chestsError ||
   gauntletsError ||
   legsError ||
   talismansError ||
   greatRunesError
 ) {
   console.error({
     weaponsError,
     helmetsError,
     chestsError,
     gauntletsError,
     legsError,
     talismansError,
     greatRunesError,
   });
   return <div>Error fetching data</div>;
 }

  return (
    <div className="flex flex-wrap justify-center items-center min-h-screen space-x-4">
      <div>
        <BuildCreation
          weapons={weapons}
          helmets={helmets}
          chests={chests}
          gauntlets={gauntlets}
          legs={legs}
          talismans={talismans}
          greatRunes={greatRunes}
        />
      </div>
    </div>
  );
}

export default CreateBuildPage