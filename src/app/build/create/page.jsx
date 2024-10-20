'use client'
import React from 'react'
import { supabase } from '@/lib/supabase'
import { useUser } from '@clerk/nextjs'
import { useState } from 'react'

const availableTags = ['Strength, Dexterity, Intelligence, Faith, Arcane, Incantation, Sorcery, Magic, Fire, Bleed, Holy, Lightning, Frostbite']

const CreateBuildPage = () => {
  return (
    <div>CreateBuildPage</div>
  )
}

export default CreateBuildPage