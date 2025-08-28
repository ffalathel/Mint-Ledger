"use client"
import { Button } from '@/components/ui/button'
import { PenBox, Sparkles, Receipt, DollarSign } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { useUser } from '@clerk/nextjs'
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'

function EditBudget({budgetInfo,refreshData}) {
    const [emojiIcon,setEmojiIcon]=useState(budgetInfo?.icon);
    const [openEmojiPicker,setOpenEmojiPicker]=useState(false);
    const [name,setName]=useState();
    const [amount,setAmount]=useState();
    const [isLoading, setIsLoading] = useState(false);

    const {user}=useUser();

    useEffect(()=>{
        if(budgetInfo) {
            setEmojiIcon(budgetInfo?.icon)
            setAmount(budgetInfo.amount);
            setName(budgetInfo.name)
        }
    },[budgetInfo])

    const onUpdateBudget=async()=>{
        if (!name || !amount) return;
        
        setIsLoading(true);
        try {
            const result=await db.update(Budgets).set({
                name:name,
                amount:amount,
                icon:emojiIcon,
            }).where(eq(Budgets.id,budgetInfo.id))
            .returning();

            if(result) {
                refreshData()
                toast.success('Budget Updated Successfully! ✨')
            }
        } catch (error) {
            toast.error('Failed to update budget. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateBudget();
    }

  return (
    <div>
         <Dialog>
            <DialogTrigger asChild>
                <Button className="flex gap-2 bg-primary hover:bg-primary/90 transition-colors duration-200">
                    <PenBox className='h-4 w-4'/> 
                    Edit Budget
                </Button>
            </DialogTrigger>
            
            <DialogContent className='bg-white max-w-md mx-auto'>
                <DialogHeader>
                    <DialogTitle className='text-xl font-bold text-slate-800 flex items-center gap-2'>
                        <Sparkles className='h-5 w-5 text-primary' />
                        Update Budget
                    </DialogTitle>
                    <DialogDescription className='text-slate-600'>
                        Modify your budget details and settings
                    </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className='space-y-4 mt-4'>
                    {/* Emoji Picker */}
                    <div className='space-y-2'>
                        <label className='text-sm font-medium text-slate-700'>Choose Icon</label>
                        <div className='relative'>
                            <Button 
                                type="button"
                                variant="outline" 
                                className="text-2xl w-full h-12 hover:bg-primary/5 hover:border-primary/30 transition-colors duration-200" 
                                onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                            >
                                {emojiIcon}
                            </Button>
                            {openEmojiPicker && (
                                <div className='absolute z-50 top-full left-0 mt-2'>
                                    <EmojiPicker
                                        open={openEmojiPicker}
                                        onEmojiClick={(e)=>{
                                            setEmojiIcon(e.emoji)
                                            setOpenEmojiPicker(false)
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Budget Name */}
                    <div className='space-y-2'>
                        <label className='text-sm font-medium text-slate-700 flex items-center gap-2'>
                            <Receipt className='h-4 w-4 text-slate-500' />
                            Budget Name
                        </label>
                        <Input 
                            placeholder="e.g., Home Decor, Groceries" 
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            className='h-11'
                        />
                    </div>

                    {/* Budget Amount */}
                    <div className='space-y-2'>
                        <label className='text-sm font-medium text-slate-700 flex items-center gap-2'>
                            <DollarSign className='h-4 w-4 text-slate-500' />
                            Budget Amount
                        </label>
                        <Input
                            type="number"
                            placeholder="e.g., 5000" 
                            value={amount}
                            onChange={(e)=>setAmount(e.target.value)}
                            className='h-11'
                        />
                    </div>
                </form>

                <DialogFooter className="mt-6">
                    <DialogClose asChild>
                        <Button 
                            disabled={!(name && amount) || isLoading}
                            onClick={onUpdateBudget}
                            className="w-full h-11 bg-primary hover:bg-primary/90 transition-colors duration-200"
                        >
                            {isLoading ? 'Updating...' : 'Update Budget'}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
         </Dialog>
   </div>
  )
}

export default EditBudget