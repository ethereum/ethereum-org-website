---
title: Staking delegado (staking como servicio)
description: Una descripción general de cómo empezar con el staking delegado
lang: es
template: staking
image: /images/staking/leslie-saas.png
sidebarDepth: 2
summaryPoints:
  - Operadores de nodos externos se encargan de la operación de su cliente de validador
  - Una excelente opción para cualquier persona con 32 ETH que no quiera lidiar con la complejidad técnica de ejecutar un nodo
  - La delegación abarca un espectro, desde servicios en los que conserva sus claves de retiro hasta exchanges totalmente con custodia
---

## ¿Qué es el staking delegado? {#what-is-staking-as-a-service}

El staking delegado representa una categoría de servicios de staking en la que deposita sus propios 32 ETH para un validador, pero delega las operaciones del nodo a un operador externo. El proceso generalmente implica recibir orientación durante la configuración inicial, incluida la generación de claves y el depósito, para luego cargar sus claves de firma al operador. Usted proporciona los ETH, pero cede la operación del hardware del validador a otra persona.

El protocolo [Ethereum](/) no admite de forma nativa la delegación de participación, por lo que se ha creado una variedad de servicios para satisfacer esta demanda. Esta categoría es más conocida como **staking como servicio (SaaS)**, pero abarca un espectro de acuerdos que difieren en la cuestión clave de cuánto control mantiene sobre sus ETH en staking:

- **Staking como servicio sin custodia**: conserva sus propias claves de retiro y delega únicamente la operación del validador.
- **Staking totalmente con custodia**: el proveedor, generalmente un exchange, posee tanto las claves como los fondos.

En comparación con el [staking en solitario](/staking/solo/), cada forma de delegación coloca un middleware entre usted y el protocolo Ethereum. Ese middleware es software e infraestructura administrados por la empresa de otra persona. Cada paso hacia la comodidad añade un supuesto de confianza, así que antes de elegir un servicio, determine en qué parte de este espectro se encuentra.

### Lo que no es el staking delegado {#what-delegated-staking-is-not}

- **Staking conjunto y tokens de staking líquido (LST)**: con los fondos conjuntos (pools), combina cualquier cantidad de ETH con otros participantes, y generalmente recibe un token que representa su parte de la participación del fondo. No está delegando su propio validador; los contratos inteligentes del fondo y los operadores de nodos controlan los validadores. [Más sobre el staking conjunto](/staking/pools/)
- **Operación de nodo con fianza**: algunos protocolos de staking le permiten ejecutar un validador en su propio hardware con menos de 32 ETH mediante el depósito de una fianza. Eso es operación de nodo, lo opuesto a la delegación, y se trata junto con el [staking en solitario](/staking/solo/).

## ¿Por qué delegar su staking? {#why-stake-with-a-service}

Si tiene 32 ETH para hacer staking, pero no se siente cómodo lidiando con el hardware, los servicios de staking delegado le permiten delegar la parte técnica mientras gana recompensas de bloque nativas de Ethereum.

<Grid>
  <Card title="Your own validator" icon={<MonitorCheck />} description="Deposite sus propios 32 ETH para activar su propio conjunto de claves de firma que participarán en el consenso de Ethereum. Supervise su progreso con paneles de control para ver cómo se acumulan esas recompensas de ETH." />
  <Card title="Easy to start" icon={<Flag />} description="Olvídese de las especificaciones de hardware, la configuración, el mantenimiento del nodo y las actualizaciones. Los proveedores le permiten subcontratar la parte difícil al cargar sus propias credenciales de firma, lo que les permite ejecutar un validador en su nombre por un pequeño costo." />
  <Card title="Limit your risk" icon={<ShieldHalf />} description="Con los servicios sin custodia, mantiene el control de las claves que permiten retirar o transferir los fondos en staking. Estas son diferentes de las claves de firma y se pueden almacenar por separado para limitar (pero no eliminar) su riesgo al hacer staking." />
</Grid>

## Comparación de opciones de staking {#comparison-of-staking-options}

<StakingComparison page="saas" />

## El espectro de la delegación {#the-delegation-spectrum}

Los proveedores difieren en qué claves guardan para usted, y cada clave que guardan es algo que debe confiarles.

