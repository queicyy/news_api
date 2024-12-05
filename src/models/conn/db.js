import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  `postgres://postgres.${process.env.SUPABASE_PUBLIC_KEY}:${process.env.SUPABASE_PWD}@aws-0-sa-east-1.pooler.supabase.com:6543/postgres`,
  {
    host: `${process.env.SUPABASE_URL}`,
    dialect: "postgres",
    dialectOptions: {
      timezone: "-03:00"
    }
  }
);

export default sequelize;
