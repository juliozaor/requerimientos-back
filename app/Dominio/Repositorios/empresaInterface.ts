
export interface EmpresaInterface {
  guardar(obj_empresa: any):any
  listar(obj_filter: any):any
  actualizar(obj_data: any):any
  listarPorrequerimiento(obj_filter: any):any
  eliminarPorrequerimiento(requerimiento_id:number):any
}
