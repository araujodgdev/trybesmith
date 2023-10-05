export type ServiceResponseErrorType = 'INVALID_DATA' | 'NOT_FOUND' | 'UNAUTHORIZED';

export type ServiceResponseError = {
  status: ServiceResponseErrorType;
  data: {
    message: string;
  }
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESS' | 'CREATED';
  data: T; 
};

export type ServiceResponse<T> = ServiceResponseSuccess<T> | ServiceResponseError;