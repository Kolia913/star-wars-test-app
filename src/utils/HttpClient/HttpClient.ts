import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import {Config} from './Config';

const headers: Readonly<Record<string, string | boolean>> = {
  accept: 'application/json',
  'accept-language': 'uk',
  'content-type': 'application/json',
  'access-control-allow-credentials': true,
  'x-requested-with': 'XMLHttpRequest',
};

class HttpClient {
  private instance: AxiosInstance | null = null;

  private get httpClient(): AxiosInstance {
    return this.instance !== null ? this.instance : this.initHttpClient();
  }

  initHttpClient(): AxiosInstance {
    const http = axios.create({
      baseURL: Config.baseApi,
      headers,
      withCredentials: true,
    });

    http.interceptors.response.use(
      response => response,
      error => {
        return this.handleError(error);
      },
    );

    this.instance = http;
    return http;
  }

  private handleError(error: AxiosError): Promise<AxiosError> {
    return Promise.reject(error);
  }

  request<T = any, R = AxiosResponse<T>>(
    config: AxiosRequestConfig,
  ): Promise<R> {
    return this.httpClient.request(config);
  }

  get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.httpClient.get<T, R>(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.httpClient.post<T, R>(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.httpClient.put<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.httpClient.delete<T, R>(url, config);
  }
}

export const httpClient = new HttpClient();
