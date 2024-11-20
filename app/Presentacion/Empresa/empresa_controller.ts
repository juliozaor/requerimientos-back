import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { EmpresaRepositorio } from '../../Infraestructura/Empresa/empresaRepositorio'
import { EmpresaService } from '../../Dominio/Empresa/Empresaervice';
import CustomException from '../../Exceptions/CustomException';
import listarValidator from './listarValidator';

export default class EmpresaController {

    private service: EmpresaService
    constructor () {
      this.service = new EmpresaService(new EmpresaRepositorio())
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
}