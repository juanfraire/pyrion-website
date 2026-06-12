/* ============================================================
   PYRION — i18n (es default, en toggle)
   data-i18n      → textContent
   data-i18n-html → innerHTML (trusted, static strings only)
   ============================================================ */
(() => {
  'use strict';

  const STRINGS = {
    es: {
      'nav.solution': 'Solución',
      'nav.platform': 'Plataforma',
      'nav.engine': 'Motor STORM',
      'nav.team': 'Equipo',
      'nav.cta': 'Hablemos',

      'hero.eyebrow': 'Grandes Usuarios · MEM · Res. SE 400/2025',
      'hero.h1': 'La energía de su empresa,<br /><span class="gradient">optimizada</span> como un portafolio.',
      'hero.lede': 'Pyrion diseña la estrategia de compra de energía y potencia de Grandes Usuarios del Mercado Eléctrico Mayorista argentino: contratos MATER, MATE y MATP, mercado spot, autogeneración solar y almacenamiento — co-optimizados bajo incertidumbre, con riesgo medido y acotado.',
      'hero.cta1': 'Calificar mi demanda',
      'hero.cta2': 'Conocer la solución',
      'hero.chip1': 'costo vs tarifa GUDI',
      'hero.chip2': 'intervalos de 15 min / año',
      'hero.chip3': 'riesgo de cola acotado',

      'sol.kicker': 'Solución',
      'sol.title': 'Tres capas, una decisión óptima.',
      'sol.lede': 'El costo eléctrico de un Gran Usuario no se decide en una factura: se decide en la estructura de contratos, en el dimensionamiento de activos y en cómo se mide el riesgo. Pyrion integra las tres capas en un único modelo de decisión.',
      'sol.c1.title': 'Contratos & mercado',
      'sol.c1.body': 'Estructuración y simulación de portafolios MATER, MATE y MATP frente al spot, bajo el marco de la Res. SE 400/2025: volúmenes mensuales, cobertura de potencia (PPAD), penalidades take-or-pay y sustitución entre instrumentos.',
      'sol.c2.title': 'Activos detrás del medidor',
      'sol.c2.body': 'Dimensionamiento conjunto de generación solar fotovoltaica y almacenamiento en baterías como cobertura física: CAPEX anualizado, degradación, autoconsumo y arbitraje horario, evaluados contra cada escenario de precios y demanda.',
      'sol.c3.title': 'Inteligencia analítica',
      'sol.c3.body': 'Seguimiento de facturación CAMMESA, proyecciones de precios estacionales, análisis de curvas de carga de 15 minutos y métricas de riesgo: el valor esperado importa, pero la cola de la distribución también.',

      'dash.kicker': 'Plataforma',
      'dash.title': 'Del perfil de carga a la decisión.',
      'dash.lede': 'Cargamos su demanda real — cada 15 minutos, un año completo — y devolvemos una estrategia: cuánto contratar, cuánto generar, cuánto almacenar y cuánta exposición al spot tolerar.',
      'dash.win': 'pyrion · análisis de demanda',
      'dash.leg1': 'Demanda',
      'dash.leg2': 'Solar PV',
      'dash.leg3': 'BESS',
      'dash.leg4': 'Pico PPAD 18–23 h',
      'dash.k1': 'ahorro vs tarifa GUDI',
      'dash.k2': 'costo anual co-optimizado',
      'dash.k3': 'ahorro anual vs solo-contratos',
      'dash.k4': 'decisiones auditables, sin caja negra',
      'dash.s1.t': 'Datos',
      'dash.s1.b': 'Curva de carga de 15 minutos (EPEC/CAMMESA), facturación histórica y tarifas vigentes.',
      'dash.s2.t': 'Escenarios',
      'dash.s2.b': 'Generación estocástica de precios spot, demanda y recurso solar: cientos de futuros posibles.',
      'dash.s3.t': 'Optimización',
      'dash.s3.b': 'Un único modelo matemático decide contratos y activos contra todos los escenarios a la vez.',
      'dash.s4.t': 'Estrategia',
      'dash.s4.b': 'Informe ejecutivo: portafolio recomendado, ahorro esperado, exposición al riesgo y plan de implementación.',

      'storm.kicker': 'El motor',
      'storm.title': 'Ciencia publicada, no una planilla.',
      'storm.lede': 'Detrás de Pyrion está STORM: un modelo de optimización estocástica de dos etapas desarrollado por nuestro equipo y documentado en una publicación científica. Cada recomendación es reproducible, auditable y defendible frente a un directorio.',
      'storm.f1': 'Co-optimiza contratos, PV, BESS y respuesta de demanda en un solo problema.',
      'storm.f2': 'Riesgo de cola explícito vía CVaR: usted elige cuánta aversión al riesgo.',
      'storm.f3': 'Resolución de 15 minutos sobre un año completo de operación.',
      'storm.f4': 'Validado contra estrategias de referencia: tarifa GUDI, solo-contratos, solo-activos.',
      'storm.cta1': 'Sitio técnico de STORM',
      'storm.cta2': 'Código abierto',

      'team.kicker': 'Quiénes somos',
      'team.title': 'Perfil científico, foco de negocio.',
      'team.lede': 'Un equipo con trayectoria en investigación computacional e ingeniería, aplicada a un problema concreto: el costo eléctrico de la industria argentina.',
      'team.p1.role': 'Estrategia energética y regulación del MEM',
      'team.p1.bio': 'Especialista en contratación de energía para Grandes Usuarios, mercado a término y normativa de la Secretaría de Energía.',
      'team.p2.role': 'Modelado computacional y optimización',
      'team.p2.bio': 'Investigador en Inria (Francia) y CONICET–UNC. Autor principal del modelo STORM y de más de un centenar de publicaciones científicas.',
      'team.p3.role': 'Simulación, energía y ciencia de datos',
      'team.p3.bio': 'Investigador de CONICET–UNC con trayectoria en simulación de sistemas energéticos, almacenamiento electroquímico y bioenergía.',

      'contact.kicker': 'Contacto',
      'contact.title': '¿Cuánto está dejando sobre la mesa?',
      'contact.lede': 'Cuéntenos sobre su demanda y le devolvemos un diagnóstico preliminar sin costo: categoría MEM, instrumentos disponibles y potencial de ahorro estimado.',
      'contact.f1': 'Empresa',
      'contact.f2': 'Nombre y cargo',
      'contact.f3': 'Email',
      'contact.f4': 'Demanda anual estimada (MWh)',
      'contact.f5': 'Situación actual (distribuidora, contratos vigentes, autogeneración…)',
      'contact.send': 'Solicitar diagnóstico',
      'contact.note': 'Se abrirá su cliente de correo con el mensaje listo para enviar.',

      'footer.line': 'Inteligencia energética para Grandes Usuarios del MEM · Córdoba, Argentina',
    },

    en: {
      'nav.solution': 'Solution',
      'nav.platform': 'Platform',
      'nav.engine': 'STORM Engine',
      'nav.team': 'Team',
      'nav.cta': "Let's talk",

      'hero.eyebrow': 'Large Users · MEM · Res. SE 400/2025',
      'hero.h1': 'Your company’s energy,<br /><span class="gradient">optimized</span> like a portfolio.',
      'hero.lede': 'Pyrion designs the energy and power procurement strategy of Large Users in the Argentine Wholesale Electricity Market: MATER, MATE and MATP contracts, the spot market, on-site solar and storage — co-optimized under uncertainty, with risk measured and bounded.',
      'hero.cta1': 'Qualify my demand',
      'hero.cta2': 'Explore the solution',
      'hero.chip1': 'cost vs GUDI tariff',
      'hero.chip2': '15-min intervals / year',
      'hero.chip3': 'bounded tail risk',

      'sol.kicker': 'Solution',
      'sol.title': 'Three layers, one optimal decision.',
      'sol.lede': 'A Large User’s electricity cost is not decided on an invoice: it is decided in the contract structure, in asset sizing, and in how risk is measured. Pyrion integrates the three layers into a single decision model.',
      'sol.c1.title': 'Contracts & market',
      'sol.c1.body': 'Structuring and simulation of MATER, MATE and MATP portfolios against the spot market, under the Res. SE 400/2025 framework: monthly volumes, power-adequacy coverage (PPAD), take-or-pay penalties, and substitution between instruments.',
      'sol.c2.title': 'Behind-the-meter assets',
      'sol.c2.body': 'Joint sizing of solar PV generation and battery storage as a physical hedge: annualized CAPEX, degradation, self-consumption and hourly arbitrage, evaluated against every price and demand scenario.',
      'sol.c3.title': 'Analytics intelligence',
      'sol.c3.body': 'CAMMESA billing tracking, seasonal price projections, 15-minute load-curve analysis and risk metrics: the expected value matters, but so does the tail of the distribution.',

      'dash.kicker': 'Platform',
      'dash.title': 'From load profile to decision.',
      'dash.lede': 'We ingest your real demand — every 15 minutes, a full year — and return a strategy: how much to contract, how much to generate, how much to store, and how much spot exposure to tolerate.',
      'dash.win': 'pyrion · demand analysis',
      'dash.leg1': 'Demand',
      'dash.leg2': 'Solar PV',
      'dash.leg3': 'BESS',
      'dash.leg4': 'PPAD peak 18–23 h',
      'dash.k1': 'savings vs GUDI tariff',
      'dash.k2': 'co-optimized annual cost',
      'dash.k3': 'annual savings vs contracts-only',
      'dash.k4': 'auditable decisions, no black box',
      'dash.s1.t': 'Data',
      'dash.s1.b': '15-minute load curve (EPEC/CAMMESA), historical billing and current tariffs.',
      'dash.s2.t': 'Scenarios',
      'dash.s2.b': 'Stochastic generation of spot prices, demand and solar resource: hundreds of possible futures.',
      'dash.s3.t': 'Optimization',
      'dash.s3.b': 'A single mathematical model decides contracts and assets against all scenarios at once.',
      'dash.s4.t': 'Strategy',
      'dash.s4.b': 'Executive report: recommended portfolio, expected savings, risk exposure and implementation plan.',

      'storm.kicker': 'The engine',
      'storm.title': 'Published science, not a spreadsheet.',
      'storm.lede': 'Behind Pyrion is STORM: a two-stage stochastic optimization model developed by our team and documented in a scientific publication. Every recommendation is reproducible, auditable and defensible in front of a board.',
      'storm.f1': 'Co-optimizes contracts, PV, BESS and demand response in a single problem.',
      'storm.f2': 'Explicit tail risk via CVaR: you choose how much risk aversion.',
      'storm.f3': '15-minute resolution over a full year of operation.',
      'storm.f4': 'Validated against reference strategies: GUDI tariff, contracts-only, assets-only.',
      'storm.cta1': 'STORM technical site',
      'storm.cta2': 'Open source',

      'team.kicker': 'Who we are',
      'team.title': 'Scientific profile, business focus.',
      'team.lede': 'A team with a track record in computational research and engineering, applied to a concrete problem: the electricity cost of Argentine industry.',
      'team.p1.role': 'Energy strategy and MEM regulation',
      'team.p1.bio': 'Specialist in energy contracting for Large Users, the term market, and Secretariat of Energy regulation.',
      'team.p2.role': 'Computational modeling and optimization',
      'team.p2.bio': 'Researcher at Inria (France) and CONICET–UNC. Lead author of the STORM model and of over a hundred scientific publications.',
      'team.p3.role': 'Simulation, energy and data science',
      'team.p3.bio': 'CONICET–UNC researcher with a track record in energy-system simulation, electrochemical storage and bioenergy.',

      'contact.kicker': 'Contact',
      'contact.title': 'How much are you leaving on the table?',
      'contact.lede': 'Tell us about your demand and we will return a free preliminary diagnosis: MEM category, available instruments and estimated savings potential.',
      'contact.f1': 'Company',
      'contact.f2': 'Name and role',
      'contact.f3': 'Email',
      'contact.f4': 'Estimated annual demand (MWh)',
      'contact.f5': 'Current situation (utility, active contracts, self-generation…)',
      'contact.send': 'Request diagnosis',
      'contact.note': 'Your email client will open with the message ready to send.',

      'footer.line': 'Energy intelligence for Large Users of the MEM · Córdoba, Argentina',
    },
  };

  let lang = localStorage.getItem('pyrion-lang') || 'es';
  if (!STRINGS[lang]) lang = 'es';

  window.t = (key) => (STRINGS[lang] && STRINGS[lang][key]) || key;

  function apply() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const s = STRINGS[lang][el.dataset.i18n];
      if (s !== undefined) el.textContent = s;
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const s = STRINGS[lang][el.dataset.i18nHtml];
      if (s !== undefined) el.innerHTML = s;
    });
    document.querySelectorAll('[data-lang-btn]').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.langBtn === lang));
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-lang-btn]').forEach((b) => {
      b.addEventListener('click', () => {
        lang = b.dataset.langBtn;
        localStorage.setItem('pyrion-lang', lang);
        apply();
      });
    });
    apply();
  });
})();
