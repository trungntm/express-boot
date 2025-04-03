import { Filter } from 'mongodb';
import { DocumentModel } from '../model/document-model';
import { Repository } from './repository';
import { Pageable } from '../domain/pageable';
import { Page } from '../domain/page';

export interface PagingAndSortingMongoRepository<T extends DocumentModel> extends Repository<T> {
  findAllWithPaging(query: Filter<T>, pageable: Pageable): Promise<Page<T>>;
}
