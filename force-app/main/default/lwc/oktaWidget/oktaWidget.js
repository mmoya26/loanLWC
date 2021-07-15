import { LightningElement } from "lwc";
import { loadStyle, loadScript } from "lightning/platformResourceLoader";

import signInWidget from "@salesforce/resourceUrl/OktaSignIn";
import signInWidgetCSS from "@salesforce/resourceUrl/oktaCSS";

export default class OktaSignInWidget extends LightningElement {
  renderedCallback() {
    Promise.all([
      // loads Salesforce-hosted Static Resources [Okta .js/.css files]
      loadScript(this, signInWidget),
      loadStyle(this, signInWidgetCSS)
    ])
      .then(() => this.renderSignInWidget()) // OktaSignIn function now in global scope
      .catch((error) => console.log("renderCallback error: ", error));
  }

  renderSignInWidget() {
    const signIn = new OktaSignIn({baseUrl: 'https://dev-57944038.okta.com'});
    const el = this.template.querySelector(".widget-container");
    signIn.renderEl({el}, function success(res) {
    if (res.status === 'SUCCESS') {
      console.log('Do something with this sessionToken', res.session.token);
      console.log('Logged in');
    } else {
    // The user can be in another authentication state that requires further action.
    // For more information about these states, see:
    //   https://github.com/okta/okta-signin-widget#rendereloptions-success-error
    }
  });
  }
}
