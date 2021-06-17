import { Router, Location } from "@reach/router";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const FadeTransitionRouter = (props) => (
  <Location>
    {({ location }) => (
      <TransitionGroup className="w-full h-full">
        <CSSTransition
          key={location.key}
          className="h-full"
          classNames="fade"
          timeout={500}
        >
          <Router location={location}>{props.children}</Router>
        </CSSTransition>
      </TransitionGroup>
    )}
  </Location>
);

export default FadeTransitionRouter;
