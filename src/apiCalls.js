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
      reject(new Error('getAllBlogPosts has been aborted'));
    });

    resolve(blogPosts)
  });
}

function getBlogPostsByAuthor(username) {
  return new Promise((resolve, reject) => {
    const userPosts = blogPosts.filter((post) => post.author.username === username);

    signal.addEventListener('abort', () => {
      reject(new Error('getBlogPostsByAuthor has been aborted'));
    });

    resolve(userPosts)
  });
}

function getBlogPostById(id) {
  return new Promise((resolve, reject) => {
    const blogPost = blogPosts.find((post) => post.id === parseInt(id));

    if (!blogPost) {
      reject(new Error(`There is no blog post with id ${id}`));
    }

    resolve(blogPost);
  });
}

function patchBlogPost(id, content) {
  return new Promise((resolve, reject) => {
    getBlogPostById(id)
      .then((blogPost) => {
        if (blogPost.content === content) {
          resolve(blogPost);
        }

        const newBlogPost = {
          ...blogPost,
          content,
          lastEdited: new Date()
        };

        // Update the post stored in this file
        const postsIndex = blogPosts.findIndex((elem) => elem.id === parseInt(id));
        blogPosts[postsIndex] = newBlogPost;

        resolve(newBlogPost);
      })
      .catch(reject);
  });
}

function getAllComments() {
  return Promise.resolve(comments);
}

function getCommentById(id) {
  return new Promise((resolve, reject) => {
    const comment = comments.find((comment) => comment.id === id);

    if (!comment) {
      reject(new Error(`Comment with id ${id} does not exist`));
    }

    resolve(comment);
  });
}

function getCommentsByBlogPost(title) {
  return new Promise((resolve, reject) => {
    const postComments = comments.filter((comment) => comment.blogPost.title === title);

    resolve(postComments);
  });
}

function getCommentsByCreator(username) {
  return Promise.resolve(comments
    .filter((comment) => comment.creator && comment.creator.username === username)
  );
}

function addComment(comment) {
  return new Promise((resolve, reject) => {
    const { content, creator, blogPost } = comment;
    const id = comments.length + 1;

    const newComment = {
      id,
      lastEdited: new Date(),
      content,
      creator,
      blogPost
    }

    comments.push(newComment);

    resolve(newComment);
  });
}

function patchComment(id, content) {
  return new Promise((resolve, reject) => {
    getCommentById(id)
      .then((comment) => {
        if (comment.content === content) {
          resolve(comment);
        }

        const newComment = {
          ...comment,
          content,
          lastEdited: new Date()
        };

        // Update the comment stored in this file
        const commentsIndex = comments.findIndex((elem) => elem.id === id);
        comments[commentsIndex] = newComment;

        resolve(newComment);
      })
      .catch(reject);
  });
}

function deleteComment(id) {
  return new Promise((resolve, reject) => {
    const commentsIndex = comments.findIndex((comment) => comment.id === id);

    if (commentsIndex < 0) {
      reject(new Error(`Comment with id ${id} does not exist`));
    }

    const comment = comments[commentsIndex];
    comments[commentsIndex] = {
      ...comment,
      lastEdited: new Date(),
      content: '[Deleted]',
      creator: null,
      deleted: true
    };

    resolve();
  });
}

function getUserById(id) {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === parseInt(id));

    if (user === undefined) {
      reject(new Error(`User with id ${id} does not exist`));
    }

    resolve(user);
  });
}

export {
  abortTasks,
  getAllBlogPosts,
  getBlogPostsByAuthor,
  getBlogPostById,
  patchBlogPost,
  getAllComments,
  getCommentById,
  getCommentsByBlogPost,
  getCommentsByCreator,
  addComment,
  patchComment,
  deleteComment,
  getUserById
};