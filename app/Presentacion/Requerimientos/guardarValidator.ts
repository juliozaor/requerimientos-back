import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class guardarValidator {
    public schema = schema.create({
        id: schema.number( [
        ]),
        descripcion: schema.string( [
        ]),
        nombre: schema.string( [
        ]),
        fechainicio: schema.string( [
        ]),
        fechafinal: schema.string( [
        ]),
        modulo: schema.string( [
        ]),
        publicado: schema.boolean( [
        ])
      })

      public messages = {
        'id.required': 'El campo id es obligatorio',
        'descripcion.required': 'El campo descripcion es obligatorio',
        'nombre.required': 'El campo nombre es obligatorio',
        'fechainicio.required': 'El campo fechainicio es obligatorio',
        'fechafinal.required': 'El campo fechafinal es obligatorio',
        'modulo.required': 'El campo modulo es obligatorio',
        'publicado.required': 'El campo publicado es obligatorio',
      }
}