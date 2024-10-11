"use client"
import { db } from '@/utils/dbConfig'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq, getTableColumns, sql } from 'drizzle-orm'
import React, { useEffect } from 'react'

function Expense({params}) {
  const {user}= useUser();
  useEffect(()=>{
    user&&getBudgetINfo();
  },[user])
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
          
          console.log(result)
    }
  return (
    <div className='p-10'>
        <h2 className='text-2xl font-bold'>My Expenses</h2>
    </div>
  )
}

export default Expense