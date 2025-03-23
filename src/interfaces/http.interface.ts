import { AxiosError } from 'axios';

export interface HttpError {
  statusCode: number;
  message: string;
  error?: string;
}

export class HttpError {
  static error(error: AxiosError): HttpError {
    return {
      statusCode: error.response?.status || 500,
      message: (error.response?.data as { message?: string })?.message || 'Error inesperado',
      error: error.message,
    };
  }
}
