// Sample blog posts, in the format they are received from the API
const apiBlogPosts = [
  {
    id: 1,
    last_edited: '2020-12-17T07:37:16.000Z',
    title: 'Lessons I Learned from Cooking',
    author_id: 2,
    author_username: 'FakeUser2',
    content: `Have patience, it can be fun to experiment and explore, having a hard time learning something may only be temporary, bringing an idea of yours to life by creating it from scratch without relying on any instructions can be fun and rewarding, the meals you cook don't have to be fancy or difficult to taste good.`
  },
  {
    id: 2,
    last_edited: '2020-12-28T18:24:43.000Z',
    title: 'How to Save Money When Cooking',
    author_id: 1,
    author_username: 'User1',
    content: `Buy in bulk, cook in bulk and freeze the leftovers, but store brand products.`
  },
  {
    id: 3,
    last_edited: '2020-12-01T12:54:31.000Z',
    title: '5 Easy Cooking Tips',
    author_id: 3,
    author_username: 'User3',
    content: `1. When experimenting with seasonings in a recipe, mix them dry in a cup and smell it. If it smells good, then it'll probably taste good.
    2. Add some water when microwaving leftovers
    3. Start small with seasonings
    4. Cook
    5. Blah`
  },
  {
    id: 4,
    last_edited: '2021-01-05T08:28:28.000Z',
    title: 'Cooking Basics for Beginners',
    author_id: 1,
    author_username: 'User1',
    content: `Go easy on seasonings and salt, if the inside of cooked chicken is pink or its juices aren't clear then it needs to be cooked longer, cooked ground beef needs to be brown in order to be safe to eat`
  },
  {
    id: 5,
    last_edited: '2020-12-15T11:56:48.000Z',
    title: 'Winter Seasoning Guide',
    author_id: 2,
    author_username: 'User2',
    content: `Rosemary, sage, thyme, cinnamon, nutmeg`
  },
  {
    id: 6,
    last_edited: '2021-01-05T14:22:39.000Z',
    title: 'Title6',
    author_id: 3,
    author_username: 'User3',
    content: 'Post 6 content'
  },
  {
    id: 7,
    last_edited: '2021-01-02T16:22:39.000Z',
    title: 'Title7',
    author_id: 3,
    author_username: 'User3',
    content: 'Post 7 content'
  },
  {
    id: 8,
    last_edited: '2021-01-06T12:22:39.000Z',
    title: 'Title8',
    author_id: 3,
    author_username: 'User3',
    content: 'Post 8 content'
  },
  {
    id: 9,
    last_edited: '2020-12-15T11:22:39.000Z',
    title: 'Title9',
    author_id: 3,
    author_username: 'User3',
    content: 'Post 9 content'
  },
  {
    id: 10,
    last_edited: '2020-12-15T19:22:39.000Z',
    title: 'Title10',
    author_id: 3,
    author_username: 'User3',
    content: 'Post 10 content'
  },
  {
    id: 11,
    last_edited: '2021-01-04T18:22:39.000Z',
    title: 'Title11',
    author_id: 3,
    author_username: 'User3',
    content: 'Post 11 content'
  }
];

