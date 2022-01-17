import { Redirect, Switch } from "react-router-dom";
import { Route } from "react-router-dom";

import HomePage from "../pages/home";
import NotPage from "../pages/404";

const pageRoutes = {
  HOME: "/", // home page
  NOT_PAGE: "/404",
};

const Routes = () => {
  return (
    <Switch>
      <Route path={pageRoutes.HOME} exact component={HomePage} />
      <Route path={pageRoutes.NOT_PAGE} exact component={NotPage} />
      <Redirect from="*" to={pageRoutes.NOT_PAGE} />
    </Switch>
  );
};

export default Routes;
export { pageRoutes };
