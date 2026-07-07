---
title: "Construir en Ethereum en 2026: qué ha cambiado"
description: "Tres actualizaciones del protocolo desde 2023 cambiaron dos cosas que importan a los constructores: cuánto cuesta usar la l1 y qué pueden hacer las billeteras normales. Una guía práctica para construir en Ethereum en 2026."
author: "Philip Krause"
team: "EF Builder Growth"
tags:
  - "tarifas de gas"
  - "abstracción de cuentas"
  - "actualizaciones del protocolo"
published: 2026-05-07
image: /images/developers/blog/latest-post-header-3.png
breadcrumb: Construir en Ethereum en 2026
lang: es
---

Si tu modelo mental de Ethereum se formó entre 2021 y 2023, está desactualizado. Tres actualizaciones del protocolo desde entonces, [Dencun](/roadmap/dencun/) en marzo de 2024, [Pectra](/roadmap/pectra/) en mayo de 2025 y [Fusaka](/roadmap/fusaka/) en diciembre de 2025, cambiaron dos cosas que importan a los constructores: cuánto cuesta usar la capa 1 (l1) y qué pueden hacer las billeteras normales.

## La Red principal vuelve a ser barata {#mainnet-is-cheap-again}

El régimen de tarifas de 2021 a 2023 ya no es una suposición predeterminada segura.

A partir del 5 de mayo de 2026, el rastreador de gas de Etherscan muestra el gas estándar alrededor de 0.15 Gwei, con promedios diarios cercanos a 0.5 Gwei durante abril. Una transferencia básica de ETH cuesta menos de un centavo a ese nivel, y los días recientes típicos se sitúan en unos pocos centavos. La tendencia ha ido a la baja en cada una de las actualizaciones recientes, y la próxima, [Glamsterdam](/roadmap/glamsterdam/), está configurada para reducir aún más las tarifas. Eso hace que «la red principal de Ethereum es demasiado cara para la mayoría de las aplicaciones» sea un punto de partida obsoleto.

Si quieres una regla general sencilla, usa las matemáticas del gas en lugar del viejo folclore. A 0.5 Gwei, el promedio reciente de abril, y con el ETH a aproximadamente $2,350, los costos ilustrativos se ven así.

| Operación       | Gas utilizado | Costo ilustrativo |
| :-------------- | :---------- | :---------------- |
| Transferencia de ETH    | 21,000      | **$0.025**        |
| Transferencia de ERC-20 | \~65,000    | **$0.076**        |
| Aprobar ERC-20  | \~46,000    | **$0.054**        |
| Intercambio            | \~180,000   | **$0.21**         |
| Despliegue de ERC-20   | \~1,200,000 | **$1.41**         |

Estos son ejemplos, no garantías. Los costos varían con el precio del ETH, el precio del gas y la complejidad del contrato. Las lecturas de Gwei pueden oscilar ampliamente dentro de un mes normal mientras que el costo en dólares apenas se mueve, porque los rollups ahora procesan alrededor del 95 por ciento de las transacciones de Ethereum y la l1 generalmente funciona muy por debajo de su objetivo de bloque. Las tarifas de la Red principal ahora son lo suficientemente bajas como para que muchas aplicaciones puedan ejecutarse de manera sensata en la Red principal.

### Por qué cayeron los costos {#why-costs-fell}

Tres actualizaciones hicieron la mayor parte del trabajo.

Dencun (marzo de 2024) introdujo la EIP-4844 y dio a los rollups su propio carril de datos a través de blobs, con un mercado de tarifas separado. Los rollups dejaron de competir con el tráfico de ejecución ordinario en el mismo espacio de bloque.

Pectra se activó el 7 de mayo de 2025. La EIP-7691 aumentó la capacidad de procesamiento de blobs de 3 objetivo / 6 máximo por bloque a 6 objetivo / 9 máximo, lo que expandió el carril de datos barato que usan los rollups y redujo aún más las tarifas de la capa 2 (l2).

Fusaka se activó el 3 de diciembre de 2025. Su principal cambio de capacidad fue PeerDAS, que permite a los validadores muestrear datos de blobs en lugar de descargar cada blob por completo, y ese muestreo es lo que hace que un mayor número de blobs sea seguro en la capa de red. En paralelo, la comunidad aumentó el límite de gas de la l1 de 30M a 60M durante 2025, y la EIP-7935 de Fusaka estandarizó 60M como el nuevo valor predeterminado. La EIP-7825 limita cualquier transacción individual a \~16.78M de gas, algo que la mayoría de las aplicaciones nunca notarán, pero los despliegues muy grandes y las llamadas múltiples monolíticas ahora tienen que ajustarse a este límite. La EIP-7951 también agregó verificación nativa secp256r1 (P-256) en la Red principal, lo que hace que las firmas de claves de acceso y WebAuthn sean mucho más baratas de verificar en los flujos de cuentas.

El efecto neto es que la Red principal ya no tiene el precio de una cadena permanentemente congestionada.

## Cómo la EIP-7702 cambia el modelo de cuentas {#how-eip-7702-changes-the-account-model}

