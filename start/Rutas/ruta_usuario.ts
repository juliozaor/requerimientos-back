/* eslint-disable @typescript-eslint/naming-convention */
import Route from '@ioc:Adonis/Core/Route'
//import ControladorUsuario from 'App/Presentacion/Usuarios/ControladorUsuario';

const accion_path = '../../../app/Presentacion/Usuario/ControladorUsuario'
const controlador = '../../../app/Presentacion/Usuarios/ControladorUsuario'

Route.group(() => {
  Route.patch('/:identificacion', `${accion_path}.actualizarUsuario`)
  Route.get('/categorizacion', `${accion_path}.categorizar`)
  Route.post('/registro', `${controlador}.guardarUsuario`)
  Route.get('/listar/:pagina?/:limite?', `${controlador}.listar`)
  Route.get('/usuario/:usuario', `${controlador}.obtenerUsuarioPorUsuario`)
  Route.get('/:id', `${controlador}.obtenerUsuarioPorId`)
}).prefix('api/v1/usuarios').middleware('autenticacionJwt')

Route.post('/registropeccit', `${controlador}.guardardesdepeccit`)
// Ruta para consultar la póliza de un usuario
Route.get('api/v1/poliza/usuario/:usn_identificacion', `${controlador}.consultarPoliza`);
Route.get('api/v1/poliza/validar/:usuario', `${controlador}.obtenerUsuarioPorUsuario`);

