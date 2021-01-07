import { Route } from 'react-router-dom';
import Nav from './Nav/index';
import Home from './Home/index';
import UserPage from './UserPage/index';
import PostPage from './PostPage/index';
import CookingContext from './CookingContext';
import './App.css';

function App() {
  // The username is set to a default for the static client
  const contextValue = {
    username: 'User1'
  };

  return (
    <CookingContext.Provider value={contextValue}>
      <div className="App">
        <Nav />

        <Route exact path="/" component={Home} />
        <Route
          path="/user/:id"
          component={UserPage}
        />
        <Route
          path="/blog-posts/:id"
          component={PostPage}
        />
      </div>
    </CookingContext.Provider>
  );
}

export default App;