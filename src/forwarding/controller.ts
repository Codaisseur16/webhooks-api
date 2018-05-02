// src/forwarding/controller.ts
import { JsonController, Body,Post, HttpCode} from 'routing-controllers'
import Forwarding from './entity'
import UrlTable from '../webhooks-url/entity'

// import { Timestamp } from 'typeorm';

@JsonController()

export default class ForwardingController {

    @Post('/postquizresult')
    @HttpCode(200)
    async createUrl(
    @Body() body: Forwarding) {
    
    const forwarding = new Forwarding()
        forwarding.qid = body.qid
        forwarding.qobject = body.qobject
        // Now fetch the url from the other table.
        const address = await UrlTable.findOne({qid: body.qid})
        // Because we imported the entity we don't need to use @Get to find the ID.

        forwarding.httpcode = body.httpcode
        forwarding.lasttry = 0
        forwarding.save()
    return 'Thank you, bye bye...'

    }

}

