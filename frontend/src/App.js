import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import CreateGroupPage from "./components/CreateGroupPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/lp/how-to-group-start">
            <CreateGroupPage />
          </Route>
          <Route path="/chats">
          </Route>
          <Route path="/notifications">
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
