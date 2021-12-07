import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Event from "./components/EventModal";
import SingleEventPage from "./components/SingleEvent";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <Switch>
        <Route exact path='/'>
          <Event />
        </Route>
        <Route path='/events/:id'>
          <SingleEventPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
