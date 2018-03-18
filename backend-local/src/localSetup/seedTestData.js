import * as db from '../db'
import faker from 'faker'

let i, j, allTags = [], tags, count

for(j = 0; j < 20; j++) {
  allTags.push(faker.random.word())
}

for(i = 0; i < 50; i++) {

  tags = []
  count = Math.random()*8
  for (j = 0; j < count; j++) {
    tags.push(allTags[Math.round(Math.random()*19)])
  }

  // Create
  db.createFold(
    faker.company.companyName(),
    faker.internet.url(),
    tags,
  )

}