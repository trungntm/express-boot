import { PropertySource } from './property-source';

export class FilePropertySource implements PropertySource {
  protected properties: Map<string, any>;

  constructor(
    private name: string,
    protected filePath: string
  ) {
    this.properties = new Map();
  }

  getName(): string {
    return this.name;
  }

  getProperty(key: string): any {
    return this.properties.get(key);
  }

  containsProperty(key: string): boolean {
    return this.properties.has(key);
  }

  protected flattenObject(obj: any, prefix = ''): Map<string, any> {
    const flattened = new Map<string, any>();

    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (value && typeof value === 'object' && !Array.isArray(value)) {
        const nested = this.flattenObject(value, newKey);
        nested.forEach((v, k) => flattened.set(k, v));
      } else {
        flattened.set(newKey, value);
      }
    }

    return flattened;
  }
}
