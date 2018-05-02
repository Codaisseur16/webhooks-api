// src/webhooks-url/controller.ts
import { JsonController, Get, Param, Put, Body, NotFoundError,Post, HttpCode} from 'routing-controllers'
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
    
    return urltable.save()
    }

}

