import React from 'react';
import { RNAppleAuthenticationButtonSignInWhite, RNAppleAuthenticationButtonSignInWhiteOutline, RNAppleAuthenticationButtonSignInBlack, RNAppleAuthenticationButtonContinueWhite, RNAppleAuthenticationButtonContinueWhiteOutline, RNAppleAuthenticationButtonContinueBlack } from './RNAppleAuthenticationButton';
import { AppleAuthenticationButtonStyle, AppleAuthenticationButtonType } from './AppleAuthentication.types';
/**
 * This component displays the proprietary "Sign In with Apple" / "Continue with Apple" button on
 * your screen. The App Store Guidelines require you to use this component to start the sign in
 * process instead of a custom button. You can customize the design of the button using the
 * properties. You should start the sign in process when the `onPress` property is called.
 *
 * You should only attempt to render this if `AppleAuthentication.isAvailableAsync()` resolves to
 * true. This component will render nothing if it is not available and you will get a warning if
 * `__DEV__ === true`.
 *
 * The properties of this component extend from `View`; however, you should not attempt to set
 * `backgroundColor` or `borderRadius` with the `style` property. This will not work and is against
 * the App Store Guidelines. Instead, you should use the `buttonStyle` property to choose one of the
 * predefined color styles and the `cornerRadius` property to change the border radius of the
 * button.
 *
 * @see [Apple
 * Documentation](https://developer.apple.com/documentation/authenticationservices/asauthorizationappleidbutton)
 * for more details.
 */
const AppleAuthenticationButton = props => {
    if (!RNAppleAuthenticationButtonSignInWhite) {
        if (__DEV__) {
            console.warn("'AppleAuthenticationButton' is not available.");
        }
        return null;
    }
    const { onPress, buttonStyle, buttonType, ...restProps } = props;
    const AppleAuthenticationButtonComponent = selectButtonComponent(buttonType, buttonStyle);
    return (<AppleAuthenticationButtonComponent onPress={onPress} {...restProps}/>);
};
const ButtonComponents = {
    [AppleAuthenticationButtonType.SIGN_IN]: {
        [AppleAuthenticationButtonStyle.WHITE]: RNAppleAuthenticationButtonSignInWhite,
        [AppleAuthenticationButtonStyle.WHITE_OUTLINE]: RNAppleAuthenticationButtonSignInWhiteOutline,
        [AppleAuthenticationButtonStyle.BLACK]: RNAppleAuthenticationButtonSignInBlack
    },
    [AppleAuthenticationButtonType.CONTINUE]: {
        [AppleAuthenticationButtonStyle.WHITE]: RNAppleAuthenticationButtonContinueWhite,
        [AppleAuthenticationButtonStyle.WHITE_OUTLINE]: RNAppleAuthenticationButtonContinueWhiteOutline,
        [AppleAuthenticationButtonStyle.BLACK]: RNAppleAuthenticationButtonContinueBlack
    }
};
function selectButtonComponent(type, style) {
    return ButtonComponents[type][style];
}
export default AppleAuthenticationButton;
//# sourceMappingURL=AppleAuthenticationButton.js.map