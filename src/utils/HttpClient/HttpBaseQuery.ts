import {BaseQueryFn} from '@reduxjs/toolkit/dist/query';
import {AxiosError} from 'axios';
import {HttpBaseQueryArgs} from './HttpBaseQueryArgs';
import {HttpBaseQueryError} from './HttpBaseQueryError';
import {HttpBaseQueryMeta} from './HttpBaseQueryMeta';
import {HttpBaseQueryResponse} from './HttpBaseQueryResponse';
import {httpClient} from './HttpClient';

const httpBaseQuery =
  (): BaseQueryFn<
    HttpBaseQueryArgs,
    HttpBaseQueryResponse,
    HttpBaseQueryError,
    HttpBaseQueryMeta
  > =>
  async ({url, method, data, params}) => {
    try {
      const result = await httpClient.request({url, method, data, params});
      return {data: result.data, meta: result.config};
    } catch (axiosError: any) {
      const error = axiosError as AxiosError;
      const httpBaseQueryError: HttpBaseQueryError = {
        status: error.response?.status,
        code: error.code ? error.code : '',
        message: error.message,
      };
      return {
        error: httpBaseQueryError,
        meta: error.config,
      };
    }
  };

export default httpBaseQuery;
