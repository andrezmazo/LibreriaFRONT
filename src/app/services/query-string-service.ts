export class QueryStringService {
  convertirDesdeObjeto<T extends object>(objeto: T) {
    return Object.entries(objeto)
      .map((parametros) => {
        if (parametros[1] instanceof Date) {
          return parametros[0] + '=' + parametros[1].toISOString();
        }
        return parametros.join('=');
      })
      .join('&');
  }
}
