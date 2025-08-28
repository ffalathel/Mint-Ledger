import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema';
import React, { useState } from 'react'
import { toast } from 'sonner';
import { Budgets } from '@/utils/schema';
import { Plus, Receipt, DollarSign } from 'lucide-react';

function AddExpense({budgetId, user, refreshData}) {
  const [name, setBudgetName] = useState('');
  const [amount, setBudgetAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addNewExpense = async () => {
    if (!name || !amount) return;
    
    setIsLoading(true);
    try {
      const result = await db.insert(Expenses).values({
          name: name,
          amount: amount,
          budgetId: budgetId,
          createdAt: user?.primaryEmailAddress?.emailAddress, 
      }).returning({ insertedId: Budgets.id });

      if(result) {
          refreshData();
          toast.success('New Expense Added! 💰');
          setBudgetName('');
          setBudgetAmount('');
      }
    } catch (error) {
      toast.error('Failed to add expense. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && name && amount) {
      addNewExpense();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewExpense();
  };

  return (
    <div className='bg-white rounded-2xl shadow-lg border border-slate-200 p-6'>
      <div className='flex items-center gap-3 mb-6'>
        <div className='p-2 bg-primary/10 rounded-lg'>
          <Plus className='h-5 w-5 text-primary' />
        </div>
        <div>
          <h2 className='font-bold text-xl text-slate-800'>Add New Expense</h2>
          <p className='text-slate-600 text-sm'>Track your spending in this budget</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='space-y-2'>
          <label className='text-sm font-medium text-slate-700 flex items-center gap-2'>
            <Receipt className='h-4 w-4 text-slate-500' />
            Expense Name
          </label>
          <Input 
            placeholder="e.g., Groceries, Coffee, Transportation" 
            value={name}
            onChange={(e) => setBudgetName(e.target.value)}
            onKeyDown={handleKeyDown}
            className='h-11'
          />
        </div>
        
        <div className='space-y-2'>
          <label className='text-sm font-medium text-slate-700 flex items-center gap-2'>
            <DollarSign className='h-4 w-4 text-slate-500' />
            Expense Amount
          </label>
          <Input 
            type="number" 
            placeholder="e.g., 25.50" 
            value={amount}
            onChange={(e) => setBudgetAmount(e.target.value)}
            onKeyDown={handleKeyDown}
            className='h-11'
          />
        </div>
        
        <Button 
          disabled={!(name && amount) || isLoading} 
          onClick={addNewExpense}
          className='w-full h-11 bg-primary hover:bg-primary/90 transition-colors duration-200 mt-6'
        >
          {isLoading ? 'Adding...' : 'Add New Expense'}
        </Button>
      </form>
    </div>
  );
}

export default AddExpense;
