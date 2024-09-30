import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
const sql = neon('postgresql://budget_owner:FAPrJ3nVq6OE@ep-billowing-rice-a537lhs6.us-east-2.aws.neon.tech/budget?sslmode=require');
export const db = drizzle(sql,{schema});



