/**
 * Formats a photo URL correctly, prefixing relative paths with the API BASE URL
 * and providing a robust fallback if no photo exists.
 */
export function getImageUrl(path?: string, fallbackName?: string): string {
  if (!path) {
    // Return a nice UI placeholder if path is missing
    const seed = fallbackName ? encodeURIComponent(fallbackName) : "Member";
    return `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&backgroundColor=1e293b&fontFamily=Inter&fontSize=40&fontValue=bold`;
  }

  // If it's already a full URL or a local blob URL, return it
  if (path.startsWith("http") || path.startsWith("blob:")) {
    return path;
  }

  // Get API URL from env or default
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  // Strip '/api' from the end to get the server root (since uploads are at /uploads)
  const serverRoot = apiUrl.replace(/\/api\/?$/, "");

  // Ensure the path starts with /
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${serverRoot}${normalizedPath}`;
}

/**
 * Formats a master-data item as a bilingual label: "English (Tamil)".
 * Falls back to just the English name when no Tamil name is present.
 */
export function formatMasterLabel(
  item?: { name?: string; taName?: string | null } | null,
): string {
  if (!item?.name) return "";
  return item.taName ? `${item.name} (${item.taName})` : item.name;
}

/**
 * Calculates age from a DOB string
 */
export function calculateAge(dob?: string): number | string {
  if (!dob) return "25";
  const birthDate = new Date(dob);
  if (isNaN(birthDate.getTime())) return "25";

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

/**
 * Reusable utility to mask phone numbers securely
 * Kept consistent with backend logic
 */
export function maskPhoneNumber(
  phone: string | null | undefined, 
  isSubscribed: boolean, 
  isOwnProfile: boolean = false
): string {
  if (!phone) return "";
  if (isSubscribed || isOwnProfile) return phone;

  // If already masked by backend, just return it
  if (phone.includes("X")) return phone;

  if (phone.length <= 5) return "X".repeat(phone.length);
  
  const visiblePart = phone.slice(0, 5);
  const hiddenPart = "X".repeat(phone.length - 5);
  
  return visiblePart + hiddenPart;
}
