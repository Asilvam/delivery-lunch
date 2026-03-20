import type { MenuItem } from "../data/menu";
import { menu } from "../data/menu";

/**
 * Fetches the menu items from the backend.
 * TODO: Replace mock with real API call once the backend endpoint is live:
 *   return fetch("/api/menu").then((res) => res.json());
 */
export async function fetchMenu(): Promise<MenuItem[]> {
  return Promise.resolve(menu);
}
