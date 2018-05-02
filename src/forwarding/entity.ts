// src/forwarding/entity.ts
import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'

// Set entity / types / nullable
@Entity()
export default class Forwarding extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('integer', {nullable:false})
  qid: number

  @Column('json', {nullable:false})
  qobject: JSON

  @Column('integer', {nullable:true})
  httpcode: number

  @Column('integer', {nullable:true})
  lasttry: number

}