import React from "react";
import "./Declarations/scss/App.scss";
import DeclarationDashboard from "./Declarations/DeclarationDashboard";

import { createStore } from "redux";
import rootReducer from "./reducers";
import { Provider } from "react-redux";

// Store will be added for the Redux DevTools browser extension
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <DeclarationDashboard />
      </div>
    </Provider>
  );
};

export default App;
