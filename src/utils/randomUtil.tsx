export function getInitials(fullName: string): string {
  if (!fullName) return "";

  const parts = fullName.trim().split(/\s+/); // Split by any whitespace
  const firstInitial = parts[0]?.[0] ?? "";
  const lastInitial = parts.length > 1 ? parts[parts.length - 1][0] : "";

  return (firstInitial + lastInitial).toUpperCase();
}

export const getFirstAndLastInitials = (
  firstName: string,
  lastName: string
) => {
  const firstInitial = firstName?.[0] || "";
  const lastInitial = lastName?.[0] || "";
  return (firstInitial + lastInitial).toUpperCase();
};
