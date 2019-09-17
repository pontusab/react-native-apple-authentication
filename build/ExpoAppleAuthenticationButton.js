import { requireNativeViewManager } from '@unimodules/core';
import { Platform } from 'react-native';
let RNAppleAuthenticationButtonSignInWhite;
let RNAppleAuthenticationButtonSignInWhiteOutline;
let RNAppleAuthenticationButtonSignInBlack;
let RNAppleAuthenticationButtonContinueWhite;
let RNAppleAuthenticationButtonContinueWhiteOutline;
let RNAppleAuthenticationButtonContinueBlack;
if (Platform.OS === 'ios') {
    RNAppleAuthenticationButtonSignInWhite = requireNativeViewManager('RNAppleAuthenticationButtonSignInWhite');
    RNAppleAuthenticationButtonSignInWhiteOutline = requireNativeViewManager('RNAppleAuthenticationButtonSignInWhiteOutline');
    RNAppleAuthenticationButtonSignInBlack = requireNativeViewManager('RNAppleAuthenticationButtonSignInBlack');
    RNAppleAuthenticationButtonContinueWhite = requireNativeViewManager('RNAppleAuthenticationButtonContinueWhite');
    RNAppleAuthenticationButtonContinueWhiteOutline = requireNativeViewManager('RNAppleAuthenticationButtonContinueWhiteOutline');
    RNAppleAuthenticationButtonContinueBlack = requireNativeViewManager('RNAppleAuthenticationButtonContinueBlack');
}
export { RNAppleAuthenticationButtonSignInWhite, RNAppleAuthenticationButtonSignInWhiteOutline, RNAppleAuthenticationButtonSignInBlack, RNAppleAuthenticationButtonContinueWhite, RNAppleAuthenticationButtonContinueWhiteOutline, RNAppleAuthenticationButtonContinueBlack };
//# sourceMappingURL=ExpoAppleAuthenticationButton.js.map