import React, { Component } from "react";
import styles from "../styles/layout.css";
import { Hidden, CircularProgress, withStyles } from "@material-ui/core";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    this.setState({ loading: false });
  }
  layoutContent() {
    return (
      <>
        <header className="header">
          <Hidden smDown>
            <img src="/images/alt-logo.png" alt="Alt+F4 logo" />
          </Hidden>
          <Hidden mdUp>
            <img src="/images/alt-square-logo.png" alt="Alt+F4 logo" />
          </Hidden>
        </header>
        <main className="container">{this.props.children}</main>
        <footer className="footer">
          Desenvolvido por
          <a href="https://caroliveira.herokuapp.com/">
            <img
              src="/images/logo-carol.png"
              className="caroliveira"
              alt="Caroliveira logo"
            />
          </a>
        </footer>
      </>
    );
  }
  render() {
    return (
      <>{this.state.loading ? <CircularProgress /> : this.layoutContent()}</>
    );
  }
}

export default withStyles(styles)(Layout);
