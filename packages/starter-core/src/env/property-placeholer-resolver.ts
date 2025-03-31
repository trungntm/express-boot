export class PropertyPlaceholderResolver {
  private static PLACEHOLDER_PATTERN = /\$\{([^:}]+)(?::([^}]+))?\}/g;

  static resolve(value: string, propertyGetter: (key: string) => any): string {
    return value.replace(this.PLACEHOLDER_PATTERN, (match, key, defaultValue) => {
      const resolvedValue = propertyGetter(key);
      return resolvedValue !== undefined ? resolvedValue : defaultValue || match;
    });
  }
}
