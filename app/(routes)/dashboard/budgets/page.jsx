import React from 'react'
import BudgetList from './_components/BudgetList'

function Budgets() {
  return (
    <div>
       <h2 className='font-bold text-3xl ml-5'>My Budgets</h2> 
        <BudgetList/>
    </div>
  )
}

export default Budgets