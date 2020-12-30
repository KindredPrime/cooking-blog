import AbortController from 'abort-controller';
import { dummyPosts, dummyComments, dummyUsers } from './dummyData';

let controller = new AbortController();
let signal = controller.signal;

function abortTasks() {
  controller.abort();
  controller = new AbortController();
  signal = controller.signal;
}

function getAllPosts() {
  return new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => resolve(dummyPosts), 1000);

    signal.addEventListener('abort', () => {
      clearTimeout(timeout);
      reject('getAllPosts has been aborted');
    });
  });
}

function getPostsByUser(id) {
  return new Promise((resolve, reject) => {
    const user = dummyUsers.find((user) => user.id === id);

    if (!user) {
      throw new Error(`There is no user with id ${id}`);
    }

    const userPosts = dummyPosts.filter((post) => post.author === user.username);

    const timeout = window.setTimeout(() => resolve(userPosts), 1000);

    signal.addEventListener('abort', () => {
      clearTimeout(timeout);
      reject('getAllPosts has been aborted');
    });
  });
}

function getPostById(id) {
  return new Promise((resolve, reject) => {
    const post = dummyPosts.find((post) => post.id === parseInt(id));

    if (!post) {
      reject(`There is no post with id ${id}`);
    }

    resolve(post);
  });
}

function getCommentsByPost(title) {
  return new Promise((resolve, reject) => {
    const comments = dummyComments.filter((comment) => comment.postTitle === title);

    resolve(comments);
  });
}

export {
  abortTasks,
  getAllPosts,
  getPostsByUser,
  getPostById,
  getCommentsByPost
};