export const PAWPATROL_ADMIN_SESSION_KEY = "pawpatrol_admin_session";

export const DEMO_ADMIN_USERNAME = "admin";
export const DEMO_ADMIN_PASSWORD = "admin123";

export function isAdminSessionActive(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(PAWPATROL_ADMIN_SESSION_KEY) === "true";
}

export function setAdminSession(active: boolean): void {
  if (active) {
    window.localStorage.setItem(PAWPATROL_ADMIN_SESSION_KEY, "true");
  } else {
    window.localStorage.removeItem(PAWPATROL_ADMIN_SESSION_KEY);
  }
}

export function clearAdminSession(): void {
  window.localStorage.removeItem(PAWPATROL_ADMIN_SESSION_KEY);
}

export function validateDemoLogin(username: string, password: string): boolean {
  return username.trim() === DEMO_ADMIN_USERNAME && password === DEMO_ADMIN_PASSWORD;
}
