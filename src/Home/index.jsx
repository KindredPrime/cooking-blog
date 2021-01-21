import { Component } from 'react';
//import * as API from '../apiCalls';
import API from '../apiCalls';
import PostsList from '../PostsList/index';
import APIError from '../APIError/index';

class Home extends Component {
  state = {
    blogPosts: null,
    error: null
  };

  componentDidMount() {
    API.getAllBlogPosts()
      .then((blogPosts) => {
        this.setState({
          blogPosts,
          error: null
        });
      })
      .catch((error) => {
        this.setState({
          error
        });
      });
  }

  componentWillUnmount() {
    API.abortTasks();
  }

  render() {
    const { blogPosts, error } = this.state;

    return (
      <main className="Home">
        <header>
          <h1>Welcome to the Cooking Blog!</h1>
        </header>

        <p>
          Ever wanted to learn more about cooking, or share your experiences with others? Here you can read all kinds of posts from other users: things they've tried, things they want to try, recipes, cooking tips, etc. And if you create an account you can make posts of your own, and leave comments on posts.
        </p>

        {blogPosts && <PostsList initialBlogPosts={blogPosts} />}

        {error && <APIError message={error.message} />}
      </main>
    );
  }
}

export default Home;