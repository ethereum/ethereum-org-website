---
title: Abstracción de Cuenta
description: Una visión general de los planes de Ethereum para hacer que las cuentas de usuario sean más sencillas y seguras.
lang: es
summaryPoints:
  - La abstracción de cuenta facilita la construcción de carteras con contrato inteligente.
  - Las carteras de contrato inteligente facilitan la gestión de acceso a las cuentas de la red de Ethereum.
  - Las claves perdidas y expuestas se pueden recuperar usando múltiples copias de seguridad.
---

# Abstracción de Cuenta {#account-abstraction}

Los usuarios interactúan con Ethereum usando **[cuentas de propiedad externa (o EOA)](/glossary/#eoa)**. Esta es la única forma de empezar una transacción o generar un contrato inteligente. Esto limita cómo los usuarios pueden interactuar con Ethereum. Por ejemplo, dificulta la creación de transacciones en lote y requiere que los usuarios siempre mantengan un saldo en ETH para costear el gas.

La abstracción de cuentas es una forma de rosolver estos problemas, que permite a los usuarios programar flexiblemente con mayor seguridad y mejores experiencias de usuario en sus cuentas. Esto puede suceder [actualizando las cuentas de propiedad externa (o EOA)](https://eips.ethereum.org/EIPS/eip-3074) para que puedan ser controladas por contratos inteligentes, o por [la actualización de los contratos inteligentes](https://eips.ethereum.org/EIPS/eip-2938) para que puedan iniciar transacciones. Ambas opciones requieren cambios en el protocolo de Ethereum. Existe también una tercera vía que implica añadir un [segundo sistema de transacciones independiente](https://eips.ethereum.org/EIPS/eip-4337) para ejecutarlo en paralelo con el protocolo existente. De cualquier forma, el resultado será acceder a Ethereum con carteras de contrato inteligente, ya sea de forma nativa como parte del protocolo existente o por una red de transacciones complementaria.

Las billeteras de contrato inteligente desbloquean múltiples beneficios para los usuarios, incluyendo:

- Definir reglas propias de seguridad flexibles.
- Recuperar su cuenta si se pierden las claves.
- Compartir la seguridad de su cuenta entre dispositivos y personas de confianza.
- pagar por el gas de alguien más, o que alguien pague el suyo
- Hacer transacciones en lote (p. ej., aprobar y ejecutar un intercambio de una vez).
- Más oportunidades de que DApps y desarrolladores de carteras innoven en las experiencias de usuario.

Estos beneficios no son respaldados nativamente hoy, porque solo las cuentas de propiedad externa ([EOAs](/glossary/#eoa)) pueden empezar transacciones. Las EOAs son simplemente pares de claves público-privadas. Funcionan de la siguiente forma:

- Si tiene la clave privada, puede hacer _lo que quiera_ siempre respetando el marco normativo de la Máquina Virtual de Ethereum (EVM).
- Si no tiene la clave privada, no puede hacer _nada_.

Si pierde sus claves, no pueden recuperarse y las claves robadas dan a los ladrones acceso instantáneo a todos los fondos de una cuenta.

Las carteras de contrato inteligente son la solución a este problema, aunque hoy en día es difícil programarlas, porque al fin y al cabo cualquier lógica implementada tendrá que trasladarse a un conjunto de transacciones EOA antes de que Ethereum las procese. La abstracción de cuenta permite que los contratos inteligentes inicien transacciones por sí solos, para que cualquier lógica que el usuario desee implementar pueda codificarse dentro de la misma cartera de contrato inteligente y ejecutarse en Ethereum.

En última instancia, la abstracción de la cuenta respalda a las carteras de contrato inteligente, simplificando su construir y protegiendo su uso. Con la abstracción de cuenta, los usuarios pueden disfrutar de todos los beneficios de Ethereum sin tener que conocer ni preocuparse por los detalles tecnológicos.

## Más allá de las fases semilla {#beyond-seed-phrases}

Las cuentas de la actualidad son seguras porque usan claves privadas que son calculadas a partir de fases semilla. Cualquier persona que tenga acceso a una fase semilla puede fácilmente descubrir la clave privada que protege una cuenta y acceder a todos los activos que protege. Si se pierden una clave privada y una frase semilla, nunca podrá recuperarlas y los activos que controlaban se congelarán para siempre. Es complejo proteger estas frases semilla, incluso para los usuarios más expertos; la estafa de la frase semilla es una de las formas más comunes de fraude electrónico.

La abstracción de cuenta solucionará este problema al usar un contrato inteligente para retener los activos y autorizar transacciones. Estos contratos inteligentes pueden entonces decorarse con lógica personalizada para hacerlos todo lo seguros y adaptados al usuario que sea posible. A fin de cuentas, igual usará claves privadas para controlar el acceso a su cuenta, pero con redes de seguridad que la simplifiquen y la vuelvan más seguras de gestionar.

Por ejemplo, se pueden añadir claves de copia de seguridad a la cartera por si las pierde o accidentalmente expone su clave principal. Llegado el caso, podría reemplazarlas por una clave nueva y segura, con el permiso de las claves de copa de seguridad. Podrá asegurar ambas claves de diferentes formas, o confiarlas a diferentes garantes de confianza. Lo cual dificultará que un ladrón obtenga acceso completo a sus fondos. Del mismo modo, puede agregar reglas a la billetera para reducir el impacto si su clave principal se ve comprometida, por ejemplo, puede permitir que las transacciones de bajo valor se verifiquen mediante una sola firma, mientras que las transacciones de mayor valor requieran la aprobación de múltiples firmantes autenticados. Hay otras formas en que las billeteras de contratos inteligentes también pueden ayudarle a frustrar a los ladrones, por ejemplo, se puede utilizar una lista de permisos para bloquear cada transacción, a menos que sea a una dirección de confianza o verificada por varias de sus claves preaprobadas.

### Ejemplos de seguridad lógica que puede construirse en una billetera de contrato inteligente:

- **Autorización multifirma**: puede compartir credenciales de autorización entre múltiples personas o dispositivos de confianza. Posteriormente, puede configurarse el contrato para que las transacciones de más de un valor predeterminado requieran la autorización de cierta proporción (p. ej., 3/5) de las partes de confianza. Por ejemplo, las transacciones de alto valor podrían requerir la aprobación tanto de un dispositivo móvil como de una cartera de hardware, o las firmas de cuentas distribuidas a familiares de confianza.
- **Congelación de cuenta**: si se pierde un dispositivo o está expuesto, la cuenta puede bloquearse desde otro dispositivo autorizado, protegiendo así los activos del usuario.
- **Recuperación de la cuenta**: ¿Ha perdido un dispositivo u olvidado una contraseña? En la actualidad, esto significa que sus activos podrían congelarse para siempre. Con una billetera de contrato inteligente, puede configurar una lista de cuentas que puedan autorizar nuevos dispositivos y restablecer el acceso.
- **Establecer limites de transacción**: especificar umbrales diarios dependiendo de cuánto valor se pueda transferir desde la cuenta en un día/mes/año. Esto significa que si un intruso acede a su cuenta, no podrá sacar todo de una vez y usted tendrá ocasiones de congelar y restablecer el acceso.
- **Crear listas de permisos**: Solo permita transacciones a ciertas direcciones que sepa que son seguras. Esto significa que _incluso si_ su clave privada fue robada, el atacante solo podría enviar fondos a las cuentas de destino de su lista. Estas listas de permisos o cuentas permitidas requerirían varias firmas para cambiarlas, de modo que un atacante no pueda agregar su propia dirección a la lista, a menos que tuviera acceso a varias de sus claves con copia de seguridad.

## Mejor experiencia de usuario {#better-user-experience}

La abstracción de cuenta permite una **mejor experiencia global de usuario** así como una **seguridad mejorada**, porque añade la compatibilidad con carteras de contrato inteligente dentro del protocolo. La razón más importante de esto es que proveerá a desarrolladores de contratos inteligentes, billeteras y aplicaciones, mayor libertad para innovar en la experiencia de usuario en formas que aún no logramos anticipar. Algunas mejoras obvias que traerá la abstracción de cuenta incluyen la agrupación de transacciones para aumentar la velocidad y la eficiencia. Por ejemplo, un simple intercambio debería ser una operación de un solo clic, pero hoy en día requiere firmar varias transacciones para aprobar el gasto de tokens individuales antes de que se ejecute el intercambio. La abstracción de cuenta elimina esa fricción al permitir las transacciones agrupadas. Además, las transacciones agrupadas podrían aprobar el valor exacto de los tókenes requeridos para cada transacción y anular las aprobaciones una vez completada la transacción, proporcionando seguridad adicional.

La gestión del gas también se mejora mucho con la abstracción de cuenta. Las aplicaciones, no solo pueden ofrecer el pago de las tarifas de gas de sus usuarios, las tarifas de gas también pueden pagarse con otros tókenes además de ETH, lo que libera a los usuarios de tener que mantener un balance de ETH para transacciones de fondos. Esto funcionaría intercambiando los tókenes de los usuarios por ETH dentro del contrato y luego usando ETH para pagar el gas.

<ExpandableCard title="¿Cómo puede ayudar con el gas una abstracción de cuenta?" eventCategory="/roadmap/account-abstraction" eventName="clicked how can account abstraction help with gas?">

La gestión del gas es una de las principales fricciones de los usuarios de Ethereum, principalmente porque ETH es el único activo que puede usarse para pagar por transacciones. Imagine que tiene una cartera con USDC, pero sin ETH. No podrá mover o intercambiar esos tókenes USDC, porque no puede pagar el gas. No puede intercambiar los USDC por ETH tampoco, porque eso en sí mismo cuesta gas. Tendrá que mandar más ETH a su cuenta desde una plataforma de cambio u otra dirección para solucionar el problema. Con billeteras de contrato inteligente, podrá simplemente pagar por gas en USDC, liberando su cuenta. Ahora no tendrá que mantener un balance de ETH en todas sus cuentas.

La abstracción de cuenta también permite a los desarrolladores de DApp ser creativos con la gestión del gas. Por ejemplo, puede empezar a pagar a su DEX favorito una tarifa fija mensual por transacciones ilimitadas. DApps podría ofrecer el pago de todas sus tarifas de gas en su nombre como recompensa por usar su plataforma, o como una oferta de incorporación. Los desarrolladores podrán innovar en el tema del gas más fácilmente cuando las carteras de contrato inteligente sean compatibles con el protocolo.

</ExpandableCard>

Las sesiones de confianza también pueden transformar potencialmente la experiencia del usuario, especialmente para aplicaciones como juegos, donde se necesitan aprobar grandes cantidades de transacciones pequeñas en poco tiempo. La aprobación individual de cada transacción rompería la experiencia de juego, pero la aprobación permanente es insegura. Una billetera de contrato inteligente podría aprobar ciertas transacciones por un tiempo fijo, hasta valores específicos o solo para ciertas direcciones.

También es interesante considerar cómo las compras podrían cambiar con la abstracción de cuenta. Hoy, cada transacción debe aprobarse y ejecutarse desde una cartera prefinanciada con la cantidad suficiente de tókenes correctos. Con la abstracción de cuenta, la experiencia podría ser más parecida a la compra familiar en línea, donde un usuario podría llenar una «cesta» con artículos de un toque para comprarlo todo, con toda la lógica requerida cubierta por el contrato, no por el usuario.

Estos son solo algunos ejemplos de cómo las experiencias de usuario podrían pasar al siguiente nivel con la abstracción de cuenta, pero habrá muchos más que todavía no hemos imaginado. La abstracción de cuenta libera a los desarrolladores de las limitaciones de los EOA actuales, permitiéndoles aprovechar las ventajas de web2 a web3 sin sacrificar la custodia propia y además piratear creativamente nuevas experiencias de usuario.

## ¿Cómo se implementará la abstracción de cuenta? {#how-will-aa-be-implemented}

Las carteras de contrato inteligente existen actualmente, pero es un desafío implementarlas debido a que la EVM no las admite. En cambio, se basan en proteger un código relativamente complejo con transacciones estándar de Ethereum. Ethereum puede cambiar esto al permitir que contratos inteligentes inicien transacciones, controlando la lógica necesaria en los contratos inteligentes de Ethereum en vez de fuera de la cadena. Al colocar la lógica en los contratos inteligentes se aumenta la descentralización de Ethereum, ya que elimina la necesidad de «repetidores» ejecutados por desarrolladores de carteras para traducir mensajes firmados por el usuario de transacciones regulares de Ethereum.

<ExpandableCard title="EIP-2771: la abstracción de cuenta usando transacciones meta" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-2771: account abstraction using meta-transactions">

EIP-2771 introduce el concepto de transacciones meta, lo que le permite a terceros pagar por los costes de gas de un usuario sin hacer cambios en el protocolo de Ethereum. En principio base es enviar las transacciones firmadas por un usuario a un contrato de transitario. El transitario es una entidad de confianza que verifica que las transacciones sean válidas antes de enviarlas a un repetidor de gas. Esto se realiza fuera de la cadena, evitando la necesidad de pagar gas. El repetidor de gas transfiere la transacción a un contrato «destinatario», pagando el gas necesario para que la transacción se ejecute en Ethereum. La transacción se ejecuta si el destinatario conoce y se fía del transitario. Este modelo le facilita a los desarrolladores la implementación de transacciones sin gas para usuarios.

</ExpandableCard>

<ExpandableCard title="EIP-4337: la abstracción de cuenta sin cambiar el protocolo de Ethereum" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-4337: account abstraction without changing the Ethereum protocol">

EIP-4337 es el primer paso hacia la compatibilidad con la cartera de contrato inteligente de forma descentralizada que <em>no requiere cambios en el protocolo de Ethereum</em>. En vez de modificar la capa de consenso para ser compatible con carteras de contrato inteligente, se añade un nuevo sistema por separado al protocolo de intercambio de información de transacción normal. Este sistema de nivel superior se construye alrededor de un nuevo objeto llamado <code>UserOperation</code> que recoge acciones de un usuario junto con firmas relevantes. Estas acciones <code>UserOperation</code> se emiten después a una zona de espera donde los validadores pueden reunirlas en una «transacción agrupada». La transacción agrupada representa una secuencia de muchas <code>UserOperations</code> individuales y puede incluirse en bloques de Ethereum como una transacción normal para que los validadores la recojan usando modelos de selección similares que maximizan las tarifas.

El funcionamiento de las carteras también cambiaría en el marco del EIP-4337. En lugar de que cada cartera implemente de nuevo la lógica segura común, aunque compleja, esas funciones se externalizarían a un contrato global de cartera conocido como el &quot;punto de entrada&quot;. Esto controlaría las operaciones que pagan las tarifas y ejecutan el código de EVM para que los desarrolladores de carteras puedan centrarse en proporcionar una experiencia de usuario excelente.

<strong>Nota</strong> el contrato de punto de entrada EIP 4337 se implementó en la red principal de Ethereum el 1 de marzo del 2023. Puede ver el contrato en <a href="https://etherscan.io/address/0x0576a174D229E3cFA37253523E645A78A0C91B57">Etherscan</a>.

</ExpandableCard>

<ExpandableCard title="EIP-2938: cambios en el protocolo de Ethereum para compatibilizarlo con la abstracción de cuenta" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-2938: changing the Ethereum protocol to support account abstraction">

<a href="https://eips.ethereum.org/EIPS/eip-2938">EIP-2938</a> tiene como objetivo actualizar el protocolo de Ethereum al introducir un nuevo tipo de transacción, <code>AA_TX_TYPE</code> que incluye tres campos: <code>nonce</code>, <code>destino</code> y <code>datos</code>, donde <code>nonce</code> es un contador de transacciones, <code>destino</code> es la dirección de contrato del punto de entrada <code>datos</code> es el código byte de EVM. Para ejecutar estas transacciones, hay dos instrucciones nuevas (conocidas como códigos operativos) que se deben añadir a la EVM: <code>NONCE</code> y <code>PAYGAS</code>. El código OP <code>NONCE</code> registra la secuencia de transacción y <code>PAYGAS</code> calcula y retira el gas necesario para ejecutar una transacción del balance del contrato. Estas nuevas características le permiten a Ethereum respaldar nativamente las carteras de contrato inteligente, dado que la infraestructura necesaria se integra en el protocolo de Ethereum.

Tenga en cuenta que EIP-2938 no está activo actualmente. La comunidad ahora está favoreciendo el EIP-4337 porque no requiere cambios en el protocolo.

</ExpandableCard>

<ExpandableCard title="EIP-3074: actualiza las cuentas de propiedad externa para la abstracción de cuenta" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-3074: upgrading externally-owned accounts for account abstraction">

<a href="https://eips.ethereum.org/EIPS/eip-3074">EIP-3074</a> pretende actualizar las cuentas de propiedad externa de Ethereum al permitirles delegar control a un contrato inteligente. Esto significa que la lógica del contrato inteligente podría aprobar transacciones originadas por una EOA. Esto podría permitir características como el patrocinio de gas y transacciones por lotes. Para que esto funcione, dos nuevos códigos operativos deben añadirse a la EVM: <code>AUTH</code> y <code>AUTHCALL</code>. Con EIP-3074 los beneficios de una cartera de contrato inteligente están disponibles <em>sin necesitar un contrato</em>, en su lugar, un contrato de tipo específico sin estado, ni fiabilidad, no actualizable, conocido como «invocador» hace las transacciones.

Tenga en cuenta que EIP-3074 no está activo actualmente. La comunidad ahora está favoreciendo el EIP-4337 porque no requiere cambios en el protocolo.

</ExpandableCard>

## Progreso actual {#current-progress}

Las billeteras de contrato inteligente ya están disponibles, pero existen más actualizaciones necesarias para hacerlas todo lo descentralizadas y sin permisos como sea posible. El EIP-4337 es una propuesta madura que no requiere ningún cambio en el protocolo de Ethereum, así que es posible que se pueda implementar prontamente. Sin embargo, las actualizaciones que alteran el protocolo de Ethereum no se encuentran en desarrollo activo en este momento, por lo que esos cambios pueden llevar bastante tiempo en enviarse. También es posible que la abstracción de cuenta se realice de forma suficientemente buena con el EIP-4337 y así no se requieran cambios de protocolo.

## Más información {#further-reading}

- [erc4337.io](https://www.erc4337.io/)
- [Panel de debate sobre la abstracción de cuenta en Devcon, Bogotá](https://www.youtube.com/watch?app=desktop&v=WsZBymiyT-8)
- [«¿Por qué la abstracción de cuenta es un punto de inflexión para DApps?» Devcon, Bogotá](https://www.youtube.com/watch?v=OwppworJGzs)
- [«ELI5 La abstracción de cuenta» en Devcon, Bogotá](https://www.youtube.com/watch?v=QuYZWJj65AY)
- [Notas de Vitalik «El camino a la abstracción de cuenta»](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Publicación de blog de Vitalik sobre carteras de recuperación social](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [Notas de EIP-2938](https://hackmd.io/@SamWilsn/ryhxoGp4D#What-is-EIP-2938)
- [Documentación de EIP-2938](https://eips.ethereum.org/EIPS/eip-2938)
- [Notas de EIP-4337](https://medium.com/infinitism/erc-4337-account-abstraction-without-ethereum-protocol-changes-d75c9d94dc4a)
- [Documentación de EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)
- [Documentación de EIP-2771](https://eips.ethereum.org/EIPS/eip-2771)
- [«Aspectos básicos de la abstracción de cuenta»: ¿Qué es abstracción de cuenta? Parte I](https://www.alchemy.com/blog/account-abstraction)
