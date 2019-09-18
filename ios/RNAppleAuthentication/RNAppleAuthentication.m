#import <RNAppleAuthentication/RNAppleAuthentication.h>
#import <RNAppleAuthentication/RNAppleAuthenticationRequest.h>
#import <RNAppleAuthentication/RNAppleAuthenticationMappings.h>

static NSString *const RNAppleIDCredentialRevokedEvent = @"appleIdCredentialRevoked";

@interface RNAppleAuthentication ()

// @property (nonatomic, weak) UMModuleRegistry *moduleRegistry;

@end

@implementation RNAppleAuthentication

RCT_EXPORT_MODULE(RNAppleAuthentication);

// - (void)setModuleRegistry:(UMModuleRegistry *)moduleRegistry
// {
//   _moduleRegistry = moduleRegistry;
// }

- (NSArray<NSString *> *)supportedEvents
{
  return @[RNAppleIDCredentialRevokedEvent];
}

// - (void)startObserving
// {
//   if (@available(iOS 13.0, *)) {
//     [[NSNotificationCenter defaultCenter] addObserver:self
//                                              selector:@selector(didRevokeCredential:)
//                                                  name:ASAuthorizationAppleIDProviderCredentialRevokedNotification
//                                                object:nil];
//   }
// }

// - (void)stopObserving
// {
//   if (@available(iOS 13.0, *)) {
//     [[NSNotificationCenter defaultCenter] removeObserver:self
//                                                     name:ASAuthorizationAppleIDProviderCredentialRevokedNotification
//                                                   object:nil];
//   }
// }

// - (void)didRevokeCredential:(NSNotification *)notification
// {
//   id<UMEventEmitterService> eventEmitter = [_moduleRegistry getModuleImplementingProtocol:@protocol(UMEventEmitterService)];
//   [eventEmitter sendEventWithName:RNAppleIDCredentialRevokedEvent body:@{}];
// }

RCT_EXPORT_METHOD(
                    isAvailableAsync:(RCTPromiseResolveBlock)resolve
                            rejecter:(RCTPromiseRejectBlock)reject)
{
  if (@available(iOS 13.0, *)) {
    resolve(@(YES));
  } else {
    resolve(@(NO));
  }
}

RCT_EXPORT_METHOD(
                    requestAsync:(NSDictionary *)options
                    resolver:(RCTPromiseResolveBlock)resolve
                    rejecter:(RCTPromiseRejectBlock)reject)
{
  if (@available(iOS 13.0, *)) {
    [self requestWithOptions:options
                    resolver:resolve
                    rejecter:reject];
  } else {
    reject(@"ERR_APPLE_AUTHENTICATION_UNAVAILABLE", @"Apple authentication is not supported on this device.", nil);
  }
}

RCT_EXPORT_METHOD(
                    getCredentialStateAsync:(NSString *)userID
                                   resolver:(RCTPromiseResolveBlock)resolve
                                   rejecter:(RCTPromiseRejectBlock)reject)
{
  if (@available(iOS 13.0, *)) {
    ASAuthorizationAppleIDProvider *appleIDProvider = [[ASAuthorizationAppleIDProvider alloc] init];
    [appleIDProvider getCredentialStateForUserID:userID
                                      completion:^(ASAuthorizationAppleIDProviderCredentialState credentialState,
                                                   NSError  *_Nullable error) {
      if (error) {
        return reject(@"ERR_APPLE_AUTHENTICATION_CREDENTIAL", error.localizedDescription, nil);
      }
      resolve([RNAppleAuthenticationMappings exportCredentialState:credentialState]);
    }];
  } else {
    reject(@"ERR_APPLE_AUTHENTICATION_UNAVAILABLE", @"Apple authentication is not supported on this device.", nil);
  }
}

#pragma mark - helpers

- (void)requestWithOptions:(NSDictionary *)options
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject API_AVAILABLE(ios(13.0))
{
  ASAuthorizationProviderAuthorizationOperation operation = [RNAppleAuthenticationMappings importOperation:options[@"requestedOperation"]];
  __block RNAppleAuthenticationRequest *request = [RNAppleAuthenticationRequest performOperation:operation
                                                                                     withOptions:options
                                                                                    withCallback:^(NSDictionary *response, NSError *error) {
    if (error) {
      if (error.code == 1001) {
        // User canceled authentication attempt.
        reject(@"ERR_APPLE_AUTHENTICATION_REQUEST_CANCELED", @"The Apple authentication request has been canceled by the user.", nil);
      } else {
        reject(@"ERR_APPLE_AUTHENTICATION_REQUEST_FAILED", error.localizedDescription, nil);
      }
    } else {
      resolve(response);
    }
    request = nil;
  }];
}

@end