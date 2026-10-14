import React, { useState } from 'react';
import {
  Wrench,
  ShieldCheck,
  AlertTriangle,
  Clock,
  MapPin,
  Phone,
  Car,
  ArrowRight,
  Gauge,
  Check,
  Zap,
  Activity,
  FileText,
  Truck,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLandingCustomizer } from '../context/LandingCustomizerContext';
import DemoConversionBar from '../components/DemoConversionBar';

export default function TallerMecanicoLanding({ onBack, onOpenCheckout, onSwitchDemo }) {
  const { businessName, city, phone } = useLandingCustomizer();

  const brandName = businessName || 'AUTOWERKS · INGENIERÍA & DIAGNÓSTICO';
  const brandCity = city || 'Narvarte · Del Valle · Benito Juárez, CDMX';

  // Interactive Quick Symptom Quoter State
  const [selectedSymptom, setSelectedSymptom] = useState('check_engine');
  const [carMake, setCarMake] = useState('Volkswagen');
  const [carModel, setCarModel] = useState('Jetta');
  const [carYear, setCarYear] = useState('2021');
  const [mileage, setMileage] = useState('60,000 km');

  const symptomsData = {
    frenos: {
      id: 'frenos',
      title: 'Ruido / Rechinido al Frenar o Pedal Esponjoso',
      system: 'SISTEMA DE FRENADO HIDRÁULICO & ABS',
      diagnosticCode: 'DTC-BRK-402',
      timeEstimate: '1.5 a 2.5 Horas (Mismo Día)',
      priceRange: '$1,200 – $2,450 MXN',
      severity: 'ALTA PRIORIDAD · SEGURIDAD VIAL',
      severityColor: '#DC2626',
      components: [
        'Balatas cerámicas de bajo desprendimiento de polvo',
        'Rectificado computarizado de discos ventilados',
        'Purgado y cambio de líquido DOT-4 Bosch',
        'Limpieza y engrase de pernos de cáliper'
      ],
      desc: 'Evita cristalización de discos y pérdida de presión en carretera. Inspección visual con micrómetro incluida.'
    },
    check_engine: {
      id: 'check_engine',
      title: 'Testigo Check Engine / Pérdida de Potencia',
      system: 'TELEMETRÍA DE MOTOR & INYECCIÓN ELECTRÓNICA',
      diagnosticCode: 'OBD2-ISO-9141',
      timeEstimate: '45 a 60 Minutos',
      priceRange: '$650 – $1,400 MXN',
      severity: 'PRECAUCIÓN · EMISIÓN & SENSORÍSTICA',
      severityColor: '#EAB308',
      components: [
        'Escaneo con interfaz OEM Snap-On / Bosch',
        'Lectura de datos en vivo de sensores O2, MAF y MAP',
        'Prueba de banco de bobinas y pulso de inyección',
        'Revisión de fuga de vacío con máquina de humo'
      ],
      desc: 'No adivines qué tiene tu auto. Te entregamos reporte impreso y digital de los códigos de falla exactos.'
    },
    vibracion: {
      id: 'vibracion',
      title: 'Vibración en Volante / Tronido en Baches',
      system: 'TREN DELANTERO, SUSPENSIÓN & DIRECCIÓN',
      diagnosticCode: 'DTC-SUS-108',
      timeEstimate: '2 a 3.5 Horas',
      priceRange: '$1,450 – $3,800 MXN',
      severity: 'DESGASTE MECÁNICO · ALINEACIÓN REQUERIDA',
      severityColor: '#EAB308',
      components: [
        'Inspección en rampa hidráulica de bujes y rótulas',
        'Revisión de amortiguadores y bases de soporte',
        'Diagnóstico de caja de dirección electro-asistida',
        'Alineación láser 3D y balanceo por computadora'
      ],
      desc: 'Protege tus neumáticos del desgaste irregular y asegura estabilidad total a más de 100 km/h.'
    },
    afinacion: {
      id: 'afinacion',
      title: 'Afinación Mayor por Kilometraje (10k / 20k / 40k)',
      system: 'MANTENIMIENTO PREVENTIVO DE AGENCIA',
      diagnosticCode: 'SVC-TUNE-MAJOR',
      timeEstimate: '3 a 4 Horas',
      priceRange: '$1,850 – $3,400 MXN',
      severity: 'MANTENIMIENTO PROGRAMADO CERTIFICADO',
      severityColor: '#10B981',
      components: [
        'Aceite 100% Sintético Motul / Castrol 5W30 o 0W20',
        '4 Bujías de Iridio NGK / Denso de alto desempeño',
        'Filtro de aire de motor, filtro de cabina y aceite',
        'Lavado de inyectores por tina ultrasónica + cuerpo aceleración'
      ],
      desc: 'Conserva el valor de reventa de tu auto y recupera hasta un 18% en rendimiento de combustible.'
    }
  };

  const currentSym = symptomsData[selectedSymptom];

  const handleBookService = (type) => {
    const cleanPhone = phone ? phone.replace(/\D/g, '') : '525512345678';
    let message = '';

    if (type === 'urgent_tow') {
      message = `🚨 *AUXILIO VIAL / GRÚA URGENTE - ${brandName}*%0A%0AMi auto quedó varado y requiero grúa o asistencia inmediata.%0A• *Vehículo:* ${carMake} ${carModel} (${carYear})%0A• *Ubicación:* Enviar grúa a zona de ${brandCity}.%0A• *Falla aparente:* ${currentSym.title}%0A¡Por favor confirmen tiempo de respuesta!`;
    } else {
      message = `🔧 *CITA TALLER MECÁNICO - ${brandName}*%0A%0AHola, realicé el diagnóstico por síntoma en su web:%0A• *Vehículo:* ${carMake} ${carModel} (${carYear}) - ${mileage}%0A• *Síntoma reportado:* ${currentSym.title}%0A• *Código referencia:* ${currentSym.diagnosticCode}%0A• *Presupuesto estimado:* ${currentSym.priceRange}%0A• *Tiempo estimado:* ${currentSym.timeEstimate}%0A📍 Deseo ingresar mi auto al taller en ${brandCity}. ¿Tienen rampa libre hoy o mañana?`;
    }

    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#121316] text-[#F8FAFC] font-mono-tech selection:bg-[#EAB308] selection:text-black">
      {/* Demo Customizer Bar */}
      <DemoConversionBar
        currentKey="taller"
        onSwitchDemo={onSwitchDemo}
        onBackToAgency={onBack}
        onOpenCheckout={onOpenCheckout}
      />

      {/* TOP INDUSTRIAL CAUTION HAZARD STRIPE */}
      <div className="h-2 w-full bg-[repeating-linear-gradient(45deg,#EAB308,#EAB308_15px,#000000_15px,#000000_30px)]"></div>

      {/* TELEMETRY OBD2 SYSTEM STATUS BAR */}
      <div className="bg-[#18191E] border-b border-zinc-800 px-6 py-2.5 text-xs flex flex-wrap justify-between items-center gap-4 text-zinc-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-white text-[11px]">OBD2 LINK ONLINE</span>
          </div>
          <span className="text-zinc-600">|</span>
          <span className="text-[11px] hidden sm:inline">CAN-BUS PROTOCOL: ISO-15765-4 OK</span>
          <span className="text-zinc-600 hidden sm:inline">|</span>
          <span className="text-[11px] text-[#EAB308] font-bold">CALIBRACIÓN SNAP-ON 2026</span>
        </div>

        <div className="flex items-center gap-6 text-[11px]">
          <span className="text-emerald-400 font-bold">5 RAMPAS EN OPERACIÓN HOY</span>
          <span className="text-white font-bold bg-[#DC2626] px-2 py-0.5 text-[10px]">
            GRÚA 24H: ACTIVA
          </span>
        </div>
      </div>

      {/* HERO SECTION: HIGH-URGENCY DUAL-ACTION HEADER (PREVENTIVO VS AUXILIO VIAL) */}
      <section className="px-6 sm:px-12 py-14 sm:py-20 max-w-7xl mx-auto border-b border-zinc-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column (7 Cols): High-Urgency & Certified Guarantees */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-[#EAB308]/10 border border-[#EAB308]/30 px-3 py-1 text-xs text-[#EAB308] font-bold uppercase tracking-wider mb-6">
              <ShieldCheck className="w-4 h-4 text-[#EAB308]" />
              <span>GARANTÍA 12 MESES POR ESCRITO · REFACCIONES ORIGINALES</span>
            </div>

            <h1 className="font-industrial text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-wide text-white leading-none mb-6">
              Tu auto en manos de ingenieros, <span className="text-[#EAB308]">no de adivinadores</span>.
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed max-w-xl mb-8">
              En <strong>{brandName}</strong> eliminamos la incertidumbre de los talleres tradicionales. Diagnóstico digital con escáner oficial, presupuesto cerrado antes de desarmar y evidencia fotográfica por WhatsApp de cada pieza reemplazada.
            </p>

            {/* DUAL ACTION BUTTONS (Mantenimiento vs Auxilio Urgente) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => {
                  const el = document.getElementById('diagnostico-sintoma');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#EAB308] hover:bg-[#FACC15] text-black px-6 py-4 font-industrial font-bold uppercase tracking-wider text-sm transition-all shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] flex items-center justify-center gap-2"
              >
                <Wrench className="w-4 h-4" />
                <span>Agendar Mantenimiento</span>
              </button>

              <button
                onClick={() => handleBookService('urgent_tow')}
                className="bg-[#DC2626] hover:bg-[#EF4444] text-white px-6 py-4 font-industrial font-bold uppercase tracking-wider text-sm transition-all shadow-[4px_4px_0px_#000] flex items-center justify-center gap-2 animate-pulse"
              >
                <Truck className="w-4 h-4" />
                <span>Auxilio Vial / Grúa Urgente</span>
              </button>
            </div>

            {/* 3 Written Guarantees */}
            <div className="grid grid-cols-3 gap-3 border-t border-zinc-800 pt-6 text-xs text-zinc-400">
              <div>
                <span className="text-[#EAB308] font-bold block mb-0.5">01 · SIN SORPRESAS</span>
                <span className="text-[11px] leading-tight block">Aprobación de presupuesto por escrito antes de tocar el coche.</span>
              </div>
              <div>
                <span className="text-[#EAB308] font-bold block mb-0.5">02 · REFACCIONES OEM</span>
                <span className="text-[11px] leading-tight block">Te entregamos las cajas y piezas viejas sustituidas.</span>
              </div>
              <div>
                <span className="text-[#EAB308] font-bold block mb-0.5">03 · FACTURA FISCAL</span>
                <span className="text-[11px] leading-tight block">100% deducible de impuestos con desglose de mano de obra.</span>
              </div>
            </div>
          </div>

          {/* Right Column (5 Cols): Telemetry Dashboard Photo Card with Live Inspection Gauge */}
          <div className="lg:col-span-5">
            <div className="bg-[#18191E] border-2 border-zinc-700 p-4 relative">
              {/* Caution Bar on Card */}
              <div className="h-1.5 w-full bg-[#EAB308] mb-3"></div>

              <div className="aspect-[4/3] bg-black overflow-hidden relative border border-zinc-800">
                <img
                  src="/images/taller.webp"
                  alt="Centro de Diagnóstico Automotriz"
                  className="w-full h-full object-cover filter contrast-[1.1] brightness-[0.9]"
                />
                
                {/* HUD Overlay inside photo */}
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm border border-zinc-700 px-3 py-1.5 text-[10px] text-emerald-400 font-bold flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 animate-spin" />
                  <span>ANALIZADOR DE GASES & FRENÓMETRO</span>
                </div>

                <div className="absolute bottom-3 right-3 bg-[#EAB308] text-black px-2.5 py-1 text-[11px] font-industrial font-bold uppercase tracking-wider">
                  {brandCity}
                </div>
              </div>

              {/* Quick telemetry sensors strip below image */}
              <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] text-zinc-400 border-t border-zinc-800 pt-3">
                <div className="flex justify-between">
                  <span>Presión Aceite:</span>
                  <span className="text-white font-bold">42 PSI [NORM]</span>
                </div>
                <div className="flex justify-between">
                  <span>Temp. Refrigerante:</span>
                  <span className="text-white font-bold">90°C [STABLE]</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* EXCLUSIVE INTERACTIVE WIDGET: DIAGNÓSTICO RÁPIDO POR SÍNTOMA (OBD2 TELEMETRY PANEL) */}
      <section id="diagnostico-sintoma" className="px-6 sm:px-12 py-20 max-w-6xl mx-auto border-b border-zinc-800">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-block bg-[#EAB308] text-black font-industrial font-bold text-xs px-3 py-1 uppercase tracking-wider mb-3">
            SISTEMA EXPERTO DE TELEMETRÍA AUTOMOTRIZ
          </div>
          <h2 className="font-industrial text-4xl sm:text-5xl font-bold uppercase tracking-wide text-white">
            Diagnóstico Rápido por Síntoma.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            Selecciona la falla que presenta tu vehículo para calcular tiempo de permanencia en taller, componentes a revisar y presupuesto preliminar estimado.
          </p>
        </div>

        {/* The OBD2 Scanner Diagnostic Box */}
        <div className="bg-[#18191E] border-2 border-zinc-700 p-6 sm:p-10 shadow-2xl relative">
          
          {/* Yellow Caution Top Edge */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#EAB308]"></div>

          {/* Vehicle Input Fields Bar */}
          <div className="mb-8 pb-6 border-b border-zinc-800">
            <span className="text-xs font-bold text-[#EAB308] uppercase tracking-wider block mb-3">
              1. DATOS DE TU VEHÍCULO:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="text-[10px] text-zinc-500 uppercase block mb-1">Marca</label>
                <input
                  type="text"
                  value={carMake}
                  onChange={(e) => setCarMake(e.target.value)}
                  className="w-full bg-[#121316] border border-zinc-700 px-3 py-2 text-white font-bold focus:border-[#EAB308] focus:outline-none"
                  placeholder="VW / Mazda / Ford"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-500 uppercase block mb-1">Modelo</label>
                <input
                  type="text"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                  className="w-full bg-[#121316] border border-zinc-700 px-3 py-2 text-white font-bold focus:border-[#EAB308] focus:outline-none"
                  placeholder="Jetta / CX-5 / Versa"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-500 uppercase block mb-1">Año</label>
                <input
                  type="text"
                  value={carYear}
                  onChange={(e) => setCarYear(e.target.value)}
                  className="w-full bg-[#121316] border border-zinc-700 px-3 py-2 text-white font-bold focus:border-[#EAB308] focus:outline-none"
                  placeholder="2021"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-500 uppercase block mb-1">Kilometraje Actual</label>
                <input
                  type="text"
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                  className="w-full bg-[#121316] border border-zinc-700 px-3 py-2 text-white font-bold focus:border-[#EAB308] focus:outline-none"
                  placeholder="60,000 km"
                />
              </div>
            </div>
          </div>

          {/* 4 Symptoms Interactive Selector */}
          <div className="mb-10">
            <span className="text-xs font-bold text-[#EAB308] uppercase tracking-wider block mb-3">
              2. SELECCIONA EL SÍNTOMA O FALLA DETECTADA:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {Object.entries(symptomsData).map(([key, sym]) => (
                <button
                  key={key}
                  onClick={() => setSelectedSymptom(key)}
                  className={`p-4 text-left border-2 transition-all relative ${
                    selectedSymptom === key
                      ? 'border-[#EAB308] bg-[#22242B] shadow-[4px_4px_0px_#EAB308]'
                      : 'border-zinc-800 bg-[#141519] hover:border-zinc-600'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 uppercase bg-black text-zinc-300">
                      {sym.diagnosticCode}
                    </span>
                    {selectedSymptom === key && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#EAB308] animate-ping"></span>
                    )}
                  </div>
                  <div className="font-industrial text-base font-bold text-white uppercase leading-snug mb-2">
                    {sym.title.split('/')[0]}
                  </div>
                  <div className="text-[10px] text-zinc-400">
                    Est: {sym.timeEstimate.split('(')[0]}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* DYNAMIC TELEMETRY REPORT OUTPUT */}
          <div className="border-2 border-zinc-700 bg-[#121316] p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4 mb-6">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">
                  ANÁLISIS PREVIO DE FALLA
                </span>
                <span className="font-industrial text-xl sm:text-2xl font-bold uppercase text-white">
                  {currentSym.title}
                </span>
              </div>
              <span
                className="px-3 py-1 text-xs font-bold uppercase tracking-wider"
                style={{ backgroundColor: `${currentSym.severityColor}25`, color: currentSym.severityColor, border: `1px solid ${currentSym.severityColor}` }}
              >
                {currentSym.severity}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Components inspected */}
              <div className="lg:col-span-7 space-y-4">
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {currentSym.desc}
                </p>

                <div className="bg-[#18191E] p-4 border border-zinc-800">
                  <span className="text-[10px] font-bold text-[#EAB308] uppercase tracking-wider block mb-2">
                    PROTOCOLO DE INSPECCIÓN Y COMPONENTES REVISADOS:
                  </span>
                  <div className="space-y-1.5 text-xs text-zinc-300">
                    {currentSym.components.map((c, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-[11px] text-zinc-500 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#EAB308]" />
                  <span>Permanencia estimada en rampa: <strong>{currentSym.timeEstimate}</strong></span>
                </div>
              </div>

              {/* Estimate & Direct Booking */}
              <div className="lg:col-span-5 bg-[#18191E] border border-zinc-800 p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest block">
                    RANGO ESTIMADO DE REPARACIÓN:
                  </span>
                  <div className="font-industrial text-3xl sm:text-4xl font-bold text-[#EAB308] my-2">
                    {currentSym.priceRange}
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-tight mb-6">
                    Sujeto a verificación física en rampa. Si el presupuesto supera lo estimado, no se realiza ningún cobro y el auto se entrega intacto.
                  </p>
                </div>

                <button
                  onClick={() => handleBookService('regular')}
                  className="w-full bg-[#EAB308] hover:bg-[#FACC15] text-black py-4 px-6 font-industrial font-bold uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2 shadow-[3px_3px_0px_#000] cursor-pointer"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Agendar Revisión en {brandCity.split('·')[0]}</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* OBD2 EQUIPMENT & CERTIFICATIONS GRID */}
      <section className="px-6 sm:px-12 py-16 max-w-7xl mx-auto border-b border-zinc-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="border border-zinc-800 bg-[#18191E] p-6">
            <span className="text-[10px] text-[#EAB308] font-bold uppercase block mb-1">EQUIPAMIENTO</span>
            <h4 className="font-industrial text-xl font-bold text-white uppercase mb-2">Escáneres Nivel Agencia</h4>
            <p className="text-zinc-400 leading-relaxed">
              Equipos Bosch KTS y Snap-On Zeus capaces de reprogramar cuerpos de aceleración, calibrar ángulo de dirección y purgar bombas de ABS electrónicas.
            </p>
          </div>

          <div className="border border-zinc-800 bg-[#18191E] p-6">
            <span className="text-[10px] text-[#EAB308] font-bold uppercase block mb-1">TRANSPARENCIA TOTAL</span>
            <h4 className="font-industrial text-xl font-bold text-white uppercase mb-2">Evidencia Fotográfica</h4>
            <p className="text-zinc-400 leading-relaxed">
              Recibes fotos y videos de tus piezas dañadas antes de desmontar. Nada se sustituye sin tu confirmación expresa por mensaje de WhatsApp.
            </p>
          </div>

          <div className="border border-zinc-800 bg-[#18191E] p-6">
            <span className="text-[10px] text-[#EAB308] font-bold uppercase block mb-1">COMODIDAD</span>
            <h4 className="font-industrial text-xl font-bold text-white uppercase mb-2">Recepción & Entrega a Domicilio</h4>
            <p className="text-zinc-400 leading-relaxed">
              Si trabajas en Home Office o no puedes moverte, nuestro chofer asegurado recoge tu coche en tu oficina o casa en {brandCity}.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 sm:px-12 bg-black text-xs text-zinc-500 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <div className="font-industrial text-2xl text-white font-bold tracking-wider">{brandName}</div>
            <p className="text-[11px] mt-1 text-zinc-400">{brandCity} · Taller Mecánico de Precisión</p>
          </div>
          <div className="text-[10px] text-right space-y-1">
            <p className="text-white font-bold">FACTURACIÓN SAT INMEDIATA · PAGOS CON TARJETA A 3 Y 6 MSI</p>
            <p>© 2026 INGENIERÍA AUTOMOTRIZ DE PRECISIÓN</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
