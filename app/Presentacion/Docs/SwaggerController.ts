import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SwaggerController {
  public async index({ response }: HttpContextContract) {
    return response.redirect('/docs') // Ruta donde se genera la documentación Swagger
  }
}
