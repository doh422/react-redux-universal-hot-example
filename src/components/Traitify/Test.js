import React, {Component, PropTypes} from 'react';

export default class Test extends Component {

	propTypes = {
		assessmentId: PropTypes.string.isRequired,
		
	}

	render() {
		// const deckId = 'career_deck';
    const assessmentId = 'a9ffbd96-ed29-4e7f-8dfb-fc6f867eb875';

    Traitify.setPublicKey('a653qn1aosgiee1jv49haksgoc');
    Traitify.setHost('api-sandbox.traitify.com');
    Traitify.setVersion('v1');
    // Traitify.setSecretKey('hemohtsgsqg85ai75i1ki84244');

    console.log(assessmentId);

    Traitify.ui.load(assessmentId, '#content');
		return (
			<div className="assessment">hello</div>
		);
	}
}
