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
    saving: state.traitify.saving
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
    saving: PropTypes.bool
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

    const {assessment} = this.props;
    if (typeof Traitify !== 'undefined' && assessment) {
      Traitify.ui.load(assessment.id, '.assessment');
    }
  }

  componentDidUpdate(prevProps) {
    const {assessment} = this.props;
    if (typeof Traitify !== 'undefined' && assessment && !prevProps.assessment) {
      // just got assessment id and put the <div> in the DOM
      Traitify.ui.load(assessment.id, '.assessment');
    }
  }

  render() {
    const {assessment, createAssessment, createError, creating} = this.props;
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
        {assessment && <div className="assessment"/>}
      </div>
    );
  }
}
