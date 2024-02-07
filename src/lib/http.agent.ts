import axios, { AxiosRequestConfig } from 'axios';

export type HttpAgentRequest<T> = {
  readonly url: string;
  readonly headers?: Record<string, unknown>;
  readonly data?: T;
};

export type HttpAgentResponse<RES, ERR = any> = {
  readonly statusCode: number;
  readonly data?: RES;
  readonly error?: ERR;
};

export type HttpAgentResult<REQ, RES> = {
  readonly request?: HttpAgentRequest<REQ>;
  readonly response?: HttpAgentResponse<RES>;
};

// TODO: abstract는 왜 들어가지?
export abstract class HttpAgent {
  protected async get<T = any>(
    url: string,
    config?: AxiosRequestConfig,
    queryString?: string,
  ): Promise<HttpAgentResponse<T>> {
    return axios
      .get<T>(`${url}${queryString ? `?${queryString}` : ``}`, config)
      .then((response) => ({
        data: response.data,
        statusCode: response.status,
      }));
    //TODO: catch(err) 생략
  }

  protected async post<T extends Record<string, unknown>, E = any, P = any>(
    url: string,
    config?: AxiosRequestConfig,
    data?: P,
  ): Promise<HttpAgentResponse<T>> {
    return axios
      .post<T>(url, data, config)
      .then((response) => ({
        data: response.data,
        statusCode: response.status,
      }))
      .catch((err) => {
        throw err;
      });
  }
}
