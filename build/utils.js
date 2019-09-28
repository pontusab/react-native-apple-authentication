import { Platform } from 'react-native';
export class CodedError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}
export class UnavailabilityError extends CodedError {
    constructor(moduleName, propertyName) {
        super('ERR_UNAVAILABLE', `The method or property ${moduleName}.${propertyName} is not available on ${Platform.OS}, are you sure you've linked all the native dependencies properly?`);
    }
}
//# sourceMappingURL=utils.js.map