### Staking como servicio sin custodia {#non-custodial-staking-as-a-service}

Con el SaaS sin custodia, generalmente se le guía a través de la generación de sus claves de validador y la realización de su propio depósito de 32 ETH, luego carga las _claves de firma_ al operador. Las claves de firma permiten al operador realizar las tareas del validador (dar fe y proponer bloques) en su nombre. El mal uso de estas puede hacer que su validador sea penalizado o sufra un recorte, pero no se pueden usar para retirar, transferir o gastar sus fondos.

Las _credenciales de retiro_ del validador permanecen apuntando a una dirección que usted controla. Las recompensas y los fondos de salida solo pueden ir allí (consulte la sección del modelo de confianza a continuación).

### Servicios con custodia y staking en exchanges {#custodial-services-and-exchange-staking}

En el extremo totalmente delegado del espectro se encuentra el staking con custodia, ofrecido con mayor frecuencia por exchanges centralizados. Nunca maneja claves en absoluto; simplemente mantiene ETH en su cuenta de la plataforma y opta por hacer staking. Esta es la experiencia de usuario más sencilla posible y es una opción legítima para las personas que ya mantienen fondos en un exchange y aceptan el riesgo de custodia.

También requiere la mayor confianza. El proveedor controla tanto las claves de firma como las credenciales de retiro; lo que usted tiene es un saldo en su plataforma, no un validador. Eso significa que:

- Sus ETH en staking están expuestos a la solvencia, seguridad y situación regulatoria del proveedor, y los retiros están sujetos a sus términos y tiempos de procesamiento, no solo a las reglas del protocolo Ethereum.
- No tiene una forma independiente de salir del validador o recuperar fondos si el proveedor falla o congela los retiros.
- Grandes cantidades de ETH en staking bajo un puñado de operadores de exchanges contribuyen a la centralización de la participación, y las elecciones de clientes de estos operadores afectan la salud de la red. Hacer staking de una manera que mantenga más control en sus manos, o elegir proveedores que demuestren ejecutar clientes minoritarios, hace más por la resiliencia de Ethereum.

## Modelo de confianza: qué evaluar {#trust-model-what-to-evaluate}

El staking delegado siempre significa confiar a otra persona parte de su configuración de staking. Responda a estas preguntas antes de entregar nada:

