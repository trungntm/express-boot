import 'reflect-metadata';

export function PathVariable(param: string) {
  return function (target: any, propertyKey: string, parameterIndex: number) {
    const pathParams: { [key: string]: number } =
      Reflect.getMetadata('path:params', target, propertyKey) || {};
    pathParams[param] = parameterIndex;
    Reflect.defineMetadata('path:params', pathParams, target, propertyKey);
  };
}
