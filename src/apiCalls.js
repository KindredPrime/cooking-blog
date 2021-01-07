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

function getAllBlogPosts() {
  return new Promise((resolve, reject) => {
    signal.addEventListener('abort', () => {
      reject('getAllBlogPosts has been aborted');
    });

    resolve(blogPosts)
  });
}

function getBlogPostsByUser(username) {
  return new Promise((resolve, reject) => {
    const userPosts = blogPosts.filter((post) => post.author === username);

    signal.addEventListener('abort', () => {
      reject('getBlogPostsByUser has been aborted');
    });

    resolve(userPosts)
  });
}

function getBlogPostById(id) {
  return new Promise((resolve, reject) => {
    const blogPost = blogPosts.find((post) => post.id === parseInt(id));

    if (!blogPost) {
      reject(`There is no blog post with id ${id}`);
    }

    resolve(blogPost);
  });
}

function patchBlogPostById(id, updatedFields) {
  return new Promise((resolve, reject) => {
    const { content } = updatedFields;
    getBlogPostById(id)
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

function getCommentById(id) {
  return new Promise((resolve, reject) => {
    const comment = comments.find((comment) => comment.id === id);

    if (!comment) {
      reject(`Comment with id ${id} does not exist`);
    }

    resolve(comment);
  });
}

function getCommentsByBlogPost(title) {
  return new Promise((resolve, reject) => {
    const postComments = comments.filter((comment) => comment.postTitle === title);

    resolve(postComments);
  });
}

function getCommentsByUser(username) {
  return Promise.resolve(comments.filter((comment) => comment.creator === username));
}

function addComment(comment) {
  return new Promise((resolve, reject) => {
    const { content, creator, postTitle } = comment;
    const id = comments.length;

    const newComment = {
      id,
      lastEdited: new Date(Date.now()),
      content,
      creator,
      postTitle
    }

    comments.push(newComment);

    resolve(newComment);
  });
}

function patchCommentById(id, content) {
  return new Promise((resolve, reject) => {
    getCommentById(id)
      .then((comment) => {
        if (comment.content === content) {
          resolve(comment);
        }

        const newComment = {
          ...comment,
          content,
          lastEdited: new Date(Date.now())
        };

        // Update the comment stored in this file
        const commentsIndex = comments.findIndex((elem) => elem.id === id);
        comments[commentsIndex] = newComment;

        resolve(newComment);
      })
      .catch(reject);
  });
}

function deleteCommentById(id) {
  return new Promise((resolve, reject) => {
    getCommentById(id)
      .then(() => {
        const commentsIndex = comments.findIndex((comment) => comment.id === id);
        const comment = comments[commentsIndex];
        comments[commentsIndex] = {
          ...comment,
          lastEdited: new Date(Date.now()),
          content: null,
          creator: null,
          deleted: true
        };

        resolve();
      })
      .catch(reject);
  });
}

function getUserById(id) {
  return Promise.resolve(users.find((user) => user.id === parseInt(id)));
}

export {
  abortTasks,
  getAllBlogPosts,
  getBlogPostsByUser,
  getBlogPostById,
  patchBlogPostById,//
  getCommentById,
  getCommentsByBlogPost,//
  getCommentsByUser,
  addComment,
  patchCommentById,
  deleteCommentById,
  getUserById
};