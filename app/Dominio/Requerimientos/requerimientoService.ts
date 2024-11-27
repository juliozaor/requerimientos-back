import { DateTime } from 'luxon';
import { RequerimientoInterface } from '../Repositorios/requerimientoInterface';
import { EmpresaService } from '../Empresa/empresaService';
import { EmpresaRepositorio } from 'App/Infraestructura/Empresa/empresaRepositorio';
import { RepositorioUsuariosDB } from "App/Infraestructura/Implementacion/Lucid/RepositorioUsuariosDB";
import CustomException from 'App/Exceptions/CustomException';
import Env from '@ioc:Adonis/Core/Env';
import Mail from '@ioc:Adonis/Addons/Mail'
import FormData from 'form-data';
import axios from 'axios';
export class RequerimientosService{

    private empresaService: EmpresaService
    private repositorioUsuarios:RepositorioUsuariosDB

    constructor (
      private repositorio: RequerimientoInterface,
    )
    {
      this.empresaService = new EmpresaService(new EmpresaRepositorio())
      this.repositorioUsuarios = new RepositorioUsuariosDB();
    }

    async guardar(obj_requerimiento: any)
    {
      try
      {
        var obj = null;

        var obj_usuario =  this.repositorioUsuarios.obtenerUsuarioPorId(obj_requerimiento.usuariocreacion_uuid);

        obj_requerimiento.usuariocreacion_nombre = (await obj_usuario).nombre+' '+(await obj_usuario).apellido;

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
            correoelectronico:element.correoelectronico,
            estado:'INICIO',
            usuariocreacion_uuid:obj_requerimiento.usuariocreacion_uuid,
            usuariocreacion_nombre:obj_requerimiento.usuariocreacion_nombre,
          };

          await this.empresaService.guardar(obj_data);

          await this.enviarCorreo(
            'Asignación de requerimiento por parte superintendencia de transporte', 
            obj_data.correoelectronico,
            obj_data
          );
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

    public async enviarCorreo(asunto:string, destinatario:string, data:any){
      Mail.send(mensaje => {
        mensaje
          .subject(asunto)
          .from(Env.get('SMTP_USERNAME'), Env.get('EMAIL_ALIAS'))
          .to(destinatario)
          .htmlView("app/Dominio/Email/Templates/empresas.edge", data)
      });
    }

    async listar(obj_filter: any)
    {
      return this.repositorio.listar(obj_filter);
    }

    async listarPorEmpresa(obj_filter: any)
    {
      return this.repositorio.listarPorEmpresa(obj_filter);
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

    async verDetalle(id:number, nit:string)
    {
      await this.empresaService.obtenerRecurso(id, nit);
      var obj = this.repositorio.verDetalle(id, nit);

      return obj;
    }

    public async subirArchivos (file:any, requerimiento_id:number)
    {
   
      const host = Env.get('URL_SERVICIO_ARCHIVOS')
      const rutaRaiz = 'anexos';
      const ruta = 'archivos';
      const endpoint = `/api/v1/${ruta}`

      const fs = require('fs');
      const path = require('path');

      const archivoTemporal = path.resolve(file.tmpPath);

      const formData = new FormData();

      formData.append('archivo', fs.createReadStream(archivoTemporal), {
        filename: file.clientName,
        contentType: file.headers['content-type'],
      });

      const headers = {
        'Authorization': `Bearer d4a32a3b-def6-4cc2-8f77-904a67360b53`,
        ...formData.getHeaders(),
      };

      try {
        const respuesta = await axios.post(`${host}${endpoint}`, formData, { headers });
        return respuesta.data;
      } catch (error) {
        console.log(error);

        console.error('Error en la solicitud:', error.message);
      }
  
    }
}