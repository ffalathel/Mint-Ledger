"use client"
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import ExpenseListTable from './_components/ExpenseListTable';
import { useUser } from '@clerk/nextjs';

function ExpensesScreen() {
  const [expensesList,setExpensesList]=useState([]);
  const {user}=useUser();

  useEffect(()=>{
    user&&getAllExpenses();
  },[user])
  
  /**
   * Used to get All expenses belong to users
   */
  const getAllExpenses=async()=>{
    const result=await db.select({
      id:Expenses.id,
      name:Expenses.name,
      amount:Expenses.amount,
      createdAt:Expenses.createdAt
    }).from(Budgets)
    .rightJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress.emailAddress))
    .orderBy(desc(Expenses.id));
    setExpensesList(result);
  }
  
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 lg:p-8'>
      <div className='mb-8'>
        <h1 className='font-bold text-4xl lg:text-5xl bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent mb-2'>
          My Expenses
        </h1>
        <p className='text-slate-600 text-lg max-w-2xl'>
          Track and manage all your expenses across different budget categories.
        </p>
      </div>

      <ExpenseListTable 
        refreshData={()=>getAllExpenses()}
        expensesList={expensesList}
      />
    </div>
  )
}

export default ExpensesScreen