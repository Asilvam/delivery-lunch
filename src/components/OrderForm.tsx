import { useMemo, useState } from "react";
import type { SideChoice } from "../data/menu";
import { useMenu } from "../hooks/useMenu";
import { formatCLP } from "../utils/formatCLP";
import { normalizeChileWhatsApp } from "../utils/normalizeChileWhatsApp";
import { WhatsAppOrderButton } from "./WhatsAppOrderButton";

const sides: SideChoice[] = ["Papas fritas", "Arroz"];

export function OrderForm() {
  const menuResult = useMenu();
  const menuItems =
    menuResult.status === "success"
      ? menuResult.items.filter((m) => m.category === "Menú del día")
      : [];

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [side, setSide] = useState<SideChoice>("Papas fritas");
  const [address, setAddress] = useState("");
  const [addressTouched, setAddressTouched] = useState(false);
  const [deliveryPoint, setDeliveryPoint] = useState("");
  const [deliveryPointTouched, setDeliveryPointTouched] = useState(false);
  const [customerWhatsapp, setCustomerWhatsapp] = useState("");
  const [wspError, setWspError] = useState<string | null>(null);

  const effectiveId = selectedId !== null ? selectedId : (menuItems[0]?.id ?? "");
  const selectedItem =
    menuItems.find((m) => m.id === effectiveId) ?? menuItems[0];

  /** Normalize WhatsApp on blur */
  function handleWspBlur() {
    if (!customerWhatsapp.trim()) {
      setWspError(null);
      return;
    }
    const result = normalizeChileWhatsApp(customerWhatsapp);
    if (result.ok) {
      setCustomerWhatsapp(result.display);
      setWspError(null);
    } else {
      setWspError(result.error);
    }
  }

  const wspNormalized = useMemo(() => {
    if (!customerWhatsapp.trim()) return { ok: true, display: "" };
    return normalizeChileWhatsApp(customerWhatsapp);
  }, [customerWhatsapp]);

  const addressError = addressTouched && address.trim().length < 5
    ? "La dirección es obligatoria (mínimo 5 caracteres)."
    : null;

  const deliveryPointError = deliveryPointTouched && deliveryPoint.trim().length < 3
    ? "El punto de referencia es obligatorio (mínimo 3 caracteres)."
    : null;

  const canOrder =
    address.trim().length >= 5 &&
    deliveryPoint.trim().length >= 3 &&
    wspNormalized.ok;

  return (
    <section className="order-form">
      <h2>Haz tu pedido</h2>

      {menuResult.status === "loading" && (
        <p className="form-hint">Cargando menú…</p>
      )}
      {menuResult.status === "error" && (
        <p className="form-error">{menuResult.error}</p>
      )}

      {menuResult.status === "success" && selectedItem && (
        <>
          {/* Menu selector */}
          <div className="form-group">
            <label htmlFor="menu-select">Menú (pollo)</label>
            <select
              id="menu-select"
              value={effectiveId}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              {menuItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} — {formatCLP(item.priceCLP)}
                </option>
              ))}
            </select>
            {selectedItem.description && (
              <p className="form-hint">{selectedItem.description}</p>
            )}
          </div>

          {/* Includes */}
          {selectedItem.includes && (
            <div className="includes-list">
              <span className="includes-label">Incluye:</span>
              <ul>
                {selectedItem.includes.map((inc) => (
                  <li key={inc}>{inc}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Side choice */}
          <div className="form-group">
            <span className="form-label">Acompañamiento</span>
            <div className="side-options">
              {sides.map((s) => (
                <label key={s} className="side-option">
                  <input
                    type="radio"
                    name="side"
                    value={s}
                    checked={side === s}
                    onChange={() => setSide(s)}
                  />
                  {s}
                </label>
              ))}
            </div>
          </div>

          {/* Address */}
          <div className="form-group">
            <label htmlFor="address">Dirección</label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onBlur={() => setAddressTouched(true)}
              placeholder="Ej: Av. Siempre Viva 123, Depto 45"
              aria-describedby={addressError ? "address-error" : undefined}
              aria-invalid={!!addressError}
            />
            {addressError && (
              <p id="address-error" className="form-error">
                {addressError}
              </p>
            )}
          </div>

          {/* Delivery point */}
          <div className="form-group">
            <label htmlFor="delivery-point">Punto de referencia (delivery point)</label>
            <input
              id="delivery-point"
              type="text"
              value={deliveryPoint}
              onChange={(e) => setDeliveryPoint(e.target.value)}
              onBlur={() => setDeliveryPointTouched(true)}
              placeholder="Ej: Portón negro / frente a la plaza / conserjería"
              aria-describedby={deliveryPointError ? "delivery-point-error" : undefined}
              aria-invalid={!!deliveryPointError}
            />
            {deliveryPointError && (
              <p id="delivery-point-error" className="form-error">
                {deliveryPointError}
              </p>
            )}
          </div>

          {/* Customer WhatsApp (optional) */}
          <div className="form-group">
            <label htmlFor="customer-wsp">
              Tu número WhatsApp <span className="optional">(opcional)</span>
            </label>
            <input
              id="customer-wsp"
              type="tel"
              value={customerWhatsapp}
              onChange={(e) => {
                setCustomerWhatsapp(e.target.value);
                setWspError(null);
              }}
              onBlur={handleWspBlur}
              placeholder="Ej: 981914285 o +56 9 8191 4285"
            />
            {customerWhatsapp.trim() && (
              <p className={wspError ? "form-error" : "form-success"}>
                {wspError ?? `Número válido: ${wspNormalized.ok ? wspNormalized.display : ""}`}
              </p>
            )}
          </div>

          {/* Order button */}
          <div className="order-action">
            <WhatsAppOrderButton
              itemName={selectedItem.name}
              side={side}
              address={address}
              deliveryPoint={deliveryPoint}
              customerWhatsapp={wspNormalized.ok ? wspNormalized.display : customerWhatsapp}
              disabled={!canOrder}
            />
            {!canOrder && (
              <p className="order-hint">
                Completa Dirección y Punto de referencia. Si agregas WhatsApp, debe ser válido.
              </p>
            )}
          </div>
        </>
      )}
    </section>
  );
}
