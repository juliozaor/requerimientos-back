
export interface RequerimientoInterface {
  guardar(obj_requerimiento: any):any
  listar(obj_filter: any):any
  actualizar(obj_data: any):any
  obtenerRecurso(id:number):any
  eliminarRecurso(id:number):any
  verDetalle(id:number):any
  listarPorusuario(obj_filter: any):any
}
