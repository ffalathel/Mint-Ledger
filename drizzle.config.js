/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./schema.ts",
    dialect: 'postgresql',
    dbCredentials: {
      url: process.env.DATABASE_URL,
      
    }
  };