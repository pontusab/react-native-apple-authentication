import { requireNativeComponent } from 'react-native';
import { Platform } from 'react-native';

let RNAppleAuthenticationButtonSignInWhite: any;
let RNAppleAuthenticationButtonSignInWhiteOutline: any;
let RNAppleAuthenticationButtonSignInBlack: any;
let RNAppleAuthenticationButtonContinueWhite: any;
let RNAppleAuthenticationButtonContinueWhiteOutline: any;
let RNAppleAuthenticationButtonContinueBlack: any;

if (Platform.OS === 'ios') {
  RNAppleAuthenticationButtonSignInWhite = requireNativeComponent(
    'RNAppleAuthenticationButtonSignInWhite'
  );
  RNAppleAuthenticationButtonSignInWhiteOutline = requireNativeComponent(
    'RNAppleAuthenticationButtonSignInWhiteOutline'
  );
  RNAppleAuthenticationButtonSignInBlack = requireNativeComponent(
    'RNAppleAuthenticationButtonSignInBlack'
  );
  RNAppleAuthenticationButtonContinueWhite = requireNativeComponent(
    'RNAppleAuthenticationButtonContinueWhite'
  );
  RNAppleAuthenticationButtonContinueWhiteOutline = requireNativeComponent(
    'RNAppleAuthenticationButtonContinueWhiteOutline'
  );
  RNAppleAuthenticationButtonContinueBlack = requireNativeComponent(
    'RNAppleAuthenticationButtonContinueBlack'
  );
}

export {
  RNAppleAuthenticationButtonSignInWhite,
  RNAppleAuthenticationButtonSignInWhiteOutline,
  RNAppleAuthenticationButtonSignInBlack,
  RNAppleAuthenticationButtonContinueWhite,
  RNAppleAuthenticationButtonContinueWhiteOutline,
  RNAppleAuthenticationButtonContinueBlack
};
