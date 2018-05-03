// src/forwarding/controller.ts
import { JsonController, Body,Post, HttpCode} from 'routing-controllers'
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
            request
            .post(address.url)
            .send(forwarding.qobject)
            .end((err, res) => {
                if(res)
                console.log(res)
                else
                console.log(err)
            })
        }
        else {console.log('error')}
        forwarding.httpcode = body.httpcode
        forwarding.lasttry = 0
        forwarding.save()
    return 'Great! It worked...'

    }

}