// Sample comments, in the format they are after being processed for use in the client
const clientBlogPosts = [
  {
    id: 1,
    lastEdited: '07:37:16 Dec 17, 2020',
    title: 'Lessons I Learned from Cooking',
    authorId: 2,
    authorUsername: 'FakeUser2',
    content: `Have patience, it can be fun to experiment and explore, having a hard time learning something may only be temporary, bringing an idea of yours to life by creating it from scratch without relying on any instructions can be fun and rewarding, the meals you cook don't have to be fancy or difficult to taste good.`
  },
  {
    id: 2,
    lastEdited: '18:24:43 Dec 28, 2020',
    title: 'How to Save Money When Cooking',
    authorId: 1,
    authorUsername: 'User1',
    content: `Buy in bulk, cook in bulk and freeze the leftovers, but store brand products.`
  },
  {
    id: 3,
    lastEdited: '12:54:31 Dec 01, 2020',
    title: '5 Easy Cooking Tips',
    authorId: 3,
    authorUsername: 'User3',
    content: `1. When experimenting with seasonings in a recipe, mix them dry in a cup and smell it. If it smells good, then it'll probably taste good.
    2. Add some water when microwaving leftovers
    3. Start small with seasonings
    4. Cook
    5. Blah`
  },
  {
    id: 4,
    lastEdited: '08:28:28 Jan 05, 2021',
    title: 'Cooking Basics for Beginners',
    authorId: 1,
    authorUsername: 'User1',
    content: `Go easy on seasonings and salt, if the inside of cooked chicken is pink or its juices aren't clear then it needs to be cooked longer, cooked ground beef needs to be brown in order to be safe to eat`
  },
  {
    id: 5,
    lastEdited: '11:56:48 Dec 15, 2020',
    title: 'Winter Seasoning Guide',
    authorId: 2,
    authorUsername: 'User2',
    content: `Rosemary, sage, thyme, cinnamon, nutmeg`
  },
  {
    id: 6,
    lastEdited: '14:22:39 Jan 05, 2021',
    title: 'Title6',
    authorId: 3,
    authorUsername: 'User3',
    content: 'Post 6 content'
  },
  {
    id: 7,
    lastEdited: '16:22:39 Jan 02, 2021',
    title: 'Title7',
    authorId: 3,
    authorUsername: 'User3',
    content: 'Post 7 content'
  },
  {
    id: 8,
    lastEdited: '12:22:39 Jan 06, 2021',
    title: 'Title8',
    authorId: 3,
    authorUsername: 'User3',
    content: 'Post 8 content'
  },
  {
    id: 9,
    lastEdited: '11:22:39 Dec 15, 2020',
    title: 'Title9',
    authorId: 3,
    authorUsername: 'User3',
    content: 'Post 9 content'
  },
  {
    id: 10,
    lastEdited: '19:22:39 Dec 15, 2020',
    title: 'Title10',
    authorId: 3,
    authorUsername: 'User3',
    content: 'Post 10 content'
  },
  {
    id: 11,
    lastEdited: '18:22:39 Jan 04 2021',
    title: 'Title11',
    authorId: 3,
    authorUsername: 'User3',
    content: 'Post 11 content'
  }
];

// Sample comments, in the format they are received from the API
const apiComments = [
  {
    id: 1,
    last_edited: '2020-12-19T07:37:16.000Z',
    content: 'These are all great lessons!',
    creator_id: 1,
    creator_username: 'User1',
    post_id: 1,
    post_title: 'Lessons I Learned from Cooking'
  },
  {
    id: 2,
    last_edited: '2020-12-17T08:37:52.000Z',
    content: `I can't wait to try these seasoning combinations in my next meal!`,
    creator_id: 1,
    creator_username: 'User1',
    post_id: 5,
    post_title: 'Winter Seasoning Guide'
  },
  {
    id: 3,
    last_edited: '2021-01-05T08:28:28.000Z',
    content: `I wish I knew these when I started learning to cook!`,
    creator_id: 4,
    creator_username: 'User4',
    post_id: 4,
    post_title: 'Cooking Basics for Beginners'
  },
  {
    id: 4,
    last_edited: '2020-12-31T09:24:43.000Z',
    content: `Great advice!  This'll help me save so much money feeding my three teenagers!`,
    creator_id: 4,
    creator_username: 'User4',
    post_id: 2,
    post_title: 'How to Save Money When Cooking',
  },
  {
    id: 5,
    last_edited: '2021-01-01T10:31:39.000Z',
    content: `What an insightful post`,
    creator_id: 2,
    creator_username: 'FakeUser2',
    post_id: 7,
    post_title: 'Title7'
  },
  {
    id: 6,
    last_edited: '2020-12-19T08:37:16.000Z',
    content: 'I know, right?',
    creator_id: 3,
    creator_username: 'User3',
    post_id: 1,
    post_title: 'Lessons I Learned from Cooking'
  },
  {
    id: 7,
    last_edited: '2020-12-20T10:43:16.000Z',
    content: `It's amazing what you can learn from cooking`,
    creator_id: 4,
    creator_username: 'User4',
    post_id: 1,
    post_title: 'Lessons I Learned from Cooking'
  },
  {
    id: 8,
    last_edited: '2020-12-17T20:12:16.000Z',
    content: 'Huh, I never thought about it this way',
    creator_id: 5,
    creator_username: 'User5',
    post_id: 1,
    post_title: 'Lessons I Learned from Cooking'
  },
  {
    id: 9,
    last_edited: '2020-12-12T07:07:07.000Z',
    content: 'Comment9',
    creator_id: 6,
    creator_username: 'User6',
    post_id: 1,
    post_title: 'Lessons I Learned from Cooking'
  },
  {
    id: 10,
    last_edited: '2020-12-19T15:22:16.000Z',
    content: 'Comment10',
    creator_id: 7,
    creator_username: 'User7',
    post_id: 1,
    post_title: 'Lessons I Learned from Cooking'
  },
  {
    id: 11,
    last_edited: '2020-12-15T17:18:19.000Z',
    content: 'Comment11',
    creator_id: 8,
    creator_username: 'User8',
    post_id: 1,
    post_title: 'Lessons I Learned from Cooking'
  },
  {
    id: 12,
    last_edited: '2021-01-01T12:13:14.000Z',
    content: 'Comment12',
    creator_id: 5,
    creator_username: 'User5',
    post_id: 1,
    post_title: 'Lessons I Learned from Cooking'
  },
  {
    id: 13,
    last_edited: '2021-01-02T13:14:15.000Z',
    content: 'Comment13',
    creator_id: 5,
    creator_username: 'User5',
    post_id: 1,
    post_title: 'Lessons I Learned from Cooking'
  },
  {
    id: 14,
    last_edited: '2021-01-05T06:07:08.000Z',
    content: 'Comment14',
    creator_id: 5,
    creator_username: 'User5',
    post_id: 1,
    post_title: 'Lessons I Learned from Cooking'
  },
  {
    id: 15,
    last_edited: '2021-01-03T20:21:22.000Z',
    content: 'Comment15',
    creator_id: 5,
    creator_username: 'User5',
    post_id: 1,
    post_title: 'Lessons I Learned from Cooking'
  },
  {
    id: 16,
    last_edited: '2021-01-04T20:21:22.000Z',
    content: 'Comment16',
    creator_id: 5,
    creator_username: 'User5',
    post_id: 2,
    post_title: 'How to Save Money When Cooking'
  },
  {
    id: 17,
    last_edited: '2021-01-05T20:21:22.000Z',
    content: 'Comment17',
    creator_id: 5,
    creator_username: 'User5',
    post_id: 3,
    post_title: '5 Easy Cooking Tips'
  },
  {
    id: 18,
    last_edited: '2021-01-06T20:21:22.000Z',
    content: 'Comment18',
    creator_id: 5,
    creator_username: 'User5',
    post_id: 4,
    post_title: 'Cooking Basics for Beginners'
  },
  {
    id: 19,
    last_edited: '2021-01-07T20:21:22.000Z',
    content: 'Comment19',
    creator_id: 5,
    creator_username: 'User5',
    post_id: 5,
    post_title: 'Winter Seasoning Guide'
  },
  {
    id: 20,
    last_edited: '2021-01-08T20:21:22.000Z',
    content: 'Comment20',
    creator_id: 5,
    creator_username: 'User5',
    post_id: 6,
    post_title: 'Title6'
  },
  {
    id: 21,
    last_edited: '2021-01-09T20:21:22.000Z',
    content: 'Comment21',
    creator_id: 5,
    creator_username: 'User5',
    post_id: 7,
    post_title: 'Title7'
  }
];

