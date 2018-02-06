import * as dbFolds from '../dynamodb/folds';

export default {
  Query: {
    folds: () => dbFolds.getFolds(),
    fold: (_, args) => dbFolds.getFoldById(args.id),
  },
  Mutation: {
    createFold: (_, args) => dbFolds.createFold(args),
    updateFold: (_, args) => dbFolds.updateFold(args),
    deleteFold: (_, args) => dbFolds.deleteFold(args),
  },
};
