// src/webhooks-url/controller.ts
import { JsonController, Put, Body,Post, HttpCode } from 'routing-controllers'
import UrlTable from './entity'

@JsonController()

export default class UrlController {

    @Post('/postquizwh')
    @HttpCode(201)
    createUrl(
    @Body() body: UrlTable) {
    
    const urltable = new UrlTable()
        urltable.qid = body.qid
        urltable.url = body.url
        urltable.save()
        return 'Webhook URL was saved.'
    }

    @Put('/editwebhook')
    @HttpCode(200)
    async updateWebhook(
    @Body() body: UrlTable){

    const urltable = await UrlTable.findOne({qid: body.qid})
    if(urltable) {
        urltable.qid = body.qid
    urltable.url = body.url
    urltable.save()
    return 'Edit saved in Webhook DB. Thank you.'
    }
    return 'Something broke, please try again...'
  }

}

