// #import <React/RCTViewManager.h>
// #import <RNAppleAuthentication/RNAppleAuthenticationButton.h>

// @import AuthenticationServices;

// @interface RNAppleAuthenticationButtonManager : RCTViewManager
// @end

// @implementation RNAppleAuthenticationButtonManager

// RCT_EXPORT_MODULE(RNAppleAuthenticationButtonManager)

// - (UIView *)view
// {
//   return [[RNAppleAuthenticationButton alloc] initWithAuthorizationButtonType:ASAuthorizationAppleIDButtonTypeDefault authorizationButtonStyle:ASAuthorizationAppleIDButtonStyleBlack];
// }

// RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)

// @end




// #import <React/RCTViewManager.h>
// #import <RNAppleAuthentication/RNAppleAuthenticationButton.h>

// @import AuthenticationServices;

// // Below macro serves to generate ViewManager for each configuration of ASAuthorizationAppleIDButton
// // ASAuthorizationAppleIDButton#style and ASAuthorizationAppleIDButton#type can only be specified at creation time

// #define EX_REGISTER_APPLE_AUTHENTICATION_VIEW_MANAGER(type, style, module_name) \
// @interface RNAppleAuthenticationButton ## type ## style ## ViewManager : RCTViewManager @end \
// \
// @implementation RNAppleAuthenticationButton ## type ## style ## ViewManager \
// \
//   RCT_EXPORT_MODULE(); \
// \
//   + (const NSString *)exportedModuleName { return @#module_name; } \
// \
//   - (NSString *)viewName { return @#module_name; } \
// \
//   - (UIView *)view { if (@available(iOS 13.0, *)) { return [[RNAppleAuthenticationButton alloc] initWithAuthorizationButtonType:ASAuthorizationAppleIDButtonType ## type authorizationButtonStyle:ASAuthorizationAppleIDButtonStyle ## style]; } else { return nil; } } \
// \
//   - (NSArray<NSString *> *)supportedEvents { return @[@"onButtonPress"]; } \
// \
//   RCT_CUSTOM_VIEW_PROPERTY(cornerRadius, NSNumber *, RNAppleAuthenticationButton) API_AVAILABLE(ios(13.0)) {} \
// @end
// \


// # pragma mark - SignIn White

// // EX_REGISTER_APPLE_AUTHENTICATION_VIEW_MANAGER(SignIn, White, RNAppleAuthenticationButtonSignInWhite)


// // # pragma mark - SignIn WhiteOutline

// // EX_REGISTER_APPLE_AUTHENTICATION_VIEW_MANAGER(SignIn, WhiteOutline, RNAppleAuthenticationButtonSignInWhiteOutline)


// // # pragma mark - SignIn Black

// // EX_REGISTER_APPLE_AUTHENTICATION_VIEW_MANAGER(SignIn, Black, RNAppleAuthenticationButtonSignInBlack)


// // # pragma mark - Continue White

// // EX_REGISTER_APPLE_AUTHENTICATION_VIEW_MANAGER(Continue, White, RNAppleAuthenticationButtonContinueWhite)


// // # pragma mark - Continue WhiteOutline

// // EX_REGISTER_APPLE_AUTHENTICATION_VIEW_MANAGER(Continue, WhiteOutline, RNAppleAuthenticationButtonContinueWhiteOutline)


// // # pragma mark - Continue Black

// // EX_REGISTER_APPLE_AUTHENTICATION_VIEW_MANAGER(Continue, Black, RNAppleAuthenticationButtonContinueBlack)