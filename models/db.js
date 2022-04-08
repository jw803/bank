import pkg from 'sequelize'
const { Sequelize } = pkg

//初始化MySQL連線
export const sequelize = new Sequelize({
  database: 'bank',
  dialect: 'mysql',
  username: 'root',
  password: 'paul803',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: console.log
})

//檢查是否連線成功

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  })