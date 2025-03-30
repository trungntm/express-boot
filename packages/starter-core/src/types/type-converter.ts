export type Type<T> = new (...args: any[]) => T;

export class TypeConverter {
  static convert<T>(
    value: any,
    targetType: typeof String | typeof Number | typeof Boolean | typeof Date | typeof Array
  ): T {
    if (value === null || value === undefined) {
      return value;
    }

    switch (targetType) {
      case String:
        return String(value) as T;
      case Number:
        return Number(value) as T;
      case Boolean:
        return (String(value).toLowerCase() === 'true') as T;
      case Date:
        return new Date(value) as T;
      case Array:
        return (Array.isArray(value) ? value : [value]) as T;
      default:
        return value as T;
    }
  }
}
