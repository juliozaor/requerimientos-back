import { EmpresaInterface } from "../../Dominio/Repositorios/empresaInterface";
import Model from '../Datos/Entidad/Empresa/empresa';
import CustomException from '../../Exceptions/CustomException'; // Importa la excepción personalizada
import { DateTime } from "luxon";
import { Exception } from "@adonisjs/core/build/standalone";

export class EmpresaRepositorio implements EmpresaInterface 
{
    async guardar(obj_empresa: any){
        try {
            
            let query = new Model();
            query.requerimiento_id = obj_empresa.requerimiento_id;
            query.nit = obj_empresa.nit;
            query.razonsocial = obj_empresa.razonsocial;
            query.correoelectronico = obj_empresa.correoelectronico;
            query.usuariocreacion_uuid = obj_empresa.usuariocreacion_uuid;
            query.usuariocreacion_nombre = obj_empresa.usuariocreacion_nombre;
            query.estado = obj_empresa.estado;
            query.createdAt = obj_empresa.createdat;
            query.updatedAt = obj_empresa.updatedat;

            await query.save();

            return query;
        } 
        catch (error)
        {
            if (error.code === '23505') { // Código de error para duplicados en Postgres
                throw new CustomException(409,
                    'empresaRepositorio.ts',
                    'Duplicidad de nombre',
                    ['El recurso que intenta guardar ya existe']
                );
            }

            throw new CustomException(500,
                'empresaRepositorio.ts',
                'Error desconocido',
                [obj_empresa, error, 'Ha ocurrido un error interno, por favor intente mas tarde...']
            );
        }
    }

    async actualizar(obj_empresa: any) {

        try {
            
            const query = await Model.findOrFail(obj_empresa.id); // Buscar el registro por ID

            query.requerimiento_id = obj_empresa.requerimiento_id;
            query.nit = obj_empresa.nit;
            query.razonsocial = obj_empresa.razonsocial;
            query.correoelectronico = obj_empresa.correoelectronico;
            query.usuariocreacion_uuid = obj_empresa.usuariocreacion_uuid;
            query.usuariocreacion_nombre = obj_empresa.usuariocreacion_nombre;
            query.estado = obj_empresa.estado;
            query.updatedAt = obj_empresa.updatedat;

            await query.save();

            return query;
        } 
        catch (error)
        {
            if (error.code === '23505') { // Código de error para duplicados en Postgres
                throw new CustomException(409,
                    'empresaRepositorio.ts',
                    'Duplicidad de nombre',
                    ['El recurso que intenta guardar ya existe']
                );
            }

            if (error.code === 'E_ROW_NOT_FOUND') { // Código de error para duplicados en Postgres
                throw new CustomException(409,
                    'empresaRepositorio.ts',
                    'Recurso no encontrado',
                    ['El recurso que intenta actualizar no existe']
                );
            }

            throw new CustomException(500,
                'empresaRepositorio.ts',
                'Error desconocido',
                [error.message, 'Ha ocurrido un error interno, por favor intente mas tarde...']
            );
        }
    }

    async listar(obj_filter: any)
    {
        try {
            let query = Model.query();

            if (obj_filter.find && obj_filter.find.trim().length  > 0)
            {
                query.where('razonsocial', 'LIKE', `%${obj_filter.find}%`);
            }

            query.select('*');

            const array_tipoidentifacion = await query.paginate(obj_filter.page, obj_filter.numero_items);

            return array_tipoidentifacion;
        } 
        catch (error)
        { 
            throw new CustomException(500,
                'empresaRepositorio.ts',
                'Error desconocido listar',
                ['Ha ocurrido un error interno, por favor intente mas tarde', error]
            );
        }
    }

    async listarPorrequerimiento(obj_filter: any)
    {
        try {
            let query = Model.query();

            if (obj_filter.find && obj_filter.find.trim().length  > 0)
            {
                query.where('razonsocial', 'LIKE', `%${obj_filter.find}%`);
            }

            query.where('requerimiento_id', obj_filter.requerimiento_id);

            query.select('*');

            const array_tipoidentifacion = await query.paginate(obj_filter.page, obj_filter.numero_items);

            return array_tipoidentifacion;
        } 
        catch (error)
        { 
            throw new CustomException(500,
                'empresaRepositorio.ts',
                'Error desconocido listar',
                ['Ha ocurrido un error interno, por favor intente mas tarde', error]
            );
        }
    }

    async eliminarPorrequerimiento(requerimiento_id: number)
    {
        try {
            let query = Model.query();

            query.where('requerimiento_id',requerimiento_id);

            query.delete();

            return query;
        } 
        catch (error)
        { 
            throw new CustomException(500,
                'empresaRepositorio.ts',
                'Error desconocido listar',
                ['Ha ocurrido un error interno, por favor intente mas tarde', error]
            );
        }
    }

    async obtenerRecurso(id:number, nit:string)
    {
        try {
            // Buscar el recurso con preload de la relación "empresas"
                const obj = await Model.query()
                .where('requerimiento_id', id)
                .where('nit', nit)
                .firstOrFail();

                obj.estado = 'EN PROCESO';
                await obj.save();

            return obj;
        } 
        catch (error)
        { 
            if (error.code === 'E_ROW_NOT_FOUND') { // Código de error para duplicados en Postgres
                throw new CustomException(409,
                    'tipo_identificacionData.js',
                    'Recurso no encontrado',
                    ['El recurso que intenta obtener no existe']
                );
            }

            throw new CustomException(500,
                'tipo_identificacionData.js',
                'Error desconocido listar',
                ['Ha ocurrido un error interno, por favor intente mas tarde', error]
            );
        }
    }
}
