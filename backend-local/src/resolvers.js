// Provide resolver functions for your schema fields
import * as db from './db'

const resolvers = {
  Query: {
    getAllFolds: () => db.allFolds(),
    getFold: (_, {id, ownerId}) => db.getSingleFold(id, ownerId),
    getTag: (_, {slug, ownerId}) => db.getSingleTag(slug, ownerId),
    getAllTags: () => db.allTags(),
    getAuthor: (_, {id}) => authorsDB.find(a => a.id == id),
  },
  Mutation: {
    createFold: (_, {title, address, tags}) => db.createFold(title, address, tags)
  },
  Fold: {
    tags: (fold) => fold.tags && db.getMultipleTags(fold.tags, fold.ownerId).then(data => data.Responses.tags)
    // tags: (root, args, context) => {
    //   return root.tags && root.tags.map(t => tagsDB.find(tag => tag.slug === t))
    // }
  },
  Tag: {
    folds: (tag) => {
      return foldsDB.filter(f => {
        return f.tags.includes(tag.slug)
      })
    }
  },
  Author: {
    folds: (author) => {
      console.log(author.id)
      return db.getFoldsByOwner(author.id)
      // return foldsDB.filter(f => f.ownerId === author.id)
    }
  }
};

const foldsDB = [
  { id: 1, ownerId: '1a', title: 'Lorem Ipsum', address: 'http://lipsum.com', tags: ['foo', 'bar'] },
  { id: 2, ownerId: '2c', title: 'Dolor Sit', address: 'http://dolor.com', tags: ['foo', 'sheep'] },
  { id: 3, ownerId: '2c', title: 'Quivactus Wotsit', address: 'http://wosit.com', tags: ['foo'] },
]
const tagsDB = [
  { slug: 'foo', name: 'Foo' },
  { slug: 'bar', name: 'Bar' },
  { slug: 'sheep', name: 'Sheep baaaa' },
]
const authorsDB = [
  { id: '1a', name: 'Kane', email: 'kane@kane.com' },
  { id: '2c', name: 'Bob', email: 'bob@bloke.com' },
  { id: 'a9', name: 'Freddy Fredderson', email: 'fred@bloke.com' },
]

export default resolvers
