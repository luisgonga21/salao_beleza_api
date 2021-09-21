import "reflect-metadata"
import express from 'express'
import routes from './routes'
import './database/index'

const server = express()

server.use(express.json())
server.use(routes)


server.listen(process.env.PORT, () => {
  console.log('server started on port 3333' )
})

