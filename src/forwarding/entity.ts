// src/forwarding/entity.ts
import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'

// Set entity / types / nullable
@Entity()
export default class forwarding extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('integer', {nullable:false})
  qid: number

  @Column('json', {nullable:false})
  qobject: JSON

  @Column('integer', {nullable:false})
  httpcode: number

  @Column('timestamp', {nullable:false})
  lasttry: Timestamp

}