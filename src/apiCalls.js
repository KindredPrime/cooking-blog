import { dummyPosts, dummyComments, dummyUsers } from './dummyData';

const blogPosts = dummyPosts;
const comments = dummyComments;
const users = dummyUsers;

let controller = new AbortController();
let signal = controller.signal;

function abortTasks() {
  controller.abort();
  controller = new AbortController();
  signal = controller.signal;
}

function getAllPosts() {
  return new Promise((resolve, reject) => {
    signal.addEventListener('abort', () => {
      reject('getAllPosts has been aborted');
    });

    resolve(blogPosts)
  });
}

function getPostsByUser(id) {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === id);

    if (!user) {
      reject(`There is no user with id ${id}`);
    }

    const userPosts = blogPosts.filter((post) => post.author === user.username);

    signal.addEventListener('abort', () => {
      reject('getPostsByUser has been aborted');
    });

    resolve(userPosts)
  });
}

function getPostById(id) {
  return new Promise((resolve, reject) => {
    const blogPost = blogPosts.find((post) => post.id === parseInt(id));

    if (!blogPost) {
      reject(`There is no blog post with id ${id}`);
    }

    resolve(blogPost);
  });
}

function getCommentsByPost(title) {
  return new Promise((resolve, reject) => {
    const postComments = comments.filter((comment) => comment.postTitle === title);

    resolve(postComments);
  });
}

function patchPostById(id, updatedFields) {
  return new Promise((resolve, reject) => {
    const { content } = updatedFields;
    getPostById(id)
      .then((post) => {
        if (post.content === content) {
          resolve();
        }

        // Update the post stored in this file
        const postsIndex = blogPosts.findIndex((elem) => elem.id === id);
        blogPosts[postsIndex] = {
          ...post,
          content
        };
        resolve();
      });
  });
}

export {
  abortTasks,
  getAllPosts,
  getPostsByUser,
  getPostById,
  getCommentsByPost,
  patchPostById
};