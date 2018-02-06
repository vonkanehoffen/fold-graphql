import * as dbFolds from '../dynamodb/folds';

export default {
  Query: {
    folds: () => dbFolds.getFolds(),
    fold: (_, args) => dbFolds.getFoldById(args.id),
  },
  // Mutation: {
  //   createSong: (_, args) => dbFolds.createSong(args),
  //   updateSong: (_, args) => dbFolds.updateSong(args),
  //   deleteSong: (_, args) => dbFolds.deleteSong(args),
  // },
};
