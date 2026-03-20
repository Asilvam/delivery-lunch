import { RESTAURANT } from "../config/restaurant";
import { buildWhatsAppMessage } from "../utils/buildWhatsAppMessage";
import type { SideChoice } from "../data/menu";

type Props = {
  itemName: string;
  side: SideChoice;
  address: string;
  deliveryPoint: string;
  customerWhatsapp?: string;
  disabled?: boolean;
};

export function WhatsAppOrderButton({
  itemName,
  side,
  address,
  deliveryPoint,
  customerWhatsapp,
  disabled = false,
}: Props) {
  const text = buildWhatsAppMessage({
    itemName,
    side,
    address,
    deliveryPoint,
    customerWhatsapp,
  });

  const href = `https://wa.me/${RESTAURANT.whatsapp.phoneE164Digits}?text=${encodeURIComponent(text)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-disabled={disabled}
      onClick={(e) => {
        if (disabled) e.preventDefault();
      }}
      className={`wsp-btn${disabled ? " wsp-btn--disabled" : ""}`}
    >
      <span className="wsp-btn__icon">💬</span>
      Pedir por WhatsApp
      <span className="wsp-btn__number">({RESTAURANT.whatsapp.display})</span>
    </a>
  );
}
