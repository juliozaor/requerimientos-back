import Route from '@ioc:Adonis/Core/Route'

const controlador = '../../Presentacion/Requerimientos/requerimiento_controller'

Route.group(() => {
    Route.post('/guardarrequerimiento', `${controlador}.guardar`)
    Route.get('/listarrequerimiento', `${controlador}.listar`)
    Route.get('/listarempresas', `${controlador}.listarEmpresas`)
    Route.get('/obtenerrequerimiento/:requerimiento_id', `${controlador}.obtenerRecurso`)
    Route.delete('/elimnarrequerimiento/:requerimiento_id', `${controlador}.eliminarRecurso`)
    Route.put('/detallerequerimiento/:requerimiento_id', `${controlador}.verDetalle`)
}).prefix('api/v1/requerimiento').middleware('autenticacionJwt')
