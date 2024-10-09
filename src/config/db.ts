import { Sequelize } from 'sequelize';
import dotenv from './dotenv';

const sequelize = new Sequelize(
  "",
  dotenv.DB_USER,
  dotenv.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql"
  }
);

(async () => {
  try {
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${dotenv.DB_NAME}\`;`);
    console.log(`Database '${dotenv.DB_NAME}' created.`);
    await sequelize.close();
    const sequelizeWithDB = new Sequelize(
      dotenv.DB_NAME,
      dotenv.DB_USER,
      dotenv.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: "mysql"
      }
    );
    
    
    await sequelizeWithDB.authenticate();
    console.log('Connect database success.');
    
    
    await sequelizeWithDB.sync();
    console.log('Table in database async success.');
    
  } catch (error) {
    console.error('Connect database failed:', error);
  }
})();
export default sequelize