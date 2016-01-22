import traitify from '../traitify';

export default function getPersonalityTypes(req) {
	const {body: {assessId}} = req;
	return new Promise(resolve => {
		traitify.getPersonalityTypes(assessId, resolve);
	});
}