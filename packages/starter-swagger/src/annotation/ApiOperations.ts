import 'reflect-metadata';

// Add Swagger metadata for operations
export function ApiOperation(summary: string, description: string) {
  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata(
      'swagger:operations',
      { summary, description },
      target.constructor,
      propertyKey
    );
  };
}
