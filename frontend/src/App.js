import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import CreateGroupPage from "./components/CreateGroupPage";
import UserHome from "./components/UserHome";
import GroupList from "./components/GroupList";
import UserGroupList from "./components/UserGroupList";
import GroupPage from "./components/GroupPage";
import EditGroupPage from "./components/EditGroupPage";

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
          <Route path="/groups/:groupId/edit">
            <EditGroupPage />
          </Route>
          <Route path="/groups/start">
            <CreateGroupPage />
          </Route>
          <Route path="/groups/user">
            <UserGroupList />
          </Route>
          <Route path="/groups/:groupId">
            <GroupPage />
          </Route>
          <Route path="/groups">
            <GroupList />
          </Route>
          <Route path="/">
            <UserHome />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
