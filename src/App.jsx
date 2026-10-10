import { useEffect, useState } from "react";
import {
  NAME,
  PHONE,
  waLink,
  hours,
  dayNames,
  dayShort,
  durations,
  plans,
  areas,
  classes,
  goals,
  turns,
  priceOf,
} from "./data.js";
import { guatemalaNow, openStatus, fmt12 } from "./time.js";
import { Icon, WaIcon, Logo } from "./icons.jsx";

const money = (n) => `Q${n.toLocaleString("en-US")}`;

// Hora actual en Guatemala, actualizada cada 30 segundos
function useNow() {
  const [now, setNow] = useState(() => guatemalaNow());
  useEffect(() => {
    const id = setInterval(() => setNow(guatemalaNow()), 30000);
    return () => clearInterval(id);
  }, []);
  return now;
}

// Foto con respaldo: si el archivo no existe, se muestra la ilustración
function Photo({ src, alt, fallback }) {
  const [failed, setFailed] = useState(false);
  if (failed) return fallback;
  return <img src={encodeURI(src)} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} />;
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    ["#planes", "Planes"],
    ["#areas", "Instalaciones"],
    ["#horarios", "Horarios"],
  ];
  return (
    <header className="cab">
      <div className="wrap cab-fila">
       <a className="marca" href="#inicio" aria-label={`${NAME}, inicio`} style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src="img/logo.jpg" 
            alt="Logo Gimnasio Elite Maya" 
            style={{ 
              width: '120px', /* Lo bajamos de 160px a 120px */
              height: 'auto',
              mixBlendMode: 'screen', /* Mantiene el truco de ocultar el fondo negro */
              transform: 'scale(1.15)', /* Lo bajamos de 1.4 a 1.15 para que no se salga del menú */
              transformOrigin: 'left center', 
              marginLeft: '10px' 
            }} 
          />
        </a>
        <nav className={"nav" + (open ? " abierto" : "")} aria-label="Principal">
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a className="nav-cta" href="#inscripcion" onClick={() => setOpen(false)}>
            Inscribirme
          </a>
        </nav>
        <button
          className="menu-btn"
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

// Pirámide escalonada dibujada: se ve cuando todavía no hay foto de portada
function PiramideArte() {
  const niveles = Array.from({ length: 7 }, (_, i) => i);
  const pasos = Array.from({ length: 22 }, (_, i) => 90 + i * 20);
  return (
    <svg className="portada-arte" viewBox="0 0 640 560" preserveAspectRatio="xMaxYMax meet" aria-hidden="true">
      {niveles.map((i) => {
        const w = 600 - i * 76;
        return <rect key={i} x={(640 - w) / 2} y={520 - (i + 1) * 62} width={w} height={62} />;
      })}
      <rect x={286} y={42} width={68} height={44} />
      <rect className="escalera" x={298} y={86} width={44} height={434} />
      {pasos.map((y) => (
        <line key={y} className="peldano" x1={298} x2={342} y1={y} y2={y} />
      ))}
    </svg>
  );
}

function Hero({ status }) {
  const [y, setY] = useState(0);
  const [fotoFalla, setFotoFalla] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(Math.min(window.scrollY, 600)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="portada borde-greca" id="inicio" style={{ "--sig": "var(--hueso)" }}>
      <PiramideArte />
      {!fotoFalla && (
        <img
          className="portada-foto"
          src="img/portada.jpg"
          alt=""
          decoding="async"
          style={{ transform: `translateY(${y * 0.06}px) scale(1.12)` }}
          onError={() => setFotoFalla(true)}
        />
      )}
      <div className="wrap portada-fila">
        <div className="portada-texto">
          <p className={"estado" + (status.open ? " abierto" : "")} role="status">
            <span className="punto" aria-hidden="true" />
            {status.text}
          </p>
          <h1>Tu rutina empieza hoy</h1>
          <p className="sub">
            Sala de pesas, cardio y clases grupales en Cobán. Elige tu plan e inscríbete por WhatsApp en minutos.
          </p>
          <div className="acciones">
            <a
              className="btn btn-oro"
              href={waLink("Hola, quiero información para inscribirme en Elite Maya.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WaIcon />
              Inscribirme por WhatsApp
            </a>
            <a className="btn btn-borde" href="#planes">
              Ver planes
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Plans({ dur, setDur }) {
  return (
    <section className="planes borde-greca" id="planes" style={{ "--sig": "var(--carbon)" }}>
      <div className="wrap">
        <h2>Elige tu plan</h2>
        <p className="intro">Entre más meses pagas juntos, menos pagas por mes. Cambia la duración y mira el precio al instante.</p>
        <div className="duracion" role="radiogroup" aria-label="Duración del plan">
          {durations.map((d) => (
            <button
              key={d.id}
              role="radio"
              aria-checked={dur.id === d.id}
              className={"dur" + (dur.id === d.id ? " on" : "")}
              onClick={() => setDur(d)}
            >
              {d.label}
              {d.off > 0 && <span className="ahorro">-{Math.round(d.off * 100)}%</span>}
            </button>
          ))}
        </div>
        <div className="plan-grid">
          {plans.map((p) => {
            const pr = priceOf(p, dur);
            return (
              <article key={p.id} className={"plan" + (p.featured ? " destacado" : "")}>
                {p.featured && <span className="insignia">Sugerido para empezar</span>}
                <h3>{p.name}</h3>
                <p className="plan-texto">{p.text}</p>
                <p className="precio">
                  <span className="precio-num">{money(pr.perMonth)}</span>
                  <span className="precio-mes">al mes</span>
                </p>
                <p className="precio-detalle">
                  {dur.months === 1
                    ? "Pago mes a mes"
                    : `Pagas ${money(pr.total)} por ${dur.months} meses y ahorras ${money(pr.saved)}`}
                </p>
                <ul>
                  {p.inc.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                <a
                  className={"btn " + (p.featured ? "btn-oro" : "btn-oscuro")}
                  href={waLink(`Hola, quiero inscribirme en el plan ${p.name} (${dur.label.toLowerCase()}).`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WaIcon />
                  Quiero este plan
                </a>
              </article>
            );
          })}
        </div>
        <p className="nota">Precios de ejemplo. Se ajustan con los valores reales del gimnasio.</p>
      </div>
    </section>
  );
}

function Areas() {
  return (
    <section className="areas borde-greca" id="areas" style={{ "--sig": "var(--hueso-2)" }}>
      <div className="wrap">
        <h2>Todo para entrenar en un solo lugar</h2>
        <p className="intro">Cuatro espacios pensados para que trabajes tu meta, sea fuerza, resistencia o movilidad.</p>
        <div className="areas-grid">
          {areas.map((a) => (
            <article key={a.id} className={"area area-" + a.id}>
              <div className="area-img">
                <Photo
                  src={a.img}
                  alt={a.title}
                  fallback={
                    <div className="area-arte" role="img" aria-label={`${a.title}. Ilustración de ejemplo, aquí va la foto real`}>
                      <Icon name={a.icon} />
                    </div>
                  }
                />
              </div>
              <div className="area-texto">
                <span className="area-icono">
                  <Icon name={a.icon} />
                </span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Schedule({ now }) {
  const [day, setDay] = useState(now.day === 0 ? 1 : now.day);
  const list = classes[day] || [];
  return (
    <section className="horarios borde-greca" id="horarios" style={{ "--sig": "var(--carbon)" }}>
      <div className="wrap horarios-fila">
        <div>
          <h2>Horario del gimnasio</h2>
          <table className="tabla-horas">
            <tbody>
              {[1, 2, 3, 4, 5, 6, 0].map((d) => (
                <tr key={d} className={d === now.day ? "hoy" : ""}>
                  <th scope="row">
                    {dayNames[d]}
                    {d === now.day && <span className="hoy-tag">Hoy</span>}
                  </th>
                  <td>
                    {fmt12(hours[d][0])} a {fmt12(hours[d][1])}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h2>Clases de la semana</h2>
          <div className="dias" role="group" aria-label="Día de la semana">
            {[1, 2, 3, 4, 5, 6].map((d) => (
              <button key={d} className={"dia" + (day === d ? " on" : "")} aria-pressed={day === d} onClick={() => setDay(d)}>
                {dayShort[d]}
              </button>
            ))}
          </div>
          <ul className="clases" aria-label={`Clases del ${dayNames[day].toLowerCase()}`}>
            {list.map((c) => (
              <li key={c.t + c.n}>
                <time>{fmt12(c.t)}</time>
                <div>
                  <strong>{c.n}</strong>
                  <span>{c.l}</span>
                </div>
              </li>
            ))}
          </ul>
          <p className="nota">Horarios y clases de ejemplo. Se ajustan con el gimnasio.</p>
        </div>
      </div>
    </section>
  );
}

function Steps() {
  const pasos = [
    ["Elige tu plan", "Mira los planes y escoge el que va con tu meta y tu presupuesto."],
    ["Escríbenos por WhatsApp", "Cuéntanos tu objetivo y el turno en el que prefieres entrenar."],
    ["Pasa al gimnasio", "Te esperamos para que empieces tu primer entrenamiento."],
  ];
  return (
    <section className="pasos-sec borde-greca" style={{ "--sig": "var(--hueso)" }}>
      <div className="wrap">
        <h2>Empezar es fácil</h2>
        <ol className="pasos">
          {pasos.map(([h, p]) => (
            <li key={h}>
              <h3>{h}</h3>
              <p>{p}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Booking({ dur, setDur }) {
  const [name, setName] = useState("");
  const [planId, setPlanId] = useState("plus");
  const [goal, setGoal] = useState(goals[0]);
  const [turn, setTurn] = useState(turns[0]);

  const plan = plans.find((p) => p.id === planId);
  const pr = priceOf(plan, dur);
  const message = `Hola, soy ${name.trim() || "una persona interesada"}. Quiero inscribirme en el plan ${plan.name} (${dur.label.toLowerCase()}). Mi objetivo es: ${goal.toLowerCase()}. Prefiero entrenar por ${turn}.`;

  const submit = (e) => {
    e.preventDefault();
    window.open(waLink(message), "_blank", "noopener");
  };

  return (
    <section className="inscripcion borde-greca" id="inscripcion" style={{ "--sig": "var(--carbon)" }}>
      <div className="wrap inscripcion-fila">
        <div>
          <h2>Inscríbete hoy</h2>
          <p className="intro">Llena los datos y mira cómo queda tu mensaje. Al enviarlo se abre WhatsApp, listo para mandar.</p>
          <form onSubmit={submit}>
            <label>
              Tu nombre
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Ejemplo: Carlos Pop" />
            </label>
            <div className="fila">
              <label>
                Plan
                <select value={planId} onChange={(e) => setPlanId(e.target.value)}>
                  {plans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Duración
                <select value={dur.id} onChange={(e) => setDur(durations.find((d) => d.id === e.target.value))}>
                  {durations.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label>
              Tu objetivo
              <select value={goal} onChange={(e) => setGoal(e.target.value)}>
                {goals.map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </label>
            <label>
              ¿Cuándo prefieres entrenar?
              <select value={turn} onChange={(e) => setTurn(e.target.value)}>
                {turns.map((t) => (
                  <option key={t}>{t[0].toUpperCase() + t.slice(1)}</option>
                ))}
              </select>
            </label>
            <button className="btn btn-oro" type="submit">
              <WaIcon />
              Enviar por WhatsApp
            </button>
            <p className="nota-form">No se guarda ningún dato en esta página. El mensaje solo se abre en tu WhatsApp.</p>
          </form>
        </div>
        <div className="inscripcion-lado">
          <p className="prev-t">Así se verá tu mensaje</p>
          <div className="chat" aria-live="polite">
            <div className="burbuja">{message}</div>
          </div>
          <p className="resumen">
            Plan {plan.name}, {dur.label.toLowerCase()}: <b>{money(pr.perMonth)} al mes</b>
          </p>
          <h2 className="h2-chico">Dónde encontrarnos</h2>
          <dl className="contacto">
            <div>
              <dt>WhatsApp y teléfono</dt>
              <dd>{PHONE}</dd>
            </div>
            <div>
              <dt>Ciudad</dt>
              <dd>Cobán, Alta Verapaz</dd>
            </div>
            <div>
              <dt>Dirección</dt>
              <dd>2a Avenida 4-46, Cobán, Alta Verapaz</dd>
            </div>
          </dl>
          <div className="mapa" style={{ overflow: 'hidden', borderRadius: '8px', minHeight: '300px' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3845.310440663664!2d-90.37700862510913!3d15.467724985128019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x858a4132d4279b01%3A0x55ba5b19c575ce08!2sGimnasio%20Elite%20Maya!5e0!3m2!1ses!2sgt!4v1791612736767!5m2!1ses!2sgt"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '300px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de ubicación de Gimnasio Elite Maya"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const now = useNow();
  const status = openStatus(hours, now);
  const [dur, setDur] = useState(durations[0]);

  return (
    <>
      <div className="aviso">
        <strong>Propuesta de diseño para el {NAME}, preparada por COFFEDEV_GT.</strong> Borrador de muestra: precios, horarios,
        clases y textos son de ejemplo y se ajustan con el gimnasio.
      </div>
      <Header />
      <main>
        <Hero status={status} />
        <Plans dur={dur} setDur={setDur} />
        <Areas />
        <Schedule now={now} />
        <Steps />
        <Booking dur={dur} setDur={setDur} />
      </main>
      <footer>
        <div className="wrap pie-fila">
          <span>
            <strong>{NAME}</strong> Cobán, Alta Verapaz
          </span>
          <span>Propuesta de diseño de COFFEDEV_GT, por Omar Caal, Ingeniero en Sistemas</span>
        </div>
      </footer>
      <a
        className="flota"
        href={waLink("Hola, quiero información para inscribirme en Elite Maya.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp"
      >
        <WaIcon />
      </a>
    </>
  );
}
