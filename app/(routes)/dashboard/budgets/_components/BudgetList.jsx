import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { getTableColumns } from 'drizzle-orm'
import React from 'react'
import CreateBudget from './CreateBudget'

function BudgetList() {

  const getBudgetList= async()=>{
    
    const result=await db.select({
      ...getTableColumns(Budgets),
      totalSpend: sql `sum(${Epenses.amount})`.mapWith(Number),
      totalItem: sql `sum(${Epenses.id})`.mapWith(Number)
    }).from(Budgets)
    .leftjoin(Expenses,eq(Budgets.id,Expenses.budgetid))
    .groupBy(Budgets.id)
  }
  return (
    <div className='mt-7'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'> 
            <CreateBudget/>
        </div>
    </div>
  )
}

export default BudgetList