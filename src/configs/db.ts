import { Sequelize } from 'sequelize'

const sequelizeConnection = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite3'
})

export default sequelizeConnection
