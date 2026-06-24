---
title: Agentes de IA
metaTitle: Agentes de IA | Agentes de IA en Ethereum
description: "Una descripción general de los agentes de IA en Ethereum"
lang: es
template: use-cases
sidebarDepth: 2
image: /images/ai-agents/hero-image.png
alt: Personas reunidas en una mesa con terminales
summaryPoints:
  - "IA que interactúa con la cadena de bloques y opera de forma independiente"
  - "Controla billeteras y fondos en cadena"
  - "Contrata a humanos u otros agentes para trabajar"
buttons:
  - content: ¿Qué son los agentes de IA?
    toId: what-are-ai-agents
  - content: Explorar agentes
    toId: ai-agents-on-ethereum
    isSecondary: false
---

Imagina navegar por Ethereum con un asistente de IA que estudia las tendencias del mercado en cadena las 24 horas del día, los 7 días de la semana, responde preguntas e incluso ejecuta transacciones en tu nombre. Te damos la bienvenida al mundo de los agentes de IA: sistemas inteligentes diseñados para simplificar tu vida digital.

En Ethereum, estamos viendo innovaciones de agentes de IA que van desde *influencers* virtuales y creadores de contenido autónomos hasta plataformas de análisis de mercado en tiempo real, empoderando a los usuarios al brindarles información, entretenimiento y eficiencia operativa.

## ¿Qué son los agentes de IA? {#what-are-ai-agents}

Los agentes de IA son programas de software que utilizan inteligencia artificial para realizar tareas o tomar sus propias decisiones. Aprenden de los datos, se adaptan a los cambios y manejan tareas complejas. Operan sin parar y pueden detectar oportunidades al instante.

### Cómo funcionan los agentes de IA con las cadenas de bloques {#how-ai-agents-work-with-blockchains}

En las finanzas tradicionales, los agentes de IA a menudo operan en entornos centralizados con entradas de datos limitadas. Esto dificulta su capacidad para aprender o gestionar activos de forma autónoma.

Por el contrario, el ecosistema descentralizado de Ethereum ofrece varias ventajas clave:

- <strong>Datos transparentes:</strong> Acceso a información de la cadena de bloques en tiempo real.
- <strong>Verdadera propiedad de los activos:</strong> Los activos digitales son propiedad exclusiva de los agentes de IA.
- <strong>Sólida funcionalidad en cadena:</strong> Permite a los agentes de IA ejecutar transacciones, interactuar con contratos inteligentes, proporcionar liquidez y colaborar a través de protocolos.

Estos factores transforman a los agentes de IA de simples bots a sistemas dinámicos que se mejoran a sí mismos y ofrecen un valor significativo en múltiples sectores:

<Grid>
  <Card title="DeFi automatizadas" emoji=":money_with_wings:" description="Los agentes de IA vigilan de cerca las tendencias del mercado, ejecutan operaciones y gestionan carteras, haciendo que el complejo mundo de las DeFi sea mucho más accesible."/>
  <Card title="Nueva economía de agentes de IA" emoji="🌎" description="Los agentes de IA pueden contratar a otros agentes (o humanos) con diferentes habilidades para que realicen tareas especializadas por ellos." />
  <Card title="Gestión de riesgos" emoji="🛠️" description="Al monitorear las actividades transaccionales, los agentes de IA pueden ayudar a detectar estafas y proteger tus activos digitales mejor y más rápido." />
</Grid>

## IA verificable {#verifiable-ai}

Los agentes de IA que se ejecutan fuera de la cadena a menudo se comportan como "cajas negras": su razonamiento, entradas y salidas no se pueden verificar de forma independiente. Ethereum cambia eso. Al anclar el comportamiento del agente en cadena, los desarrolladores pueden crear agentes que no requieran confianza (_trustless_), sean _transparentes_ y _económicamente autónomos_. Las acciones de dichos agentes pueden ser auditadas, restringidas y probadas.

### Inferencia verificable {#verifiable-inference}

La inferencia de IA tradicionalmente ocurre fuera de la cadena, donde la ejecución es barata pero la ejecución del modelo es opaca. En Ethereum, los desarrolladores pueden emparejar agentes con computación verificable utilizando varias técnicas:

