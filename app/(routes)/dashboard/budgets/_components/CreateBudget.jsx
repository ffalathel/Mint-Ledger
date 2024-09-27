"use client"
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Input } from "@/components/ui/input"

  

function createBudget() {
    const[emojiIcon,setEmojiIcon]=useState('😄');
    const [openEmojiPicker,setOpenEmojiPicker]=useState(false);
  return (
    <div>
        <Dialog>
                <DialogTrigger asChild>
                <div className='bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md'>
                            <h2 className='text-3xl'>+</h2>
                            <h2>Create New Budget</h2>
                        </div>
                </DialogTrigger>
                <DialogContent className='bg-white'>
                <DialogHeader>
                <DialogTitle>Create New Budget</DialogTitle>
                <DialogDescription>
                    <div className='mt-5'>
                        <Button variant="outline" className= "text-lg" onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>{emojiIcon}</Button>
                        <div className='absolute'>
                            <EmojiPicker
                            open={openEmojiPicker}
                            onEmojiClick={(e) =>{
                                setEmojiIcon(e.emoji)
                                setOpenEmojiPicker(false)
                            }}
                            />
                        </div>
                        <div className='mt-2'>
                            <h2 className='text-black font-medium my-1'>Budget Name</h2>
                            <Input placeholder="ex: Euro Trip"/>
                        </div>
                        <div className='mt-2'>
                            <h2 className='text-black font-medium my-1'>Budget Amount</h2>
                            <Input placeholder="ex: $4000"/>
                        </div>
                        <Button className='mt-5 w-full'>Create Budget</Button>
                    </div>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
                </Dialog>
    </div>
  )
}

export default createBudget
