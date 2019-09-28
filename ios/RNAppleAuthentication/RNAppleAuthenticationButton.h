#import <React/RCTComponent.h>

@import AuthenticationServices;

API_AVAILABLE(ios(13.0))
@interface RNAppleAuthenticationButton : ASAuthorizationAppleIDButton

@property (nonatomic, copy) RCTBubblingEventBlock onPress;

@end