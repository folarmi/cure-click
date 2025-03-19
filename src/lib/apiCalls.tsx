/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import api from "../lib/axios";
import { Callout } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";

interface MutationResponse {
  status: number;
  data: {
    remark: string;
    [key: string]: any;
  };
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
          Accept: "application/json",
        },
      });
      return response.data;
    },
    onSuccess: (data: any) => {
      if (data?.access_token) {
        if (successMessage) {
          // toast.success(successMessage(data), {
          //   style: {
          //     backgroundColor: "#4CAF50", // Green color for success
          //     color: "#fff", // White text color
          //     padding: "10px", // Optional: Adjust padding for better appearance
          //     borderRadius: "5px", // Optional: Rounded corners
          //   },
          // });

          <Callout.Root>
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>
              You will need admin privileges to install and access this
              application.
            </Callout.Text>
          </Callout.Root>;
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
      toast.error(message);
    },
    ...mutationOptions,
  });
};
