#import <React/RCTViewManager.h>
#import <React/RCTUtils.h>
#import "RNAppleAuthentication/RNAppleAuthenticationButton.h"

@import AuthenticationServices;

#define RN_REGISTER_APPLE_AUTHENTICATION_VIEW_MANAGER(type, style, module_name) \
@interface RNAppleAuthenticationButton ## type ## style ## ViewManager : RCTViewManager @end \
\
@implementation RNAppleAuthenticationButton ## type ## style ## ViewManager \
\
    RCT_EXPORT_MODULE(module_name); \
  - (UIView *)view { if (@available(iOS 13.0, *)) { return [[RNAppleAuthenticationButton alloc] initWithAuthorizationButtonType:ASAuthorizationAppleIDButtonType ## type authorizationButtonStyle:ASAuthorizationAppleIDButtonStyle ## style]; } else { return nil; } } \
\
  RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock) \
\
  RCT_CUSTOM_VIEW_PROPERTY(cornerRadius, NSNumber *, RNAppleAuthenticationButton) API_AVAILABLE(ios(13.0)) { view.cornerRadius = [RCTConvert CGFloat:json]; } \
\
@end


# pragma mark - SignIn White

RN_REGISTER_APPLE_AUTHENTICATION_VIEW_MANAGER(SignIn, White, RNAppleAuthenticationButtonSignInWhite)

# pragma mark - SignIn WhiteOutline

RN_REGISTER_APPLE_AUTHENTICATION_VIEW_MANAGER(SignIn, WhiteOutline, RNAppleAuthenticationButtonSignInWhiteOutline)


# pragma mark - SignIn Black

RN_REGISTER_APPLE_AUTHENTICATION_VIEW_MANAGER(SignIn, Black, RNAppleAuthenticationButtonSignInBlack)

# pragma mark - Continue White

RN_REGISTER_APPLE_AUTHENTICATION_VIEW_MANAGER(Continue, White, RNAppleAuthenticationButtonContinueWhite)


# pragma mark - Continue WhiteOutline

RN_REGISTER_APPLE_AUTHENTICATION_VIEW_MANAGER(Continue, WhiteOutline, RNAppleAuthenticationButtonContinueWhiteOutline)


# pragma mark - Continue Black

RN_REGISTER_APPLE_AUTHENTICATION_VIEW_MANAGER(Continue, Black, RNAppleAuthenticationButtonContinueBlack)