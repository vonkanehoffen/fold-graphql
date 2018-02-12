import * as dbFolds from '../dynamodb/folds';

export default {
  Query: {
    folds: (_, args) => dbFolds.getFolds(args),
    fold: (_, args) => dbFolds.getFoldById(args.id),
  },
  Mutation: {
    createFold: (_, args, context) => dbFolds.createFold(args, context),
    updateFold: (_, args) => dbFolds.updateFold(args),
    deleteFold: (_, args) => dbFolds.deleteFold(args),
  },
};
