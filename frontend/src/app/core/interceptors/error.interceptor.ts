import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err) => {
      let message = 'Ha ocurrido un error inesperado';
      
      if (err.status === 400) message = 'Datos inválidos. Revisa el formulario.';
      if (err.status === 404) message = 'El recurso solicitado no existe.';
      if (err.status === 500) message = 'Error en el servidor de Provedatos.';

      // Aquí podrías usar una librería tipo Hot Toast o SweetAlert2
      alert(message); 
      return throwError(() => err);
    })
  );
};