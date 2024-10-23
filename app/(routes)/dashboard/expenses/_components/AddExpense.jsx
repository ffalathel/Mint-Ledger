import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema';
import React, { useState } from 'react'
import { toast } from 'sonner';
import { Budgets } from '@/utils/schema';

function AddExpense({budgetId, user, refreshData}) {
  const [name, setBudgetName] = useState('');
  const [amount, setBudgetAmount] = useState('');

  const addNewExpense = async () => {
    const result = await db.insert(Expenses).values({
        name: name,
        amount: amount,
        budgetId: budgetId,
        createdAt: user?.primaryEmailAddress?.emailAddress, 
    }).returning({ insertedId: Budgets.id });

    console.log(result);
    if(result) {
        refreshData();
        toast('New Expense Added');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && name && amount) {
      addNewExpense(); // Trigger the same action on Enter
    }
  };

  return (
    <div className='border p-5 rounded-lg'>
      <h2 className='font-bold text-lg'>Add Expense</h2>
      <div className='mt-2'>
        <h2 className='text-black font-medium my-1'>Expense Name</h2>
        <Input 
          placeholder="ex: Clothes" 
          onChange={(e) => setBudgetName(e.target.value)}
          onKeyDown={handleKeyDown} // Add onKeyDown event for Enter key
        />
      </div>
      <div className='mt-2'>
        <h2 className='text-black font-medium my-1'>Expense Amount</h2>
        <Input 
          type="number" 
          placeholder="ex: $400" 
          onChange={(e) => setBudgetAmount(e.target.value)}
          onKeyDown={handleKeyDown} // Add onKeyDown event for Enter key
        />
      </div>
      <Button 
        disabled={!(name && amount)} 
        onClick={() => addNewExpense()} // Button click triggers the same function
        className='mt-3 w-full'>
        Add New Expense
      </Button>
    </div>
  );
}

export default AddExpense;
