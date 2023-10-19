import { QueryClient, QueryObserverOptions } from '@tanstack/react-query';
import { queryClientOptions } from '@/const';

const createQueryClient = (options: QueryObserverOptions = {}) => {
  return new QueryClient({
    defaultOptions: {
      queries: options || queryClientOptions,
    },
  });
};

export default createQueryClient;
