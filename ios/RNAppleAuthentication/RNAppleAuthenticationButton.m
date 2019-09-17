
#import <RNAppleAuthentication/RNAppleAuthenticationButton.h>

@implementation RNAppleAuthenticationButton

-(instancetype)initWithAuthorizationButtonType:(ASAuthorizationAppleIDButtonType)type
                      authorizationButtonStyle:(ASAuthorizationAppleIDButtonStyle)style
{
  if (self = [super initWithAuthorizationButtonType:type
                           authorizationButtonStyle:style]) {
    [self addTarget:self
             action:@selector(onDidPress)
   forControlEvents:UIControlEventTouchUpInside];
  }
  return self;
}

- (void)onDidPress {
  _onButtonPress(nil);
}

@end