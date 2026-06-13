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
      'nav.cycle': 'Círculo virtuoso',
      'nav.platform': 'Plataforma',
      'nav.engine': 'Motor STORM',
      'nav.team': 'Equipo',
      'nav.cta': 'Hablemos',

      'hero.eyebrow': 'Grandes Usuarios · MEM · Res. SE 400/2025',
      'hero.h1': 'La energía de su empresa,<br /><span class="gradient">optimizada</span> con lógica de portfolio.',
      'hero.lede': 'Pyrion diseña la estrategia de compra de energía y potencia de Grandes Usuarios del Mercado Eléctrico Mayorista argentino: contratos MATER, MATE y MATP, mercado spot, autogeneración solar y almacenamiento — evaluados bajo múltiples escenarios de precios y demanda, con exposición al riesgo explícita y medible.',
      'hero.cta1': 'Calificar mi demanda',
      'hero.cta2': 'Conocer la solución',
      'hero.trust': 'Investigadores del CONICET · Universidad Nacional de Córdoba',
      'hero.chip1': 'costo vs tarifa GUDI',
      'hero.chip2': 'intervalos de 15 min / año',
      'hero.chip3': 'riesgo extremo controlado',

      'sol.kicker': 'Solución',
      'sol.title': 'Tres capas. Una estrategia integrada.',
      'sol.lede': 'El costo eléctrico de un Gran Usuario no se decide en una factura: se decide en la estructura de contratos, en el dimensionamiento de activos y en cómo se mide el riesgo. Pyrion integra las tres capas en un único modelo de decisión.',
      'sol.c1.title': 'Contratos & mercado',
      'sol.c1.body': 'Estructuración y simulación de carteras MATER, MATE y MATP frente al spot, bajo el marco de la Res. SE 400/2025: volúmenes mensuales, cobertura de potencia (PPAD), penalidades take-or-pay y sustitución entre instrumentos.',
      'sol.c2.title': 'Generación y almacenamiento in-situ',
      'sol.c2.body': 'Dimensionamiento conjunto de generación solar fotovoltaica y almacenamiento en baterías como cobertura física: CAPEX anualizado, degradación, autoconsumo y arbitraje horario, evaluados contra cada escenario de precios y demanda.',
      'sol.c3.title': 'Analítica energética',
      'sol.c3.body': 'Seguimiento de facturación CAMMESA, proyecciones de precios estacionales, análisis de curvas de carga de 15 minutos y métricas de riesgo: el valor esperado importa, pero la cola de la distribución también.',

      'cycle.kicker': 'Modelo de valor',
      'cycle.title': 'El ahorro de hoy financia la planta de mañana.',
      'cycle.lede': 'Diseñamos estrategias personalizadas para bajar el costo de su tarifa eléctrica contractual y reinvertimos ese beneficio en soluciones continuas de eficiencia energética y energía solar para su planta. No es un proyecto puntual: es un círculo que se autofinancia.',
      'cycle.p1.tag': 'Fase 1 · Impacto inmediato',
      'cycle.p1.title': 'Contratos & mercado',
      'cycle.p1.body': 'Reestructuramos su abastecimiento (MATER, MATE, MATP y spot) para un ahorro inmediato y verificable sobre la factura actual.',
      'cycle.p2.tag': 'Fase 2 · Reinversión',
      'cycle.p2.title': 'Eficiencia energética',
      'cycle.p2.body': 'Diagnóstico, auditoría y sistema de gestión bajo ISO 50001: parte del ahorro financia mejoras que bajan el consumo de base.',
      'cycle.p3.tag': 'Fase 3 · Datos en planta',
      'cycle.p3.title': 'Monitoreo & analítica',
      'cycle.p3.body': 'Instrumentamos la planta —demanda, temperatura, procesos— y alimentamos modelos que afinan cada decisión energética.',
      'cycle.p4.tag': 'Fase 4 · Largo plazo',
      'cycle.p4.title': 'Generación renovable',
      'cycle.p4.body': 'Con la base ya optimizada, dimensionamos solar, almacenamiento y generación distribuida con sentido económico, no por moda.',
      'cycle.loop': 'Cada fase se autofinancia con el ahorro de la anterior.',

      'impact.title': 'El impacto financiero de Pyrion en su empresa',
      'impact.today.label': 'Hoy',
      'impact.today.body': 'Paga el 100% de su demanda a tarifa plena. Hoy mismo está pagando de más por la misma energía.',
      'impact.pyrion.label': 'Con Pyrion',
      'impact.pyrion.body': 'Frenamos ese sobrecosto de inmediato. Una parte de ese dinero vuelve a su caja; la otra financia mejoras continuas de eficiencia y autogeneración.',
      'impact.fee': 'Nuestros honorarios van en función del ahorro generado, por lo que el impacto económico inicial para usted es nulo:',
      'impact.fee.strong': 'si usted no ahorra, no paga.',

      'dash.kicker': 'Plataforma',
      'dash.title': 'De la demanda real a la decisión.',
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
      'dash.s4.b': 'Informe ejecutivo: portfolio recomendado, ahorro esperado, exposición al riesgo y plan de implementación.',

      'storm.kicker': 'El motor',
      'storm.title': 'Ciencia publicada.',
      'storm.lede': 'Detrás de Pyrion está STORM: un modelo de optimización estocástica de dos etapas desarrollado por nuestro equipo y documentado en una publicación científica. Cada recomendación es reproducible, auditable y respaldada con criterios técnicos y económicos.',
      'storm.f1': 'Co-optimiza contratos, PV, BESS y respuesta de demanda en un solo problema.',
      'storm.f2': 'Riesgo explícito vía CVaR: usted define el nivel de exposición al riesgo.',
      'storm.f3': 'Resolución de 15 minutos sobre un año completo de operación.',
      'storm.f4': 'Validado contra estrategias de referencia: tarifa GUDI, solo-contratos, solo-activos.',
      'storm.cta1': 'Sitio técnico de STORM',
      'storm.cta2': 'Código abierto',

      'team.kicker': 'Quiénes somos',
      'team.title': 'Perfil científico, foco de negocio.',
      'team.lede': 'Pyrion está integrado por investigadores del CONICET y profesionales de la Universidad Nacional de Córdoba, con experiencia en mercados eléctricos, optimización computacional y eficiencia energética.',
      'team.p1.name': 'Mtr. Gonzalo Martínez Carreras',
      'team.p1.role': 'Crecimiento & Expansión Comercial',
      'team.p1.bio': 'Especializado en la viabilidad comercial y la estructuración legal y corporativa de proyectos energéticos. Es el nexo clave para transformar las oportunidades del mercado en contratos viables, seguros y eficientes para las empresas.',
      'team.p2.name': 'Dr. Juan A. Fraire',
      'team.p2.role': 'Inteligencia Artificial & Modelado de Algoritmos',
      'team.p2.bio': 'CONICET-UNC / INRIA (Francia). Autor principal de STORM, la plataforma de software que simula miles de escenarios de precios, desvíos y demanda del Mercado Eléctrico Mayorista y fundamenta nuestras decisiones estratégicas.',
      'team.p3.name': 'Dr. Oscar A. Oviedo',
      'team.p3.role': 'Estrategia Energética & Planificación de Infraestructura',
      'team.p3.bio': 'CONICET-UNC. Líder de equipos de eficiencia energética para la implementación de proyectos industriales y auditoría bajo la norma ISO 50001. Diseña la integración de autogeneración y almacenamiento en planta.',

      'contact.kicker': 'Contacto',
      'contact.title': '¿Cuánto está dejando sobre la mesa?',
      'contact.lede': 'Cuéntenos sobre su demanda y le devolvemos un evaluación preliminar sin costo: categoría MEM, instrumentos disponibles y potencial de ahorro estimado.',
      'contact.f1': 'Empresa',
      'contact.f2': 'Nombre y cargo',
      'contact.f3': 'Email',
      'contact.f4': 'Demanda anual estimada (MWh)',
      'contact.f5': 'Situación actual (distribuidora, contratos vigentes, autogeneración…)',
      'contact.send': 'Solicitar diagnóstico',
      'contact.note': 'Le preparamos el mensaje para enviarlo directamente por email.',

      'footer.line': 'Inteligencia energética para Grandes Usuarios del MEM · Córdoba, Argentina',
    },

    en: {
      'nav.solution': 'Solution',
      'nav.cycle': 'Virtuous cycle',
      'nav.platform': 'Platform',
      'nav.engine': 'STORM Engine',
      'nav.team': 'Team',
      'nav.cta': "Let's talk",

      'hero.eyebrow': 'Large Users · MEM · Res. SE 400/2025',
      'hero.h1': 'Your company’s energy,<br /><span class="gradient">optimized</span> like a portfolio.',
      'hero.lede': 'Pyrion designs the energy and power procurement strategy of Large Users in the Argentine Wholesale Electricity Market: MATER, MATE and MATP contracts, the spot market, on-site solar and storage — co-optimized under uncertainty, with risk measured and bounded.',
      'hero.cta1': 'Qualify my demand',
      'hero.cta2': 'Explore the solution',
      'hero.trust': 'CONICET researchers · National University of Córdoba',
      'hero.chip1': 'cost vs GUDI tariff',
      'hero.chip2': '15-min intervals / year',
      'hero.chip3': 'bounded tail risk',

      'sol.kicker': 'Solution',
      'sol.title': 'Three layers, one integrated strategy.',
      'sol.lede': 'A Large User’s electricity cost is not decided on an invoice: it is decided in the contract structure, in asset sizing, and in how risk is measured. Pyrion integrates the three layers into a single decision model.',
      'sol.c1.title': 'Contracts & market',
      'sol.c1.body': 'Structuring and simulation of MATER, MATE and MATP portfolios against the spot market, under the Res. SE 400/2025 framework: monthly volumes, power-adequacy coverage (PPAD), take-or-pay penalties, and substitution between instruments.',
      'sol.c2.title': 'Behind-the-meter assets',
      'sol.c2.body': 'Joint sizing of solar PV generation and battery storage as a physical hedge: annualized CAPEX, degradation, self-consumption and hourly arbitrage, evaluated against every price and demand scenario.',
      'sol.c3.title': 'Analytics intelligence',
      'sol.c3.body': 'CAMMESA billing tracking, seasonal price projections, 15-minute load-curve analysis and risk metrics: the expected value matters, but so does the tail of the distribution.',

      'cycle.kicker': 'Value model',
      'cycle.title': "Today's savings fund tomorrow's plant.",
      'cycle.lede': 'We design tailored strategies to cut the cost of your contractual electricity tariff and reinvest that benefit into continuous energy-efficiency and solar solutions for your plant. Not a one-off project: a self-funding cycle.',
      'cycle.p1.tag': 'Phase 1 · Immediate impact',
      'cycle.p1.title': 'Contracts & market',
      'cycle.p1.body': 'We restructure your supply (MATER, MATE, MATP and spot) for immediate, verifiable savings against your current bill.',
      'cycle.p2.tag': 'Phase 2 · Reinvestment',
      'cycle.p2.title': 'Energy efficiency',
      'cycle.p2.body': 'Diagnosis, audit and an ISO 50001 management system: part of the savings funds improvements that lower baseline consumption.',
      'cycle.p3.tag': 'Phase 3 · On-site data',
      'cycle.p3.title': 'Monitoring & analytics',
      'cycle.p3.body': 'We instrument the plant —demand, temperature, processes— and feed models that sharpen every energy decision.',
      'cycle.p4.tag': 'Phase 4 · Long term',
      'cycle.p4.title': 'Renewable generation',
      'cycle.p4.body': 'With the base already optimized, we size solar, storage and distributed generation on economic merit, not as a trend.',
      'cycle.loop': 'Each phase is self-funded by the savings of the previous one.',

      'impact.title': "Pyrion's financial impact on your company",
      'impact.today.label': 'Today',
      'impact.today.body': 'You pay 100% of your demand at full tariff. Right now you are overpaying for the same energy.',
      'impact.pyrion.label': 'With Pyrion',
      'impact.pyrion.body': 'We stop that overcost immediately. Part of that money returns to your cash; the rest funds continuous efficiency and self-generation improvements.',
      'impact.fee': 'Our fee is a function of the savings generated, so the upfront economic impact for you is zero:',
      'impact.fee.strong': "if you don't save, you don't pay.",

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
      'team.lede': 'Pyrion brings together CONICET researchers and professionals from the National University of Córdoba, with experience in electricity markets, computational optimization and energy efficiency.',
      'team.p1.name': 'Gonzalo Martínez Carreras, MSc',
      'team.p1.role': 'Growth & Commercial Expansion',
      'team.p1.bio': 'Specialized in the commercial viability and the legal and corporate structuring of energy projects. The key link to turn market opportunities into viable, secure and efficient contracts for companies.',
      'team.p2.name': 'Juan A. Fraire, PhD',
      'team.p2.role': 'Artificial Intelligence & Algorithm Modeling',
      'team.p2.bio': 'CONICET-UNC / INRIA (France). Lead author of STORM, the software platform that simulates thousands of price, deviation and demand scenarios of the Wholesale Electricity Market and underpins our strategic decisions.',
      'team.p3.name': 'Oscar A. Oviedo, PhD',
      'team.p3.role': 'Energy Strategy & Infrastructure Planning',
      'team.p3.bio': 'CONICET-UNC. Leads energy-efficiency teams for the implementation of industrial projects and ISO 50001 audits. Designs the integration of self-generation and storage on site.',

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