// Sample comments, in the format they are after being processed for use in the client
const clientComments = [
  {
    id: 1,
    lastEdited: '07:37:16 Dec 19, 2020',
    content: 'These are all great lessons!',
    creatorId: 1,
    creatorUsername: 'User1',
    postId: 1,
    postTitle: 'Lessons I Learned from Cooking'
  },
  {
    id: 2,
    lastEdited: '08:37:52 Dec 17, 2020',
    content: `I can't wait to try these seasoning combinations in my next meal!`,
    creatorId: 1,
    creatorUsername: 'User1',
    postId: 5,
    postTitle: 'Winter Seasoning Guide'
  },
  {
    id: 3,
    lastEdited: '08:28:28 Jan 05 2021',
    content: `I wish I knew these when I started learning to cook!`,
    creatorId: 4,
    creatorUsername: 'User4',
    postId: 4,
    postTitle: 'Cooking Basics for Beginners'
  },
  {
    id: 4,
    lastEdited: '09:24:43 Dec 31, 2020',
    content: `Great advice!  This'll help me save so much money feeding my three teenagers!`,
    creatorId: 4,
    creatorUsername: 'User4',
    postId: 2,
    postTitle: 'How to Save Money When Cooking',
  },
  {
    id: 5,
    lastEdited: '10:31:39 Jan 01, 2021',
    content: `What an insightful post`,
    creatorId: 2,
    creatorUsername: 'FakeUser2',
    postId: 7,
    postTitle: 'Title7'
  },
  {
    id: 6,
    lastEdited: '08:37:16 Dec 19, 2020',
    content: 'I know, right?',
    creatorId: 3,
    creatorUsername: 'User3',
    postId: 1,
    postTitle: 'Lessons I Learned from Cooking'
  },
  {
    id: 7,
    lastEdited: '10:43:16 Dec 20, 2020',
    content: `It's amazing what you can learn from cooking`,
    creatorId: 4,
    creatorUsername: 'User4',
    postId: 1,
    postTitle: 'Lessons I Learned from Cooking'
  },
  {
    id: 8,
    lastEdited: '20:12:16 Dec 17, 2020',
    content: 'Huh, I never thought about it this way',
    creatorId: 5,
    creatorUsername: 'User5',
    postId: 1,
    postTitle: 'Lessons I Learned from Cooking'
  },
  {
    id: 9,
    lastEdited: '07:07:07 Dec 12, 2020',
    content: 'Comment9',
    creatorId: 6,
    creatorUsername: 'User6',
    postId: 1,
    postTitle: 'Lessons I Learned from Cooking'
  },
  {
    id: 10,
    lastEdited: '15:22:16 Dec 19, 2020',
    content: 'Comment10',
    creatorId: 7,
    creatorUsername: 'User7',
    postId: 1,
    postTitle: 'Lessons I Learned from Cooking'
  },
  {
    id: 11,
    lastEdited: '17:18:19 Dec 15, 2020',
    content: 'Comment11',
    creatorId: 8,
    creatorUsername: 'User8',
    postId: 1,
    postTitle: 'Lessons I Learned from Cooking'
  },
  {
    id: 12,
    lastEdited: '12:13:14 Jan 01, 2021',
    content: 'Comment12',
    creatorId: 5,
    creatorUsername: 'User5',
    postId: 1,
    postTitle: 'Lessons I Learned from Cooking'
  },
  {
    id: 13,
    lastEdited: '13:14:15 Jan 02, 2021',
    content: 'Comment13',
    creatorId: 5,
    creatorUsername: 'User5',
    postId: 1,
    postTitle: 'Lessons I Learned from Cooking'
  },
  {
    id: 14,
    lastEdited: '06:07:08 Jan 05, 2021',
    content: 'Comment14',
    creatorId: 5,
    creatorUsername: 'User5',
    postId: 1,
    postTitle: 'Lessons I Learned from Cooking'
  },
  {
    id: 15,
    lastEdited: '20:21:22 Jan 03, 2021',
    content: 'Comment15',
    creatorId: 5,
    creatorUsername: 'User5',
    postId: 1,
    postTitle: 'Lessons I Learned from Cooking'
  },
  {
    id: 16,
    lastEdited: '20:21:22 Jan 04, 2021',
    content: 'Comment16',
    creatorId: 5,
    creatorUsername: 'User5',
    postId: 2,
    postTitle: 'How to Save Money When Cooking'
  },
  {
    id: 17,
    lastEdited: '20:21:22 Jan 05, 2021',
    content: 'Comment17',
    creatorId: 5,
    creatorUsername: 'User5',
    postId: 3,
    postTitle: '5 Easy Cooking Tips'
  },
  {
    id: 18,
    lastEdited: '20:21:22 Jan 06, 2021',
    content: 'Comment18',
    creatorId: 5,
    creatorUsername: 'User5',
    postId: 4,
    postTitle: 'Cooking Basics for Beginners'
  },
  {
    id: 19,
    lastEdited: '20:21:22 Jan 07, 2021',
    content: 'Comment19',
    creatorId: 5,
    creatorUsername: 'User5',
    postId: 5,
    postTitle: 'Winter Seasoning Guide'
  },
  {
    id: 20,
    lastEdited: '20:21:22 Jan 08, 2021',
    content: 'Comment20',
    creatorId: 5,
    creatorUsername: 'User5',
    postId: 6,
    postTitle: 'Title6'
  },
  {
    id: 21,
    lastEdited: '20:21:22 Jan 09, 2021',
    content: 'Comment21',
    creatorId: 5,
    creatorUsername: 'User5',
    postId: 7,
    postTitle: 'Title7'
  }
];

// Sample users, in the format they are received from the API
const apiUsers = [
  {
    id: 1,
    username: 'User1',
    email: 'user1@gmail.com'
  },
  {
    id: 2,
    username: 'FakeUser2',
    email: 'fakeuser2@gmail.com'
  },
  {
    id: 3,
    username: 'User3',
    email: 'user3@gmail.com'
  },
  {
    id: 4,
    username: 'User4',
    email: 'user4@gmail.com'
  },
  {
    id: 5,
    username: 'User5',
    email: 'user5@gmail.com'
  },
  {
    id: 6,
    username: 'User6',
    email: 'user6@gmail.com'
  },
  {
    id: 7,
    username: 'User7',
    email: 'user7@gmail.com'
  },
  {
    id: 8,
    username: 'User8',
    email: 'user8@gmail.com'
  }
];

export {
  apiBlogPosts,
  clientBlogPosts,
  apiComments,
  clientComments,
  apiUsers
};