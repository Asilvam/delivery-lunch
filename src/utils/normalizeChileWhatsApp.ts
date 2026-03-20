/**
 * Normalizes Chilean mobile phone numbers to:
 *   display:     "+56 9 XXXX XXXX"
 *   e164Digits:  "569XXXXXXXX"
 *
 * Accepted input formats:
 *   "981914285"          → 9 digits starting with 9
 *   "9 8191 4285"        → spaced local number
 *   "+56 9 8191 4285"    → full international display
 *   "56981914285"        → 11 digits with country code
 *   "09XXXXXXXX"         → old-style with leading 0
 *   "0569XXXXXXXX"       → 12 digits with leading 0 + country code
 */
export type NormalizeResult =
  | { ok: true; display: string; e164Digits: string }
  | { ok: false; error: string };

export function normalizeChileWhatsApp(input: string): NormalizeResult {
  const raw = (input ?? "").trim();
  if (!raw) return { ok: false, error: "vacío" };

  const digits = raw.replace(/\D/g, "");

  let local9: string | undefined;

  if (digits.length === 9 && digits.startsWith("9")) {
    // 9XXXXXXXX
    local9 = digits;
  } else if (digits.length === 11 && digits.startsWith("569")) {
    // 569XXXXXXXX → strip "56"
    local9 = digits.slice(2);
  } else if (digits.length === 10 && digits.startsWith("09")) {
    // 09XXXXXXXX → strip leading "0"
    local9 = digits.slice(1);
  } else if (digits.length === 12 && digits.startsWith("0569")) {
    // 0569XXXXXXXX → strip "056"
    local9 = digits.slice(3);
  } else {
    return {
      ok: false,
      error: "Formato inválido. Usa un celular de Chile, ej: +56 9 8191 4285",
    };
  }

  if (local9.length !== 9 || !local9.startsWith("9")) {
    return {
      ok: false,
      error: "Número inválido. Debe ser celular de Chile (empieza con 9).",
    };
  }

  const e164Digits = `56${local9}`;
  const display = `+56 ${local9[0]} ${local9.slice(1, 5)} ${local9.slice(5)}`;

  return { ok: true, display, e164Digits };
}
