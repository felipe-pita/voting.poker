const STORAGE_KEY = "voting-poker:user-profile";

export interface StoredProfile {
  name: string;
  avatar: string;
  emoji: string;
}

export const loadStoredProfile = (): StoredProfile | null => {
  if (typeof localStorage === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.name !== "string" || !parsed.name) return null;
    return {
      name: parsed.name,
      avatar: typeof parsed.avatar === "string" ? parsed.avatar : "",
      emoji: typeof parsed.emoji === "string" ? parsed.emoji : "🙈",
    };
  } catch {
    return null;
  }
};

export const saveStoredProfile = (profile: StoredProfile): void => {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {}
};

export const hasStoredProfile = (): boolean => loadStoredProfile() !== null;
