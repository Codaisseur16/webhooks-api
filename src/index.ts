import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import setupDb from './db'
import UrlController from './webhooks-url/controller'
import ForwardingController from './forwarding/controller';

const port = process.env.PORT || 4004

const app = createKoaServer({
  controllers: [
    UrlController,
    ForwardingController
  ]
})

setupDb()
  .then(_ => {
    app.listen(port, () => console.log(`2 --> Listening on port ${port}`))
  })
  .catch(err => console.error(err))