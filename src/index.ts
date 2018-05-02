import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import setupDb from './db'
import UrlController from './webhooks-url/controller'

const port = process.env.PORT || 4008

const app = createKoaServer({
  controllers: [
    UrlController
  ]
})

setupDb()
  .then(_ => {
    app.listen(port, () => console.log(`2 --> Listening on port ${port}`))
  })
  .catch(err => console.error(err))