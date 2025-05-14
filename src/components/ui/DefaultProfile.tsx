type DefaultProfileProps = {
  initials: string;
  size?: string; // e.g., "w-24 h-24", "w-32 h-32"
};

const DefaultProfile = ({
  initials,
  size = "w-24 h-24",
}: DefaultProfileProps) => {
  return (
    <div
      className={`rounded-full bg-gray-300 flex items-center justify-center text-white text-lg font-bold ${size}`}
    >
      {initials}
    </div>
  );
};

export { DefaultProfile };
