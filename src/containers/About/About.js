import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {createAssessment as createTraitifyAssessment} from '../../redux/modules/traitify';
import {getPersonalityTypes as getTraitifyPersonalityTypes} from '../../redux/modules/traitify';

@connect(
  state => ({
    assessment: state.traitify.assessment,
    createError: state.traitify.createError,
    creating: state.traitify.creating,
    // new states
    saveError: state.traitify.saveError,
    saving: state.traitify.saving,
    results: state.traitify.results,
    // recognize user that logged in from Login
    user: state.auth.user
  }),
  {
    createAssessment: createTraitifyAssessment,
    // new action
    getPersonalityTypes: getTraitifyPersonalityTypes
  }
)
export default class About extends Component {
  static propTypes = {
    assessment: PropTypes.object,
    createAssessment: PropTypes.func.isRequired,
    createError: PropTypes.any,
    creating: PropTypes.bool,
    // new props
    getPersonalityTypes: PropTypes.func,
    saveError: PropTypes.any,
    saving: PropTypes.bool,
    results: PropTypes.object,
    // user props
    user: PropTypes.object,
  }

  // check to see if test has been taken
  componentWillMount() {
    const {user} = this.props;
    console.log(user);
    if (!user) {
      alert('please login');
    } else if (user && !user.test_id) {
      alert('please take assessment');
    } else if (user.test_id && !user.results.complete) {
      alert('please finish assessment');
    } else if (user.test_id && user.results.complete) {
      alert('congrats');
    }
  }

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

    console.log('mounted');
    const {assessment} = this.props;
    const {user} = this.props;
    // const {getPersonalityTypes} = this.props;
    if (typeof Traitify !== 'undefined' && assessment && !user.results.complete) {
      const showSlides = Traitify.ui.load('slideDeck', assessment.id, '.slide-deck', {slideDeck: {showResults: false}});
      showSlides.onInitialize(function() {
        user.test_id = assessment.id;
        console.log(user);
      });
    }
    if (user.results.complete) {
      Traitify.ui.load('results', assessment.id, '.result-deck');
    }
  }

  componentDidUpdate(prevProps) {
    console.log('updated');
    const {assessment} = this.props;
    const {results} = this.props;
    const {user} = this.props;
    const {getPersonalityTypes} = this.props;
    if (typeof Traitify !== 'undefined' && assessment && !prevProps.assessment) {
      // just got assessment id and put the <div> in the DOM
      const showSlides = Traitify.ui.load('slideDeck', assessment.id, '.slide-deck', {slideDeck: {showResults: false}});
      showSlides.onInitialize(function() {
        user.test_id = assessment.id;
        console.log(user);
      });
      showSlides.onFinished(function() {
        alert('finished test');
        // results retrieved and saved to store
        getPersonalityTypes(String(assessment.id));
        user.test_id = assessment.id;
        console.log(assessment);
      });
    }
    if (results && results.personality_blend.name) {
    // show results
      const showResults = Traitify.ui.load('results', assessment.id, '.result-deck');
      showResults.onInitialize(function() {
        user.results.complete = true;
        user.results.personalities = results.personality_blend;
        user.results.personality_types = results.personality_types;
        console.log(user);
        console.log(results);
      });
    }
  }

  render() {
    const {assessment, createAssessment, createError, creating, saveError, saving} = this.props;
    return (
      <div className="container">
        <h1>Traitify Assessment</h1>
        {!assessment && <button
          className="btn btn-success"
          onClick={event => {
            event.preventDefault();
            createAssessment('career-deck');
          }}
          disabled={creating}>Take Assessment</button>}
        {creating && <div>Creating...</div>}
        {createError && <div>{JSON.stringify(createError)}</div>}
        {assessment && <div className="slide-deck"/>}
        <div className="result-deck"></div>
        {user.results.complete && <button>Retake Assessment</button>}
        {saving && <div>Saving...</div>}
        {saveError && <div>{JSON.stringify(saveError)}</div>}
      </div>
    );
  }
}
