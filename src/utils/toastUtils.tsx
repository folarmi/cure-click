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
  whiteSpace: "nowrap",
};

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    style: successToastStyle,
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    style: errorToastStyle,
  });
};

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
