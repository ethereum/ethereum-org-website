---
title: Participación como servicio
description: Una visión general de cómo empezar con la participación agrupada de ETH
lang: es
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-saas.png
alt: Leslie, el rinoceronte, flotando en las nubes.
sidebarDepth: 2
summaryPoints:
  - Nodos de terceros gestionan la operación de su cliente validador
  - Excelente opción para cualquier persona con 32 ETH que no se sienta cómoda tratando con la complejidad técnica de ejecutar un nodo
  - Desconfíe y mantenga la custodia de sus claves de retirada
---

## ¿Qué es participación como servicio (SaaS)? {#what-is-staking-as-a-service}

La participación como servicio (SaaS), representa una categoría de servicios de participación donde deposita 32 ETH para la validación, pero se delegan las operaciones del nodo a un tercero. A cambio se le suele guiar por la configuración inicial, incluida la generación de claves y el depósito, para luego cargar las claves de firma al operador. Esto permite que el servicio maneje su validador en su nombre, generalmente, a cambio de una cuota mensual.

## ¿Por qué debería participar con un servicio? {#why-stake-with-a-service}

El protocolo de Ethereum no respalda originariamente la delegación de participaciones y, por tanto, estos servicios se han creado con el fin de cubrir esta demanda. Si tiene 32 ETH para participar, pero no domina con confianza el hardware, los servicios de participación (SaaS) le permiten delegar la parte técnica mientras gana recompensas de bloques nativos.

<CardGrid>
  <Card title="Su propio validador" emoji=":desktop_computer:" description="Deposit your own 32 ETH to activate your own set of signing keys that will participate in Ethereum consensus. Monitor your progress with dashboards to watch those ETH rewards accumulate." />
  <Card title="Es fácil comenzar" emoji="🏁" description="Forget about hardware specs, setup, node maintenance and upgrades. SaaS providers let you outsource the hard part by uploading your own signing credentials, allowing them to run a validator on your behalf, for a small cost." />
  <Card title="Limite su riesgo" emoji=":shield:" description="In many cases users do not have to give up access to the keys that enable withdrawing or transferring staked funds. These are different from the signing keys, and can be stored separately to limit (but not eliminate) your risk as a staker." />
</CardGrid>

<StakingComparison page="saas" />

## Qué hay que tener en cuenta {#what-to-consider}

Hay un número creciente de proveedores de SAAS para ayudarle a apostar sus ETH, pero todos tienen sus propias ventajas y riesgos. Todas las opciones SaaS requieren suposiciones adicionales de confianza en comparación con la participación desde casa. Las opciones SaaS pueden suponer el uso de un codigo adicional para los clientes de Ethereum que no es abierto ni auditable. SaaS tambien causa un efecto perjudicial en la descentralizacion de la red. Dependiendo de la configuracion, se puede controlar o no la validacion: el operador puede actuar deshonestamente usando sus ETH.

Los indicadores de atributos se utilizan para señalar las fortalezas o debilidades notables que puede tener un proveedor aprobado de SaaS. Utilice esta sección como referencia sobre cómo definimos estos atributos, mientras está eligiendo el servicio que le ayudará con su experiencia de participación.

<StakingConsiderations page="saas" />

## Explorar proveedores de servicios de participación {#saas-providers}

A continuación se muestran algunos proveedores de SaaS disponibles. Utilice los indicadores de arriba para guiarse a través de estos servicios

<ProductDisclaimer />

### Proveedores SaaS

<StakingProductsCardGrid category="saas" />

Por favor, tenga en cuenta la importancia de elegir [clientes diversos](/developers/docs/nodes-and-clients/client-diversity/) ya que mejora la seguridad de la red y limita su riesgo. Los servicios que tienen constatación de limitar el uso de cliente mayoritario están señalados como <em style={{ textTransform: "uppercase" }}>"diversidad de cliente de ejecución"</em> y <em style={{ textTransform: "uppercase" }}>"diversidad de cliente de consenso".</em>

### Generadores de claves

<StakingProductsCardGrid category="keyGen" />

¿Tiene alguna sugerencia para un proveedor de participación como servicio que no hayamos mencionado? Eche un vistazo a nuestra [política de listado de productos](/contributing/adding-staking-products/) para ver si le parece una opción aceptable y enviarla para su revisión.

## Preguntas más frecuentes {#faq}