- [**zkML (aprendizaje automático de conocimiento cero)**](https://opengradient.medium.com/a-gentle-introduction-to-zkml-8049a0e10a04) permite a los agentes probar que un modelo se ejecutó correctamente sin revelar el modelo ni las entradas.
- [**Las certificaciones TEE (entorno de ejecución confiable)**](https://en.wikipedia.org/wiki/Trusted_execution_environment) permiten pruebas respaldadas por hardware de que un agente ejecutó un modelo o una ruta de código específicos.
- **La inmutabilidad en cadena** garantiza que cualquier contrato o agente pueda hacer referencia a estas pruebas y certificaciones, reproducirlas y confiar en ellas.

## Pagos y comercio con x402 {#x402}

El [protocolo x402](https://www.x402.org/), con un despliegue en Ethereum y las L2, brinda a los agentes una forma nativa de pagar por los recursos e interactuar económicamente sin intervención humana. Los agentes pueden:

- Pagar por computación, datos y llamadas a la API utilizando monedas estables.
- Solicitar o verificar certificaciones de otros agentes o servicios.
- Participar en el comercio entre agentes, comprando y vendiendo computación, datos o resultados de modelos.

x402 convierte a Ethereum en una capa económica programable para agentes autónomos, lo que permite interacciones de pago por uso en lugar de cuentas, suscripciones o facturación centralizada.

### Seguridad de las finanzas de agentes {#agentic-finance-security}

Los agentes autónomos necesitan barreras de seguridad. Ethereum las proporciona a nivel de billetera y contrato:

- [Las cuentas inteligentes (EIP-4337)](https://eips.ethereum.org/EIPS/eip-4337) permiten a los desarrolladores imponer límites de gasto, listas blancas, claves de sesión y permisos granulares.
- Las restricciones programadas en los contratos inteligentes pueden limitar lo que un agente tiene permitido hacer.
- Los límites basados en inferencia (por ejemplo, requerir una prueba zkML antes de ejecutar una acción de alto riesgo) agregan otra capa de seguridad.

Estos controles permiten el despliegue de agentes autónomos que no son ilimitados.

### Registros en cadena: ERC-8004 {#erc-8004}

[ERC-8004](https://eips.ethereum.org/EIPS/eip-8004) define registros en cadena para la identidad, reputación y validación de agentes. Coescrito por colaboradores de MetaMask, la Fundación Ethereum, Google y Coinbase, tiene un despliegue en 16 redes, incluyendo la red principal de Ethereum, Base, Polygon, Arbitrum y otras.

Proporciona:

- Un **registro de identidad** para identificadores de agentes portátiles y resistentes a la censura.
- Un **registro de reputación** para señales de retroalimentación estandarizadas en todas las aplicaciones.
- Un **registro de validación** para solicitar verificación independiente (zkML, TEE, reejecución con participación).

ERC-8004 facilita que los agentes se descubran, verifiquen y realicen transacciones entre sí en un entorno totalmente descentralizado.

## Agentes de IA en Ethereum {#ai-agents-on-ethereum}

Estamos comenzando a explorar todo el potencial de los agentes de IA, y los proyectos ya están aprovechando la sinergia entre la IA y la cadena de bloques, particularmente en transparencia y monetización.

<AiAgentProductLists list="ai-agents" />

<strong>La primera aparición de Luna como invitada en un podcast</strong>

<VideoWatch slug="ai-agents-interview-luna" />

## Billeteras controladas por agentes {#agent-controlled-wallets}

Agentes como Luna o AIXBT controlan su propia billetera en cadena ([billetera de AIXBT](https://clusters.xyz/aixbt), [billetera de Luna](https://zapper.xyz/account/0x0d177181e3763b20d47dc3a72dd584368bd8bf43)), lo que les permite dar propinas a los fans y participar en actividades económicas.

Durante la campaña social en X de Luna, #LunaMuralChallenge, Luna seleccionó y recompensó a los ganadores a través de su billetera en Base, marcando <strong>el primer caso de una IA contratando humanos a cambio de una recompensa en cripto</strong>.

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<p className="mt-0"><strong>Es bueno saberlo</strong></p>
<p className="mt-2">Los agentes de IA y las herramientas relacionadas aún se encuentran en las primeras etapas de desarrollo y son muy experimentales; úsalos con precaución.</p>
</AlertContent>
</Alert>

## Controla tu billetera usando comandos de chat {#control-your-wallet-using-chat-commands}

Puedes omitir las complicadas interfaces de las finanzas descentralizadas (DeFi) y administrar tus cripto con simples comandos de chat.

Este enfoque intuitivo hace que las transacciones sean más rápidas, fáciles y menos propensas a errores, como enviar fondos a la dirección equivocada o pagar tarifas en exceso.

<AiAgentProductLists list="chat" />

## Agentes de IA frente a bots de IA {#ai-agents-vs-ai-bots}

La distinción entre los agentes de IA y los bots de IA a veces puede resultar confusa, ya que ambos realizan acciones automatizadas en función de las entradas.

- Los bots de IA son como asistentes automatizados: siguen instrucciones específicas y preprogramadas para realizar tareas rutinarias.
- Los agentes de IA son más como compañeros inteligentes: aprenden de la experiencia, se adaptan a nueva información y toman decisiones por su cuenta.

|                     | Agentes de IA                                                              | Bots de IA                                     |
| ------------------- | ---------------------------------------------------------------------- | ------------------------------------------- |
| **Interacciones**    | Complejas, adaptables, autónomas                                         | Simples, alcance predefinido, codificadas de forma rígida        |
| **Aprendizaje**        | Aprende continuamente, puede experimentar y adaptarse a nuevos datos en tiempo real | Opera con datos preentrenados o reglas fijas |
| **Finalización de tareas** | Su objetivo es lograr objetivos más amplios                                     | Se centra únicamente en tareas específicas              |

## Profundiza más {#dive-deeper}

<AiAgentProductLists list="dive-deeper" />

## Puedes crear tu propio agente de IA {#you-can-build-your-own-ai-agent}

<BuildYourOwnAIAgent />