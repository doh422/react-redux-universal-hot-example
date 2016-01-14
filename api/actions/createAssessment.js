import traitify from '../traitify';

export default function createAssessment(req) {
  const {body: {deck}} = req;
  return new Promise(resolve => {
    traitify.createAssessment(deck, resolve);
  });
}
