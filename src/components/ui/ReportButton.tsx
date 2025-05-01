import { Button } from "@radix-ui/themes";

const ReportButton = () => {
  return (
    <Button
      size="3"
      style={{
        border: "1px solid #00062E32",
      }}
      className="my-4 w-full bg-white text-neutral_11 text-base font-medium"
    >
      Report
    </Button>
  );
};

export { ReportButton };