Pectra también incluyó la EIP-7702, que da a las billeteras normales acceso al comportamiento de una cuenta inteligente, como el procesamiento por lotes, el patrocinio de gas, las claves de sesión, los flujos de recuperación y una experiencia de usuario amigable con las claves de acceso, sin obligar al usuario a migrar a una nueva cuenta.

Funciona agregando un nuevo tipo de transacción (tipo `0x04`, `SetCode`) que permite a una EOA establecer un puntero a un código de contrato ya desplegado. El usuario mantiene la misma dirección, la clave original de la EOA mantiene el control final sobre la cuenta, y la delegación puede cambiarse o restablecerse más tarde a la dirección nula.

Para los constructores de aplicaciones, el cambio práctico es pedirle a la billetera el resultado, no la configuración de bajo nivel de la EIP-7702. Si un usuario necesita aprobar e intercambiar en un solo flujo, solicita un lote a través de la ERC-5792 `wallet_sendCalls`. La billetera puede decidir si usar la EIP-7702, la ERC-4337 u otro sistema de cuentas.

El código delegado es un límite de seguridad. Si una billetera apunta una EOA a un código con errores o malicioso, ese código puede realizar llamadas en nombre del usuario, incluyendo aprobaciones de tokens, transferencias e interacciones con aplicaciones. Los constructores deben tratar los objetivos de delegación como infraestructura de la billetera, confiando en implementaciones verificadas por la billetera y no pidiendo a los usuarios que deleguen en código controlado por la aplicación a la ligera.

## Qué cambia esto sobre cómo construir {#what-this-changes-about-how-to-build}

La pregunta predeterminada de los constructores solía ser «¿qué l2 es lo suficientemente barata?». Esa pregunta todavía tiene respuestas, pero no es la única. Con las tarifas de la l1 en el rango de centavos por transacción durante una carga normal, y la EIP-7702 permitiendo que cualquier billetera exponga la experiencia de usuario de una cuenta inteligente sin migrar direcciones, la opción predeterminada más útil es si la aplicación debería vivir en la Red principal, o si una l2 específica ofrece una ventaja real de distribución, liquidez o experiencia de usuario que la l1 no puede ofrecer.

La suposición sobre las cuentas también cambia. No diseñes nuevas aplicaciones como si cada cuenta de usuario fuera una simple EOA ECDSA que debe tener ETH antes de hacer algo útil. Prefiere las interfaces de procesamiento por lotes a nivel de billetera como la ERC-5792 `wallet_sendCalls`, asume que el patrocinio de gas y las claves de sesión se convertirán en características normales de las billeteras, y trata las claves de acceso y los flujos de recuperación como parte de la superficie de la experiencia de usuario de la cuenta en lugar de trucos de incorporación separados.

## Qué sigue {#whats-next}

