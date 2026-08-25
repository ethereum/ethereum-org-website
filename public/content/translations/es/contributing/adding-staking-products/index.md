---
title: Añadir productos o servicios de staking
description: La política que utilizamos al añadir productos o servicios de staking a ethereum.org
lang: es
---

Queremos asegurarnos de enumerar los mejores recursos posibles mientras mantenemos a los usuarios seguros y confiados.

Cualquier persona es libre de sugerir que se añada un producto o servicio de staking en ethereum.org. Si hay alguno que hayamos pasado por alto, **[¡por favor, sugiérelo!](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml)**

Actualmente enumeramos productos y servicios de staking en las siguientes páginas:

- [Staking en solitario](/staking/solo/)
- [Staking como servicio](/staking/saas/)
- [Pools de staking](/staking/pools/)

La prueba de participación (PoS) en la cadena de balizas ha estado activa desde el 1 de diciembre de 2020. Aunque el staking es todavía relativamente nuevo, hemos intentado crear un marco justo y transparente para su consideración en ethereum.org, pero los criterios de inclusión cambiarán y evolucionarán con el tiempo, y en última instancia quedan a discreción del equipo del sitio web de ethereum.org.

## El marco de decisión {#the-decision-framework}

La decisión de incluir un producto en ethereum.org no depende de un solo factor. Se consideran múltiples criterios en conjunto al decidir incluir un producto o servicio. Cuantos más de estos criterios se cumplan, más probable será que se incluya.

**Primero, ¿a qué categoría de producto o servicio pertenece?**

- Herramientas de nodo o cliente
- Gestión de claves
- Staking como servicio (SaaS)
- Pool de staking

Actualmente, solo enumeramos productos o servicios en estas categorías.

### Criterios de inclusión {#criteria-for-inclusion}

Las propuestas de productos o servicios de staking se evaluarán según los siguientes criterios:

**¿Cuándo se lanzó el proyecto o servicio?**

- ¿Hay pruebas de cuándo el producto o servicio estuvo disponible para el público?
- Esto se utiliza para determinar la puntuación de "probado en batalla" del producto.

**¿Se mantiene activamente el proyecto?**

- ¿Hay un equipo activo desarrollando el proyecto? ¿Quién está involucrado?
- Solo se considerarán los productos que se mantengan activamente.

**¿El producto o servicio está libre de intermediarios humanos/de confianza?**

- ¿Qué pasos en el recorrido del usuario requieren confiar en humanos para que guarden las claves de sus fondos o para que distribuyan adecuadamente las recompensas?
- Esto se utiliza para determinar la puntuación "sin necesidad de confianza" del producto o servicio.

**¿El proyecto proporciona información precisa y fiable?**

- Es crucial que el sitio web del producto presente información actualizada, precisa y no engañosa, particularmente si se refiere al protocolo Ethereum u otras tecnologías relacionadas.
- Las propuestas que contengan desinformación, detalles desactualizados o declaraciones potencialmente engañosas sobre Ethereum u otros temas relevantes no se incluirán o se eliminarán si ya están incluidas.

**¿Qué plataformas son compatibles?**

- es decir, Linux, macOS, Windows, iOS, Android

#### Software y contratos inteligentes {#software-and-smart-contracts}

Para cualquier software personalizado o contratos inteligentes involucrados:

**¿Es todo de código abierto?**

- Los proyectos de código abierto deben tener un repositorio de código fuente disponible públicamente.
- Esto se utiliza para determinar la puntuación de "código abierto" del producto.

**¿El producto está fuera del desarrollo en _beta_?**

- ¿En qué punto de su ciclo de desarrollo se encuentra el producto?
- Los productos en fase beta no se consideran para su inclusión en ethereum.org.

**¿El software se ha sometido a una auditoría de seguridad externa?**

- Si no es así, ¿hay planes para realizar una auditoría externa?
- Esto se utiliza para determinar la puntuación de "auditado" del producto.

**¿El proyecto tiene un programa de recompensas por errores?**

- Si no es así, ¿hay planes para crear un programa de recompensas por errores de seguridad?
- Esto se utiliza para determinar la puntuación de "recompensas por errores" del producto.

#### Herramientas de nodo o cliente {#node-or-client-tooling}

Para productos de software relacionados con la configuración, gestión o migración de nodos o clientes:

**¿Qué clientes de la capa de consenso (es decir, Lighthouse, Teku, Nimbus, Prysm, Grandine) son compatibles?**

