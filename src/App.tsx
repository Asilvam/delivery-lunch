import './App.css'
import { RESTAURANT } from './config/restaurant'
import { OrderForm } from './components/OrderForm'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>{RESTAURANT.name}</h1>
        <p className="app-subtitle">Menú del día · Delivery a domicilio</p>
      </header>

      <main className="app-main">
        <OrderForm />
      </main>

      <footer className="app-footer">
        <p>
          © {new Date().getFullYear()} {RESTAURANT.name} · WhatsApp:{" "}
          <a
            href={`https://wa.me/${RESTAURANT.whatsapp.phoneE164Digits}`}
            target="_blank"
            rel="noreferrer"
          >
            {RESTAURANT.whatsapp.display}
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App