- **¿Quién posee las claves de retiro?** Las credenciales de retiro de un validador (tipo 0x01 o 0x02) apuntan a una dirección de la capa de ejecución que, en última instancia, controla la participación. Si esa dirección es suya, el acuerdo es sin custodia; el operador puede ejecutar (o administrar mal) el validador, pero los ETH solo se le pueden retirar a usted. Si las credenciales apuntan a la dirección del proveedor, usted tiene una promesa, no una participación.
- **¿Puede salir sin el operador?** Desde la actualización [Pectra](/roadmap/pectra/), los [retiros activados por la capa de ejecución (EIP-7002)](https://eips.ethereum.org/EIPS/eip-7002) permiten que la dirección de retiro active una salida del validador (o, para los validadores de capitalización 0x02, un retiro parcial del saldo superior a 32 ETH) directamente desde la capa de ejecución, sin las claves de firma. Requiere una transacción y cuesta gas, pero significa que un operador que no responde o que ha desaparecido ya no puede mantener a su validador como rehén, siempre que las credenciales de retiro sean suyas.
- **¿Cuál es la estructura de tarifas?** Los servicios cobran una tarifa mensual fija o un porcentaje de las recompensas. Compruebe cómo interactúan las tarifas con el tiempo de inactividad y las penalizaciones: quién asume el costo si el operador tiene un rendimiento inferior y si se ofrecen garantías o seguros.
- **¿Qué clientes ejecuta el operador?** Un operador que ejecuta [clientes de ejecución o de consenso](/developers/docs/nodes-and-clients/client-diversity/) mayoritarios expone tanto su participación como la red a fallas correlacionadas si ese cliente tiene un error. Prefiera proveedores que documenten el uso de clientes minoritarios.
- **¿El servicio es abierto y está auditado?** Los proveedores pueden ejecutar software adicional en torno a los clientes estándar de Ethereum que no es de código abierto ni auditable. Busque auditorías públicas, un historial operativo establecido y un historial limpio de recortes.
- **¿Qué sucede si el proveedor desaparece?** Un proveedor responsable documenta su proceso de desvinculación, proporcionando instrucciones claras sobre cómo salir de su validador, recuperar sus claves o activar una salida usted mismo. Si la respuesta depende por completo de que el proveedor siga en el negocio, se trata de un acuerdo con custodia.

<Alert variant="update">
<AlertIcon size="xl"><Split /></AlertIcon>
<AlertContent>
<AlertDescription>
**Algunos proveedores pueden ejecutar su validador utilizando tecnología de validador distribuido (DVT)**, dividiendo la clave de firma en múltiples nodos para que ninguna máquina u operador individual sea un punto de falla. [Más sobre la tecnología de validador distribuido](/staking/dvt/)
</AlertDescription>
</AlertContent>
</Alert>

## Qué tener en cuenta {#what-to-consider}

Hay un número creciente de proveedores para ayudarle a delegar la operación de su validador, pero todos tienen sus propios beneficios y riesgos. Todas las opciones delegadas requieren supuestos de confianza adicionales en comparación con el staking en solitario. Las opciones delegadas pueden tener código adicional que envuelve a los clientes de Ethereum que no es abierto ni auditable. La delegación también tiene un efecto perjudicial en la descentralización de la red. Dependiendo de la configuración, es posible que no controle su validador y el operador podría actuar de manera deshonesta utilizando sus ETH.

A continuación, se utilizan indicadores de atributos para señalar las fortalezas o debilidades notables que puede tener un proveedor de la lista. Utilice esta sección como referencia sobre cómo definimos estos atributos mientras elige un servicio de staking.

<StakingConsiderations page="saas" />

## Explorar proveedores de servicios de staking {#saas-providers}

A continuación se muestran algunos proveedores de staking como servicio disponibles. Utilice los indicadores anteriores para que le sirvan de guía a través de estos servicios.

<ProductDisclaimer />

### Proveedores de SaaS {#saas-providers-2}

<StakingProductsCardGrid category="saas" />

Tenga en cuenta la importancia de apoyar la [diversidad de clientes](/developers/docs/nodes-and-clients/client-diversity/), ya que mejora la seguridad de la red y limita su riesgo. Los servicios que tienen evidencia de limitar el uso de clientes mayoritarios se indican con <em style={{ textTransform: "uppercase" }}>"diversidad de clientes de ejecución"</em> y <em style={{ textTransform: "uppercase" }}>"diversidad de clientes de consenso".</em>

### Generadores de claves {#key-generators}

<StakingProductsCardGrid category="keyGen" />

¿Tiene alguna sugerencia sobre un proveedor de staking como servicio que hayamos pasado por alto? Consulte nuestra [política de listado de productos](/contributing/adding-staking-products/) para ver si encajaría bien y enviarlo para su revisión.

<StakingCommunityCallout className="my-16" />

## Preguntas frecuentes {#faq}

<ExpandableCard title="¿Quién tiene mis claves?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Los acuerdos difieren de un proveedor a otro. Con los servicios sin custodia, se le guiará a través de la generación de las claves de firma para su validador (cada validador contiene 32 ETH, o hasta 2048 ETH con credenciales de capitalización (0x02) desde la actualización Pectra), y la carga de estas a su proveedor para permitirles validar en su nombre. Las claves de firma por sí solas no otorgan ninguna capacidad para retirar, transferir o gastar sus fondos. Sin embargo, sí brindan la capacidad de emitir votos para el consenso, lo que, si no se hace correctamente, puede resultar en penalizaciones por inactividad o recortes.

Con los servicios con custodia, como el staking a través de un exchange centralizado, el proveedor posee todas las claves: las claves de firma y las credenciales de retiro. En ese caso, está confiando al proveedor los fondos en sí, no solo la operación del validador.
</ExpandableCard>

<ExpandableCard title="¿Entonces hay dos conjuntos de claves?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Sí. Cada validador tiene claves de _firma_ y _credenciales de retiro_ separadas. Para que un validador dé fe del estado de la cadena, participe en comités de sincronización y proponga bloques, las claves de firma deben ser fácilmente accesibles por un cliente de validador. Estas deben estar conectadas a Internet de alguna forma y, por lo tanto, se consideran inherentemente claves "calientes". Las claves que controlan los fondos retirados se mantienen separadas por razones de seguridad.

Las credenciales de retiro designan la dirección de la capa de ejecución a la que van las recompensas de staking y los fondos de salida. Las herramientas de depósito modernas le permiten establecer esta dirección en el momento del depósito, ya sea como una credencial regular (0x01) o de capitalización (0x02), y debe ser una dirección que usted controle, idealmente asegurada en almacenamiento en frío. Esto protege sus fondos incluso si otra persona controla las claves de firma de su validador, y desde la actualización Pectra también le permite salir del validador directamente desde esa dirección.

Los validadores configurados en los primeros días de la red sin una dirección de retiro de ejecución utilizan claves de retiro BLS heredadas y deben firmar un mensaje único declarando una dirección de retiro antes de que puedan comenzar los retiros. Esto implica regenerar las claves de retiro a partir de la frase semilla mnemotécnica creada en la configuración.

**Asegúrese de hacer una copia de seguridad de esta frase semilla de forma segura o no podrá generar sus claves de retiro cuando llegue el momento.**

Consulte con su proveedor para obtener asistencia sobre cómo preparar su validador.
</ExpandableCard>

<ExpandableCard title="¿Cuándo puedo retirar?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
El funcionamiento de los retiros depende del tipo de credencial de retiro de su validador. Para los validadores regulares (0x01), cualquier saldo superior a 32 ETH se transfiere automáticamente a la dirección de retiro de forma periódica cada pocos días. Para los validadores de capitalización (0x02), las recompensas se capitalizan en el saldo del validador hasta 2048 ETH, y retirar por debajo de esa cantidad requiere activar un retiro parcial desde su dirección de retiro, lo que cuesta gas.

Los validadores también pueden salir por completo, lo que desbloquea todo el saldo de ETH restante. Después de completar el proceso de salida, el saldo total se transfiere a la dirección de retiro durante un barrido posterior del validador.

<ButtonLink href="/staking/withdrawals/">Más sobre los retiros de staking</ButtonLink>
</ExpandableCard>

<ExpandableCard title="¿Qué pasa si mi proveedor desaparece o no ejecuta la salida de mi validador?" eventCategory="SaasStaking" eventName="clicked what if my provider disappears">
Si sus credenciales de retiro apuntan a una dirección que usted controla, puede salir del validador usted mismo y recuperar su participación; consulte [Modelo de confianza: qué evaluar](#trust-model-what-to-evaluate).

Si el proveedor posee las credenciales de retiro (como ocurre con el staking con custodia y en exchanges), no hay forma a nivel de protocolo de que recupere los fondos de forma independiente; su recurso se limita a los propios procesos del proveedor.
</ExpandableCard>

<ExpandableCard title="¿Qué pasa si sufro un recorte?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Al utilizar un proveedor de staking delegado, está confiando la operación de su nodo a otra persona. Esto conlleva el riesgo de un rendimiento deficiente del nodo, que no está bajo su control. En caso de que su validador sufra un recorte, se aplica una penalización inicial proporcional al saldo de su validador (que se hizo significativamente menor en la actualización Pectra), y su validador es expulsado por la fuerza del conjunto de validadores.

Una vez finalizado el proceso de recorte/salida, los fondos restantes se transfieren a la dirección de retiro asignada al validador.

Póngase en contacto con los proveedores individuales para obtener más detalles sobre cualquier garantía u opción de seguro. Si prefiere tener el control total de la configuración de su validador, [obtenga más información sobre cómo hacer staking en solitario con sus ETH](/staking/solo/).
</ExpandableCard>

## Más información {#further-reading}

- [¿Qué es el staking como servicio?](https://figment.io/insights/what-is-staking-as-a-service/) - _Figment_
- [El directorio de staking de Ethereum](https://www.staking.directory/) - _Eridian y Spacesider_
- [Evaluación de los servicios de staking](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_
- [EIP-7002: Retiros activables por la capa de ejecución](https://eips.ethereum.org/EIPS/eip-7002) - _la especificación para salir de un validador desde su dirección de retiro_