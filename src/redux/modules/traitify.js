const CREATE_ASSESSMENT = 'redux-example/traitify/CREATE_ASSESSMENT';
const CREATE_ASSESSMENT_SUCCESS = 'redux-example/traitify/CREATE_ASSESSMENT_SUCCESS';
const CREATE_ASSESSMENT_FAILURE = 'redux-example/traitify/CREATE_ASSESSMENT_FAILURE';

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
