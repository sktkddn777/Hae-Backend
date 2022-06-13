import { join } from 'path';
import { DataSource } from 'typeorm';
import config from '../config/index';

const entitiesPath = join(__dirname, '../**/entities/*{.ts,.js}');
const { db } = config;

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: db.host,
  port: db.port,
  username: db.user,
  password: db.password,
  database: db.database,
  // synchronize: true, // 개발단계에서만 사용
  logging: true,
  entities: [entitiesPath],
  subscribers: [],
  migrations: [], // Todo: migrations
});

export default () => {
  AppDataSource.initialize()
    .then(() => {
      console.log('typeorm initialize');
    })
    .catch((error) => console.log(error));
};
