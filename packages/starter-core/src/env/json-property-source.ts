import * as fs from 'fs';
import { FilePropertySource } from './file-property-source';

export class JsonPropertySource extends FilePropertySource {
  constructor(name: string, filePath: string) {
    super(name, filePath);
    this.loadJson();
  }

  private loadJson(): void {
    try {
      const content = fs.readFileSync(this.filePath, 'utf8');
      const parsed = JSON.parse(content);
      this.properties = this.flattenObject(parsed);
    } catch (error) {
      console.warn(`Failed to load JSON file: ${this.filePath}`, error);
    }
  }
}
