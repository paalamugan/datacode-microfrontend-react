import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Navbar from "./navbar.component";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Navbar,
  errorBoundary(err, info, props) {
    return (
      <div className="flex items-center justify-between h-16 px-6 text-white bg-primary">
        Error Occured in navbar
      </div>
    );
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
