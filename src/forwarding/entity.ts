// src/forwarding/entity.ts
import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'

// Set entity / types / nullable
@Entity()
export default class Forwarding extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('integer', {nullable:true})
  qid: number

  @Column('json', {nullable:false})
  qobject: Qobject

  @Column('integer', {nullable:true})
  httpcode: number

  @Column('integer', {nullable:true})
  lasttry: number

}
//Define the interface of incoming object.
interface Qobject {
  id: number
  user_id: number
  teacher: boolean
  quiz_id: number
  score: number
}