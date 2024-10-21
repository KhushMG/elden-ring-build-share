'use client'
import React from 'react'
import { supabase } from '@/lib/supabase'
import { useUser} from '@clerk/nextjs'
import { useState } from 'react'
import { redirect } from 'next/navigation'
import { Combobox } from '@/components/ui/combobox'
import { SingleSelectCombobox } from '@/components/ui/single-select_combobox'
import BuildCreation from '@/components/ui/BuildCreation'

const availableTags = ['Strength, Dexterity, Intelligence, Faith, Arcane, Incantation, Sorcery, Magic, Fire, Bleed, Holy, Lightning, Frostbite']

const CreateBuildPage = () => {
  const { isSignedIn, user, isLoaded } = useUser()
  const [selectedTags, setSelectedTags] = useState([])
  const [buildName, setBuildName] = useState('')

  if (isLoaded && !user) { 
    redirect('/sign-in')
  }

  const toggleTag = (tag) => { 
    setSelectedTags((prevTags) => {
      prevTags.includes(tag) 
      ? prevTags.filter((t) => t !== tag)
      : [...prevTags, tag]
    });
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    const {data, error} = await supabase.from('builds'.insert({
      clerk_user_id: user.id,
      build_name: buildName,
      tags: selectedTags,
    }));
    if (error) console.error(error.message);
  }

  return (
    <div className="flex flex-wrap justify-center items-center min-h-screen space-x-4">
      <div>
        <BuildCreation/>
      </div>
    </div>
  );
}

export default CreateBuildPage