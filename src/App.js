import React from "react";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import DeclarationDashboard from "./Declarations/DeclarationDashboard";
import rootReducer from "./reducers";
import "./Declarations/scss/App.scss";

// Store will be added for the Redux DevTools browser extension
const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
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
