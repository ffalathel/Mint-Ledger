"use client"
import { db } from '@/utils/dbConfig'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import {eq, getTableColumns, sql } from 'drizzle-orm'
import React, { useEffect } from 'react'
import { useState } from 'react'
import BudgetItem from './BudgetItem'
import CreateBudget from './CreateBudget'

function BudgetList() {
  const [budgetList, setBudgetList]=useState([]);
  const {user}=useUser();
  useEffect(()=>{
    user&&getBudgetList();
  },[user])
  const getBudgetList= async()=>{
    const result=await db.select({
      ...getTableColumns(Budgets),
      totalSpend: sql `sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql `sum(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
    .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetid))
    .where(eq(Budgets.createdBy,user.primaryEmailAddress?.emailAddress))
    .groupBy(Budgets.id)
    setBudgetList(result);

  }
  return (
    <div className='mt-7'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'> 
            <CreateBudget/>
            {budgetList.map((budget,index)=>(
              <BudgetItem budget={budget}/>
            ))}
        </div>
    </div>
  )
}

export default BudgetList