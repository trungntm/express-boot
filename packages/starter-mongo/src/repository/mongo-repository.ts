import { DeleteResult, Filter, WithId } from 'mongodb';
import { DocumentModel } from '../model/document-model';
import { PagingAndSortingMongoRepository } from './paging-and-sorting-mongo-repository';

export interface MongoRepository<T extends DocumentModel>
  extends PagingAndSortingMongoRepository<T> {
  findAll(query?: Filter<T>): Promise<WithId<T>[]>;
  findById(id: string): Promise<WithId<T> | null>;
  findOne(filter: Filter<T>): Promise<WithId<T> | null>;
  save(object: Partial<T> & { _id?: string }): Promise<WithId<T> | null>;
  deleteById(id: string): Promise<DeleteResult>;
  isValidObjectId(param: string): boolean;
  count(query?: Filter<T>): Promise<number>;
}
