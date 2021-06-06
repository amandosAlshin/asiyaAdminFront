import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUserInfo } from "@/store/actions";
import Layout from "@/views/layout";
import Login from "@/views/login";
import SignUp from "@/views/signup";

class Router extends React.Component {
  render() {
    const { token, role, getUserInfo } = this.props;
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route
            path="/"
            render={() => {
              console.log({ token });
              if (!token) {
                return <Redirect to="/login" />;
              } else {
                console.log({ role });
                if (role) {
                  return <Layout />;
                } else {
                  getUserInfo(token).then(() => {
                    return <Layout />
                  }).catch(err => {
                    console.error('testin');
                  });
                }
              }
            }}
          />
        </Switch>
      </HashRouter>
    );
  }
}

export default connect((state) => state.user, { getUserInfo })(Router);
