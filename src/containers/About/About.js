import React, {Component} from 'react';
// import { Test } from 'components';

export default class About extends Component {

  componentDidMount() {
    // http://facebook.github.io/react/docs/component-specs.html
    // You only want to do this setup stuff *once* on this page. render() is called potentially
    // many many times during the lifecycle of the page, but componentDidMount() is only
    // on first mount.

    // Note that we put it in componentDidMount (as opposed to componentWillMount) for two reasons:
    // A) componentWillMount is also called on the server when doing the server-side rendering, but
    //    we don't have the Traitify API there.
    // B) The Traitify code is assuming that it will be able to find the element on the page, so it
    //    must be called after the component DID mount, not before it mounts in component WILL mount.

    Traitify.setPublicKey('a653qn1aosgiee1jv49haksgoc');
    Traitify.setHost('api-sandbox.traitify.com');
    Traitify.setVersion('v1');
  }

  render() {
    // I moved the className="assessment" element out of Html.js, where it would show up on the
    // footer of all pages, and into only the page where we want it.
    const assessmentId = 'af4059d0-e6f2-4145-ba1f-b4f840781928';
    function showAssessment() {
      Traitify.ui.load(assessmentId, '.assessment');
    }

    return (
      <div className="container">
        <h1>Traitify Assessment</h1>
        <button onClick={showAssessment}>Take Assessment</button>
        <div className="assessment"></div>
      </div>
    );
  }
}