- ¿Qué clientes son compatibles? ¿Puede elegir el usuario?
- Esto se utiliza para determinar la puntuación "multicliente" del producto.

#### Staking como servicio {#staking-as-a-service}

Para [listados de staking como servicio](/staking/saas/) (es decir, operación de nodo delegada):

**¿Cuáles son las tarifas asociadas con el uso del servicio?**

- ¿Cuál es la estructura de tarifas? Por ejemplo, ¿hay una tarifa mensual por el servicio?
- ¿Algún requisito adicional para hacer staking?

**¿Se requiere que los usuarios se registren para obtener una cuenta?**

- ¿Puede alguien usar el servicio sin permisos o KYC?
- Esto se utiliza para determinar la puntuación "sin permisos" del producto.

**¿Quién posee las claves de firma y las claves de retiro?**

- ¿A qué claves mantiene acceso el usuario? ¿A qué claves obtiene acceso el servicio?
- Esto se utiliza para determinar la puntuación "sin necesidad de confianza" del producto.

**¿Cuál es la diversidad de clientes de los nodos que se están operando?**

- ¿Qué porcentaje de claves de validador están siendo ejecutadas por un cliente mayoritario de la capa de consenso (CL)?
- En la última edición, Prysm es el cliente de la capa de consenso ejecutado por la mayoría de los operadores de nodos, lo cual es peligroso para la red. Si algún cliente de la capa de consenso está siendo utilizado actualmente por más del 33 % de la red, solicitamos datos relacionados con su uso.
- Esto se utiliza para determinar la puntuación de "clientes diversos" del producto.

#### Pool de staking {#staking-pool}

Para [servicios de staking conjunto](/staking/pools/):

**¿Cuál es el mínimo de ETH requerido para hacer staking?**

- p. ej., 0,01 ETH

**¿Cuáles son las tarifas o requisitos de staking involucrados?**

- ¿Qué porcentaje de las recompensas se retira como tarifas?
- ¿Algún requisito adicional para hacer staking?

**¿Hay un token de liquidez?**

- ¿Cuáles son los tokens involucrados? ¿Cómo funcionan? ¿Cuáles son las direcciones del contrato?
- Esto se utiliza para determinar la puntuación de "token de liquidez" del producto.

**¿Pueden los usuarios participar como operadores de nodo?**

- ¿Qué se requiere para ejecutar clientes de validador utilizando los fondos conjuntos?
- ¿Requiere esto permiso de un individuo, empresa o DAO?
- Esto se utiliza para determinar la puntuación de "nodos sin permisos" del producto.

**¿Cuál es la diversidad de clientes de los operadores de nodos del pool?**

- ¿Qué porcentaje de operadores de nodos están ejecutando un cliente mayoritario de la capa de consenso (CL)?
- En la última edición, Prysm es el cliente de la capa de consenso ejecutado por la mayoría de los operadores de nodos, lo cual es peligroso para la red. Si algún cliente de la capa de consenso está siendo utilizado actualmente por más del 33 % de la red, solicitamos datos relacionados con su uso.
- Esto se utiliza para determinar la puntuación de "clientes diversos" del producto.

### Otros criterios: aspectos deseables {#other-criteria}

**¿Qué interfaces de usuario son compatibles?**

- es decir, aplicación de navegador, aplicación de escritorio, aplicación móvil, CLI

**Para las herramientas de nodo, ¿el software proporciona una forma fácil de cambiar entre clientes?**

- ¿Puede el usuario cambiar de cliente de forma fácil y segura utilizando la herramienta?

**Para SaaS, ¿cuántos validadores están siendo operados actualmente por el servicio?**

- Esto nos da una idea del alcance de su servicio hasta ahora.

## Cómo mostramos los resultados {#product-ordering}

Los [criterios de inclusión](#criteria-for-inclusion) anteriores se utilizan para calcular una puntuación acumulativa para cada producto o servicio. Esto se utiliza como un medio para clasificar y mostrar productos que cumplen con ciertos criterios objetivos. Cuantos más criterios se demuestren, más alto se clasificará un producto, y los empates se aleatorizarán al cargar.

La lógica del código y los pesos para estos criterios se encuentran actualmente en [este componente de JavaScript](https://github.com/ethereum/ethereum-org-website/blob/dev/src/components/Staking/StakingProductsCardGrid/index.tsx#L350) en nuestro repositorio.

## Añade tu producto o servicio {#add-product}

Si deseas añadir un producto o servicio de staking a ethereum.org, crea un issue en GitHub.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml">
  Crear un issue
</ButtonLink>