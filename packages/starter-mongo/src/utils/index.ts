import { ObjectId } from 'mongodb';

const objectId = (id: string): ObjectId => {
  return new ObjectId(id);
};

export { objectId };
