// src/forwarding/controller.ts
import { JsonController, Body,Post, HttpCode, NotFoundError, Get } from 'routing-controllers'
import Forwarding from './entity'
import UrlTable from '../webhooks-url/entity'
import * as request from 'superagent'




const sendToUrl = (url,tosave) => {
    request
        .post(url)
        .send(tosave.qobject)
        .then((response)=> {
            tosave.httpcode=response.status
            tosave.save()
        })
        .catch((error: any) =>{
            tosave.httpcode=error.status
            tosave.save()
        })
}

export const retryFunction = async () => {

    const quizzesWith404Code = await Forwarding.find({httpcode: 404})
    //Send each one again
    
     quizzesWith404Code.forEach(
        async abcd => {
            console.log('Retrying...' )
        const address = await UrlTable.findOne({qid: abcd.qid})
            if(address)
            return sendToUrl(address.url,abcd)
        }

    )
    setTimeout(retryFunction,10000)
    
}


@JsonController()

export default class ForwardingController {

    @Post('/postquizresult')
    @HttpCode(200)
    async createUrl(
    @Body() body: Forwarding) {
    
    const forwarding = new Forwarding()
  
        forwarding.qid = body.qobject.quiz_id
        forwarding.qobject = body.qobject

        // Now fetch the url from the other table.
        const address = await UrlTable.findOne({qid: forwarding.qid})
        
        // Send the object we recieved to the address from UrlTable
        if(address){
            await sendToUrl(address.url,forwarding)
        }
        else {return 'Thankyou! But no webhook assigned to this quiz!'}
        return 'Kthnxbi :)'
        
    }

    // To test our Webhook we create a fake endpoint as a server that sometimes fails...
    @Post('/testurl')
    @HttpCode(200)
    async sendResponse(
    @Body() body: any) {
        console.log('testurl/body', body)
        const thouShallPass = (Math.floor(Math.random()*20)%2==0)?true:false
        if (thouShallPass===true){
            return 'Thanks!'
        } else {
            throw new NotFoundError
        }

    }

}



