interface FetchCoreOptions extends FetchRequestInit {
  baseURL?: string;
}

interface FetchRequestInit extends RequestInit {
  method?: Method;
}

type Method =
  | 'options'
  | 'head'
  | 'link'
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'purge'
  | 'PURGE'
  | 'LINK'
  | 'unlink'
  | 'UNLINK';
