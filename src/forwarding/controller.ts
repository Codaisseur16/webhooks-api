// src/webhooks-url/controller.ts
import { JsonController, Get, Param, Put, Body, NotFoundError,Post, HttpCode} from 'routing-controllers'
import Forwarding from './entity'
// import { Timestamp } from 'typeorm';


@JsonController()


export default class ForwardingController {


    @Post('/postquizresult')
    @HttpCode(201)
    createUrl(
    @Body() body: Forwarding) {
    
    const forwarding = new Forwarding()
    forwarding.qid = body.qid
    forwarding.qobject = body.qobject
    forwarding.httpcode = body.httpcode
    forwarding.lasttry = 0
    return forwarding.save()
    }

}

