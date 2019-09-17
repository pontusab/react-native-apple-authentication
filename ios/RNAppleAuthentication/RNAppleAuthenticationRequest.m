#import <RNAppleAuthentication/RNAppleAuthenticationRequest.h>
#import <RNAppleAuthentication/RNAppleAuthenticationMappings.h>
 
@interface RNAppleAuthenticationRequest ()

@property (nonatomic, strong, nonnull) NSDictionary *options;
@property (nonatomic, strong, nullable) void(^callback)(NSDictionary *, NSError *);
@property (nonatomic, strong, nonnull) ASAuthorizationController *authController;

@end

@implementation RNAppleAuthenticationRequest

- (instancetype)initWithOptions:(NSDictionary *)options
                    andCallback:(void(^)(NSDictionary *response, NSError *error))callback
{
  if (self = [super init]) {
    _options = options;
    _callback = callback;
  }
  return self;
}

#define RNNullIfNil(value) (value ?: [NSNull null])

- (void)performOperation:(ASAuthorizationProviderAuthorizationOperation)operation
{
  ASAuthorizationAppleIDProvider* appleIDProvider = [[ASAuthorizationAppleIDProvider alloc] init];
  ASAuthorizationAppleIDRequest* request = [appleIDProvider createRequest];

  NSArray<NSNumber *> *requestedScopes = _options[@"requestedScopes"];

  request.requestedScopes = [RNAppleAuthenticationMappings importScopes:requestedScopes];
  request.requestedOperation = operation;

  if (_options[@"user"]) {
    request.user = _options[@"user"];
  }
  if (_options[@"state"]) {
    request.state = _options[@"state"];
  }

  _authController = [[ASAuthorizationController alloc] initWithAuthorizationRequests:@[request]];
  _authController.presentationContextProvider = self;
  _authController.delegate = self;

  [_authController performRequests];
}

+ (RNAppleAuthenticationRequest *)performOperation:(ASAuthorizationProviderAuthorizationOperation)operation
                                       withOptions:(NSDictionary *)options
                                      withCallback:(void(^)(NSDictionary *, NSError *))callback
{
  RNAppleAuthenticationRequest *authRequest = [[RNAppleAuthenticationRequest alloc] initWithOptions:options andCallback:callback];
  [authRequest performOperation:operation];
  return authRequest;
}

#pragma mark - ASAuthorizationControllerDelegate

- (void)authorizationController:(ASAuthorizationController *)controller
   didCompleteWithAuthorization:(ASAuthorization *)authorization
{
  ASAuthorizationAppleIDCredential *credential = authorization.credential;

  NSDictionary *fullName;
  if (credential.fullName) {
    fullName = [RNAppleAuthenticationMappings exportFullName:credential.fullName];
  }
  NSString *authorizationCode;
  if (credential.authorizationCode) {
    authorizationCode = [RNAppleAuthenticationMappings exportData:credential.authorizationCode];
  }
  NSString *identityToken;
  if (credential.identityToken) {
    identityToken = [RNAppleAuthenticationMappings exportData:credential.identityToken];
  }

  NSDictionary *response = @{
                         @"fullName": RNNullIfNil(fullName),
                         @"email": RNNullIfNil(credential.email),
                         @"user": credential.user,
                         @"realUserStatus": [RNAppleAuthenticationMappings exportRealUserStatus:credential.realUserStatus],
                         @"state": RNNullIfNil(credential.state),
                         @"authorizationCode": RNNullIfNil(authorizationCode),
                         @"identityToken": RNNullIfNil(identityToken),
                         };

  if (_callback) {
    _callback(response, nil);
    _callback = nil;
  }
}

- (void)authorizationController:(ASAuthorizationController *)controller
           didCompleteWithError:(NSError *)error
{
  if (_callback) {
    _callback(nil, error);
    _callback = nil;
  }
}

#pragma mark - ASAuthorizationControllerPresentationContextProviding

- (nonnull ASPresentationAnchor)presentationAnchorForAuthorizationController:(nonnull ASAuthorizationController *)controller
{
  return [[UIApplication sharedApplication] keyWindow];
}

@end