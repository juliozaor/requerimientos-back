import { RequerimientoInterface } from "../../Dominio/Repositorios/requerimientoInterface";
import Model from '../Datos/Entidad/Requerimientos/requerimiento';
import CustomException from '../../Exceptions/CustomException'; // Importa la excepción personalizada
import { DateTime } from "luxon";

export class RequerimientoRepositorio implements RequerimientoInterface 
{
    async guardar(obj_requerimiento: any){
        try {
            
            let query = new Model();

            query.nombre = obj_requerimiento.nombre;
            query.fechacreacion = obj_requerimiento.fechacreacion;
            query.fechainicio = obj_requerimiento.fechainicio;
            query.fechafinal = obj_requerimiento.fechafinal;
            query.descripcion = obj_requerimiento.descripcion;
            query.modulo = obj_requerimiento.modulo;
            query.anexo = obj_requerimiento.anexo;
            query.estado = obj_requerimiento.estado;
            query.estadorespuesta = obj_requerimiento.estadorespuesta;
            query.publicado = obj_requerimiento.publicado;
            query.usuariocreacion_uuid = obj_requerimiento.usuariocreacion_uuid;
            query.usuariocreacion_nombre = obj_requerimiento.usuariocreacion_nombre;
            query.createdAt = obj_requerimiento.createdat;
            query.updatedAt = obj_requerimiento.updatedat;

            await query.save();

            return query;
        } 
        catch (error)
        {
            if (error.code === '23505') { // Código de error para duplicados en Postgres
                throw new CustomException(409,
                    'tipo_identificacionData.js',
                    'Duplicidad de nombre',
                    ['El recurso que intenta guardar ya existe']
                );
            }

            throw new CustomException(500,
                'tipo_identificacionData.js',
                'Error desconocido',
                [error, 'Ha ocurrido un error interno, por favor intente mas tarde...']
            );
        }
    }

    async actualizar(obj_requerimiento: any) {

        try {
            
            const query = await Model.findOrFail(obj_requerimiento.id); // Buscar el registro por ID

            if (query.publicado == true)
            {
                query.fechafinal = obj_requerimiento.fechafinal;
            }
            else
            {
                query.nombre = obj_requerimiento.nombre;
                query.fechacreacion = obj_requerimiento.fechacreacion;
                query.fechainicio = obj_requerimiento.fechainicio;
                query.fechafinal = obj_requerimiento.fechafinal;
                query.descripcion = obj_requerimiento.descripcion;
                query.modulo = obj_requerimiento.modulo;
                query.anexo = obj_requerimiento.anexo;
                query.estadorespuesta = obj_requerimiento.estadorespuesta;
                query.publicado = obj_requerimiento.publicado;
                query.usuariocreacion_uuid = obj_requerimiento.usuariocreacion_uuid;
                query.usuariocreacion_nombre = obj_requerimiento.usuariocreacion_nombre;
            }
           
            query.updatedAt = obj_requerimiento.updatedat;

            await query.save();

            return query;
        } 
        catch (error)
        {
            if (error.code === '23505') { // Código de error para duplicados en Postgres
                throw new CustomException(409,
                    'tipo_identificacionData.js',
                    'Duplicidad de nombre',
                    ['El recurso que intenta guardar ya existe']
                );
            }

            if (error.code === 'E_ROW_NOT_FOUND') { // Código de error para duplicados en Postgres
                throw new CustomException(409,
                    'tipo_identificacionData.js',
                    'Recurso no encontrado',
                    ['El recurso que intenta actualizar no existe']
                );
            }

            throw new CustomException(500,
                'tipo_identificacionData.js',
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
                query.where('nombre', 'LIKE', `%${obj_filter.find}%`);
            }

            if (obj_filter.estadorespuesta && obj_filter.estadorespuesta.trim().length  > 0)
            {
                query.where('estadorespuesta', obj_filter.estadorespuesta);
            }

            query.where('estado', 'ACTIVO');

            query.select('*');
            query.preload('array_empresas');

            const array_tipoidentifacion = await query.paginate(obj_filter.page, obj_filter.numero_items);

            return array_tipoidentifacion;
        } 
        catch (error)
        { 
            throw new CustomException(500,
                'tipo_identificacionData.js',
                'Error desconocido listar',
                ['Ha ocurrido un error interno, por favor intente mas tarde', error]
            );
        }
    }

    async listarPorEmpresa(obj_filter: any)
    {
        try {
            let query = Model.query();
    
            // Realizar el join entre tbl_requerimiento y requerimientoempresa
            query.innerJoin('tbl_requerimientoempresas', 'tbl_requerimientos.id', 'tbl_requerimientoempresas.requerimiento_id');
    
            query.where('tbl_requerimientoempresas.nit', obj_filter.nit);
    
            // Filtrar por 'find' si está definido
            if (obj_filter.find && obj_filter.find.trim().length > 0) {
                query.where('tbl_requerimientos.nombre', 'LIKE', `%${obj_filter.find}%`);
            }
    
            // Filtrar por estado
            query.where('tbl_requerimientos.estado', 'ACTIVO');
    
            // Seleccionar columnas específicas (opcional)
            query.select('tbl_requerimientos.*');
    
            query.preload('array_empresas');

            // Paginación
            const array_requerimientos = await query.paginate(obj_filter.page, obj_filter.numero_items);
    
            return array_requerimientos;
        } catch (error) {
            throw new CustomException(
                500,
                'requerimientoData.js',
                'Error desconocido listarPorEmpresa',
                ['Ha ocurrido un error interno, por favor intente más tarde', error]
            );
        }
    }

    async listarPorusuario(obj_filter: any)
    {
        try {
            let query = Model.query();

            if (obj_filter.find && obj_filter.find.trim().length  > 0)
            {
                query.where('nombre', 'LIKE', `%${obj_filter.find}%`);
            }

            query.where('usuariocreacion_uuid', obj_filter.uuid);
            query.where('estado', 'ACTIVO');

            query.select('*');

            // Incluir la relación con las empresas
            query.preload('array_empresas');

            const array_tipoidentifacion = await query.paginate(obj_filter.page, obj_filter.numero_items);

            return array_tipoidentifacion;
        } 
        catch (error)
        { 
            throw new CustomException(500,
                'tipo_identificacionData.js',
                'Error desconocido listar por usuario',
                ['Ha ocurrido un error interno, por favor intente mas tarde', error]
            );
        }
    }

    async obtenerRecurso(id:number)
    {
        try {
            // Buscar el recurso con preload de la relación "empresas"
                const obj = await Model.query()
                .where('id', id)
                .preload('array_empresas') // Cargar la relación definida en el modelo
                .firstOrFail();

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

    async verDetalle(id:number, nit:string)
    {
        try {
            const obj = await Model.query()
                .where('id', id)
                .preload('array_empresas', (query) => {
                    query.where('nit', nit); // Filtrar por el nit específico
                })
                .firstOrFail();
 
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

    async eliminarRecurso(id:number)
    {
        try {
            const obj = await Model.findOrFail(id);
                  obj.estado = 'ELIMINADO';
                  obj.fechaeliminado = DateTime.local().toSQL();
                  obj.save();

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
