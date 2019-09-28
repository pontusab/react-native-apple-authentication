#import <React/RCTBridgeModule.h>

@import AuthenticationServices;

@interface RNAppleAuthentication : NSObject <RCTBridgeModule, ASAuthorizationControllerDelegate, ASAuthorizationControllerPresentationContextProviding>

@property (nonatomic, strong) RCTPromiseResolveBlock promiseResolve;
@property (nonatomic, strong) RCTPromiseRejectBlock promiseReject;

@end
  
