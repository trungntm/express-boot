import 'reflect-metadata'

export function Tag(...name: string[]) {
  return function (target: any) {
    Reflect.defineMetadata('swagger:tags', name, target)
  }
}
