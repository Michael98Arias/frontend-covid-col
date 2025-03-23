import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import { HttpError } from '../interfaces/http.interface';
import {
  envBaseUrlDataGov,
  envBaseUrlDataCountry,
} from '../shared/constants/Environment';

class HttpService {
  private httpGov: AxiosInstance;
  private httpCountry: AxiosInstance;
  private accessToken = '';

  constructor() {
    this.httpGov = axios.create({
      baseURL: envBaseUrlDataGov,
      headers: { 'Content-Type': 'application/json' },
    });

    this.httpCountry = axios.create({
      baseURL: envBaseUrlDataCountry,
      headers: { 'Content-Type': 'application/json' },
    });

    this.setupInterceptors(this.httpGov);
    this.setupInterceptors(this.httpCountry);
  }

  private setupInterceptors(instance: AxiosInstance): void {
    instance.interceptors.request.use((request: InternalAxiosRequestConfig) => {
      if (this.accessToken) {
        request.headers.Authorization = `Bearer ${this.accessToken}`;
      }
      return request;
    });

    instance.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      (error: AxiosError) => {
        const httpError: HttpError = HttpError.error(error);
        return Promise.reject(httpError);
      }
    );
  }

  public setToken(token: string): void {
    this.accessToken = token;
  }

  /**
   * Método genérico para hacer peticiones a cualquiera de las APIs.
   * @param apiType - Define si la petición se hace a `gov` o `country`
   */
  private getApiInstance(apiType: 'gov' | 'country'): AxiosInstance {
    return apiType === 'gov' ? this.httpGov : this.httpCountry;
  }

  public async get<T>(
    apiType: 'gov' | 'country',
    url: string,
    config?: InternalAxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.getApiInstance(apiType).get<T>(url, config);
      return (response.data ?? response) as T;
    } catch (error) {
      throw error;
    }
  }
  
  

  public async post<T, K>(
    apiType: 'gov' | 'country',
    url: string,
    data?: K,
    config?: InternalAxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.getApiInstance(apiType).post(
      url,
      data,
      config
    );
    return response.data;
  }

  public async put<T, K>(
    apiType: 'gov' | 'country',
    url: string,
    data?: K,
    config?: InternalAxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.getApiInstance(apiType).put(
      url,
      data,
      config
    );
    return response.data;
  }

  public async delete<T>(
    apiType: 'gov' | 'country',
    url: string,
    config?: InternalAxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.getApiInstance(
      apiType
    ).delete(url, config);
    return response.data;
  }

  public async upload<T>(
    apiType: 'gov' | 'country',
    url: string,
    file: FormData
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.getApiInstance(apiType).post(
      url,
      file,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    return response.data;
  }
}

export default new HttpService();
