import * as fs from 'fs';
import * as path from 'path';
import { PropertyPlaceholderResolver } from './property-placeholer-resolver';
import { MapPropertySource } from './property-source';
import { PropertySource } from './property-source';
import { Environment } from './property-source';
import { YamlPropertySource } from './yaml-property-source';
import { JsonPropertySource } from './json-property-source';

export class StandardEnvironment implements Environment {
  private static instance: StandardEnvironment;

  static getInstance(): StandardEnvironment {
    if (!StandardEnvironment.instance) {
      StandardEnvironment.instance = new StandardEnvironment();
    }
    return StandardEnvironment.instance;
  }

  private propertySources: PropertySource[] = [];
  private activeProfiles: string[] = [];

  private constructor() {
    this.loadDefaultProperties();
  }

  public load() {
    // Load profile-specific properties
    this.loadProfileSpecificProperties();
  }

  private loadDefaultProperties(): void {
    // Load environment variables first (lowest priority)
    this.addPropertySource(
      new MapPropertySource('environmentProperties', new Map(Object.entries(process.env)))
    );

    // Load application.yml/yaml (higher priority than env vars)
    const configPathYml = path.resolve(process.cwd(), 'src', 'resources', 'application.yml');
    const configPathYaml = path.resolve(process.cwd(), 'src', 'resources', 'application.yaml');

    if (fs.existsSync(configPathYml)) {
      this.addPropertySource(new YamlPropertySource('application.yml', configPathYml));
    } else if (fs.existsSync(configPathYaml)) {
      this.addPropertySource(new YamlPropertySource('application.yaml', configPathYaml));
    }
  }

  private loadProfileSpecificProperties(): void {
    const profiles = this.getActiveProfiles();
    profiles.forEach(profile => {
      // Try to load profile-specific YAML (highest priority)
      const ymlPath = path.resolve(process.cwd(), 'src', 'resources', `application-${profile}.yml`);
      const yamlPath = path.resolve(
        process.cwd(),
        'src',
        'resources',
        `application-${profile}.yaml`
      );

      if (fs.existsSync(ymlPath)) {
        this.addPropertySource(new YamlPropertySource(`application-${profile}.yml`, ymlPath));
      } else if (fs.existsSync(yamlPath)) {
        this.addPropertySource(new YamlPropertySource(`application-${profile}.yaml`, yamlPath));
      }

      // Try to load profile-specific JSON (highest priority)
      const jsonPath = path.resolve(
        process.cwd(),
        'src',
        'resources',
        `application-${profile}.json`
      );
      if (fs.existsSync(jsonPath)) {
        this.addPropertySource(new JsonPropertySource(`application-${profile}.json`, jsonPath));
      }
    });
  }

  getProperty(key: string): any {
    for (const source of this.propertySources) {
      if (source.containsProperty(key)) {
        let value = source.getProperty(key);

        // Resolve placeholders if the value is a string
        if (typeof value === 'string') {
          value = PropertyPlaceholderResolver.resolve(value, k => this.getProperty(k));
        }

        return value;
      }
    }
    return undefined;
  }

  addPropertySource(propertySource: PropertySource): void {
    this.propertySources.unshift(propertySource);
  }

  getRequiredProperty(key: string): any {
    const value = this.getProperty(key);
    if (value === undefined) {
      throw new Error(`Required property '${key}' not found`);
    }
    return value;
  }

  containsProperty(key: string): boolean {
    return this.propertySources.some(source => source.containsProperty(key));
  }

  setActiveProfiles(profiles: string[]): void {
    this.activeProfiles = profiles;
  }

  getActiveProfiles(): string[] {
    return this.activeProfiles;
  }
}
