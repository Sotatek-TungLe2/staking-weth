import React from "react";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";
import ConnectPage from "../pages/ConnectPage";
import History from "../pages/History";
import Staking from "../pages/Staking";

const RouterCom = (props) => {
  return (
    <Switch>
      <Route path='/' exact component={ConnectPage} />
      <Route path='/staking' exact component={Staking} />
      <Route path='/history' exact component={History} />
      {/* <Route path={ROUTES.PAGE_NOT_FOUND} exact component={PageNotFound} /> */}
    </Switch>
  );
};

export default withRouter(RouterCom);
