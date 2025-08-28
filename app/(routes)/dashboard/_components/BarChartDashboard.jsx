import React from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartDashboard({budgetList}) {
  return (
    <div className='bg-white rounded-2xl shadow-lg border border-slate-200 p-6'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h2 className='font-bold text-xl text-slate-800'>Budget vs Spending</h2>
          <p className='text-slate-600 text-sm mt-1'>Track your budget allocation and actual spending</p>
        </div>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 bg-red-500 rounded-full'></div>
            <span className='text-sm text-slate-600'>Spent</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 bg-primary rounded-full'></div>
            <span className='text-sm text-slate-600'>Budget</span>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={budgetList}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#64748b' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#64748b' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Bar 
            dataKey="totalSpend" 
            stackId="a" 
            fill="#ef4444"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="amount" 
            stackId="a" 
            fill="#2C5F34"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChartDashboard