import 'reflect-metadata';

export function ApiModel(description: string, dtoClass: any) {
  return function (target: any, propertyKey: string) {
    const schema = {
      type: 'object',
      properties: {},
      example: {},
    } as Record<string, any>;
    Object.getOwnPropertyNames(new dtoClass()).forEach(key => {
      const propertyType = Reflect.getMetadata('swagger:propertyType', dtoClass.prototype, key);
      schema.properties[key] = { type: propertyType?.type || 'string' };
      schema.example[key] = propertyType?.example || 'string';
    });

    Reflect.defineMetadata(
      'swagger:requestBody',
      { description, schema },
      target.constructor,
      propertyKey
    );
  };
}
