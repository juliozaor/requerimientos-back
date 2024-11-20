import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_roles_modulos_funcionalidades'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('rmf_id')
      table.string('rmf_rol_id')
      table.string('rmf_modulo_id')
      table.string('rmf_funcionalidad_id')
      table.timestamp('rmf_creado', { useTz: true })
      table.timestamp('rmf_actualizado', { useTz: true })

      table.foreign('rmf_rol_id').references('tbl_roles.rol_id').onDelete('RESTRICT').onUpdate('CASCADE');
      table.foreign('rmf_modulo_id').references('tbl_modulos.mod_id').onDelete('RESTRICT').onUpdate('CASCADE');
      table.foreign('rmf_funcionalidad_id').references('tbl_funcionalidades.fun_id').onDelete('RESTRICT').onUpdate('CASCADE');

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
