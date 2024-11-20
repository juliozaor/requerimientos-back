import { DateTime } from 'luxon';
import { RequerimientoInterface } from '../Repositorios/requerimientoInterface';

export class RequerimientosService{

    constructor (private repositorio: RequerimientoInterface) { }
    
      async guardar(obj_requerimiento: any){

        obj_requerimiento.estadorespuesta = 'INICIO';
        obj_requerimiento.fechacreacion = new Date();
        obj_requerimiento.anexo = null;

        if (obj_requerimiento.id == 0)
        {
          obj_requerimiento.createdat = DateTime.local().toSQL();
          obj_requerimiento.updatedat = DateTime.local().toSQL();

          return this.repositorio.guardar(obj_requerimiento)
        }
        else
        {
          obj_requerimiento.updatedat = DateTime.local().toSQL();

          return this.repositorio.actualizar(obj_requerimiento)
        }
      }

      async listar(obj_filter: any)
      {
        return this.repositorio.listar(obj_filter);
      }

      async listarPorusuario(obj_filter: any)
      {
        return this.repositorio.listarPorusuario(obj_filter);
      }

      async obtenerRecurso(id: number)
      {
        return this.repositorio.obtenerRecurso(id);
      }

      async eliminarRecurso(id: number)
      {
        return this.repositorio.eliminarRecurso(id);
      }

      async verDetalle(id: number)
      {
        return this.repositorio.verDetalle(id);
      }
}