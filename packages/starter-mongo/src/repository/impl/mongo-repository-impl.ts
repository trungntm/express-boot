import {
  Filter,
  WithId,
  DeleteResult,
  OptionalUnlessRequiredId,
  InsertOneResult,
  UpdateResult,
} from 'mongodb';
import { DocumentModel } from '../../model/document-model';
import { MongoRepository } from '../mongo-repository';
import { objectId } from '../../utils';
import { PagingAndSortingMongoRepositoryImpl } from './paging-mongo-repository-impl';

export abstract class MongoRepositoryImpl<T extends DocumentModel>
  extends PagingAndSortingMongoRepositoryImpl<T>
  implements MongoRepository<T>
{
  async count(query: Filter<T> = {}): Promise<number> {
    return this.collection.countDocuments(query);
  }

  async deleteById(id: string): Promise<DeleteResult> {
    const filter: Filter<T> = { _id: objectId(id) } as Filter<T>;
    return this.collection.deleteOne(filter);
  }

  async findAll(query: Filter<T> = {}): Promise<WithId<T>[]> {
    return this.collection.find(query).toArray();
  }

  async findById(id: string): Promise<WithId<T> | null> {
    const filter: Filter<T> = { _id: objectId(id) } as Filter<T>;
    return this.collection.findOne(filter);
  }

  async findOne(filter: Filter<T>): Promise<WithId<T> | null> {
    return this.collection.findOne(filter);
  }

  isValidObjectId(param: string): boolean {
    return false;
  }

  async save(object: Partial<T> & { _id?: string }): Promise<WithId<T> | null> {
    const { _id, ...bodyToUpdate } = object;
    if (_id) {
      const filter: Filter<T> = { _id: objectId(_id) } as Filter<T>;
      const updateFields: Partial<T> = {
        ...bodyToUpdate,
        // updatedBy: user?.email
      } as Partial<T>;
      const updateResult: UpdateResult = await this.collection.updateOne(filter, {
        $set: updateFields,
      });

      if (updateResult.matchedCount > 0) {
        return this.collection.findOne(filter);
      }
      return null;
    }

    const toCreated = { ...object };
    const acknowledgeCreated: InsertOneResult = await this.collection.insertOne(
      toCreated as OptionalUnlessRequiredId<T>
    );
    const createdId = acknowledgeCreated.insertedId;
    const filter: Filter<T> = { _id: createdId } as Filter<T>;
    return this.collection.findOne(filter);
  }
}
