import 'reflect-metadata';

export function RequestParam(paramName: string, defaultValue?: any) {
  return function (target: any, propertyKey: string, parameterIndex: number) {
    const existingRequestParams: { [key: string]: { index: number; defaultValue?: any } } =
      Reflect.getMetadata('request:params', target, propertyKey) || {};

    // Map the query parameter name to its index and default value
    existingRequestParams[paramName] = { index: parameterIndex, defaultValue };
    Reflect.defineMetadata('request:params', existingRequestParams, target, propertyKey);
  };
}
