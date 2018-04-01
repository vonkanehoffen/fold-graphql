// Provide resolver functions for your schema fields
import * as db from './db'
import {getOwnerId} from './helpers'

const resolvers = {
  Query: {
    getAllFolds: () => db.allFolds(),
    getFold: (_, {id, ownerId}) => db.getSingleFold(id, ownerId),
    getTag: (_, {slug, ownerId}) => db.getSingleTag(slug, ownerId),
    getAllTags: () => db.allTags(),
    getAuthor: (_, {id}) => authorsDB.find(a => a.id == id),

    getAllMyFolds: (_, args, context) => {
      console.log('owner:', getOwnerId(context))
      return db.getFoldsByOwner(getOwnerId(context))
    }
  },
  Mutation: {
    createFold: (_, {title, address, tags}, context) =>
      db.createFold(title, address, tags, context),
    updateFold: (_, {id, ownerId, title, address, tags}, context) =>
      db.updateFold(id, ownerId, title, address, tags, context).then(data => data.Attributes),
    deleteFold: (_, {id, ownerId}, context) =>
      db.deleteFold(id, ownerId, context),
  },
  Fold: {
    // TODO: Figure out the gest way of doing this.
    tags: (fold) => fold.tags.map(t => (
      {
        name: t,
        slug: t.toLowerCase(),
        ownerId: fold.ownerId
      }))
    // This works but requires loads of DB queries:
    // tags: (fold) => fold.tags && db.getMultipleTags(fold.tags, fold.ownerId).then(data => data.Responses.tags)
    // Should that whole tags table be a GSI somehow? ...and hence the format ignored in this data? Just a simple array of terms?
  },
  Tag: {
    folds: (tag) => {
      // return foldsDB.filter(f => {
      //   return f.tags.includes(tag.slug)
      // })
      return db.getFoldsByTag(tag.name, tag.ownerId).then(data => data.Items)
    }
  },
  Author: {
    folds: (author) => {
      return db.getFoldsByOwner(author.id)
      // return foldsDB.filter(f => f.ownerId === author.id)
    }
  }
};

const authorsDB = [
  { id: '1a', name: 'Kane', email: 'kane@kane.com' },
  { id: '2c', name: 'Bob', email: 'bob@bloke.com' },
  { id: 'a9', name: 'Freddy Fredderson', email: 'fred@bloke.com' },
]

export default resolvers
