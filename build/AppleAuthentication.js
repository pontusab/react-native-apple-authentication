import RNAppleAuthentication from './RNAppleAuthentication';
import { AppleAuthenticationOperation } from './AppleAuthentication.types';
import { CodedError, UnavailabilityError } from './utils';
export async function isAvailableAsync() {
    if (!RNAppleAuthentication || !RNAppleAuthentication.isAvailableAsync) {
        return false;
    }
    return RNAppleAuthentication.isAvailableAsync();
}
export async function signInAsync(options) {
    if (!RNAppleAuthentication || !RNAppleAuthentication.requestAsync) {
        throw new UnavailabilityError('react-native-apple-authentication', 'signInAsync');
    }
    const requestOptions = {
        ...options,
        requestedOperation: AppleAuthenticationOperation.LOGIN
    };
    const credential = await RNAppleAuthentication.requestAsync(requestOptions);
    if (!credential.authorizationCode ||
        !credential.identityToken ||
        !credential.user) {
        throw new CodedError('ERR_APPLE_AUTHENTICATION_REQUEST_FAILED', 'The credential returned by `signInAsync` is missing one or more required fields.');
    }
    return credential;
}
export async function refreshAsync(options) {
    if (!RNAppleAuthentication || !RNAppleAuthentication.requestAsync) {
        throw new UnavailabilityError('react-native-apple-authentication', 'signOutAsync');
    }
    const requestOptions = {
        ...options,
        requestedOperation: AppleAuthenticationOperation.REFRESH
    };
    const credential = await RNAppleAuthentication.requestAsync(requestOptions);
    if (!credential.authorizationCode ||
        !credential.identityToken ||
        !credential.user) {
        throw new CodedError('ERR_APPLE_AUTHENTICATION_REQUEST_FAILED', 'The credential returned by `refreshAsync` is missing one or more required fields.');
    }
    return credential;
}
export async function signOutAsync(options) {
    if (!RNAppleAuthentication || !RNAppleAuthentication.requestAsync) {
        throw new UnavailabilityError('react-native-apple-authentication', 'signOutAsync');
    }
    const requestOptions = {
        ...options,
        requestedOperation: AppleAuthenticationOperation.LOGOUT
    };
    return RNAppleAuthentication.requestAsync(requestOptions);
}
export async function getCredentialStateAsync(user) {
    if (!RNAppleAuthentication ||
        !RNAppleAuthentication.getCredentialStateAsync) {
        throw new UnavailabilityError('react-native-apple-authentication', 'getCredentialStateAsync');
    }
    return RNAppleAuthentication.getCredentialStateAsync(user);
}
//# sourceMappingURL=AppleAuthentication.js.map