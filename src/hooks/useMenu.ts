import { useEffect, useState } from "react";
import type { MenuItem } from "../data/menu";
import { fetchMenu } from "../services/menuService";

export type UseMenuResult =
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "success"; items: MenuItem[] };

export function useMenu(): UseMenuResult {
  const [result, setResult] = useState<UseMenuResult>({ status: "loading" });

  useEffect(() => {
    let mounted = true;
    fetchMenu()
      .then((items) => {
        if (mounted) setResult({ status: "success", items });
      })
      .catch((err: unknown) => {
        if (mounted) {
          const message =
            err instanceof Error ? err.message : "Error al cargar el menú";
          setResult({ status: "error", error: message });
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  return result;
}
