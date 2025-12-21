---
title: Añadir productos o servicios de participación
description: La política que utilizamos al añadir productos o servicios de participación a ethereum.org
lang: es
---

# Agregar productos o servicios de staking {#adding-staking-products-or-services}

Queremos asegurarnos de que incluimos los mejores recursos posibles al tiempo que velamos por la seguridad y confianza de nuestros usuarios.

Cualquiera es libre de sugerir un producto o servicio de participación que añadir a ethereum.org. Si hay alguno que nos hayamos saltado, **[sugiéralo](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml)!**

Actualmente incluimos productos y servicios de participación en las siguientes páginas:

- [Staking en solitario](/staking/solo/)
- [Staking como servicio](/staking/saas/)
- [Pools de staking](/staking/pools/)

La prueba de participación ha estado disponible en la cadena de baliza desde el 1 de diciembre de 2020. Si bien la participación es relativamente nueva, hemos intentado crear un marco justo y transparente para considerarlo en ethereum.org. Aún así, los criterios de la lista cambiarán y evolucionarán con el tiempo, que en última instancia estarán a discreción del equipo del sitio web ethereum.org.

## El marco de decisión {#the-decision-framework}

La decisión de incluir un producto en la lista de ethereum.org no depende de un único factor. Se tendrán en cuenta múltiples criterios de forma conjunta a la hora de decidir incluir un producto o servicio. Cuantos más criterios se cumplan, más probabilidad hay de que sean incluídos.

**En primer lugar, ¿qué categoría de producto o servicio es?**

- Nodo o herramienta de cliente
- Gestión de claves
- Participación como servicio (SaaS)
- Reserva de participación

Por el momento, sólo se incluyen los productos o servicios en las siguientes categorías.

### Criterios de inclusión {#criteria-for-inclusion}

Las productos o servicios de participación se evaluarán según los siguientes criterios:

**¿Cuándo se lanzó el proyecto o el servicio?**

- ¿Hay algún rastro de cuándo el producto o servicio se puso a disposición del público?
- Esto se usa para determinar la puntuación de la «puesta a prueba» del producto.

**¿El proyecto se mantiene activamente?**

- ¿Hay un equipo a cargo del desarrollo del proyecto? ¿Quién participa en este proceso?
- Solo se considerarán los productos que se mantengan de forma activa.

**¿El producto o servicio está libre de intermediarios humanos o de confianza?**

- ¿Qué pasos de la experiencia de usuario requieren confiar en los humanos, ya sea para guardar las claves de sus fondos o para distribuir ganancias de forma adecuada?
- Esto se usa para determinar la puntuación de «fiabilidad» del producto o servicios.

**¿El proyecto proporciona información precisa y fiable?**

- Es importante que las funcionalidades de la página de los productos esten al día, sean correctas y que no contengan información que pueda confundir. Especialmente, si tienen relación con el protoccolo de Ethereum u otras tecnologías afines.
- Los envíos que contengan información errónea, detalles obsoletos o declaraciones posiblemente erróneas sobre Ethereum u otros asuntos pertinentes no se incluirán o se eliminarán, en el caso de que ya estuvieran incluidos.

**¿Qué plataformas son compatibles?**

- es decir, Linux, macOS, Windows, iOS, Android

#### Software y contratos inteligentes {#software-and-smart-contracts}

Para cualquier software personalizado o contratos inteligentes involucrados:

**¿Es todo de código abierto?**

- Los proyectos de código abierto deben tener un repositorio público disponible.
- Esto se utiliza para determinar la puntuación de «código abierto» de los productos.

**¿El producto ha salido de la fase de desarrollo _beta_?**

- ¿En qué parte del ciclo de desarrollo se encuentra el producto?
- Productos en fase beta no están considerados para incluirlos en ethereum.org

**¿El software se ha sometido a una auditoría de seguridad externa?**

- En caso contrario, ¿hay planes de realizar una auditoría externa?
- Esto se utiliza para determinar la puntuación «auditada» de los productos.

**¿El proyecto tiene un programa de recompensas por errores?**

- En caso contrario, ¿hay planes para crear una recompensa por errores de seguridad?
- Esto se utiliza para determinar la puntuación de «código abierto» de los productos.

#### Herramientas de nodo o de cliente {#node-or-client-tooling}

Para productos de software relacionados con la configuración de nodo o cliente, administración o migración:

**¿Qué clientes de la capa de consenso (es decir, Lighthouse, Teku, Nimbus, Prysm, Grandine) son compatibles?**

