import guradarValidator from './guardarValidator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { RequerimientoRepositorio } from '../../Infraestructura/Requerimientos/requerimientoRepositorio'
import { RequerimientosService } from '../../Dominio/Requerimientos/requerimientoService';
import CustomException from '../../Exceptions/CustomException';
import listarValidator from './listarValidator';
import listarporempresValidator from './listarporempresValidator';
import { EmpresaService } from 'App/Dominio/Empresa/empresaService';
import { EmpresaRepositorio } from 'App/Infraestructura/Empresa/empresaRepositorio';
import { errorMonitor } from 'form-data';

export default class RequerimientosController {

    private service: RequerimientosService
    private empresaService:EmpresaService

    constructor () {
      this.service = new RequerimientosService(new RequerimientoRepositorio())
      this.empresaService = new EmpresaService(new EmpresaRepositorio())
    }

    public async guardar({response, request}:HttpContextContract) {
        try {

            await request.validate(guradarValidator)

            const obj_request:any = request.all();

            const payload = await request.obtenerPayloadJWT()

            obj_request.usuariocreacion_uuid = payload.id;

            const obj_tipoidentifiacion = await this.service.guardar(obj_request);

            return response.status(200).send(
                {
                    msn: 'Datos guardados exitosamente',
                    obj: obj_tipoidentifiacion,
                    obj_user: payload
                }
            );
        } catch (error) {

            if (error.messages && error.messages.errors) {
                const messages = error.messages.errors.map((msg: { message: string }) => msg.message);
                return response.status(400).send({
                    msn: 'Campos invalidos', // Mensaje personalizado
                    errors: messages,
                    error:error.messages.errors
                });
            }

            if (error instanceof CustomException) {
                return response.status(error.status).send({
                    msn: error.message.name, // Mensaje personalizado
                    errors: error.message.errors
                });
            }

            return response.status(500).send({
                msn: 'Error interno', // Mensaje personalizado
                errors: ['Ha ocurrido un error interno, por favor intente mas tarde'] 
            });
        }
    }

    public async listar({response, request}:HttpContextContract) {
        try {
            await request.validate(listarValidator)

            const obj_request:any = request.all();

            const array_requerimiento = await this.service.listar(obj_request);

            return response.status(200).send(array_requerimiento);

        } catch (error) {

            if (error.messages && error.messages.errors) {
                const messages = error.messages.errors.map((msg: { message: string }) => msg.message);
                return response.status(400).send({
                    msn: 'Campos invalidos', // Mensaje personalizado
                    errors: messages
                });
            }

            if (error instanceof CustomException) {
                return response.status(error.status).send({
                    msn: error.message.name, // Mensaje personalizado
                    errors: error.message.errors // Detalles de la excepción personalizada
                });
            }

            return response.status(500).send({
                msn: 'Error interno', // Mensaje personalizado
                errors: ['Ha ocurrido un error interno, por favor intente mas tarde'] 
            });
        }
    }

    public async listarPorEmpresa({response, request}:HttpContextContract) {
        try {
            await request.validate(listarporempresValidator)

            const obj_request:any = request.all();

            const array_requerimiento = await this.service.listarPorEmpresa(obj_request);

            return response.status(200).send(array_requerimiento);

        } catch (error) {

            if (error.messages && error.messages.errors) {
                const messages = error.messages.errors.map((msg: { message: string }) => msg.message);
                return response.status(400).send({
                    msn: 'Campos invalidos', // Mensaje personalizado
                    errors: messages
                });
            }

            if (error instanceof CustomException) {
                return response.status(error.status).send({
                    msn: error.message.name, // Mensaje personalizado
                    errors: error.message.errors // Detalles de la excepción personalizada
                });
            }

            return response.status(500).send({
                msn: 'Error interno', // Mensaje personalizado
                errors: ['Ha ocurrido un error interno, por favor intente mas tarde'] 
            });
        }
    }

