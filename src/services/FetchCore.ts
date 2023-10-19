export default class FetchCore {
  protected options?: FetchCoreOptions;
  protected baseURL: string;

  constructor(options?: FetchCoreOptions) {
    this.options = options;
    this.baseURL = options?.baseURL || '';
  }

  protected request = async <T, P>(
    URLString: string,
    {
      init,
      method,
      params,
      body,
    }: {
      init?: FetchRequestInit;
      method: Method;
      params?: P;
      body?: P;
    },
  ) => {
    try {
      const requestURL = new URL(`${this.baseURL}${URLString}`);
      requestURL.search = new URLSearchParams(params || {}).toString();

      this.assignOptions(init || {});

      const response = await fetch(requestURL, {
        ...this.options,
        method,
        body: body ? JSON.stringify(body) : undefined,
      });

      const { ok, status, statusText, url, type } = response;

      const result = {
        status,
        statusText,
        ok,
        type,
        url,
        responseData: (await response.json()) as T,
      };

      if (!ok || !status || !url) {
        throw new Error(JSON.stringify(result));
      }

      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  protected assignOptions = (newOptions: FetchRequestInit) => {
    this.options = Object.assign(this.options || {}, newOptions);
  };
}
