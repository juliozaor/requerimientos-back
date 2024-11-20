import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class listarValidator {
    public schema = schema.create({
        page: schema.string( [
        ]),
        numero_items: schema.string( [
        ]),
      })

      public messages = {
        'numero_items.required': 'El numero_items id es obligatorio',
        'page.required': 'El campo page es obligatorio'
      }
}