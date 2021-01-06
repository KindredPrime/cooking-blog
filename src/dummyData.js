const dummyPosts = [
  {
    id: 1,
    lastEdited: 'Dec 17 07:37:16 2020',
    title: 'Lessons I Learned from Cooking',
    author: 'FakeUser2',
    content: `Have patience, it can be fun to experiment and explore, having a hard time learning something may only be temporary, bringing an idea of yours to life by creating it from scratch without relying on any instructions can be fun and rewarding, the meals you cook don't have to be fancy or difficult to taste good.`
  },
  {
    id: 2,
    lastEdited: 'Dec 28 18:24:43 2020',
    title: 'How to Save Money When Cooking',
    author: 'User1',
    content: `Buy in bulk, cook in bulk and freeze the leftovers, but store brand products.`
  },
  {
    id: 3,
    lastEdited: 'Dec 1 12:54:31 2020',
    title: '5 Easy Cooking Tips',
    author: 'User3',
    content: `1. When experimenting with seasonings in a recipe, mix them dry in a cup and smell it. If it smells good, then it'll probably taste good.
    2. Add some water when microwaving leftovers
    3. Start small with seasonings
    4. Cook
    5. Blah`
  },
  {
    id: 4,
    lastEdited: 'Jan 5 08:28:28 2021',
    title: 'Cooking Basics for Beginners',
    author: 'User1',
    content: `Go easy on seasonings and salt, if the inside of cooked chicken is pink or its juices aren't clear then it needs to be cooked longer, cooked ground beef needs to be brown in order to be safe to eat`
  },
  {
    id: 5,
    lastEdited: 'Dec 15 11:56:48 2020',
    title: 'Winter Seasoning Guide',
    author: 'User 2',
    content: `Rosemary, sage, thyme, cinnamon, nutmeg`
  },
  {
    id: 6,
    lastEdited: 'Jan 5 14:22:39 2021',
    title: 'Title6',
    author: 'User3',
    content: 'Post 6 content'
  },
  {
    id: 7,
    lastEdited: 'Jan 2 16:22:39 2021',
    title: 'Title7',
    author: 'User3',
    content: 'Post 7 content'
  },
  {
    id: 8,
    lastEdited: 'Jan 6 12:22:39 2021',
    title: 'Title8',
    author: 'User3',
    content: 'Post 8 content'
  },
  {
    id: 9,
    lastEdited: 'Dec 15 11:22:39 2021',
    title: 'Title9',
    author: 'User3',
    content: 'Post 9 content'
  },
  {
    id: 10,
    lastEdited: 'Dec 15 19:22:39 2021',
    title: 'Title10',
    author: 'User3',
    content: 'Post 10 content'
  },
  {
    id: 11,
    lastEdited: 'Jan 4 18:22:39 2021',
    title: 'Title11',
    author: 'User3',
    content: 'Post 11 content'
  }
];

const dummyComments = [
  {
    id: 1,
    lastEdited: new Date('Dec 19 07:37:16 2020'),
    content: 'These are all great lessons!',
    creator: 'User1',
    postTitle: 'Lessons I Learned from Cooking'
  },
  {
    id: 2,
    lastEdited: new Date('Dec 17 08:37:52 2020'),
    content: `I can't wait to try these seasoning combinations in my next meal!`,
    creator: 'User1',
    postTitle: 'Winter Seasoning Guide'
  },
  {
    id: 3,
    lastEdited: new Date('Jan 5 08:28:28 2021'),
    content: `I wish I knew these when I started learning to cook!`,
    creator: 'User4',
    postTitle: 'Cooking Basics for Beginners'
  },
  {
    id: 4,
    lastEdited: new Date('Dec 31 09:24:43 2020'),
    content: `Great advice!  This'll help me save so much money feeding my three teenagers!`,
    creator: 'User4',
    postTitle: `How to Save Money When Cooking`
  },
  {
    id: 5,
    lastEdited: new Date('Jan 1 10:31:39 2021'),
    content: `What an insightful post`,
    creator: 'FakeUser2',
    postTitle: 'Title7'
  },
  {
    id: 6,
    lastEdited: new Date('Dec 19 08:37:16 2020'),
    content: 'I know, right?',
    creator: 'User3',
    postTitle: 'Lessons I Learned from Cooking'
  },
  {
    id: 7,
    lastEdited: new Date('Dec 20 10:43:16 2020'),
    content: `It's amazing what you can learn from cooking`,
    creator: 'User4',
    postTitle: 'Lessons I Learned from Cooking'
  },
  {
    id: 8,
    lastEdited: new Date('Dec 17 20:12:16 2020'),
    content: 'Huh, I never thought about it this way',
    creator: 'User5',
    postTitle: 'Lessons I Learned from Cooking'
  },
  {
    id: 9,
    lastEdited: new Date('Dec 12 07:07:07 2020'),
    content: 'Comment9',
    creator: 'User6',
    postTitle: 'Lessons I Learned from Cooking'
  },
  {
    id: 10,
    lastEdited: new Date('Dec 19 15:22:16 2020'),
    content: 'Comment10',
    creator: 'User7',
    postTitle: 'Lessons I Learned from Cooking'
  },
  {
    id: 11,
    lastEdited: new Date('Dec 15 17:18:19 2020'),
    content: 'Comment11',
    creator: 'User8',
    postTitle: 'Lessons I Learned from Cooking'
  },
  {
    id: 12,
    lastEdited: new Date('Jan 1 12:13:14 2021'),
    content: 'Comment12',
    creator: 'User5',
    postTitle: 'Lessons I Learned from Cooking'
  },
  {
    id: 13,
    lastEdited: new Date('Jan 2 13:14:15 2021'),
    content: 'Comment13',
    creator: 'User5',
    postTitle: 'Lessons I Learned from Cooking'
  },
  {
    id: 14,
    lastEdited: new Date('Jan 5 06:07:08 2021'),
    content: 'Comment14',
    creator: 'User5',
    postTitle: 'Lessons I Learned from Cooking'
  },
  {
    id: 15,
    lastEdited: new Date('Jan 3 20:21:22 2021'),
    content: 'Comment15',
    creator: 'User5',
    postTitle: 'Lessons I Learned from Cooking'
  }
];

const dummyUsers = [
  {
    id: 1,
    username: 'User1',
    password: 'password1',
    email: 'user1@gmail.com'
  },
  {
    id: 2,
    username: 'FakeUser2',
    password: 'password2',
    email: 'fakeuser2@gmail.com'
  },
  {
    id: 3,
    username: 'User3',
    password: 'password3',
    email: 'user3@gmail.com'
  },
  {
    id: 4,
    username: 'User4',
    password: 'password4',
    email: 'user4@gmail.com'
  },
  {
    id: 5,
    username: 'User5',
    password: 'password5',
    email: 'user5@gmail.com'
  },
  {
    id: 6,
    username: 'User6',
    password: 'password6',
    email: 'user6@gmail.com'
  },
  {
    id: 7,
    username: 'User7',
    password: 'password7',
    email: 'user7@gmail.com'
  },
  {
    id: 8,
    username: 'User8',
    password: 'password8',
    email: 'user8@gmail.com'
  }
];

export {
  dummyPosts,
  dummyComments,
  dummyUsers
};