import { Route } from 'react-router-dom';
import Home from './Home/index';
import Account from './Account/index';
import './App.css';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home} />
      <Route
        path="/account"
        // The username and email are set to a default for the static client
        render={() => <Account username="User1" email="user1@gmail.com"/>}
      />
    </div>
  );
}

export default App;