<ExpandableCard title="¿Quién tiene mis claves?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Los acuerdos difieren de proveedor a proveedor, pero comúnmente se le guiará a través de la configuración de las claves de firma que necesite (una por 32 ETH), y subirlos a su proveedor para permitirles validar en su nombre. Las llaves de firma por sí solas no dan ninguna capacidad para retirar, transferir o gastar sus fondos. Sin embargo, sí proporcionan la capacidad de emitir votos a favor del consenso. Si no se hace correctamente, puede dar lugar a sanciones fuera de línea o a un recorte.
</ExpandableCard>

<ExpandableCard title="Entonces, ¿hay dos conjuntos de claves?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Sí. Cada cuenta se compone de ambas claves BLS <em>para firmar</em> y claves BLS <em>para retirar</em>. Para que un validador certifique el estado de la cadena, participe en comités de sincronización y proponga bloques, las claves de firma deben ser fácilmente accesibles por el cliente validador. Estos deben estar conectados a Internet de alguna forma, y por lo tanto se consideran inherentemente como claves «calientes». Este es un requisito para que su validador pueda certificar y, por lo tanto, las claves utilizadas para transferir o retirar fondos están separadas por razones de seguridad.

Las claves BLS de retirada se utilizan para firmar un mensaje de una sola vez que declara a qué cuenta de la capa de ejecución deberían ir las recompensas de participación y los fondos sacados. Una vez que este mensaje se difunda, las claves <em>BLS de retirada</em> ya no son necesarias. En cambio, el control sobre los fondos retirados se delega permanentemente a la dirección que usted proporcionó. Esto le permite establecer una dirección de retiro segura a través de su propio almacenamiento en frío, minimizando el riesgo para sus fondos de validador, incluso si alguien controla las claves de firmado de validador.

Para habilitar la retirada, es necesario actualizar las credenciales\*. Este proceso implica generar las claves de retirada usando su frase mnemotécnica de recuperación.

<strong>Asegúrese de hacer una copia de esta frase de recuperación de forma segura, o no podrá generar sus claves de retirada cuando llegue el momento.</strong>

\*Los participantes que proporcionaran una dirección de retirada con depósito inicial no necesitan establecerla. Consulte con su proveedor de SaaS para obtener ayuda acerca de cómo preparar su validador.
</ExpandableCard>

<ExpandableCard title="¿Cuándo puedo retirar?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
En abril de 2023, se habilitó la retirada de participaciones en la actualización Shanghai/Capella. Los participantes deben proporcionar una dirección de retirada (si no se proporciona en el depósito inicial), y los pagos de recompensas se distribuirán automáticamente de forma periódica cada pocos días.

Los validadores también pueden salir como validadores, lo que desbloqueará su saldo restante en ETH para retirarlo. Las cuentas que hayan proporcionado una dirección de retirada de ejecución y hayan completado el proceso de salida recibirán su saldo completo a la dirección de retirada proporcionada durante el próximo barrido del validador.

<ButtonLink href="/staking/withdrawals/">Más sobre los retiros de Staking</ButtonLink>
</ExpandableCard>

<ExpandableCard title="¿Qué sucede si recibo una penalización?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Al usar un proveedor SaaS, está confiando la operación de su nodo a otra persona. Esto conlleva el riesgo de un funcionamiento deficiente del nodo, que no está bajo su control. En el caso de que recorte la actividad de su validador, el saldo de su validador será penalizado y eliminado forzosamente del grupo de validadores.

Al finalizar el proceso de recorte y salida, estos fondos se transferirán a la dirección de retirada asignada al validador. Para habilitar la retirada, es preciso proporcionar una dirección. Puede haberse proporcionado en un depósito inicial. De lo contrario, se tendrán que usar las claves de retirada del validador para firmar un mensaje declarando una dirección de retirada. Si no se ha proporcionado ninguna dirección de retirada, los fondos permanecerán bloqueados hasta que se proporcione.

Póngase en contacto con un proveedor individual de SaaS para obtener más detalles sobre cualquier garantía u opciones de seguridad, así como para obtener instrucciones de configuración de una dirección de retirada. Si prefiere tener control total de la configuración de su validador, <a href="/staking/solo/">infórmese sobre cómo apostar sus ETH en solitario</a>.
</ExpandableCard>

## Para profundizar sobre el tema {#further-reading}

- [El directorio de participación de Ethereum](https://www.staking.directory/), _Eridian y Spacesider_
- [Examen de los servicios de participación](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_
