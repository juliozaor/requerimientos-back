import { Exception } from '@adonisjs/core/build/standalone';

export default class CustomException extends Exception {
    constructor(codeHttp: any , fileName: string, exceptionName: string, messages: string[]) {
        // Crear el objeto de respuesta
        const response:any = {
            file: fileName,
            name: exceptionName,
            errors: messages,
        };
        
        // Llamar al constructor de la clase base con un objeto de respuesta en formato JSON
        super(response, codeHttp); 
    }
}
