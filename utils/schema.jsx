import { pgTable } from require("drizzle-orm/pg-core");

export const Budgets=pgTable('budget',{
   id:serial('id').primaryKey(),
   name:varchar('name').notNull(),
   amount:varchar('amount').notNull(),
   icon:varchar('icon'),
   createdBy:varchar("createdBy").notNull()
})