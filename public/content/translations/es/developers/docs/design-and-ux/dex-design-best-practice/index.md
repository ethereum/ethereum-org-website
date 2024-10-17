---
title: Mejores prácticas de diseño para exchanges descentralizados (DEX)
description: Guía que explica las decisiones de UX/UI para el intercambio de tokens.
lang: es
---

Desde el lanzamiento de Uniswap en 2018, se han creado cientos de exchanges, o plataformas de intercambio, descentralizados en docenas de diferentes cadenas de bloques.
Muchos de ellos han introducido nuevos elementos o han añadido su propio toque, pero la interfaz ha seguido siendo la misma en general.

Una de las razones es la [Ley de Jakob](https://lawsofux.com/jakobs-law/):

> Los usuarios pasan la mayor parte de su tiempo en otros sitios. Esto significa que los usuarios prefieren que su sitio funcione igual que todos los demás que ya conocen.

Gracias a innovadores como Uniswap, Pancakeswap y Sushiswap, los usuarios de DeFi tienen una idea colectiva clara de lo que es un DEX.
Por este motivo, ahora está surgiendo algo así como "buenas prácticas". Vemos que cada vez se están estandarizando más decisiones de diseño en diferentes sitios. Puede ver la evolución de los DEX como un ejemplo gigante de prueba en vivo. Las cosas que han funcionado se quedaron; las que no se desecharon. Todavía hay espacio para cuestiones particulares o la personalización, pero hay ciertas normas a las que debe ajustarse un DEX.

Este artículo es un resumen de:

- qué incluir;
- cómo hacerlo lo más fácil de usar posible;
- las principales formas de personalizar el diseño.

Todos los wireframes de ejemplo se hicieron específicamente para este artículo, aunque todos se basan en proyectos reales.

El kit de Figma también está incluido en la parte inferior: ¡siéntase libre de utilizarlo y acelerar sus propios wireframes!

## Anatomía básica de un DEX {#basic-anatomy-of-a-dex}

La interfaz de usuario suele constar de tres elementos:

1. Formulario principal
2. Botón
3. Panel de detalles

![Interfaz de usuario de DEX genérica, que muestra los tres elementos principales](./1.png)

## Variaciones {#variations}

Este será un tema común en este artículo, pero hay varias formas diferentes de organizar estos elementos. El "panel de detalles" puede estar:

- Sobre el botón
- Debajo del botón
- Oculto en un panel acordeón
- Y/o en un modal de "vista previa"

Nota: El modal de "vista previa" es opcional, pero, si se muestran muy pocos detalles en la interfaz de usuario principal, se convierte en esencial.

## Estructura del formulario principal {#structure-of-the-main-form}

Esta es la casilla en la que elige qué token quiere intercambiar. El componente consta de un campo de entrada y un pequeño botón en la misma fila.

Los DEX suelen mostrar detalles adicionales en una fila superior y otra inferior, aunque esto puede configurarse de diferentes formas.

![Fila de entrada, con filas de detalles arriba y abajo](./2.png)

## Variaciones {#variations2}

Aquí se muestran dos variaciones de la interfaz de usuario: una sin bordes, que crea un diseño muy abierto y otra en donde la fila de entrada tiene un borde centrando la atención en ese elemento.

![Dos variaciones de interfaz de usuario del formulario principal](./3.png)

Esta estructura básica permite mostrar **cuatro datos clave** en el diseño: uno en cada esquina. Si solo hay una fila superior/inferior, entonces solo hay dos espacios disponibles.

A lo largo de la evolución de DeFi, se han incluido aquí muchas cosas diferentes.

## Información clave a incluir {#key-info-to-include}

- Saldo en la billetera
- Botón Max
- Equivalente Fiat
- Repercusión del precio en el importe "recibido"

En los primeros tiempos de DeFi, a menudo faltaba el equivalente en fiat. Si está construyendo cualquier tipo de proyecto Web3, es esencial que aparezca un equivalente fiat. Los usuarios siguen pensando en términos de moneda local, por lo que, para ajustarse a los modelos mentales del mundo real, debe incluirse.

En el segundo campo (en el que elige el token al que va a cambiar) también puede incluir el impacto del precio junto al importe en moneda fiat, calculando la diferencia entre el importe de entrada y el importe estimado resultante. Es muy útil incluir este detalle.

Los botones de porcentaje (por ejemplo, 25%, 50%, 75%) pueden ser útiles, pero ocupan más espacio, añaden más llamados a la acción y añaden más carga mental. Lo mismo ocurre con los deslizadores de porcentaje. Algunas de estas decisiones sobre la interfaz de usuario dependerán de su marca y de su tipo de usuario.

Debajo del formulario principal se pueden mostrar detalles adicionales. Como este tipo de información es sobre todo para usuarios profesionales, tiene sentido:

- Mantenerla lo más simple posible o
- Ocultarla en un panel de acordeón

![Detalles mostrados en las esquinas de ese formulario principal](./4.png)

## Información adicional a incluir {#extra-info-to-include}

- Precio del token
- Deslizamiento
- Mínimo recibido
- Salida esperada
- Impacto en el precio
- Estimación del costo de gas
- Otras tarifas
- Enrutamiento de pedidos

Se podría decir que algunos de estos detalles pueden ser opcionales.

El enrutamiento de pedidos es interesante, pero no hace mucha diferencia para la mayoría de los usuarios.

Algunos otros detalles simplemente están repitiendo lo mismo de diferentes maneras. Por ejemplo, "mínimo recibido" y "deslizamiento" son dos caras de la misma moneda. Si tiene el deslizamiento establecido en el 1%, entonces el mínimo que puede esperar recibir = salida esperada -1%. Algunas interfaces de usuario mostrarán la cantidad esperada, la cantidad mínima y el deslizamiento… lo cual es útil, pero posiblemente exagerado.

La mayoría de los usuarios dejarán el deslizamiento predeterminado de todos modos.

El "impacto del precio" a menudo se muestra entre paréntesis junto al equivalente fiat en el campo "a". Este es un gran detalle para agregar para la experiencia de usuario, pero si se muestra aquí, ¿realmente es necesario mostrarlo de nuevo a continuación? ¿Y luego de nuevo en una pantalla de vista previa?

Muchos usuarios (especialmente aquellos que intercambian pequeñas cantidades) no se preocuparán por estos detalles; simplemente ingresarán un número y presionarán Cambiar.

![Algunos detalles muestran lo mismo](./5.png)

Los detalles exactos que se muestren dependerán de su público y del aspecto que quiera que transmita la aplicación.

Si incluye la tolerancia al deslizamiento en el panel de detalles, también debería hacerla editable directamente desde aquí. Este es un buen ejemplo de "acelerador", un truco de UX que puede acelerar los flujos de los usuarios experimentados sin afectar a la usabilidad general de la aplicación.

![El deslizamiento puede controlarse desde el panel de detalles](./6.png)

Es una buena idea pensar detenidamente no solo en un dato concreto de una pantalla, sino en todo el flujo a través de ella:
Introducir números en el formulario principal → Escanear detalles → Hacer clic en la pantalla de vista previa (si tiene una pantalla de vista previa).
¿El panel de detalles debe estar visible en todo momento, o es necesario que el usuario haga clic en él para ampliarlo?
¿Debería crear fricción añadiendo una pantalla de vista previa? Esto obliga al usuario a reducir la velocidad y considerar la operación, lo que puede ser útil. Pero, ¿querrán volver a ver toda la misma información? ¿Qué es lo más útil para ellos en este momento?

## Opciones de diseño {#design-options}

Como se mencionó, mucho de esto se reduce a su estilo personal.
¿Quién es su usuario?
¿Cuál es su marca?
¿Quiere una interfaz "profesional" que muestre cada detalle o quiere ser minimalista?
Incluso si está apuntando a usuarios profesionales que quieran toda la información posible, aún debería recordar las sabias palabras de Alan Cooper:

> No importa lo atractiva que sea, no importa lo genial que se vea su interfaz, lo mejor al fin y al cabo es ver lo menos posible.

### Estructura {#estructura}

- Tokens a la izquierda o tokens a la derecha
- 2 filas o 3
- Detalles sobre o debajo del botón
- Detalles ampliados, minimizados o no mostrados

### Estilo de los componentes {#component-style}

- Vacíos
- Delineados
- Rellenos

Desde un punto de vista puramente de la experiencia de usuario, el estilo de la interfaz de usuario importa menos de lo que se cree. Las tendencias visuales van y vienen, y muchas preferencias son subjetivas.

La forma más fácil de hacerse una idea y pensar en las distintas configuraciones es ver algunos ejemplos y luego experimentar.

El kit de Figma incluido contiene componentes vacíos, delineados y rellenos.

Eche un vistazo a los siguientes ejemplos para ver las distintas formas en que puede combinarlo todo:

![3 filas en estilo relleno](./7.png)

![3 filas en un estilo delineado](./8.png)

![2 filas en estilo vacío](./9.png)

![3 filas en estilo contorneado, con un panel de detalles](./10.png)

![3 filas con la fila de entrada en un estilo delineado](./11.png)

![2 filas en un estilo relleno](./12.png)

## Pero, ¿de qué lado debería ir el token? {#but-which-side-should-the-token-go-on}

La conclusión es que probablemente no haga una gran diferencia en la usabilidad. Sin embargo, hay algunas cosas a tener en cuenta que podrían influir en la modalidad elegida.

Ha sido medianamente interesante ver cómo cambiaba la moda con el tiempo. Al principio, Uniswap tenía el token a la izquierda, pero ahora la ha desplazado a la derecha. Sushiswap también hizo este cambio durante una actualización de diseño. La mayoría de los protocolos, aunque no todos, han seguido su ejemplo.

Tradicionalmente, las convenciones financieras anteponen el símbolo de la moneda a la cifra, por ejemplo, $50, €50, £50, pero nosotros _decimos_ 50 dólares, 50 euros, 50 libras.

Para el usuario en general, especialmente alguien que lee de izquierda a derecha, de arriba a abajo, el token de la derecha probablemente se sienta más natural.

![Una interfaz de usuario con tokens a la izquierda](./13.png)

Poner el token a la izquierda y todos los números a la derecha se ve agradablemente simétrico, lo cual es una ventaja, pero hay otro inconveniente en este diseño.

La ley de proximidad establece que los elementos que están cerca se perciben como relacionados. En consecuencia, queremos colocar artículos relacionados uno al lado del otro. El saldo de tokens está directamente relacionado con la propio token, y cambiará cada vez que se seleccione un nuevo token. Por lo tanto, tiene un poco más de sentido que el saldo del token esté al lado del botón de selección del token. Se podría mover debajo del token, pero eso rompería la simetría del diseño.

En última instancia, hay ventajas y desventajas para ambas opciones, pero es interesante cómo la tendencia parece ser colocar el token del lado derecho.

# Comportamiento del botón {#button-behavior}

No tenga un botón separado para Aprobar. Tampoco tenga un clic separado para Aprobar. El usuario quiere intercambiar, así que solo tiene que decir "intercambiar" en el botón e iniciar la aprobación como primer paso. Un modal puede mostrar el progreso con un paso a paso, o una simple notificación "tx 1 de 2 - aprobación".

![Una interfaz de usuario con botones separados para aprobar e intercambiar](./14.png)

![Una interfaz de usuario con un botón que dice aprobar](./15.png)

## Botón como ayuda contextual {#button-as-contextual-help}

El botón puede tener una doble función como una ¡alerta!

En realidad, este es un patrón de diseño bastante inusual fuera de Web3, pero se ha convertido en un estándar dentro de ella. Esta es una buena innovación, ya que ahorra espacio y mantiene la atención centrada.

Si la acción principal, Intercambiar, no está disponible debido a un error, se puede explicar el motivo con el botón, por ej.:

- Cambiar de red
- Conectar billetera
- Varios errores

El botón también puede ser **mapeado a la acción** a realizar. Por ejemplo, si el usuario no puede realizar el intercambio porque está en la red equivocada, el botón debería decir "cambiar a Ethereum", y cuando el usuario haga clic en el botón, debería cambiar la red a Ethereum. Esto acelera considerablemente el flujo del usuario.

![Acciones clave iniciadas desde el CTA principal](./16.png)

![Mensaje de error mostrado en el CTA principal](./17.png)

## Construya el suyo con este archivo figma {#build-your-own-with-this-figma-file}

Gracias a la ardua labor de múltiples protocolos, el diseño de DEX ha mejorado mucho. Sabemos qué información necesita el usuario, cómo debemos mostrarla y cómo hacer que el flujo sea lo más fluido posible.
Esperamos que este artículo ofrezca una sólida visión general de los principios de la UX.

Si quiere experimentar, no dude en utilizar el kit de wireframe de Figma. Es lo más sencillo posible, pero tiene suficiente flexibilidad para construir la estructura básica de varias maneras.

[Kit de wireframe de Figma](https://www.figma.com/community/file/1393606680816807382/dex-wireframes-kit)

DeFi seguirá evolucionando y siempre hay margen de mejora.

¡Buena suerte!
