import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    //update state so the next state will show the fallback UI
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      //render any custom fallback UI
      return <h1>Something went wrong</h1>;
    }

    return this.props.children;
  }
}
