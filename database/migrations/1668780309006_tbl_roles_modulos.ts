import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_roles_modulos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('rom_id').primary()
      table.string('rom_rol_id')
      table.string('rom_modulo_id')
      table.timestamp('rom_creado', { useTz: true }).defaultTo(this.now())
      table.timestamp('rom_actualizado', { useTz: true }).defaultTo(this.now())

      table.foreign('rom_rol_id').references('tbl_roles.rol_id').onDelete('RESTRICT').onUpdate('CASCADE');
      table.foreign('rom_modulo_id').references('tbl_modulos.mod_id').onDelete('RESTRICT').onUpdate('CASCADE');
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
