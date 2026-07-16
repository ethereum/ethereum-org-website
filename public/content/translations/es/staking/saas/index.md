---
title: Staking como servicio
description: Aprenda sobre el staking como servicio
lang: es
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-saas.png
alt: El rinoceronte Leslie flotando en las nubes.
sidebarDepth: 2
summaryPoints:
  - Operadores de nodos externos se encargan de la operación de su cliente de validador
  - Excelente opción para cualquier persona con 32 ETH que no se sienta cómoda lidiando con la complejidad técnica de ejecutar un nodo
  - Reduzca la confianza y mantenga la custodia de sus claves de retiro
---

## ¿Qué es el staking como servicio? {#what-is-staking-as-a-service}

El staking como servicio ("SaaS") representa una categoría de servicios de staking en la que usted deposita sus propios 32 ETH para un validador, pero delega las operaciones del nodo a un operador externo. Este proceso generalmente implica ser guiado a través de la configuración inicial, incluyendo la generación de claves y el depósito, para luego cargar sus claves de firma al operador. Esto permite que el servicio opere su validador en su nombre, generalmente por una tarifa mensual.

## ¿Por qué hacer staking con un servicio? {#why-stake-with-a-service}

El protocolo [Ethereum](/) no admite de forma nativa la delegación de participación, por lo que estos servicios se han desarrollado para satisfacer esta demanda. Si tiene 32 ETH para hacer staking, pero no se siente cómodo lidiando con el hardware, los servicios SaaS le permiten delegar la parte difícil mientras gana recompensas de bloque nativas.

<Grid>
  <Card title="Tu propio validador" emoji=":desktop_computer:" description="Deposita tus propios 32 ETH para activar tu propio conjunto de claves de firma que participarán en el consenso de Ethereum. Monitorea tu progreso con paneles de control para ver cómo se acumulan esas recompensas de ETH." />
  <Card title="Fácil de empezar" emoji="🏁" description="Olvídate de las especificaciones de hardware, la configuración, el mantenimiento del nodo y las actualizaciones. Los proveedores de SaaS te permiten externalizar la parte difícil al subir tus propias credenciales de firma, permitiéndoles ejecutar un validador en tu nombre por un pequeño costo." />
  <Card title="Limita tu riesgo" emoji=":shield:" description="En muchos casos, los usuarios no tienen que renunciar al acceso a las claves que permiten retirar o transferir los fondos en staking. Estas son diferentes de las claves de firma y pueden almacenarse por separado para limitar (pero no eliminar) tu riesgo como staker." />
</Grid>

<StakingComparison page="saas" />

## Qué tener en cuenta {#what-to-consider}

Hay un número creciente de proveedores de SaaS para ayudarle a hacer staking con sus ETH, pero todos tienen sus propios beneficios y riesgos. Todas las opciones de SaaS requieren supuestos de confianza adicionales en comparación con el staking en casa. Las opciones de SaaS pueden tener código adicional envolviendo a los clientes de Ethereum que no es abierto ni auditable. El SaaS también tiene un efecto perjudicial en la descentralización de la red. Dependiendo de la configuración, es posible que no controle su validador: el operador podría actuar de manera deshonesta utilizando sus ETH.

A continuación, se utilizan indicadores de atributos para señalar las fortalezas o debilidades notables que puede tener un proveedor de SaaS de la lista. Utilice esta sección como referencia sobre cómo definimos estos atributos mientras elige un servicio que le ayude en su viaje de staking.

<StakingConsiderations page="saas" />

## Explorar proveedores de servicios de staking {#saas-providers}

A continuación se muestran algunos proveedores de SaaS disponibles. Utilice los indicadores anteriores para guiarse a través de estos servicios.

<ProductDisclaimer />

### Proveedores de SaaS {#saas-providers-2}

<StakingProductsCardGrid category="saas" />

Tenga en cuenta la importancia de apoyar la [diversidad de clientes](/developers/docs/nodes-and-clients/client-diversity/), ya que mejora la seguridad de la red y limita su riesgo. Los servicios que tienen evidencia de limitar el uso de clientes mayoritarios se indican con <em style={{ textTransform: "uppercase" }}>"diversidad de clientes de ejecución"</em> y <em style={{ textTransform: "uppercase" }}>"diversidad de clientes de consenso".</em>

### Generadores de claves {#key-generators}

<StakingProductsCardGrid category="keyGen" />

¿Tiene alguna sugerencia sobre un proveedor de staking como servicio que hayamos pasado por alto? Consulte nuestra [política de listado de productos](/contributing/adding-staking-products/) para ver si encajaría bien y enviarlo para su revisión.

