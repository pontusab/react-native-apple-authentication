import RNAppleAuthentication from './RNAppleAuthentication';
import {
  AppleAuthenticationSignInOptions,
  AppleAuthenticationRefreshOptions,
  AppleAuthenticationSignOutOptions,
  AppleAuthenticationCredential,
  AppleAuthenticationCredentialState,
  AppleAuthenticationOperation,
  AppleAuthenticationRevokeListener
} from './AppleAuthentication.types';

export async function isAvailableAsync(): Promise<boolean> {
  if (!RNAppleAuthentication || !RNAppleAuthentication.isAvailableAsync) {
    return false;
  }
  return RNAppleAuthentication.isAvailableAsync();
}

export async function signInAsync(
  options?: AppleAuthenticationSignInOptions
): Promise<AppleAuthenticationCredential> {
  if (!RNAppleAuthentication || !RNAppleAuthentication.requestAsync) {
    console.log('expo-apple-authentication', 'signInAsync');
  }
  const requestOptions = {
    ...options,
    requestedOperation: AppleAuthenticationOperation.LOGIN
  };
  const credential = await RNAppleAuthentication.requestAsync(requestOptions);
  if (
    !credential.authorizationCode ||
    !credential.identityToken ||
    !credential.user
  ) {
    console.log(
      'ERR_APPLE_AUTHENTICATION_REQUEST_FAILED',
      'The credential returned by `signInAsync` is missing one or more required fields.'
    );
  }
  return credential;
}

export async function refreshAsync(
  options: AppleAuthenticationRefreshOptions
): Promise<AppleAuthenticationCredential> {
  if (!RNAppleAuthentication || !RNAppleAuthentication.requestAsync) {
    console.log('expo-apple-authentication', 'refreshAsync');
  }
  const requestOptions = {
    ...options,
    requestedOperation: AppleAuthenticationOperation.REFRESH
  };
  const credential = await RNAppleAuthentication.requestAsync(requestOptions);
  if (
    !credential.authorizationCode ||
    !credential.identityToken ||
    !credential.user
  ) {
    console.log(
      'ERR_APPLE_AUTHENTICATION_REQUEST_FAILED',
      'The credential returned by `refreshAsync` is missing one or more required fields.'
    );
  }
  return credential;
}

export async function signOutAsync(
  options: AppleAuthenticationSignOutOptions
): Promise<AppleAuthenticationCredential> {
  if (!RNAppleAuthentication || !RNAppleAuthentication.requestAsync) {
    console.log('expo-apple-authentication', 'signOutAsync');
  }
  const requestOptions = {
    ...options,
    requestedOperation: AppleAuthenticationOperation.LOGOUT
  };
  return RNAppleAuthentication.requestAsync(requestOptions);
}

export async function getCredentialStateAsync(
  user: string
): Promise<AppleAuthenticationCredentialState> {
  if (
    !RNAppleAuthentication ||
    !RNAppleAuthentication.getCredentialStateAsync
  ) {
    console.log('expo-apple-authentication', 'getCredentialStateAsync');
  }
  return RNAppleAuthentication.getCredentialStateAsync(user);
}

// const RNAppleAuthenticationEventEmitter = new EventEmitter(
//   RNAppleAuthentication
// );

// export function addRevokeListener(
//   listener: AppleAuthenticationRevokeListener
// ): Subscription {
//   // return RNAppleAuthenticationEventEmitter.addListener(
//   //   'appleIdCredentialRevoked',
//   //   listener
//   // );
// }
