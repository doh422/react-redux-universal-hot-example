import React, {Component} from 'react';
import { Test } from 'components';

export default class About extends Component {

  // state = {
  //   showKitten: false
  // }

  // handleToggleKitten = () => this.setState({showKitten: !this.state.showKitten});
  render() {
    // const deckId = 'career_deck';
    // const assessmentId = 'a9ffbd96-ed29-4e7f-8dfb-fc6f867eb875';

    // Traitify.setPublicKey('a653qn1aosgiee1jv49haksgoc');
    // Traitify.setHost('api-sandbox.traitify.com');
    // Traitify.setVersion('v1');
    // // Traitify.setSecretKey('hemohtsgsqg85ai75i1ki84244');

    // console.log(assessmentId);

    // Traitify.ui.load(assessmentId, '.assessment');

    return (
      <div className="container">
        <h1>Traitify</h1>
        <div className="assessment">
          <Test />
        </div>
      </div>
    );
  }
}
