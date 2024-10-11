"use client"
import { db } from '@/utils/dbConfig'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq, getTableColumns, sql } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import BudgetItem from '../../budgets/_components/BudgetItem'

function Expense({params}) {
  const [budgetInfo, setBudgetInfo]=useState();
  const {user}= useUser();
  useEffect(()=>{
    user&&getBudgetINfo();
  },[user]);
    const getBudgetINfo = async()=>{
        const result=await db.select({
            ...getTableColumns(Budgets),
            totalSpend: sql `sum(${Expenses.amount})`.mapWith(Number),
            totalItem: sql `sum(${Expenses.id})`.mapWith(Number)
          }).from(Budgets)
          .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetid))
          .where(eq(Budgets.createdBy,user.primaryEmailAddress?.emailAddress))
          .where(eq(Budgets.id,params.id))
          .groupBy(Budgets.id)
          setBudgetInfo(result[0]);
          
    }
  return (
    <div className='p-10'>
        <h2 className='text-2xl font-bold'>My Expenses</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 mt-6'>
            <BudgetItem budget={budgetInfo}/>

        </div>
    </div>
  )
}

export default Expense