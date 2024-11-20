import { DateTime } from 'luxon';
import { RequerimientoInterface } from '../Repositorios/requerimientoInterface';
import { EmpresaService } from '../Empresa/empresaService';
import { EmpresaRepositorio } from 'App/Infraestructura/Empresa/empresaRepositorio';
import CustomException from 'App/Exceptions/CustomException';

export class RequerimientosService{

    private empresaService: EmpresaService

    constructor (
      private repositorio: RequerimientoInterface,
    )
    {
      this.empresaService = new EmpresaService(new EmpresaRepositorio())
    }

    async guardar(obj_requerimiento: any)
    {
      try
      {
        var obj = null;

        obj_requerimiento.estadorespuesta = 'INICIO';
        obj_requerimiento.fechacreacion = new Date();
        obj_requerimiento.anexo = null;

        if (obj_requerimiento.id == 0)
        {
          obj_requerimiento.createdat = DateTime.local().toSQL();
          obj_requerimiento.updatedat = DateTime.local().toSQL();

          obj = await this.repositorio.guardar(obj_requerimiento)
        }
        else
        {
          obj_requerimiento.updatedat = DateTime.local().toSQL();

          obj = await this.repositorio.actualizar(obj_requerimiento)

          this.empresaService.eliminarPorrequerimiento(obj.id);
        }

        let array_empresas = obj_requerimiento.array_empresa;

        for (const element of array_empresas) {

          let obj_data = {
            requerimiento_id: obj.id,
            nit:element.nit,
            razonsocial:element.razonsocial,
            modalidad:element.modalidad,
            delegada:element.delegada,
            departamento:element.departamento,
            municipo:element.municipo,
            estado:element.estado,
            estadoentrega:element.estadoentrega,
            usuariocreacion_uuid:obj_requerimiento.usuariocreacion_uuid,
            usuariocreacion_nombre:obj_requerimiento.usuariocreacion_nombre,
          };

          await this.empresaService.guardar(obj_data);

        }

        return obj;
    }
    catch(error)
    {
      throw new CustomException(500,
        'tipo_identificacionData.js',
        'Error desconocido',
        [error.message, 'Ha ocurrido un error interno, por favor intente mas tarde...222']
      );
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