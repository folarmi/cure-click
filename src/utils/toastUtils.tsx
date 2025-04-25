/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";

const successToastStyle = {
  backgroundColor: "rgba(0, 164, 51, 0.1)",
  color: "rgba(0, 113, 63, 0.87)",
  padding: "12px",
  borderRadius: "6px",
  height: "44px",
  fontSize: "14px",
  fontWeight: "normal",
  width: "fit-content",
  minWidth: "200px",
  maxWidth: "80vw",
  whiteSpace: "nowrap",
};

const errorToastStyle = {
  backgroundColor: "rgba(243, 0, 13, 0.08)",
  color: "rgba(196, 0, 6, 0.83)",
  padding: "12px",
  borderRadius: "6px",
  height: "44px",
  fontSize: "14px",
  fontWeight: "normal",
  minWidth: "200px",
  maxWidth: "80vw",
  // whiteSpace: "nowrap",
};

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    style: successToastStyle,
  });
};

// export const showErrorToast = (message: string) => {
//   toast.error(message, {
//     style: errorToastStyle,
//   });
// };

// Optional: Generic toast with custom type
export const showToast = (
  message: string,
  type: "success" | "error" | "info" | "warning"
) => {
  const style =
    type === "success"
      ? successToastStyle
      : type === "error"
      ? errorToastStyle
      : /* default */ successToastStyle;

  toast[type](message, { style });
};

export const showErrorToast = (
  message: string | string[] | Record<string, string[]>
) => {
  if (typeof message === "string") {
    toast.error(message, {
      style: errorToastStyle,
    });
  } else if (Array.isArray(message)) {
    toast.error(
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {message.map((msg, i) => (
          <span key={i}>{msg}</span>
        ))}
      </div>,
      {
        style: errorToastStyle,
      }
    );
  } else if (typeof message === "object" && message !== null) {
    const errorMessages = Object.entries(message).flatMap(([field, errors]) =>
      errors.map((error) => `${field}: ${error}`)
    );

    toast.error(
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {errorMessages.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>,
      {
        style: errorToastStyle,
      }
    );
  }
};

// utils/errorUtils.ts
export const getApiErrors = (
  error: any
): string | string[] | Record<string, string[]> => {
  return (
    error?.response?.data?.errors ||
    error?.response?.data?.message ||
    "An unexpected error occurred"
  );
};
