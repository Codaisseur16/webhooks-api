// src/webhooks-url/entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'

// Set entity / types / nullable
@Entity()
export default class UrlTable extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('integer', {nullable:false})
  qid: number

  @Column('text', {nullable:false})
  url: string

}