La próxima actualización con nombre de Ethereum es Glamsterdam, con las listas de acceso a nivel de bloque (BAL) y la separación proponente-constructor (PBS) consagrada (ePBS) como elementos principales. Juntos, hacen que sea seguro aumentar el límite de gas del bloque de los 60 millones actuales a aproximadamente 200 millones, dejando más capacidad en la l1 para que los constructores trabajen. Se espera su activación en la segunda mitad de 2026. Después de Glamsterdam, está planeado que siga [Hegotá](https://forkcast.org/upgrade/hegota/), con las listas de inclusión aplicadas por elección de bifurcación (FOCIL) seleccionadas como su característica principal.

Para los constructores, los elementos que vale la pena seguir son una mayor capacidad de la l1 (BAL), una inclusión de transacciones más confiable (FOCIL) y el camino hacia la abstracción de cuentas nativa. ePBS, el otro titular de Glamsterdam, es principalmente un cambio de infraestructura que elimina una dependencia de confianza bajo la inclusión de transacciones en la l1. El cambio directo en la superficie a nivel de aplicación es pequeño.

Las BAL tratan de mantener la l1 barata a medida que crece el uso. En palabras sencillas, un bloque vendría con un mapa de las cuentas y el almacenamiento que toca. Los clientes pueden usar ese mapa para buscar datos previamente y ejecutar transacciones independientes en paralelo, lo que hace que sea más seguro aumentar el límite de gas de la l1 sin hacer que los bloques sean demasiado lentos de verificar. El efecto práctico para los constructores es que más actividad puede regresar a la Red principal sin recrear automáticamente el régimen de gas de 2021 a 2023.

FOCIL trata de lograr que las transacciones válidas entren en los bloques incluso cuando un productor de bloques preferiría dejarlas fuera. Hoy en día, si la parte que construye un bloque ignora una transacción, el resto del protocolo tiene formas limitadas de forzar su inclusión. Con la EIP-7805, varios validadores dirían, en efecto, «vimos estas transacciones válidas esperando en la mempool pública». El siguiente bloque entonces tiene que incluirlas, o los validadores pueden negarse a respaldar ese bloque. Para los constructores, esto importa cuando el acceso confiable a la l1 es parte del producto, incluyendo herramientas de privacidad, rampas de acceso reguladas o aplicaciones que sirven a usuarios que pueden ser filtrados por algunos proveedores de infraestructura.

Para los constructores de aplicaciones, el elemento de Hegotá a observar más de cerca es la abstracción de cuentas. La EIP-8141, Transacciones de Marco (Frame Transactions), agregaría un tipo de transacción donde la validación, la ejecución y el pago de gas se dividen en marcos. En la práctica, eso significa que una cuenta inteligente podría verificar una transacción por sí misma, definir sus propias reglas de firma, aprobar quién paga el gas y ejecutar una o más acciones sin depender del EntryPoint de la ERC-4337, los empaquetadores (bundlers) o los retransmisores ejecutados por la aplicación.

Eso cambia las suposiciones del producto. El patrocinio de gas se convierte en un patrón de cuenta nativo en lugar de una infraestructura que cada aplicación tiene que organizar por separado. Los esquemas de firma alternativos se vuelven más fáciles de soportar, incluyendo las claves de acceso hoy en día y un camino para alejarse de ECDSA si la migración poscuántica se vuelve necesaria. Si la EIP-8141 o un diseño similar de abstracción de cuentas nativa aterriza, el modelo del constructor cambia de «una EOA firma una transacción» a «una cuenta define cómo valida, paga y ejecuta una transacción».

Esa es la dirección, no una promesa. La EIP-8141 es un borrador, y a partir de mayo de 2026 solo se «considera para su inclusión» en Hegotá, lo que significa que los equipos de clientes la están discutiendo pero no se han comprometido a enviarla en esa actualización. El camino práctico de construcción en 2026 para la experiencia de usuario de cuentas sigue siendo la EIP-7702 más los flujos de billetera de la ERC-4337, pero los constructores deben diseñar como si las cuentas programables se estuvieran convirtiendo en el modelo de cuenta predeterminado.

## Qué construir de manera diferente ahora {#what-to-build-differently-now}

Comienza por volver a comprobar las antiguas suposiciones sobre las tarifas. Si tu manual de despliegue todavía trata a la red principal de Ethereum como un entorno de 10 a 30 Gwei por defecto, probablemente esté desviando demasiado trabajo lejos de la l1. Vale la pena considerar la Red principal primero cuando tu aplicación depende de liquidez compartida, composabilidad con protocolos existentes, neutralidad o un estado de alto valor que debería vivir donde la seguridad y el consenso social de Ethereum son más fuertes.

Usa las l2 por las razones que aún importan, incluyendo la distribución, un volumen de transacciones muy alto, ecosistemas específicos de aplicaciones o costos por acción que deben estar lo más cerca posible de cero. El punto no es «la Red principal para todo». El punto es que «la Red principal es demasiado cara» ya no debería ser el primer filtro.

Por el lado de las cuentas, construye en función de las capacidades de la billetera en lugar de las EOA sin procesar. Tu frontend debería estar listo para que las llamadas procesadas por lotes, el gas patrocinado, las claves de sesión, las claves de acceso y los flujos de recuperación lleguen a través de las billeteras. La EIP-7702 y la ERC-4337 son las herramientas prácticas de hoy. La abstracción de cuentas nativa es la dirección a seguir a continuación.

Deja de tratar a la red principal de Ethereum como la costosa capa de liquidación que solo tocas al final, y deja de tratar a las cuentas de usuario como claves ECDSA estáticas que deben tener ETH antes de poder hacer algo. Ethereum en 2026 avanza hacia una ejecución en la l1 más barata y cuentas programables. Construye para ese mundo.

## Lecturas adicionales {#further-reading}

- [Anuncio de Pectra en la Red principal](https://blog.ethereum.org/en/2025/04/23/pectra-mainnet)
- [Anuncio de Fusaka en la Red principal](https://blog.ethereum.org/2025/11/06/fusaka-mainnet-announcement)
- [Actualización de prioridades del protocolo para 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [Punto de control n.º 9 (abr. de 2026)](https://blog.ethereum.org/2026/04/10/checkpoint-9)
- [Pautas de la 7702 de Pectra en ethereum.org](https://ethereum.org/en/roadmap/pectra/7702/)
- [EIP-7702: Establecer código para EOA](https://eips.ethereum.org/EIPS/eip-7702)
- [EIP-7928: Listas de acceso a nivel de bloque](https://eips.ethereum.org/EIPS/eip-7928)
- [EIP-7805: Listas de inclusión aplicadas por elección de bifurcación (FOCIL)](https://eips.ethereum.org/EIPS/eip-7805)
- [EIP-8141: Transacción de marco](https://eips.ethereum.org/EIPS/eip-8141)
- [Forkcast: Actualización Hegotá](https://forkcast.org/upgrade/hegota/)
- [Rastreador de gas de Etherscan](https://etherscan.io/gastracker)
- [EIP-7773: Meta de la bifurcación dura Glamsterdam](https://eips.ethereum.org/EIPS/eip-7773)
- [Hoja de ruta de Glamsterdam en ethereum.org](https://ethereum.org/roadmap/glamsterdam/)