import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_requerimientoempresas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('requerimiento_id').notNullable().comment('Identificador del requerimiento');

      table.string('nit', 255).notNullable().comment('Nit de la empresa a la que se le realiza el requerimiento');
      table.string('razonsocial', 255).notNullable().comment('Nombre de la empresa a la que se le realiza el requerimiento');
      table.string('correoelectronico', 255).notNullable().comment('Correo electrónico de la empresa a la que se le realiza el requerimiento');
      table.string('estado', 255).notNullable().defaultTo('Activa').comment('Estado de la empresa a la que se le realiza el requerimiento');

      table.uuid('usuariocreacion_uuid').notNullable().comment('Identificador del usuario que crear el requerimiento');
      table.string('usuariocreacion_nombre', 255).notNullable().comment('Nombre del usuario que crear el requerimiento');

      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });

      table.unique(['requerimiento_id', 'nit']);

      table.foreign('requerimiento_id').references('tbl_requerimientos.id').onDelete('RESTRICT').onUpdate('CASCADE');

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
