const CREATE_ASSESSMENT = 'redux-example/traitify/CREATE_ASSESSMENT';
const CREATE_ASSESSMENT_SUCCESS = 'redux-example/traitify/CREATE_ASSESSMENT_SUCCESS';
const CREATE_ASSESSMENT_FAILURE = 'redux-example/traitify/CREATE_ASSESSMENT_FAILURE';
// defining new states
const SAVE_RESULTS = 'redux-example/traitify/SAVE_RESULTS';
const SAVE_RESULTS_SUCCESS = 'redux-example/traitify/SAVE_RESULTS_SUCCESS';
const SAVE_RESULTS_FAILURE = 'redux-example/traitify/SAVE_RESULTS_FAILURE';

// redux reducer function
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case CREATE_ASSESSMENT:
      return {
        ...state,
        creating: true
      };
    case CREATE_ASSESSMENT_SUCCESS:
      return {
        ...state,
        creating: false,
        assessment: action.result
      };
    case CREATE_ASSESSMENT_FAILURE:
      return {
        ...state,
        creating: false,
        createError: action.error
      };
    // state for saving results
    case SAVE_RESULTS:
      return {
        ...state,
        saving: true
      };
    case SAVE_RESULTS_SUCCESS:
      return {
        ...state,
        saving: false,
        assessment: action.result
      };
    case SAVE_RESULTS_FAILURE:
      return {
        ...state,
        saving: false,
        saveError: action.error
      };
    default:
      return state;
  }
}

export function createAssessment(deck) {
  return {
    types: [CREATE_ASSESSMENT, CREATE_ASSESSMENT_SUCCESS, CREATE_ASSESSMENT_FAILURE],
    promise: (client) => client.post('/createAssessment', {
      data: {deck}
    })
  };
}

// get results action
export function getPersonalityTypes(assessId) {
  return {
    // states
    types: [SAVE_RESULTS, SAVE_RESULTS_SUCCESS, SAVE_RESULTS_FAILURE],
    promise: (client) => client.get('/getPersonalityTypes', {
      data: {assessId}
    })
  };
}
