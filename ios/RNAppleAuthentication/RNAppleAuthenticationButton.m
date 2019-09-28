#import "RNAppleAuthentication/RNAppleAuthenticationButton.h"

@implementation RNAppleAuthenticationButton

-(instancetype)initWithAuthorizationButtonType:(ASAuthorizationAppleIDButtonType)type
                      authorizationButtonStyle:(ASAuthorizationAppleIDButtonStyle)style
API_AVAILABLE(ios(13.0)){
  if (self = [super initWithAuthorizationButtonType:type
                           authorizationButtonStyle:style]) {
    [self addTarget:self
             action:@selector(onDidPress)
   forControlEvents:UIControlEventTouchUpInside];
  }
  return self;
}

-(void)onDidPress {
  _onPress(nil);
}

@end