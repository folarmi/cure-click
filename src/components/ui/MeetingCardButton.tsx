import { Button } from "@radix-ui/themes";

/* eslint-disable @typescript-eslint/no-explicit-any */
const MeetingButton = ({
  children,
  onClick,
  loading = false,
  disabled = false,
  variant = "solid",
  ifModal = false,
  className = "",
  style = {},
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "solid" | "outline";
  ifModal?: boolean;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}) => {
  const isDisabled = disabled || loading;

  const baseClasses = `
      size="3"
      font-medium text-base
      transition-all duration-200 ease-in-out
      rounded-md
      ${ifModal ? "min-w-[125px]" : "w-fit"}
      ${className}
    `;

  const variantClasses =
    variant === "outline"
      ? `
      bg-transparent
      text-[var(--meeting-card-button-color)]
      hover:bg-gray-100
      ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
    `
      : `
      text-[var(--color-primary)]
      bg-iris2
      hover:bg-iris2-dark
      ${
        isDisabled
          ? "opacity-60 cursor-not-allowed bg-iris2/60"
          : "cursor-pointer"
      }
    `;

  return (
    <Button
      onClick={onClick}
      disabled={isDisabled}
      className={`${baseClasses} ${variantClasses}`}
      style={
        variant === "outline"
          ? {
              border: "1px solid var(--meeting-card-divider-color)",
              ...style,
            }
          : style
      }
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"></span>
          {children}
        </span>
      ) : (
        children
      )}
    </Button>
  );
};

export { MeetingButton };
