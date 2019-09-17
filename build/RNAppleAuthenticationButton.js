import { requireNativeComponent } from 'react-native';
import { Platform } from 'react-native';
let RNAppleAuthenticationButtonSignInWhite;
let RNAppleAuthenticationButtonSignInWhiteOutline;
let RNAppleAuthenticationButtonSignInBlack;
let RNAppleAuthenticationButtonContinueWhite;
let RNAppleAuthenticationButtonContinueWhiteOutline;
let RNAppleAuthenticationButtonContinueBlack;
if (Platform.OS === 'ios') {
    RNAppleAuthenticationButtonSignInWhite = requireNativeComponent('RNAppleAuthenticationButtonSignInWhite');
    RNAppleAuthenticationButtonSignInWhiteOutline = requireNativeComponent('RNAppleAuthenticationButtonSignInWhiteOutline');
    RNAppleAuthenticationButtonSignInBlack = requireNativeComponent('RNAppleAuthenticationButtonSignInBlack');
    RNAppleAuthenticationButtonContinueWhite = requireNativeComponent('RNAppleAuthenticationButtonContinueWhite');
    RNAppleAuthenticationButtonContinueWhiteOutline = requireNativeComponent('RNAppleAuthenticationButtonContinueWhiteOutline');
    RNAppleAuthenticationButtonContinueBlack = requireNativeComponent('RNAppleAuthenticationButtonContinueBlack');
}
export { RNAppleAuthenticationButtonSignInWhite, RNAppleAuthenticationButtonSignInWhiteOutline, RNAppleAuthenticationButtonSignInBlack, RNAppleAuthenticationButtonContinueWhite, RNAppleAuthenticationButtonContinueWhiteOutline, RNAppleAuthenticationButtonContinueBlack };
//# sourceMappingURL=RNAppleAuthenticationButton.js.map