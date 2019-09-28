export declare class CodedError extends Error {
    code: string;
    info?: any;
    constructor(code: string, message: string);
}
export declare class UnavailabilityError extends CodedError {
    constructor(moduleName: string, propertyName: string);
}
