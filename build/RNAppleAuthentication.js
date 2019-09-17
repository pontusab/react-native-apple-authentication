import { NativeModules } from 'react-native';
export default NativeModules.RNAppleAuthentication ||
    {
        isAvailableAsync() {
            return Promise.resolve(false);
        }
    };
//# sourceMappingURL=RNAppleAuthentication.js.map