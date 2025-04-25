/* eslint-disable @typescript-eslint/no-unused-vars */
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
import {
  getApiErrors,
  showErrorToast,
  showSuccessToast,
} from "../utils/toastUtils";
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
  method?: "get" | "post" | "put" | "patch" | "delete";
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
  url?: string;
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
      if (data?.access_token || data?.data || data?.isSuccess) {
        if (successMessage) {
          showSuccessToast(successMessage(data));
        }
        if (onSuccessCallback) {
          onSuccessCallback(data);
        }
      }
    },
    onError: (error: any) => {
      try {
        let message: string | string[] | Record<string, string[]>;
        if (options.errorMessage) {
          message = options.errorMessage(error) || getApiErrors(error);
        } else {
          message = getApiErrors(error);
        }

        // Final safety check
        if (
          !message ||
          (typeof message === "object" && !Object.keys(message).length)
        ) {
          message = "An unexpected error occurred";
        }

        showErrorToast(message);
      } catch (e) {
        showErrorToast("Failed to process error");
      }
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
  url = "appointment/api/files/upload",
}: FileUploadOptions) => {
  return useMutation<
    any,
    AxiosError,
    { file: File | File[] | null; extraData?: Record<string, any> }
  >({
    mutationFn: async ({ file, extraData }) => {
      const formData = new FormData();

      // Handle both single file and array of files
      if (Array.isArray(file)) {
        file.forEach((file) => {
          formData.append(`file`, file);
        });
      } else {
        formData.append("file", file);
      }

      if (extraData) {
        Object.entries(extraData).forEach(([key, value]) => {
          // Handle nested objects by stringifying them
          if (typeof value === "object" && !(value instanceof File)) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value);
          }
        });
      }

      const response = await api[method](url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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

export const useGetDoctorProfile = (enabled: boolean = true) => {
  return useQuery<any>({
    queryKey: ["GetDoctorProfile"],
    queryFn: async () => {
      const response = await api.get("appointment/api/doctors/profile");
      return response?.data;
    },
    retry: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0,
    enabled,
  });
};

export const useGetPatientProfile = (enabled: boolean = true) => {
  return useQuery<any>({
    queryKey: ["GetPatientProfile"],
    queryFn: async () => {
      const response = await api.get("appointment/api/patients/profile");
      return response?.data;
    },
    retry: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0,
    enabled,
  });
};

export const useGetDoctorAvailableSessions = (
  doctorId: string | undefined,
  enabled: boolean = true
) => {
  return useQuery<any>({
    queryKey: ["GetDoctorAvailableSessions"],
    queryFn: async () => {
      const response = await api.get(
        `appointment/api/doctors/${doctorId}/available-sessions`
      );
      return response?.data;
    },
    retry: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0,
    enabled,
  });
};

export const useGetSingleDoctorData = (enabled: boolean = true, id: string) => {
  return useQuery<any>({
    queryKey: ["GetSingleDoctor"],
    queryFn: async () => {
      const response = await api.get(`appointment/api/doctors/${id}`);
      return response?.data;
    },
    retry: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0,
    enabled,
  });
};
