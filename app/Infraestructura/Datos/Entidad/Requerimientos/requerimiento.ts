import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Requerimiento extends BaseModel {

  public static table = 'tbl_requerimientos';
  
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre: string;

  @column()
  declare descripcion: string;

  @column()
  declare fechacreacion: Date

  @column()
  declare fechainicio: Date

  @column()
  declare fechafinal: Date

  @column()
  declare modulo: string

  @column()
  declare anexo: string

  @column()
  declare estado: string

  @column()
  declare fechaeliminado: string

  @column()
  declare estadorespuesta: string

  @column()
  declare publicado: boolean

  @column()
  declare usuariocreacion_uuid: string
  
  @column()
  declare usuariocreacion_nombre: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}