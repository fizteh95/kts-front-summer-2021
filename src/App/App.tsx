import * as React from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import RepoPage from "./pages/RepoPage";
import SearchPage from "./pages/SearchPage";
import "./App.scss";
import { ReposContext } from "./types";

const initial_context: ReposContext = {
  list: [],
  isLoading: true,
  load: () => {},
};

let setContext: any = () => {};

const ReposContextVal = React.createContext({
  context: initial_context,
  setContext: setContext,
});
const Provider = ReposContextVal.Provider;

export const useReposContext = () => React.useContext(ReposContextVal);

const App: React.FC = () => {
  const [context, setContext] = React.useState(initial_context);

  return (
    <>
      <Provider value={{ context, setContext }}>
        <BrowserRouter>
          <Switch>
            <Route path="/repos/:id" component={RepoPage} />
            <Route path="/repos" component={SearchPage} />
            <Redirect to="/repos" />
          </Switch>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
