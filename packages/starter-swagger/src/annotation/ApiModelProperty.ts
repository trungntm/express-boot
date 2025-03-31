import 'reflect-metadata'

export function ApiModelProperty(type: string, example?: string) {
  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata('swagger:propertyType', { type, example }, target, propertyKey)
  }
}
