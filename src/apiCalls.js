import AbortController from 'abort-controller';

const posts = [
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
    lasEdited: 'Dec 1 12:54:31 2020',
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
    lastEdited: 'Jan 10 08:28:28 2021',
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
    lastEdited: 'Jan 15 14:22:39 2021',
    title: 'Title6',
    author: 'User3',
    content: 'Post 6 content'
  },
  {
    id: 7,
    lastEdited: 'Jan 25 16:22:39 2021',
    title: 'Title7',
    author: 'User3',
    content: 'Post 7 content'
  },
  {
    id: 8,
    lastEdited: 'Jan 18 12:22:39 2021',
    title: 'Title8',
    author: 'User3',
    content: 'Post 8 content'
  },
  {
    id: 9,
    lastEdited: 'Jan 15 11:22:39 2021',
    title: 'Title9',
    author: 'User3',
    content: 'Post 9 content'
  },
  {
    id: 10,
    lastEdited: 'Jan 15 19:22:39 2021',
    title: 'Title10',
    author: 'User3',
    content: 'Post 10 content'
  },
  {
    id: 11,
    lastEdited: 'Jan 15 18:22:39 2021',
    title: 'Title11',
    author: 'User3',
    content: 'Post 11 content'
  }
];

const users = [
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
  }
];


let controller = new AbortController();
let signal = controller.signal;

function abortTasks() {
  controller.abort();
  controller = new AbortController();
  signal = controller.signal;
}

function getAllPosts() {
  return new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => resolve(posts), 1000);

    signal.addEventListener('abort', () => {
      clearTimeout(timeout);
      reject('getAllPosts has been aborted');
    });
  });
}

function getPostsByUser(id) {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === id);

    if (!user) {
      throw new Error(`There is no user with id ${id}`);
    }

    const userPosts = posts.filter((post) => post.author === user.username);

    const timeout = window.setTimeout(() => resolve(userPosts), 1000);

    signal.addEventListener('abort', () => {
      clearTimeout(timeout);
      reject('getAllPosts has been aborted');
    });
  });
}

export {
  abortTasks,
  getAllPosts,
  getPostsByUser
};