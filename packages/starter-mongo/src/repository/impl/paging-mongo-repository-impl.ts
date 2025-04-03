import { Filter } from 'mongodb';
import { DocumentModel } from '../../model/document-model';
import { PagingAndSortingMongoRepository } from '../paging-and-sorting-mongo-repository';
import { RepositoryImpl } from './repository-impl';
import { Pageable } from '../../domain/pageable';
import { Page } from '../../domain/page';

export class PagingAndSortingMongoRepositoryImpl<T extends DocumentModel>
  extends RepositoryImpl<T>
  implements PagingAndSortingMongoRepository<T>
{
  async findAllWithPaging(query: Filter<T>, pageable: Pageable): Promise<Page<T>> {
    const skip = pageable.getPage() * pageable.getLimit();
    const results = await this.collection
      .find(query)
      .skip(skip)
      .limit(pageable.getLimit())
      .sort(pageable.getSort())
      .toArray();
    const total = await this.collection.countDocuments(query);
    return Page.builder<T>()
      .withResults(results)
      .withTotal(total)
      .withPage(pageable.getPage())
      .withLimit(pageable.getLimit())
      .withSortBy(pageable.getSort())
      .build();
  }
}
