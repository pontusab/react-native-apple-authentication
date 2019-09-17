import { AppleAuthenticationSignInOptions, AppleAuthenticationRefreshOptions, AppleAuthenticationSignOutOptions, AppleAuthenticationCredential, AppleAuthenticationCredentialState } from './AppleAuthentication.types';
export declare function isAvailableAsync(): Promise<boolean>;
export declare function signInAsync(options?: AppleAuthenticationSignInOptions): Promise<AppleAuthenticationCredential>;
export declare function refreshAsync(options: AppleAuthenticationRefreshOptions): Promise<AppleAuthenticationCredential>;
export declare function signOutAsync(options: AppleAuthenticationSignOutOptions): Promise<AppleAuthenticationCredential>;
export declare function getCredentialStateAsync(user: string): Promise<AppleAuthenticationCredentialState>;