- ¿Qué clientes se admiten? ¿Puede elegir el usuario?
- Esto se utiliza para determinar la puntuación «multicliente» de los productos.

#### Staking como servicio {#staking-as-a-service}

Para [listados de staking como servicio](/staking/saas/) (es decir, operación de nodo delegado):

**¿Cuáles son las comisiones asociadas al uso del servicio?**

- ¿Cuál es la estructura de comisiones?, p. ej., ¿existe una comisión mensual por el servicio?
- ¿Hay algún requisito adicional de participación?

**¿Se requiere que los usuarios se registren para obtener una cuenta?**

- ¿Se puede usar el servicio sin permiso o KYC?
- Esto se utiliza para determinar la puntuación «sin permiso» de los productos.

**¿Quién posee las claves de firma y las claves de retiro?**

- ¿A qué claves mantiene el usuario el acceso? ¿A qué claves accede el servicio?
- Esto se utiliza para determinar la puntuación «auditada» de los productos.

**¿Cuál es la diversidad de clientes de los nodos que se están operando?**

- ¿Qué porcentaje de claves de validador está siendo ejecutado por la parte mayoritaria de clientes de una capa de consenso (CL)?
- A partir de la última edición, Prysm es el cliente de la capa de consenso que está siendo gestionado por una mayoría de operadores de nodos, lo que es peligroso para la red. Si más del 33 % de la red utiliza actualmente algún cliente de CL, solicitamos datos relacionados con su uso.
- Esto se utiliza para determinar la puntuación «multicliente» de los productos.

#### Pool de staking {#staking-pool}

Para [servicios de staking en pool](/staking/pools/):

**¿Cuál es el mínimo de ETH necesario para hacer staking?**

- p. ej., 0,01 ETH

**¿Qué comisiones o requisitos de staking implica?**

- ¿Qué porcentaje de recompensas se eliminan como comisiones?
- ¿Hay algún requisito adicional de participación?

**¿Existe un token de liquidez?**

- ¿Cuáles son los tókenes involucrados? ¿Cómo funcionan? ¿Cuáles son las direcciones del contrato?
- Esto se utiliza para determinar la puntuación «liquidez del token» de los productos.

**¿Pueden los usuarios participar como operadores de nodo?**

- ¿Qué se requiere para ejecutar clientes validadores usando los fondos agrupados?
- ¿Esto requiere permiso de un individuo, empresa o DAO?
- Esto se utiliza para determinar la puntuación «sin permiso del nodo» de los productos.

**¿Cuál es la diversidad de clientes de los operadores de nodo del pool?**

- ¿Qué porcentaje de nodo de validador ejecuta el cliente de una capa de consenso (CL)?
- A partir de la última edición, Prysm es el cliente de la capa de consenso que está siendo gestionado por una mayoría de operadores de nodos, lo que es peligroso para la red. Si más del 33 % de la red utiliza actualmente algún cliente de CL, solicitamos datos relacionados con su uso.
- Esto se utiliza para determinar la puntuación «multicliente» de los productos.

### Otros criterios: los deseables {#other-criteria}

**¿Qué interfaces de usuario son compatibles?**

- es decir, aplicación de navegador, aplicación de escritorio, aplicación móvil, CLI

**Para las herramientas de nodo, ¿proporciona el software una forma fácil de cambiar entre clientes?**

- ¿El usuario puede cambiar fácilmente y de forma segura a sus clientes usando la herramienta?

**Para SaaS, ¿cuántos validadores operan actualmente en el servicio?**

- Esto nos da una idea del alcance de su servicio hasta ahora.

## Cómo mostramos los resultados {#product-ordering}

Los [criterios de inclusión](#criteria-for-inclusion) anteriores se utilizan para calcular una puntuación acumulada para cada producto o servicio. Esto se utiliza como un medio de clasificación y muestra de productos que cumplen ciertos criterios objetivos. Cuantos más criterios proporcionen las pruebas, mayor será la clasificación de un producto, con vínculos aleatorios.

La lógica del código y las ponderaciones de estos criterios se encuentran actualmente en [este componente de JavaScript](https://github.com/ethereum/ethereum-org-website/blob/dev/src/components/Staking/StakingProductsCardGrid.js#L350) en nuestro repositorio.

## Añada su producto o servicio {#add-product}

Si quiere añadir un producto o servicio de participación a ethereum.org, cree una incidencia en GitHub.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml">
  Crear una incidencia
</ButtonLink>
