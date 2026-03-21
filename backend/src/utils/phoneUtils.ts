export const maskPhoneNumber = (
  phoneNumber: string | null | undefined,
  isSubscribed: boolean
): string | undefined | null => {
  if (!phoneNumber) return phoneNumber;
  if (isSubscribed) return phoneNumber;

  // Mask last 4 digits
  if (phoneNumber.length <= 4) return "XXXX";
  return phoneNumber.slice(0, -4) + "XXXX";
};
