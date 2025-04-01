import 'reflect-metadata';

export function RequestBody() {
  return function (target: any, propertyKey: string, parameterIndex: number) {
    const existingRequestBodies: number[] =
      Reflect.getMetadata('request:body', target, propertyKey) || [];

    // Store the parameter index where the body will be injected
    existingRequestBodies.push(parameterIndex);
    Reflect.defineMetadata('request:body', existingRequestBodies, target, propertyKey);
  };
}
