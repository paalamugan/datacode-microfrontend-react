import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Technology from "./technology.component";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Technology,
  errorBoundary(err, info, props) {
    return (
      <div className="flex items-center justify-between h-16 px-6 text-white bg-primary">
        Error Occured in Technology page
      </div>
    );
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
