'use client'

import { PAGE_PARAM_KEY, QUERY_PARAM_KEY } from "@/app/lib/config";
import { useDebouncedCallback } from "@/app/lib/hooks";
import { getQueryFromSearchParam } from "@/app/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEventHandler, InputHTMLAttributes } from "react";

export const usePageUrl = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set(PAGE_PARAM_KEY, pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  };

  return {
    createPageURL
  }
}


export function useSearchParamsQueryParam() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();


  const handleSearch = useDebouncedCallback(((e) => {
    const { value: term } = e.target
    const params = new URLSearchParams(searchParams);
    params.set(PAGE_PARAM_KEY, '1');

    if (term) {
      params.set(QUERY_PARAM_KEY, term);
    } else {
      params.delete(QUERY_PARAM_KEY);
    }
    replace(`${pathname}?${params.toString()}`);
  }) satisfies ChangeEventHandler<HTMLInputElement>)

  const defaultValue = searchParams.get(QUERY_PARAM_KEY)?.toString()

  return {
    onChange: handleSearch,
    defaultValue,
  } satisfies Partial<InputHTMLAttributes<HTMLInputElement>>;
}

export const useClientSearchParams = () => {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get(PAGE_PARAM_KEY));
  const query = getQueryFromSearchParam(searchParams.get(QUERY_PARAM_KEY));

  return {
    query,
    page,
  }
}
