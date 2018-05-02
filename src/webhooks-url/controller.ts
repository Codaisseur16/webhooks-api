// src/webhooks-url/controller.ts
import { JsonController, Put, Get, Body,Post, HttpCode, Param} from 'routing-controllers'
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
    return 'Saved!'
    }


    // @Put('/games/:id')
    // async updateGame(@Param('id') id: number,@Body() update : {name: string, color: string, board: string[][]}) {

    //     const game = await Game.findOne(id)
    //     if (!game) throw new NotFoundError('This is not the game you are looking for...')
    //     console.log('');
    //     console.log('---> @Put/games:')
    //     console.log('-> game: ', game);




    @Get('/geturl/:qid')
    @HttpCode(200)
    async getUrl(
    @Param('qid') qid: number) {
    
    const address = await UrlTable.findOne({qid: qid})
    if(address) {
        return address.url
        }
        return 'error'
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
    return 'Saved'
    }
    return 'error'
  }

}

