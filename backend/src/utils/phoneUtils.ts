export const maskPhoneNumber = (
  phone: string | null | undefined,
  isSubscribed: boolean,
  isOwnProfile: boolean = false
): string | undefined | null => {
  if (!phone) return phone;
  if (isSubscribed || isOwnProfile) return phone;

  // Masking logic: 5 digits visible, remaining replaced with 'X'
  if (phone.length <= 5) return "X".repeat(phone.length);
  
  const visiblePart = phone.slice(0, 5);
  const hiddenPart = "X".repeat(phone.length - 5);
  
  return visiblePart + hiddenPart;
};
