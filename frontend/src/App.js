import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import CreateGroupPage from "./components/CreateGroupPage";
import GroupList from "./components/GroupList";
import GroupPage from "./components/GroupPage";
import EditGroupPage from "./components/EditGroupPage";
import EventList from "./components/EventList";
import EventPage from "./components/EventPage";
import CreateEventPage from "./components/CreateEventPage";
import EditEventPage from "./components/EditEventPage";
import SplashPage from "./components/SplashPage";
import Footer from "./components/Footer";
import MembershipPage from "./components/MembershipPage";

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
          <Route exact path="/groups/:groupId/edit">
            <EditGroupPage />
          </Route>
          <Route path='/groups/:groupId/events'>
            <CreateEventPage />
          </Route>
          <Route path="/events/:eventId/edit">
            <EditEventPage />
          </Route>
          <Route path="/groups/start">
            <CreateGroupPage />
          </Route>
          <Route exact path="/groups/:groupId">
            <GroupPage />
          </Route>
          <Route path="/events/:eventId">
            <EventPage />
          </Route>
          <Route path="/memberships/:groupId">
            <MembershipPage />
          </Route>
          <Route path="/groups">
            <GroupList />
          </Route>
          <Route path="/events">
            <EventList />
          </Route>
          <Route path="/">
            <SplashPage />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
