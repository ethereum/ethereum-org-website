---
title: Mejores prácticas de diseño para intercambios descentralizados (DEX)
description: Una guía que explica las decisiones de UX/UI para el intercambio de tokens.
lang: es
---

Desde el lanzamiento de Uniswap en 2018, se han lanzado cientos de intercambios descentralizados en docenas de cadenas diferentes.
Muchos de estos introdujeron nuevos elementos o añadieron su propio toque, pero la interfaz se ha mantenido generalmente igual.

Una razón para esto es la [Ley de Jakob](https://lawsofux.com/jakobs-law/):

> Los usuarios pasan la mayor parte de su tiempo en otros sitios. Esto significa que los usuarios prefieren que su sitio funcione de la misma manera que todos los demás sitios que ya conocen.

Gracias a los primeros innovadores como Uniswap, Pancakeswap y Sushiswap, los usuarios de las finanzas descentralizadas (DeFi) tienen una idea colectiva de cómo se ve un DEX.
Por esta razón, ahora está surgiendo algo parecido a las "mejores prácticas". Vemos cada vez más decisiones de diseño estandarizándose en todos los sitios. Se puede ver la evolución de los DEX como un ejemplo gigante de pruebas en vivo. Las cosas que funcionaron se quedaron, las que no, se descartaron. Todavía hay espacio para la personalidad, pero hay ciertos estándares que un DEX debe cumplir.

Este artículo es un resumen de:
- qué incluir
- cómo hacerlo lo más utilizable posible
- las principales formas de personalizar el diseño

Todos los wireframes de ejemplo se hicieron específicamente para este artículo, aunque todos se basan en proyectos reales.

El kit de Figma también se incluye en la parte inferior: ¡siéntase libre de usarlo y acelerar sus propios wireframes!

## Anatomía básica de un DEX {#basic-anatomy-of-a-dex}

La interfaz de usuario (UI) generalmente contiene tres elementos:
1. Formulario principal
2. Botón
3. Panel de detalles

![Generic DEX UI, showing the three main elements](./1.png)


## Variaciones {#variations}

Este será un tema común en este artículo, pero hay varias formas diferentes en que se pueden organizar estos elementos. El "panel de detalles" puede estar:
- Encima del botón
- Debajo del botón
- Oculto en un panel de acordeón
- Y/o en un modal de "vista previa"
  
Nota: Un modal de "vista previa" es opcional, pero si muestra muy pocos detalles en la interfaz de usuario principal, se vuelve esencial.

## Estructura del formulario principal {#structure-of-the-main-form}

Esta es la caja donde realmente elige qué token desea intercambiar. El componente consta de un campo de entrada y un pequeño botón en una fila.

Los DEX generalmente muestran detalles adicionales en una fila arriba y una fila abajo, aunque esto se puede configurar de manera diferente.

![Input row, with a details row above and below](./2.png)

## Variaciones {#variations2}

Aquí se muestran dos variaciones de la interfaz de usuario; una sin bordes, creando un diseño muy abierto, y otra donde la fila de entrada tiene un borde, creando un enfoque en ese elemento.

![Two UI variations of the main form](./3.png)

Esta estructura básica permite mostrar **cuatro piezas clave de información** en el diseño: una en cada esquina. Si solo hay una fila superior/inferior, entonces solo hay dos lugares.

Durante la evolución de las finanzas descentralizadas (DeFi), se han incluido muchas cosas diferentes aquí.

## Información clave a incluir {#key-info-to-include}

- Saldo en la billetera
- Botón de máximo (Max)
- Equivalente en dinero fíat
- Impacto en el precio sobre la cantidad "recibida"

En los primeros días de las finanzas descentralizadas (DeFi), a menudo faltaba el equivalente en dinero fíat. Si está construyendo cualquier tipo de proyecto Web3, es esencial que se muestre un equivalente en dinero fíat. Los usuarios todavía piensan en términos de monedas locales, por lo que para coincidir con los modelos mentales del mundo real, esto debe incluirse.

En el segundo campo (aquel donde elige el token al que está intercambiando) también puede incluir el impacto en el precio junto a la cantidad de moneda fíat, calculando la diferencia entre la cantidad de entrada y las cantidades de salida estimadas. Este es un detalle bastante útil para incluir.

Los botones de porcentaje (por ejemplo, 25 %, 50 %, 75 %) pueden ser una característica útil, pero ocupan más espacio, agregan más llamadas a la acción y añaden más carga mental. Lo mismo ocurre con los controles deslizantes de porcentaje. Algunas de estas decisiones de interfaz de usuario dependerán de su marca y de su tipo de usuario.

Se pueden mostrar detalles adicionales debajo del formulario principal. Como este tipo de información es principalmente para usuarios profesionales, tiene sentido:
- mantenerlo lo más mínimo posible, o;
- ocultarlo en un panel de acordeón

![Details shown in the corners of that main form](./4.png)

## Información adicional a incluir {#extra-info-to-include}

- Precio del token
- Deslizamiento
- Mínimo recibido
- Salida esperada
- Impacto en el precio
- Estimación del costo del gas
- Otras tarifas
- Enrutamiento de órdenes

Podría decirse que algunos de estos detalles podrían ser opcionales.

El enrutamiento de órdenes es interesante, pero no hace mucha diferencia para la mayoría de los usuarios.

Algunos otros detalles simplemente reafirman lo mismo de diferentes maneras. Por ejemplo, "mínimo recibido" y "deslizamiento" son dos caras de la misma moneda. Si tiene el deslizamiento establecido en 1 %, entonces el mínimo que puede esperar recibir = salida esperada - 1 %. Algunas interfaces de usuario mostrarán la cantidad esperada, la cantidad mínima y el deslizamiento... Lo cual es útil pero posiblemente excesivo. 

La mayoría de los usuarios dejarán el deslizamiento predeterminado de todos modos.

El "impacto en el precio" a menudo se muestra entre paréntesis junto al equivalente en dinero fíat en el campo "hacia" (to). Este es un gran detalle de UX para agregar, pero si se muestra aquí, ¿realmente necesita mostrarse de nuevo a continuación? ¿Y luego otra vez en una pantalla de vista previa?

A muchos usuarios (especialmente a aquellos que intercambian pequeñas cantidades) no les importarán estos detalles; simplemente ingresarán un número y presionarán intercambiar.

![Some details show the same thing](./5.png)

Exactamente qué detalles se muestran dependerá de su audiencia y de la sensación que desee que tenga la aplicación.

Si incluye la tolerancia al deslizamiento en el panel de detalles, también debería hacerla editable directamente desde aquí. Este es un buen ejemplo de un "acelerador"; un ingenioso truco de UX que puede acelerar los flujos de los usuarios experimentados, sin afectar la usabilidad general de la aplicación.

![Slippage can be controlled from the details panel](./6.png)

Es una buena idea pensar cuidadosamente no solo en una pieza específica de información en una pantalla, sino en todo el flujo a través de:
Ingresar números en el formulario principal → Escanear detalles → Hacer clic en la pantalla de vista previa (si tiene una pantalla de vista previa). 
¿Debería el panel de detalles estar visible en todo momento, o el usuario necesita hacer clic en él para expandirlo?
¿Debería crear fricción agregando una pantalla de vista previa? Esto obliga al usuario a reducir la velocidad y considerar su operación, lo cual puede ser útil. Pero, ¿quieren ver toda la misma información de nuevo? ¿Qué es lo más útil para ellos en este punto?

## Opciones de diseño {#design-options}

Como se mencionó, mucho de esto se reduce a su estilo personal
¿Quién es su usuario?
¿Cuál es su marca?
¿Desea una interfaz "profesional" que muestre cada detalle, o desea ser minimalista?
Incluso si se dirige a los usuarios profesionales que desean toda la información posible, aún debe recordar las sabias palabras de Alan Cooper:

> No importa cuán hermosa, no importa cuán genial sea su interfaz, sería mejor si hubiera menos de ella.

### Estructura {#structure}

- tokens a la izquierda, o tokens a la derecha
- 2 filas o 3
- detalles arriba o abajo del botón
- detalles expandidos, minimizados o no mostrados

### Estilo del componente {#component-style}

- vacío
- delineado
- relleno

Desde un punto de vista puramente de UX, el estilo de la interfaz de usuario importa menos de lo que piensa. Las tendencias visuales van y vienen en ciclos, y gran parte de la preferencia es subjetiva.

La forma más fácil de familiarizarse con esto, y pensar en las diversas configuraciones diferentes, es echar un vistazo a algunos ejemplos y luego experimentar un poco por su cuenta.

El kit de Figma incluido contiene componentes vacíos, delineados y rellenos.

Eche un vistazo a los siguientes ejemplos para ver diferentes formas en que puede armarlo todo:

![3 rows in a filled style](./7.png)

![3 rows in a outlined style](./8.png)

![2 rows in an empty style](./9.png)

![3 rows in an outlined style, with a details panel](./10.png)

![3 rows with the input row in an outlined style](./11.png)

![2 rows in a filled style](./12.png)

## Pero, ¿en qué lado debería ir el token? {#but-which-side-should-the-token-go-on}

La conclusión es que probablemente no haga una gran diferencia en la usabilidad. Sin embargo, hay algunas cosas a tener en cuenta que podrían inclinarlo de un lado o del otro.

Ha sido un poco interesante ver cómo cambia la moda con el tiempo. Uniswap inicialmente tenía el token a la izquierda, pero desde entonces lo ha movido a la derecha. Sushiswap también hizo este cambio durante una actualización de diseño. La mayoría de los protocolos, pero no todos, han seguido su ejemplo.

La convención financiera tradicionalmente pone el símbolo de la moneda antes del número, por ejemplo, $50, €50, £50, pero *decimos* 50 dólares, 50 euros, 50 libras.

Para el usuario general, especialmente alguien que lee de izquierda a derecha, de arriba a abajo, el token a la derecha probablemente se sienta más natural.

![A UI with tokens on the left](./13.png)

Poner el token a la izquierda y todos los números a la derecha se ve agradablemente simétrico, lo cual es una ventaja, pero hay otra desventaja en este diseño.

La ley de proximidad establece que los elementos que están cerca unos de otros se perciben como relacionados. En consecuencia, queremos colocar elementos relacionados uno al lado del otro. El saldo del token está directamente relacionado con el token en sí, y cambiará cada vez que se seleccione un nuevo token. Por lo tanto, tiene un poco más de sentido que el saldo del token esté junto al botón de selección de token. Podría moverse debajo del token, pero eso rompe la simetría del diseño.

En última instancia, hay ventajas y desventajas para ambas opciones, pero es interesante cómo la tendencia parece ser hacia el token a la derecha.

## Comportamiento del botón {#button-behavior}

No tenga un botón separado para Aprobar. Tampoco tenga un clic separado para Aprobar. El usuario quiere Intercambiar, así que simplemente diga "intercambiar" en el botón e inicie la aprobación como el primer paso. Un modal puede mostrar el progreso con un indicador de pasos, o una simple notificación de "tx 1 de 2 - aprobando".

![A UI with separate buttons for approve and swap](./14.png)

![A UI with one button that says approve](./15.png)

### El botón como ayuda contextual {#button-as-contextual-help}

¡El botón puede cumplir una doble función como alerta!

En realidad, este es un patrón de diseño bastante inusual fuera de Web3, pero se ha convertido en un estándar dentro de él. Esta es una buena innovación, ya que ahorra espacio y mantiene la atención enfocada.

Si la acción principal (INTERCAMBIAR) no está disponible debido a un error, la razón se puede explicar con el botón, por ejemplo:

- cambiar de red
- conectar billetera
- varios errores

El botón también se puede **asignar a la acción** que debe realizarse. Por ejemplo, si el usuario no puede intercambiar porque está en la red incorrecta, el botón debería decir "cambiar a Ethereum", y cuando el usuario haga clic en el botón, debería cambiar la red a Ethereum. Esto acelera significativamente el flujo del usuario.

![Key actions being initiated from the main CTA](./16.png)

![Error message shown within the main CTA](./17.png)

## Construya el suyo propio con este archivo de Figma {#build-your-own-with-this-figma-file}

Gracias al arduo trabajo de múltiples protocolos, el diseño de los DEX ha mejorado mucho. Sabemos qué información necesita el usuario, cómo debemos mostrarla y cómo hacer que el flujo sea lo más fluido posible.
Con suerte, este artículo proporciona una descripción general sólida de los principios de UX. 

Si desea experimentar, no dude en utilizar el kit de wireframes de Figma. Se mantiene lo más simple posible, pero tiene suficiente flexibilidad para construir la estructura básica de varias maneras.

[Kit de wireframes de Figma](https://www.figma.com/community/file/1393606680816807382/dex-wireframes-kit)

Las finanzas descentralizadas (DeFi) continuarán evolucionando, y siempre hay margen de mejora. 

¡Buena suerte!