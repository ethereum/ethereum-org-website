---
title: "Criptografía poscuántica en Ethereum"
description: "Cómo se está preparando Ethereum para la era poscuántica, qué es vulnerable y qué se está construyendo para protegerlo."
lang: es
image: /images/roadmap/roadmap-future.png
alt: "Hoja de ruta de Ethereum"
template: roadmap
summaryPoints:
  - Las computadoras cuánticas eventualmente amenazarán la criptografía que Ethereum utiliza hoy en día
  - La Fundación Ethereum cuenta con un equipo dedicado a la investigación poscuántica y una hoja de ruta estructurada de "Lean Ethereum" que apunta a 2029 para una protección poscuántica completa
  - Tus fondos están seguros hoy y el software de la billetera te guiará a través de la futura migración
---

Las computadoras cuánticas eventualmente podrán romper los métodos criptográficos que aseguran Ethereum y la mayoría de los otros sistemas digitales en la actualidad. Esta página explica qué significa eso, cómo la red está desarrollando proactivamente mejoras para mitigar este riesgo y lo que necesitas saber.

## Por qué es importante la criptografía poscuántica {#why-post-quantum-matters}

Ethereum depende de varias formas de [criptografía](/glossary/#cryptography) para mantener la red segura y proteger los fondos de los usuarios. Las más importantes son:

- **Algoritmo de firma digital de curva elíptica (ECDSA)**: La criptografía utilizada para firmar transacciones. La seguridad de tu cuenta de Ethereum depende de esto.
- **Firmas BLS**: Utilizadas por los [validadores](/glossary/#validator) para alcanzar el [consenso](/glossary/#consensus) sobre el estado de la red.
- **Compromisos polinómicos KZG**: Utilizados para la [disponibilidad de datos](/glossary/#data-availability) en la hoja de ruta de escalabilidad de Ethereum.
- **Sistemas de pruebas ZK**: Utilizados por los rollups y otras aplicaciones para verificar cálculos fuera de la cadena.

Todos estos dependen de estructuras matemáticas, como los grupos abelianos, que son difíciles para las computadoras clásicas pero que pueden ser resueltos eficientemente por una computadora cuántica utilizando el [algoritmo de Shor](https://en.wikipedia.org/wiki/Shor%27s_algorithm).

### ¿Cuándo amenazarán las computadoras cuánticas a Ethereum? {#when-will-quantum-computers-threaten-ethereum}

En marzo de 2026, Google Quantum AI publicó una investigación estimando que romper la criptografía de curva elíptica de 256 bits (el tipo que Ethereum utiliza para las firmas de cuentas) podría requerir aproximadamente 1.200 cúbits lógicos. Estimaciones anteriores situaban este número mucho más alto. Google ha establecido una fecha límite interna en 2029 para migrar sus propios sistemas a la criptografía poscuántica.

El hardware cuántico actual está lejos de esta escala, operando con unos pocos miles de cúbits físicos ruidosos. Los cúbits lógicos (que corrigen errores y realizan cálculos confiables) requieren muchos cúbits físicos cada uno. **La brecha entre el hardware actual y lo que se necesita para romper la criptografía de Ethereum sigue siendo significativa, pero se está reduciendo más rápido de lo que muchos esperaban.** Cabe destacar que el Instituto Nacional de Estándares y Tecnología de EE. UU. (NIST) anticipa la obsolescencia de ECDSA para 2030 y su prohibición para 2035.

Esta no es una amenaza inminente. Pero las transiciones criptográficas toman años, y el modelo de seguridad de Ethereum está diseñado para durar siglos. La respuesta de Ethereum es la hoja de ruta **Lean Ethereum**, una misión deliberada de varios años para reconstruir Ethereum en torno a primitivas que sobrevivirán a cualquier amenaza criptográfica.

## Cuatro áreas vulnerables a ataques cuánticos {#four-vulnerable-areas}

En febrero de 2026, Vitalik Buterin [publicó una hoja de ruta](https://x.com/VitalikButerin/status/2027075026378543132) identificando cuatro áreas distintas de la criptografía de Ethereum que necesitan actualizaciones poscuánticas. Cada una tiene diferentes desafíos y diferentes caminos de solución.

### 1. Firmas BLS de la capa de consenso {#consensus-bls}

**Qué hace**: El protocolo de [prueba de participación (PoS)](/glossary/#pos) de Ethereum utiliza firmas BLS para agregar votos de cientos de miles de validadores. BLS permite combinar muchas firmas en una sola, manteniendo la red eficiente.

**Por qué es vulnerable**: Las firmas BLS dependen de emparejamientos de curvas elípticas, que una computadora cuántica podría romper.

**El enfoque**: La hoja de ruta de Lean Consensus incluye el desarrollo de dos herramientas complementarias:
- **leanXMSS**: Ethereum reemplazará las firmas BLS con leanXMSS, un esquema de firma basado en hash para validadores. Las firmas basadas en hash se consideran seguras contra ataques cuánticos porque dependen únicamente de la seguridad de las funciones hash, que las computadoras cuánticas debilitan pero no rompen.
- **leanVM**: Una zkVM (máquina virtual de conocimiento cero) mínima para la agregación de firmas basada en SNARK. Debido a que las firmas basadas en hash son significativamente más grandes (aproximadamente 3.000 bytes en comparación con los 96 bytes de BLS), cambiar a leanXMSS produciría significativamente más datos por slot. Para resolver esto, leanVM actúa como un motor de agregación, comprimiendo los datos 250 veces. Esto preserva los beneficios de eficiencia de combinar muchas firmas en una sola, incluso después de cambiar a esquemas seguros contra ataques cuánticos.

<ExpandableCard title="¿Por qué Ethereum no puede simplemente reemplazar BLS por un esquema resistente a la computación cuántica?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked why cant ethereum just replace BLS?">

La propiedad de agregación que hace que BLS sea eficiente (combinar cientos de miles de firmas en una sola) no tiene un equivalente obvio seguro contra ataques cuánticos. Las firmas poscuánticas también son mucho más grandes que las firmas BLS. Simplemente cambiar una por otra haría que la capa de consenso de Ethereum fuera significativamente más lenta y costosa. Es por eso que el equipo está construyendo leanVM, una herramienta que utiliza pruebas de conocimiento cero para agregar firmas seguras contra ataques cuánticos de manera eficiente.

</ExpandableCard>

### 2. Disponibilidad de datos: compromisos KZG {#data-availability-kzg}

**Qué hace**: Los compromisos polinómicos KZG aseguran que los datos (particularmente los datos de [blob](/glossary/#blob) de los rollups) estén disponibles en la red sin requerir que cada nodo los descargue todos.

**Por qué es vulnerable**: Los compromisos KZG dependen de emparejamientos de curvas elípticas, la misma estructura matemática que las computadoras cuánticas pueden atacar.

**Mitigación actual**: Los compromisos KZG utilizan una "configuración confiable" donde muchos participantes aportaron aleatoriedad. Siempre que al menos un participante haya sido honesto y haya descartado su secreto, la configuración es segura, incluso contra computadoras cuánticas que intenten aplicar ingeniería inversa después del hecho.

**Solución a largo plazo**: Reemplazar KZG con un esquema de compromiso seguro contra ataques cuánticos. Los dos candidatos principales son:
- **Compromisos basados en STARK**: Dependen de funciones hash en lugar de curvas elípticas. Ya se utilizan en algunos ZK-rollups.
- **Compromisos basados en retículos**: Dependen de la dificultad de los problemas de retículos, que se cree que son resistentes a los ataques cuánticos.

Ambos enfoques todavía se están investigando en cuanto a eficiencia y viabilidad a la escala de Ethereum.

### 3. Firmas de cuentas: ECDSA {#eoa-signatures}

**Qué hace**: Cada cuenta estándar de Ethereum (cuenta de propiedad externa, o [EOA](/glossary/#eoa)) utiliza ECDSA en la curva secp256k1 para firmar transacciones. Esto es lo que protege tus fondos.

**Por qué es vulnerable**: Para cualquier cuenta que haya enviado una transacción, la clave pública queda expuesta en cadena. Una computadora cuántica podría derivar la clave privada a partir de estos datos de clave pública expuestos.

**Matiz importante**: Las cuentas que solo han recibido ether y nunca han enviado una transacción no han expuesto su clave pública. Solo la dirección (un hash de la clave pública) es visible, lo que proporciona cierta protección adicional.

**El enfoque**: En lugar de una única migración en todo el protocolo, Ethereum planea utilizar la [abstracción de cuentas](/roadmap/account-abstraction/) (específicamente EIP-8141, que se está considerando para Hegotá en la segunda mitad de 2026) para dar a los usuarios **agilidad de firma**. Las cuentas individuales podrían cambiar a un esquema de firma poscuántica sin esperar a que cambie todo el protocolo.

Este es un enfoque pragmático. Los usuarios y las billeteras que deseen protección poscuántica de manera temprana pueden adoptarla voluntariamente, mientras que la migración más amplia ocurre con el tiempo.

### 4. Pruebas ZK de la capa de aplicación {#zk-proofs}

**Qué hace**: Los sistemas de pruebas de conocimiento cero son utilizados por los rollups de capa 2 (L2) y otras aplicaciones para verificar cálculos sin revelar los datos subyacentes.

**Por qué es vulnerable**: Muchos sistemas populares de pruebas ZK (SNARK que utilizan emparejamientos de curvas elípticas) dependen de suposiciones vulnerables a ataques cuánticos.

**El enfoque**: Los STARK, que dependen de funciones hash en lugar de curvas elípticas, ya son resistentes a los ataques cuánticos y son utilizados por varios rollups. La adopción natural del ecosistema de sistemas basados en STARK ya está proporcionando seguridad poscuántica en la capa de aplicación.

## Estándares del NIST {#nist-standards}

En agosto de 2024, el Instituto Nacional de Estándares y Tecnología de EE. UU. (NIST) [finalizó tres estándares de criptografía poscuántica](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards). Estos son importantes porque brindan a toda la industria tecnológica, incluido Ethereum, un conjunto compartido de algoritmos examinados sobre los cuales construir, en lugar de que cada proyecto invente el suyo propio.

| Estándar | Nombre | Tipo | Caso de uso |
|----------|------|------|----------|
| FIPS 203 | ML-KEM | Basado en retículos | Encapsulación de claves (intercambio de claves) |
| FIPS 204 | ML-DSA (Dilithium) | Basado en retículos | Firmas digitales |
| FIPS 205 | SLH-DSA (SPHINCS+) | Basado en hash | Firmas digitales |

Estos estándares proporcionan una base para la transición poscuántica de la industria en general. El trabajo de Ethereum se basa en ellos y los amplía, con un enfoque particular en los desafíos únicos de una red descentralizada donde la eficiencia y la agregación son importantes.

## El enfoque de la Fundación Ethereum {#ef-approach}

La Fundación Ethereum formó un equipo dedicado a la Seguridad Poscuántica en enero de 2026, dirigido por Thomas Coratger. El trabajo del equipo se rastrea públicamente en [pq.ethereum.org](https://pq.ethereum.org).

### Actividad actual (a partir de abril de 2026) {#current-activity}

- **Devnets de interoperabilidad semanales**: Más de 10 equipos de clientes participan en pruebas regulares de interoperabilidad poscuántica, incluyendo Lighthouse, Grandine, Zeam, Ream Labs y PierTwo.
- **Premio Poseidón**: Un premio de investigación de 1 millón de dólares dirigido a mejoras en primitivas criptográficas basadas en hash.
- **Implementaciones de código abierto**: leanXMSS, leanVM, leanSpec (Python), leanSig (Rust) y leanMultisig están disponibles bajo la [organización de GitHub leanEthereum](https://github.com/leanEthereum).
- **Segundo Retiro Anual de Investigación PQ**: Planeado del 9 al 12 de octubre de 2026 en Cambridge, Reino Unido.
- **Alineación con el NIST**: El trabajo de Ethereum se basa en los estándares de criptografía poscuántica finalizados por el NIST en agosto de 2024 (como ML-KEM, ML-DSA y SLH-DSA).

### Hitos de migración {#migration-milestones}

El equipo ha esbozado una serie de actualizaciones del protocolo para introducir de manera incremental la criptografía poscuántica en Ethereum. Estos son hitos de planificación, no compromisos garantizados. Los nombres y el orden pueden cambiar.

| Hito | Qué introduce |
|-----------|--------------------|
| I* | Registro de claves PQ. Los validadores pueden registrar claves públicas poscuánticas junto con las claves BLS existentes. |
| J* | Precompilaciones de verificación de firmas PQ. Los contratos inteligentes y las billeteras pueden verificar firmas PQ de forma nativa. |
| L* | Atestaciones PQ y pruebas de la capa de consenso en tiempo real a través de leanVM. Los validadores comienzan a usar firmas PQ para el consenso. |
| M* | Agregación completa de firmas PQ y compromisos de blob seguros contra ataques PQ. |

**Objetivo**: Los hitos estructurados de bifurcación apuntan a la finalización de la infraestructura poscuántica central para aproximadamente 2029. La migración completa de la capa de ejecución y del ecosistema se extiende más allá de eso.

## ¿Qué necesitan hacer los usuarios? {#what-users-need-to-do}

**En este momento: nada.** Tus fondos están seguros. Ninguna computadora cuántica actual puede amenazar la criptografía de Ethereum.

**En el futuro**: Una vez que los esquemas de firma poscuántica sean ampliamente compatibles en Ethereum (lo que se espera después de la bifurcación dura de Hegotá y la implementación de EIP-8141), querrás migrar tu cuenta a firmas seguras contra ataques cuánticos. El software de la billetera te guiará a través de esta transición.

Si tu cuenta nunca ha enviado una transacción (lo que significa que tu clave pública no ha sido expuesta en cadena), tiene una capa adicional de protección. Pero todas las cuentas eventualmente deberían migrar.

La cuestión de cómo manejar las billeteras inactivas (cuentas cuyos propietarios pueden no ser conscientes de la necesidad de migrar) es un tema abierto de gobernanza. La comunidad de Ethereum aún no ha llegado a un consenso sobre esto.

## Preguntas frecuentes {#faq}

<ExpandableCard title="¿Pueden las computadoras cuánticas robar mi ETH hoy?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked can quantum computers steal my ETH today?">

**No.** Ninguna computadora cuántica actual puede romper la criptografía de Ethereum. El hardware cuántico actual está lejos de la escala necesaria. El trabajo descrito en esta página es una preparación para el futuro, no una respuesta a una amenaza activa.

</ExpandableCard>

<ExpandableCard title="¿Cuándo podrían las computadoras cuánticas convertirse en una amenaza?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked when could quantum computers become a threat?">

Las estimaciones varían. La investigación de Google de marzo de 2026 sugiere que el hardware necesario para romper la criptografía de curva elíptica de 256 bits podría llegar en algún momento alrededor del final de esta década como muy pronto, pero aún quedan importantes desafíos de ingeniería. La mayoría de los investigadores consideran que una amenaza realista está a varios años de distancia como mínimo. La respuesta honesta es que nadie conoce el cronograma exacto, que es precisamente por lo que prepararse ahora es importante.

</ExpandableCard>

<ExpandableCard title="¿Necesitaré hacer algo para proteger mi billetera?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked will I need to do anything?">

Eventualmente, sí. Una vez que los esquemas de firma poscuántica estén disponibles en Ethereum, los usuarios querrán migrar sus cuentas. Es probable que el software de la billetera maneje esta transición por ti. Por ahora, no hay nada que debas hacer. Cuando sea necesario actuar, la comunidad de Ethereum y los desarrolladores de billeteras proporcionarán orientación y herramientas claras.

</ExpandableCard>

<ExpandableCard title="¿Qué pasa con mis tokens, NFT y posiciones DeFi?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked what about tokens NFTs DeFi?">

Los activos en Ethereum están controlados por firmas de cuentas. Una vez que tu cuenta se migra a un esquema de firma seguro contra ataques cuánticos, todo en esa cuenta está protegido. No necesitas migrar cada activo individualmente. Los contratos inteligentes que mantienen fondos (como los protocolos de finanzas descentralizadas (DeFi)) pueden necesitar sus propias actualizaciones dependiendo de las primitivas criptográficas que utilicen internamente.

</ExpandableCard>

<ExpandableCard title="¿Está Ethereum por detrás de otras cadenas de bloques en esto?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked is Ethereum behind?">

No. Ethereum tiene uno de los programas poscuánticos más estructurados de cualquier cadena de bloques: un equipo dedicado, investigación financiada, devnets semanales y una hoja de ruta de migración publicada, tratando la computación cuántica como una restricción de diseño de primera clase. Ninguna cadena de bloques ha completado una transición poscuántica completa todavía. Según estimaciones de la Fundación Ethereum, la exposición de fondos inactivos vulnerables a ataques cuánticos de Ethereum es de aproximadamente el 0,1%, drásticamente menor que la de otras redes importantes de cadenas de bloques.

</ExpandableCard>

<ExpandableCard title="¿Qué es 'recolectar ahora, descifrar más tarde'?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked what is harvest now decrypt later?">

"Cosechar ahora, descifrar después" es un ataque en el que alguien registra datos cifrados o claves públicas expuestas hoy, y luego rompe el cifrado más tarde una vez que existe una computadora cuántica lo suficientemente potente. Para Ethereum, esto es más relevante para las cuentas cuyas claves públicas ya están expuestas en cadena (cualquier cuenta que haya enviado una transacción). Esta es una de las razones por las que la comunidad trata la migración poscuántica como algo urgente, aunque la amenaza cuántica aún no sea inmediata.

</ExpandableCard>

## Lecturas adicionales {#further-reading}

- [pq.ethereum.org](https://pq.ethereum.org) - _Fundación Ethereum_
- [Proyecto de Criptografía Poscuántica](https://pse.dev/projects/post-quantum-cryptography) - _Privacy Stewards of Ethereum (PSE)_
- [Estándares de Criptografía Poscuántica del NIST](https://csrc.nist.gov/projects/post-quantum-cryptography) - _NIST_
- [Salvaguardando las criptomonedas mediante la divulgación responsable de vulnerabilidades cuánticas](https://research.google/blog/safeguarding-cryptocurrency-by-disclosing-quantum-vulnerabilities-responsibly/) - _Google Quantum AI_
- [Las fronteras cuánticas pueden estar más cerca de lo que parecen](https://blog.google/innovation-and-ai/technology/safety-security/cryptography-migration-timeline/) - _Google_
- [KZG y configuraciones confiables](/roadmap/danksharding/#what-is-kzg)
- [Recursos del taller leanVM + PQ de la Lean Week Cambridge (2025)](https://github.com/leanEthereum/pm/blob/main/workshops-and-interops/2025/lean-week-cambridge/index.md) - _Lean Ethereum_
- [Llamadas de trabajo ACD sobre firmas de transacciones PQ](https://youtube.com/playlist?list=PLJqWcTqh_zKEOum3uR0odkH59fmGUYuZB) - _Fundación Ethereum_
- [Llamadas de trabajo ACD sobre interoperabilidad PQ](https://youtube.com/playlist?list=PLJqWcTqh_zKF_Q9HNXBLW_AtktsjToTIu) - _Fundación Ethereum_
- [Lista de reproducción de YouTube sobre Lean Ethereum y Seguridad Poscuántica](https://youtube.com/playlist?list=PLJqWcTqh_zKGGuO_q1dgYLsfUoX1sNhWM) - _Fundación Ethereum_
- [Entrevista de panel sobre resistencia poscuántica](https://youtu.be/5DRDjeMmOPw) - _Podcast Bankless_
- [Abstracción de cuentas en Ethereum](/roadmap/account-abstraction/)
- [strawmap.org](https://strawmap.org/) - _Arquitectura de la EF_
- [Superposicionado: Análisis de la industria de la computación cuántica](https://www.superpositioned.co/) - _Saneel Sreeni_