import { Route } from 'react-router-dom';
import Nav from './Nav/index';
import Home from './Home/index';
import Account from './Account/index';
import CookingContext from './CookingContext';
import './App.css';

function App() {
  const contextValue = {
    username: 'User1'
  };

  return (
    <CookingContext.Provider value={contextValue}>
      <div className="App">
        <Nav />

        <Route exact path="/" component={Home} />
        <Route
          path="/account"
          // The username and email are set to a default for the static client
          render={() => <Account username="User1" email="user1@gmail.com" />}
        />
      </div>
    </CookingContext.Provider>
  );
}

export default App;