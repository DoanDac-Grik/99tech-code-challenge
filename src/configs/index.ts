import * as yup from 'yup';

require('dotenv').config();

export interface Config {
  HOST: string;
  PORT: number;
  MONGO_URL: string;
  DEBUG_DB: boolean;
}

export const configSchema: yup.ObjectSchema<Config> = yup.object({
  HOST: yup.string().default('localhost'),
  PORT: yup.number().default(3000),
  MONGO_URL: yup.string().default('mongodb://localhost:27017'),
  DEBUG_DB: yup.boolean().default(false),
});

const config = configSchema.validateSync(process.env, {
  stripUnknown: true,
});

export default config;
