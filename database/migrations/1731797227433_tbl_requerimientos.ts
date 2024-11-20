import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_requerimientos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nombre', 255).notNullable().comment('Nombre del requerimiento');
      table.date('fechacreacion').comment('Fecha de creación del requerimiento');
      table.date('fechainicio').comment('Fecha de inicio del requerimiento');
      table.date('fechafinal').comment('Fecha de final del requerimiento');
      table.text('descripcion').comment('Descripción del requerimiento');
      table.string('modulo', 255).notNullable().comment('Modolo a traves del cual se realiza el requerimiento');
      table.string('anexo', 255).nullable().comment('Anexo del requerimiento');
      table.string('estado', 255).nullable().defaultTo('ACTIVO').comment('Indica el estado de ejecución (ACTIVO, ELIMINADO) del requerimiento');
      table.timestamp('fechaeliminado', { useTz: true }).nullable().defaultTo(null).comment('Fecha en que paso de estado de ACTIOV a ELIMINADO');
      table.string('estadorespuesta', 255).notNullable().comment('Indica el estado de ejecución (INICIO, EN PROCESO , FINALIZADO) del requerimiento');
      table.boolean('publicado').notNullable().comment('Indica si el requerimiento fue publicado o no');

      table.uuid('usuariocreacion_uuid').notNullable().comment('Identificador del usuario que crear el requerimiento');
      table.string('usuariocreacion_nombre', 255).notNullable().comment('Nombre del usuario que crear el requerimiento');

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.foreign('usuariocreacion_uuid').references('tbl_usuarios.usn_id').onDelete('RESTRICT').onUpdate('CASCADE');

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
