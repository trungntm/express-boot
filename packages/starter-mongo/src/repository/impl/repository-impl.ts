import { Collection } from 'mongodb';
import { DocumentModel } from '../../model/document-model';
import { DataSource } from '../../mongodb/datasource';
import { Repository } from '../repository';

export class RepositoryImpl<T extends DocumentModel> implements Repository<T> {
  private get COLLECTION_NAME(): string {
    // Fetch the collection name from metadata (this is dynamically done)
    const collectionName = Reflect.getMetadata('mongodb:collectionName', this.constructor);

    if (!collectionName) {
      throw new Error('Collection name not defined in metadata. Please use @Repository decorator.');
    }

    return collectionName;
  }

  protected get collection(): Collection<T> {
    return DataSource.db.collection<T>(this.COLLECTION_NAME);
  }
}
