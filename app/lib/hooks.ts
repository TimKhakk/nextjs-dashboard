import { PAGE_PARAM_KEY, QUERY_PARAM_KEY } from '@/app/lib/config';
import { PageProps } from '@/app/lib/model';
import { getPageFromSearchParam, getQueryFromSearchParam } from '@/app/lib/utils';
import { useDebouncedCallback as useDebouncedCallbackExternal } from 'use-debounce';

const DEFAULT_DEBOUNCE_WAIT = 500
const DEFAULT_MAX_WAIT = 1000;

export const useDebouncedCallback = <T extends (...args: any) => ReturnType<T>>  (func: T) => {
  return useDebouncedCallbackExternal(func, DEFAULT_DEBOUNCE_WAIT, {
    maxWait: DEFAULT_MAX_WAIT,
  })
}
export const useServerSearchParams = (props: PageProps) => {
  const query = getQueryFromSearchParam(props.searchParams?.[QUERY_PARAM_KEY]);
  const page = Number(getPageFromSearchParam(props.searchParams?.[PAGE_PARAM_KEY]));

  return {
    query,
    page,
  }
}
