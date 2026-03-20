import type { SideChoice } from "../data/menu";

export type OrderDraft = {
  itemName: string;
  side: SideChoice;
  address: string;
  deliveryPoint: string;
  customerWhatsapp?: string;
};

/**
 * Builds the WhatsApp message text for an order.
 */
export function buildWhatsAppMessage(order: OrderDraft): string {
  const lines = [
    "Hola! Quiero hacer un pedido:",
    `• Menú: ${order.itemName}`,
    `• Acompañamiento: ${order.side}`,
    "• Incluye: Ensalada mixta (puede variar), Pan, Postre del día",
    `• Dirección: ${order.address}`,
    `• Punto de referencia: ${order.deliveryPoint}`,
  ];

  const wsp = order.customerWhatsapp?.trim();
  if (wsp) {
    lines.push(`• Mi WhatsApp: ${wsp}`);
  }

  return lines.join("\n");
}