    public async listarPorusuario({response, request}:HttpContextContract) {
        try {
            await request.validate(listarValidator)

            const obj_request:any = request.all();

            const payload = await request.obtenerPayloadJWT()

            obj_request.uuid = payload.id;

            const array_requerimiento = await this.service.listarPorusuario(obj_request);

            return response.status(200).send(array_requerimiento);

        } catch (error) {

            if (error.messages && error.messages.errors) {
                const messages = error.messages.errors.map((msg: { message: string }) => msg.message);
                return response.status(400).send({
                    msn: 'Campos invalidos', // Mensaje personalizado
                    errors: messages,
                    error: error
                });
            }

            if (error instanceof CustomException) {
                return response.status(error.status).send({
                    msn: error.message.name, // Mensaje personalizado
                    errors: error.message.errors,
                    error:error // Detalles de la excepción personalizada
                });
            }

            return response.status(500).send({
                msn: 'Error interno', // Mensaje personalizado
                errors: ['Ha ocurrido un error interno, por favor intente mas tarde'] 
            });
        }
    }

    public async obtenerRecurso({response, params}:HttpContextContract) {
        try {
            const {requerimiento_id} = params;

            const obj_requerimiento = await this.service.obtenerRecurso(requerimiento_id);

            return response.status(200).send(obj_requerimiento);
        } catch (error) {
            if (error instanceof CustomException) {
                return response.status(error.status).send({
                    msn: error.message.name, // Mensaje personalizado
                    errors: error.message.errors // Detalles de la excepción personalizada
                });
            }

            return response.status(500).send({
                msn: 'Error interno', // Mensaje personalizado
                errors: ['Ha ocurrido un error interno, por favor intente mas tarde'] 
            });
        }
    }

    public async eliminarRecurso({response, params}:HttpContextContract) {
        try {
            const {requerimiento_id} = params;

            const obj_requerimiento = await this.service.eliminarRecurso(requerimiento_id);

            return response.status(200).send(obj_requerimiento);
        } catch (error) {
            if (error instanceof CustomException) {
                return response.status(error.status).send({
                    msn: error.message.name, // Mensaje personalizado
                    errors: error.message.errors // Detalles de la excepción personalizada
                });
            }

            return response.status(500).send({
                msn: 'Error interno', // Mensaje personalizado
                errors: ['Ha ocurrido un error interno, por favor intente mas tarde'] 
            });
        }
    }

    public async verDetalle({response, params}:HttpContextContract) {
        try {
            const {requerimiento_id, nit} = params;

            const obj_requerimiento = await this.service.verDetalle(requerimiento_id, nit);

            return response.status(200).send(obj_requerimiento);
        } catch (error) {
            if (error instanceof CustomException) {
                return response.status(error.status).send({
                    msn: error.message.name, // Mensaje personalizado
                    errors: error.message.errors // Detalles de la excepción personalizada
                });
            }

            return response.status(500).send({
                msn: 'Error interno', // Mensaje personalizado
                errors: ['Ha ocurrido un error interno, por favor intente mas tarde'] 
            });
        }
    }

    public async listarEmpresas({response, request}:HttpContextContract) {
        try {
            await request.validate(listarValidator)

            const obj_request:any = request.all();

            const array_empresas = await this.empresaService.listar(obj_request);

            return response.status(200).send(array_empresas);

        } catch (error) {

            if (error.messages && error.messages.errors) {
                const messages = error.messages.errors.map((msg: { message: string }) => msg.message);
                return response.status(400).send({
                    msn: 'Campos invalidos', // Mensaje personalizado
                    errors: messages
                });
            }

            if (error instanceof CustomException) {
                return response.status(error.status).send({
                    msn: error.message.name, // Mensaje personalizado
                    errors: error.message.errors // Detalles de la excepción personalizada
                });
            }

            return response.status(500).send({
                msn: 'Error interno', // Mensaje personalizado
                errors: ['Ha ocurrido un error interno, por favor intente mas tarde'] 
            });
        }
    }

}