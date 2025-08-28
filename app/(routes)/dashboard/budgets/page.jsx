import React from 'react'
import BudgetList from './_components/BudgetList'

function Budgets() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 lg:p-8'>
      <div className='mb-8'>
        <h1 className='font-bold text-4xl lg:text-5xl bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent mb-2'>
          My Budgets
        </h1>
        <p className='text-slate-600 text-lg max-w-2xl'>
          Create and manage your budgets to stay on track with your financial goals.
        </p>
      </div>
      <BudgetList/>
    </div>
  )
}

export default Budgets