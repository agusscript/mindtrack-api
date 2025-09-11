import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ENVIRONMENT } from './environment.enum';

dotenv.config();

const production: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
};

const development: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
};

export const datasourceOptions: DataSourceOptions = (() => {
  if (process.env.NODE_ENV === ENVIRONMENT.PRODUCTION) {
    return production;
  }

  if (process.env.NODE_ENV === ENVIRONMENT.DEVELOPMENT) {
    return development;
  }

  throw new Error(
    'Please choose "production" or "development" as your environment',
  );
})();

export default new DataSource({
  ...datasourceOptions,
  entities: ['./src/**/entity/*.entity.ts'],
});
