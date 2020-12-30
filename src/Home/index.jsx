import PostsList from '../PostsList/index';

function Home(props) {
  return (
    <main className="Home">
      <h1>Welcome to the Cooking Blog!</h1>

      <p>
        Ever wanted to learn more about cooking, or share your experiences with others? Here you can read all kinds of posts from other users: things they've tried, things they want to try, recipes, cooking tips, etc. And if you create an account you can make posts of your own, and leave comments on posts.
      </p>

      <PostsList />
    </main>
  );
}

export default Home;