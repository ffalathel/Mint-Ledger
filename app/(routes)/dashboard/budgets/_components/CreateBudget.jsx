"use client"
import React from 'react'
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
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import { Plus, Sparkles } from 'lucide-react'

function CreateBudget({refreshData}) {
    const[emojiIcon,setEmojiIcon]=useState('😄');
    const [openEmojiPicker,setOpenEmojiPicker]=useState(false);
    const [budgetName, setBudgetName] = useState('');
    const [budgetAmount, setBudgetAmount] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const{user}=useUser();

    const onCreateBudget =async()=>{
        if (!budgetName || !budgetAmount) return;
        
        setIsLoading(true);
        try {
            const result = await db.insert(Budgets)
            .values({
                name: budgetName,
                amount: budgetAmount,
                createdBy:user?.primaryEmailAddress?.emailAddress,
                icon: emojiIcon
            }).returning({insertedId:Budgets.id})

            if(result) {
                refreshData()
                toast.success('New Budget Created! 🎉');
                setBudgetName('');
                setBudgetAmount('');
            }
        } catch (error) {
            toast.error('Failed to create budget. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateBudget();
    }

  return (
    <div>
        <Dialog>
            <DialogTrigger asChild>
                <div className='group bg-gradient-to-br from-primary/5 to-green-100 p-8 rounded-xl border-2 border-dashed border-primary/30 cursor-pointer hover:shadow-lg hover:border-primary/50 transition-all duration-300 hover:-translate-y-1'>
                    <div className='flex flex-col items-center text-center'>
                        <div className='p-3 bg-primary/10 rounded-full mb-3 group-hover:bg-primary/20 transition-colors duration-300'>
                            <Plus className='h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300' />
                        </div>
                        <h2 className='text-lg font-semibold text-slate-800 mb-1'>Create New Budget</h2>
                        <p className='text-slate-600 text-sm'>Click to add a new budget category</p>
                    </div>
                </div>
            </DialogTrigger>
            
            <DialogContent className='bg-white max-w-md mx-auto'>
                <DialogHeader>
                    <DialogTitle className='text-xl font-bold text-slate-800 flex items-center gap-2'>
                        <Sparkles className='h-5 w-5 text-primary' />
                        Create New Budget
                    </DialogTitle>
                    <DialogDescription className='text-slate-600'>
                        Set up a new budget to track your spending
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
                                        onEmojiClick={(e) =>{
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
                        <label className='text-sm font-medium text-slate-700'>Budget Name</label>
                        <Input 
                            placeholder="e.g., Euro Trip, Groceries, Entertainment" 
                            value={budgetName}
                            onChange={(e)=>setBudgetName(e.target.value)}
                            className='h-11'
                        />
                    </div>

                    {/* Budget Amount */}
                    <div className='space-y-2'>
                        <label className='text-sm font-medium text-slate-700'>Budget Amount</label>
                        <Input 
                            type="number" 
                            placeholder="e.g., 4000" 
                            value={budgetAmount}
                            onChange={(e)=>setBudgetAmount(e.target.value)}
                            className='h-11'
                        />
                    </div>
                </form>

                <DialogFooter className="mt-6">
                    <DialogClose asChild>
                        <Button 
                            disabled={!(budgetName && budgetAmount) || isLoading} 
                            onClick={onCreateBudget}
                            className='w-full h-11 bg-primary hover:bg-primary/90 transition-colors duration-200'
                        >
                            {isLoading ? 'Creating...' : 'Create Budget'}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default CreateBudget
