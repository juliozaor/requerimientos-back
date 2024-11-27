import { DateTime } from 'luxon';
import { EmpresaInterface } from '../Repositorios/empresaInterface';
import Env from '@ioc:Adonis/Core/Env';
import axios from 'axios';

export class EmpresaService{

    constructor (private repositorio: EmpresaInterface) { }
    
      async guardar(obj_empresa: any){

          obj_empresa.createdat = DateTime.local().toSQL();
          obj_empresa.updatedat = DateTime.local().toSQL();

          return this.repositorio.guardar(obj_empresa)
      }

      async listar(obj_filter: any)
      {
        return {
          "meta": {
            "total": 3,
            "per_page": 10,
            "current_page": 1,
            "last_page": 1,
            "first_page": 1,
            "first_page_url": "/?page=1",
            "last_page_url": "/?page=1",
            "next_page_url": null,
            "previous_page_url": null
        },
        "data":[
                {
                    "nit":"nit 1",
                    "razonsocial":"razonsocial 1",
                    "correoelectrinico": "jorgemdiazp@gmail.com",
                    "modulo":"modulo",
                    "estado":true
                },
                {
                  "nit":"nit 2",
                  "razonsocial":"razonsocial 2",
                  "modulo":"modulo",
                  "correoelectrinico": "jorgemdiazp@gmail.com",
                  "estado":true
                },
                {
                  "nit":"nit 3",
                  "razonsocial":"razonsocial 3",
                  "modulo":"modulo",
                  "correoelectrinico": "jorgemdiazp@gmail.com",
                  "estado":true,
              }
              ]
            }
      }

      async listarPorrequerimiento(obj_filter: any)
      {
        return this.repositorio.listarPorrequerimiento(obj_filter);
      }

      async eliminarPorrequerimiento(requerimiento_id:number)
      {
        return this.repositorio.eliminarPorrequerimiento(requerimiento_id);
      }

      async obtenerRecurso(id: number, nit:string)
      {
        return this.repositorio.obtenerRecurso(id, nit);
      }

      public async consultarEmpresas(nit:string, razonsocial:string)
      {
        try
        {
            const apiResponse = await axios.get(Env.get('URL_EMPRESAS')+'/listarempresa', {
                params: {
                  nit: nit, // Parámetro del documento en la URL
                  razonsocial: razonsocial, // Parámetro del documento en la URL
                },
                headers: {
                  Authorization: 'Bearer 2c9b417a-75af-46c5-8ca0-340d3acdb3c7', // Token Bearer
                  'Content-Type': 'application/json',
                },
              });
    
            return {
                out: apiResponse.data,
                status: 200,
                msn: 'Consulta exitar empresas'
            };
        } 
        catch (error)
        {
            return {
                out: error,
                msn: 'Error al consulta empresas'
            };
        }
    } 
}