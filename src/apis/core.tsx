import axios, { AxiosRequestConfig } from 'axios'

import queryString from 'query-string'

import _keys from 'lodash/keys'
import _pickBy from 'lodash/pickBy'
import _omit from 'lodash/omit'
import _get from 'lodash/get'
import { getCookie, LOCAL_KEY } from '@/lib/storage'

interface MethodOptions extends AxiosRequestConfig {
  token?: string
}
export interface APIConfig {
  handleAuthen?: (error: any) => Promise<AxiosRequestConfig<any>>
  getToken?: () => string
  getPerSign?: () => string
  authority?: {
    signature: string
  }
}

class APIService {
  private _baseURL: string
  private _config: APIConfig

  constructor(baseURL: string, config?: APIConfig) {
    this._baseURL = baseURL
    this._config = config || {}
  }

  setBaseURL(url: string) {
    this._baseURL = url
  }

  async get<Query, Data>(
    url: string,
    query?: Query,
    options?: MethodOptions,
  ): Promise<Data> {
    const response = await this._gateWay(options).get(url, {
      params: _pickBy(query || {}, (v) => v === false || v),
    })

    return response.data
  }

  async post<Body, Data>(
    url: string,
    body: Body,
    options?: MethodOptions,
  ): Promise<Data> {
    const response = await this._gateWay(options).post(
      url,
      _pickBy(body || {}, (v) => v === false || v),
    )

    return response.data
  }

  async put<Body, Data>(
    url: string,
    body: Body,
    options?: MethodOptions,
  ): Promise<Data> {
    const response = await this._gateWay(options).put(url, body)

    return response.data
  }

  async patch<Body, Data>(
    url: string,
    body: Body,
    options?: MethodOptions,
  ): Promise<Data> {
    const response = await this._gateWay(options).patch(url, body)

    return response.data
  }

  async delete<Data>(url: string, options?: MethodOptions): Promise<Data> {
    const response = await this._gateWay(options).delete(url)

    return response.data
  }

  async getCorsMode<Query, Data>(
    url: string,
    query?: Query,
    options?: RequestInit,
  ): Promise<Data> {
    const endPoint = queryString.stringifyUrl({
      url: this._baseURL + url,
      query: query || {},
    })
    const response = await fetch(endPoint, options)

    return response.json() as Data
  }

  private _gateWay<Body>(options?: MethodOptions) {
    const token =
      (process.env.NEXT_PUBLIC_TOKEN || options?.token) ??
      this._config.getToken?.() ??
      ''

    const onChainSign = this._config.getPerSign?.()
    const config: AxiosRequestConfig<Body> = {
      timeout: 120 * 1000, //120s
      baseURL: this._baseURL,
      headers: {
        Source: process.env.NEXT_PUBLIC_SOURCE_API,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Version: process.env.NEXT_PUBLIC_APP_VERSION,
        Authorization: `Bearer ${token}`,
        onchainSignature: onChainSign,
        Signature: this._config.authority?.signature,
        ...options?.headers,
      },
      ..._omit(options, ['headers', 'token']),
    }

    const instants = axios.create(config)
    instants.interceptors.response.use(
      (response) => {
        return response
      },
      async (error) => {
        console.log({ error })
        const code = _get(error, 'response.status', 0)
        const hasHandleAuthen = Boolean(this._config.handleAuthen)
        const errMess = _get(error, 'response.data.data.errMess', '')
        if (code === 400 && errMess === 'countryBanned') {
          //country banned
        }
        if (code === 401 && hasHandleAuthen) {
          //handle authen
          const requestConfig = await this._config.handleAuthen!(error).catch(
            () => null,
          )
          if (requestConfig) return instants.request(requestConfig)
        }

        const resError = _get(error, 'response.data.message')
        const DEFAULT_ERROR = {
          data: {
            data: {
              errMess: resError || error.message || 'unknowError',
            },
            success: false,
            message: resError || error.message || 'unknowError',
          },
        }
        const hasResponse = _keys(_get(error, 'response.data.data')).length
        if (!hasResponse) {
          return DEFAULT_ERROR
        }
        return _get(error, 'response', DEFAULT_ERROR)
      },
    )

    return instants
  }
}

export const API = {
  turbos: new APIService(process.env.NEXT_PUBLIC_TURBOS_API || '', {
    getToken: () => '',
    getPerSign: () => '',
  }),

  insidexTrade: new APIService(process.env.NEXT_PUBLIC_INSIDEXTRADE_API || '', {
    getToken: () => '',
    getPerSign: () => '',
  }),
}
