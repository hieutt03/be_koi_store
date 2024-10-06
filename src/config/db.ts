import {Sequelize} from 'sequelize';
import dotenv from './dotenv';

const sequelize = new Sequelize(
    dotenv.DB_NAME,
    dotenv.DB_USER,
    dotenv.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql"
    }
);
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        
        await sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${dotenv.DB_NAME}\`;`);
        console.log(`Database '${dotenv.DB_NAME}' created or already exists.`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
export default sequelize;