import { PropertySource } from './property-source';

interface PropertySourceLoader {
  getFileExtensions: string[];
  load(name: string): PropertySource[];
}

export type { PropertySourceLoader };
