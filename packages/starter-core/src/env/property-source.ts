import { StandardEnvironment } from './environment';

// Property source interface
export interface PropertySource {
  getName(): string;
  getProperty(key: string): any;
  containsProperty(key: string): boolean;
}

// Basic property source implementation
export class MapPropertySource implements PropertySource {
  constructor(
    private name: string,
    private properties: Map<string, any>
  ) {}

  getName(): string {
    return this.name;
  }

  getProperty(key: string): any {
    return this.properties.get(key);
  }

  containsProperty(key: string): boolean {
    return this.properties.has(key);
  }
}

// Environment interface
export interface Environment {
  getProperty(key: string): any;
  getRequiredProperty(key: string): any;
  containsProperty(key: string): boolean;
  getActiveProfiles(): string[];
  setActiveProfiles(profiles: string[]): void;
  addPropertySource(propertySource: PropertySource): void; // Add this method to the interface
}

// Usage example
export class ConfigurationManager {
  private static environment: Environment;

  static initialize(): void {
    const env = StandardEnvironment.getInstance();

    // Add different property sources with priority
    env.addPropertySource(
      new MapPropertySource('systemProperties', new Map(Object.entries(process.env)))
    );

    // Add application.yml/json properties
    // env.addPropertySource(new YamlPropertySource("application.yml"));

    this.environment = env;
  }

  static getEnvironment(): Environment {
    return this.environment;
  }
}
