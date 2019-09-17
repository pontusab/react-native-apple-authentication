import { NativeModules } from 'react-native';

export default NativeModules.RNAppleAuthentication ||
  ({
    isAvailableAsync(): Promise<boolean> {
      return Promise.resolve(false);
    }
  } as any);