## Preguntas frecuentes {#faq}

<ExpandableCard title="¿Quién tiene mis claves?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Los acuerdos diferirán de un proveedor a otro, pero comúnmente se le guiará a través de la configuración de las claves de firma que necesite (una por cada 32 ETH) y la carga de estas a su proveedor para permitirles validar en su nombre. Las claves de firma por sí solas no otorgan ninguna capacidad para retirar, transferir o gastar sus fondos. Sin embargo, sí proporcionan la capacidad de emitir votos para el consenso, lo que, si no se hace correctamente, puede resultar en penalizaciones por inactividad o recortes.
</ExpandableCard>

<ExpandableCard title="¿Entonces hay dos conjuntos de claves?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Sí. Cada cuenta está compuesta tanto por claves de <em>firma</em> BLS como por claves de <em>retiro</em> BLS. Para que un validador pueda dar fe del estado de la cadena, participar en comités de sincronización y proponer bloques, las claves de firma deben ser fácilmente accesibles para un cliente de validador. Estas deben estar conectadas a Internet de alguna forma y, por lo tanto, se consideran inherentemente claves "calientes". Este es un requisito para que su validador pueda dar fe y, por lo tanto, las claves utilizadas para transferir o retirar fondos se separan por razones de seguridad.

Las claves de retiro BLS se utilizan para firmar un mensaje único que declara a qué cuenta de la capa de ejecución deben ir las recompensas de staking y los fondos de salida. Una vez que se transmite este mensaje, las claves de <em>retiro BLS</em> ya no son necesarias. En su lugar, el control sobre los fondos retirados se delega permanentemente a la dirección que proporcionó. Esto le permite establecer una dirección de retiro asegurada a través de su propio almacenamiento en frío, minimizando el riesgo para los fondos de su validador, incluso si otra persona controla las claves de firma de su validador.

Actualizar las credenciales de retiro es un paso obligatorio para habilitar los retiros\*. Este proceso implica generar las claves de retiro utilizando su frase semilla mnemotécnica.

<strong>Asegúrese de hacer una copia de seguridad de esta frase semilla de forma segura o no podrá generar sus claves de retiro cuando llegue el momento.</strong>

\*Los stakers que proporcionaron una dirección de retiro con el depósito inicial no necesitan configurar esto. Consulte con su proveedor de SaaS para obtener asistencia sobre cómo preparar su validador.
</ExpandableCard>

<ExpandableCard title="¿Cuándo puedo retirar?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
Los stakers deben proporcionar una dirección de retiro (si no se proporcionó en el depósito inicial), y los pagos de recompensas comenzarán a distribuirse automáticamente de forma periódica cada pocos días.

Los validadores también pueden realizar una salida completa como validador, lo que desbloqueará su saldo de ETH restante para su retiro. Las cuentas que hayan proporcionado una dirección de retiro de ejecución y completado el proceso de salida recibirán su saldo completo en la dirección de retiro proporcionada durante el próximo barrido de validadores.

<ButtonLink href="/staking/withdrawals/">Más sobre los retiros de staking</ButtonLink>
</ExpandableCard>

<ExpandableCard title="¿Qué pasa si sufro un recorte?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Al utilizar un proveedor de SaaS, está confiando la operación de su nodo a otra persona. Esto conlleva el riesgo de un rendimiento deficiente del nodo, lo cual no está bajo su control. En caso de que su validador sufra un recorte, el saldo de su validador será penalizado y eliminado por la fuerza del grupo de validadores.

Al finalizar el proceso de recorte/salida, estos fondos se transferirán a la dirección de retiro asignada al validador. Esto requiere proporcionar una dirección de retiro para habilitarlo. Es posible que se haya proporcionado en el depósito inicial. Si no es así, las claves de retiro del validador deberán utilizarse para firmar un mensaje declarando una dirección de retiro. Si no se ha proporcionado ninguna dirección de retiro, los fondos permanecerán bloqueados hasta que se proporcione.

Póngase en contacto con el proveedor de SaaS individual para obtener más detalles sobre cualquier garantía u opciones de seguro, y para obtener instrucciones sobre cómo proporcionar una dirección de retiro. Si prefiere tener el control total de la configuración de su validador, [obtenga más información sobre cómo hacer staking en solitario con sus ETH](/staking/solo/).
</ExpandableCard>

## Lecturas adicionales {#further-reading}

- [El directorio de staking de Ethereum](https://www.staking.directory/) - _Eridian y Spacesider_
- [Evaluación de servicios de staking](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_
