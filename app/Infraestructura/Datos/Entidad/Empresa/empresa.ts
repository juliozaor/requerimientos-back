import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Empresa extends BaseModel {

  public static table = 'tbl_requerimientoempresas';
  
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare requerimiento_id:number

  @column()
  declare nit:string

  @column()
  declare razonsocial:string

  @column()
  declare usuariocreacion_nombre:string

  @column()
  declare estado:string

  @column()
  declare usuariocreacion_uuid: string
  
  @column()
  declare correoelectronico: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}