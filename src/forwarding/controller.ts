// src/forwarding/controller.ts
import { JsonController, Body,Post, HttpCode, NotFoundError } from 'routing-controllers'
import Forwarding from './entity'
import UrlTable from '../webhooks-url/entity'
import * as request from 'superagent'

// import { Timestamp } from 'typeorm';

@JsonController()

export default class ForwardingController {

    @Post('/postquizresult')
    @HttpCode(200)
    async createUrl(
    @Body() body: Forwarding) {
    
    const forwarding = new Forwarding()
        forwarding.qid = body.qobject.quiz_id
        forwarding.qobject = body.qobject
        console.log('forwarding.qobject: ', forwarding.qobject)
        // Now fetch the url from the other table.
        const address = await UrlTable.findOne({qid: forwarding.qid})

        // Send the object we recieved to the address from UrlTable
        if(address){
            await request
            .post(address.url)
            .send(forwarding.qobject)
            .then((result) => {
                if(result)
                forwarding.httpcode=200
                else
                forwarding.httpcode=404
            })
        
        forwarding.lasttry = 10
        forwarding.save()
    return 'Great! It worked...'
    }
    else {
        return true
    }
    }

    // To test our Webhook we create a fake endpoint as a server that sometimes fails...
    @Post('/testurl')
    @HttpCode(200)
    async sendResponse(
    @Body() body: any) {
        console.log('testurl/body', body)
        const thouShallPass = (Math.floor(Math.random()*20)%2==0)?true:false
        if (thouShallPass){
            return 'Webhook success!'
        } else {
            throw new NotFoundError
        }

    }

}


