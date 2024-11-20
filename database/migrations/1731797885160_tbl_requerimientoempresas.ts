import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_requerimientoempresas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('requerimiento_id').notNullable().comment('Identificador del requerimiento');

      table.string('nit', 255).notNullable().comment('Nit de la empresa a la que se le realiza el requerimiento');
      table.string('razonsocial', 255).notNullable().comment('Nombre de la empresa a la que se le realiza el requerimiento');
      table.string('delegada', 255).notNullable().comment('Delegada de la empresa a la que se le realiza el requerimiento');
      table.string('estado', 255).notNullable().comment('Estado de la empresa a la que se le realiza el requerimiento');
      table.string('estadoentrega', 255).notNullable().comment('Estado de entrega de la empresa a la que se le realiza el requerimiento');
      table.string('modalidad', 255).notNullable().comment('Modalidad de la delegada  de la empresa a la que se le realiza el requerimiento');
      table.string('departamento', 255).notNullable().comment('Departamento de ubicación de la empresa a la que se le realiza el requerimiento');
      table.string('municipo', 255).notNullable().comment('Municipio de ubicación de la empresa a la que se le realiza el requerimiento');

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
