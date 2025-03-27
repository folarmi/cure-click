/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import api from "../lib/axios";
import { showErrorToast, showSuccessToast } from "../utils/toastUtils";
// import { Callout } from "@radix-ui/themes";
// import { InfoCircledIcon } from "@radix-ui/react-icons";

interface MutationResponse {
  status: number;
  data: {
    remark: string;
    [key: string]: any;
  };
}

interface UseDataOptions
  extends Omit<UseQueryOptions<any, any>, "queryKey" | "queryFn"> {
  url: string;
  queryKey: string[];
  enabled?: any;
}

interface CustomMutationOptions<TData, TError, TVariables, TContext>
  extends UseMutationOptions<TData, TError, TVariables, TContext> {
  endpoint: string;
  method?: "get" | "post" | "put" | "delete";
  successMessage?: (data: TData) => string;
  errorMessage?: (error: TError) => string | void;
  onSuccessCallback?: (data: TData) => void;
  contentType?: "application/x-www-form-urlencoded" | "application/json";
  mutationOptions?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationFn"
  >;
}

type FileUploadOptions = {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  successToast?: string | ((data: any) => string);
  errorToast?: string | ((error: AxiosError) => string);
  method?: "get" | "post" | "put" | "delete";
};

export const useCustomMutation = <
  TData = MutationResponse,
  TError = AxiosError,
  TVariables = unknown,
  TContext = unknown
>(
  options: CustomMutationOptions<TData, TError, TVariables, TContext>
): UseMutationResult<TData, TError, TVariables, TContext> => {
  const {
    endpoint,
    successMessage,
    errorMessage,
    onSuccessCallback,
    contentType = "application/json",
    method = "post",
    ...mutationOptions
  } = options;

  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn: async (variables: TVariables) => {
      const response = await api[method]<TData>(endpoint, variables, {
        headers: {
          "Content-Type": contentType,
          // Accept: "application/json",
        },
      });
      return response.data;
    },
    onSuccess: (data: any) => {
      if (data?.access_token || data?.data) {
        if (successMessage) {
          showSuccessToast(successMessage(data));
        }
        if (onSuccessCallback) {
          onSuccessCallback(data);
        }
      }
    },
    onError: (error: any) => {
      const message = errorMessage
        ? errorMessage(error)
        : error?.response?.data?.data || "An unexpected error occurred";

      showErrorToast(message);
    },
    ...mutationOptions,
  });
};

export const useGetData = ({
  url,
  queryKey,
  enabled,
  ...rest
}: UseDataOptions) => {
  return useQuery<any>({
    queryKey,
    queryFn: async () => {
      const response = await api.get(url);
      return response?.data;
    },
    enabled,
    retry: false,
    // retry: true,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0,
    ...rest,
  });
};

// File uploader component
export const useFileUpload = ({
  errorToast,
  method = "post",
  onError,
  onSuccess,
  successToast,
}: FileUploadOptions) => {
  return useMutation<
    any,
    AxiosError,
    { file: File; extraData?: Record<string, any> }
  >({
    mutationFn: async ({ file, extraData }) => {
      const formData = new FormData();
      formData.append("file", file);

      if (extraData) {
        Object.entries(extraData).forEach(([key, value]) => {
          formData.append(key, value);
        });
      }

      const response = await api[method](
        "appointment/api/files/uploadd",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (successToast) {
        const message =
          typeof successToast === "function"
            ? successToast(data)
            : successToast;
        showSuccessToast(message);
      }
      onSuccess?.(data);
    },
    onError: (error) => {
      if (errorToast) {
        const message =
          typeof errorToast === "function" ? errorToast(error) : errorToast;
        showErrorToast(message);
      } else {
        showErrorToast(error.response?.data?.message || "File upload failed");
      }
      onError?.(error);
    },
  });
};
