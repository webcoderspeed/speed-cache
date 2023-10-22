import express from 'express'
import { ICreateServer } from '../../types/server.types'
import logger from '../logger'
import { errorHandler, notFound } from './middlewares/error.middlewares'
import routes from './routes/routes'

const createServer = ({ cache, options }: ICreateServer) => {
  const app = express()

  // setting up body parser
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  const PORT = options?.port ? options.port : 12996

  app.listen(PORT, async () => {
    logger.info(`SpeedCache server is running at port http://localhost:${PORT}`)

    routes(app, cache)

    // error handler
    app.use(notFound)
    app.use(errorHandler)
  })
}

export default createServer
