---
title: "Cadena de bloques — ETH.BUILD"
description: "Una demostración de cómo funciona la minería de la cadena de bloques, incluyendo cómo se enlazan los bloques, cómo la prueba de trabajo (PoW) asegura las cadenas de bloques y qué sucede cuando alguien intenta alterar los datos."
lang: es
youtubeId: "zcX7OJ-L8XQ"
uploadDate: 2021-01-14
duration: "0:22:44"
educationLevel: beginner
topic:
  - "mining"
  - "blockchain"
format: tutorial
author: Austin Griffith
breadcrumb: "Cadena de bloques (ETH.BUILD)"
---

Un tutorial de **Austin Griffith** que demuestra cómo funciona la minería de la cadena de bloques utilizando la herramienta de programación visual ETH.BUILD. Austin cubre el consenso de prueba de trabajo (PoW), el enlazado de bloques, la dificultad de minería, las recompensas de bloque y la inmutabilidad de la cadena.

*Esta transcripción es una copia accesible de la [transcripción original del video](https://www.youtube.com/watch?v=zcX7OJ-L8XQ) publicada por Austin Griffith. Ha sido ligeramente editada para facilitar su lectura.*

#### El problema de la coordinación (0:00) {#the-problem-of-coordination-000}

¡Buenos días, feliz viernes de pajarita! Este ETH.BUILD se centra en la cadena de bloques, algo realmente genial. Estamos en este barco de payasos, con nuestra pajarita de Bitcoin para la ocasión. Aquí vamos.

Hasta ahora en el plan de estudios, hemos repasado a fondo los pares de claves, los hashes y los libros mayores. Lo que descubrimos es que si queremos transaccionar valor de un lado a otro en una red distribuida (no centralizada), terminamos teniendo problemas de coordinación. Terminamos con este problema en el que no podemos llegar a un consenso entre partes dispares porque todas reciben diferentes transacciones en diferentes momentos. Hay muchas formas distintas de resolver esto, pero ninguna era excelente hasta que apareció la prueba de trabajo (PoW).

Cubrimos a los generales bizantinos como una misión secundaria, y lo que aprendimos allí es que los generales necesitaban demostrar que tenían un ejército cuando enviaban mensajes a través de una red insegura. Entonces, la parte receptora podía saber que esa persona era de hecho un general con un ejército que iba a atacar, y podían coordinarse.

#### Los bloques y el nonce (1:04) {#blocks-and-the-nonce-104}

Así que con este libro mayor, estamos introduciendo transacciones desde la red. En lugar de hacer que cada usuario individual demuestre su trabajo, vamos a abstraer la prueba de trabajo en un bloque de transacciones y dejaremos que un minero trabaje en ello.

Traemos un bloque que contiene transacciones: cualquier cosa que llegue a través de la red, la cargamos en este bloque. Si observamos la estructura de este bloque, también tiene un nonce. Ese nonce nos permite ajustar el hash. Si tomamos todo este bloque, lo convertimos en cadena de texto y lo hasheamos, obtenemos un hash. A medida que cambian las transacciones, ese hash cambia, pero también a medida que cambiamos el nonce, el hash también cambia.

Estamos haciendo algo de trabajo aquí: tenemos un conjunto aleatorio de transacciones y estamos cambiando el nonce hasta que el hash tenga un cero a la izquierda. Si viste la misión secundaria sobre los generales bizantinos, elegimos este cero a la izquierda como una cantidad arbitraria de trabajo a demostrar. Así que el nonce simplemente pasa por cada número (uno, dos, tres, cuatro) y cuando obtenemos un cero a la izquierda, decimos: ese es un bloque válido.

#### La prueba de trabajo en acción (3:00) {#proof-of-work-in-action-300}

Si tomamos un bloque minado, extraemos el hash y lo introducimos en una función hash, podemos demostrar que tiene un cero a la izquierda; podemos demostrar que se ha trabajado en este bloque.

La función hash cuesta CPU, que es un recurso limitado. Estamos utilizando toda nuestra potencia de CPU intentando encontrar un hash con ceros a la izquierda. Una vez que lo hacemos, tenemos un bloque válido: el bloque está básicamente congelado. Las transacciones que estuvieran allí en ese momento ahora están en este bloque, y todos lo respetan, y podemos pasar al siguiente bloque.

#### Enlazando bloques (3:56) {#chaining-blocks-together-356}

Aquí está el truco: tomamos el bloque antiguo y lo conectamos al nuevo bloque. Si observamos la estructura, el nuevo bloque no tiene transacciones y tiene un nonce vacío, pero tiene un padre con transacciones. El bloque anterior va a ser parte del siguiente bloque, por lo que tendremos toda una cadena.

Introducimos las últimas transacciones del pool de transacciones y trabajamos en encontrar un nonce. El bloque número dos es minado: necesitábamos un nonce de diez para hacer que estas transacciones fueran válidas. Luego hacemos lo mismo: conectamos el bloque antiguo, traemos el nuevo, introducimos las últimas transacciones que haya y trabajamos en ello de nuevo. Después de suficientes intentos, encontramos un nonce para el bloque tres. Bloque cuatro: el mismo proceso, y seguimos avanzando.

#### Dificultad de minería (5:02) {#mining-difficulty-502}

Esto es demasiado fácil: podemos encontrar un bloque válido muy rápidamente y queremos que sea más difícil. Voy a subir la dificultad a dos. Conectamos el bloque cinco, traemos las últimas transacciones y dejamos que un contador trabaje a toda marcha. Ahora estamos minando: usando nuestra limitada potencia de CPU para lanzar hashes aleatorios arbitrariamente a esto hasta que encontremos un hash con dos ceros a la izquierda, porque la dificultad ha aumentado. Eso va a tomar un poco de tiempo.

Ahora tenemos esta cadena de bloques de cinco bloques. Esos bloques contienen transacciones y cada uno hace referencia al anterior. Cada bloque requirió una cantidad arbitraria de trabajo para producirse, y la cantidad de trabajo está controlada por la dificultad.

#### El minero (6:46) {#the-miner-646}

Veamos qué es un minero. En el problema de los generales bizantinos, el general que quería "atacar al amanecer" necesitaba soldados. Lo que sucede dentro de cada soldado es exactamente lo que estamos haciendo aquí con nuestro minero: estamos tomando un mensaje y un nonce y lanzándolo a una función hash tan rápido como podemos, intentando obtener esos ceros a la izquierda. Los ceros a la izquierda son algo arbitrario en lo que todos hemos acordado: esto es suficiente trabajo para demostrar que eres un soldado, o que puedes librar una guerra.

Déjenme traer a un minero y hacer esto un poco más rápido. El minero va a hacer lo mismo para nuestros bloques: toma las transacciones que provienen del pool de transacciones, las introduce en el bloque y simplemente trabaja en ello hasta que encuentra un hash válido.

El minero es un poco más eficiente. Está más centrado en la minería. Está lanzando hashes aleatoriamente: eso es exactamente lo que nuestro minero estaba haciendo antes, solo que abstraído. Podemos verlo funcionando en segundo plano, simplemente trabajando a tope con los hashes. Lo encontró: el bloque seis está minado.

#### Doble gasto y propagación en la red (10:00) {#double-spends-and-network-propagation-1000}

Ahora hablamos sobre este problema del doble gasto, e incluso este problema de la propagación en la red. Cuando tenemos un libro mayor y una red distribuida y alguien envía una transacción, llega a diferentes personas en diferentes momentos. Por lo tanto, podríamos tener dos mineros en la red que minen un bloque exactamente al mismo tiempo, y que tengan diferentes transacciones en ellos.

Cada uno es válido en ese momento: ambos hicieron la prueba de trabajo, ambos tienen ceros a la izquierda. Pero no pueden ser ambos canónicos. No pueden ser ambos la verdad. Así que necesitamos una forma de que la red llegue a un consenso sobre cuál es la cadena real.

#### Múltiples mineros y consenso (12:27) {#multiple-miners-and-consensus-1227}

Déjenme tomar este bloque y moverlo aquí. Lo que quiero son dos mineros diferentes trabajando en el mismo problema, escuchando el mismo pool de transacciones y creando bloques de forma independiente. Tenemos dos mineros: Mallory y Mike. He subido la dificultad a tres, y ambos están trabajando en encontrar un hash con tres ceros a la izquierda.

¡Así que Mallory encontró un bloque primero! Genial. Ahora qué sucede: debido a que estamos en una red distribuida, es posible que Mike ni siquiera sepa sobre el bloque de Mallory todavía. Podría seguir trabajando en su propia versión. Y ahora Mike también encontró uno. Así que tenemos dos caminos válidos.

Si eres un par en la red y ves el bloque de Mallory primero, piensas que ese es el bloque principal. Luego, más tarde, llega el bloque de Mike. Mantienes ambos por si acaso uno de ellos se convierte en la cadena más larga. Y la regla es: sigue la cadena válida más larga.

#### Coinbase y recompensas de bloque (15:33) {#coinbase-and-block-rewards-1533}

Cuando un minero mina un bloque, decimos: aquí están todas las transacciones que queremos, aquí está el nonce, aquí está el padre; pero también vamos a decir aquí está la persona que minó ese bloque. Se llama coinbase (creo que ahora hay una empresa que se llama así, pero es diferente). Simplemente lo llamaremos "minero". Así que nuestros bloques ahora requieren un campo de minero.

Así que Mike acaba de encontrar el bloque, y Mike también va a obtener un valor de diez de esto. Necesitamos incentivar a los mineros para que hagan todo este trabajo, ¿verdad? Están gastando dinero para comprar estos equipos y básicamente hacer que la red sea segura. Estos mineros están gastando dinero para asegurar la red con todo su poder de hash (con todos los mineros combinados, tal vez decenas de miles). Están pagando un buen dinero para construir equipos que trabajen en estos hashes, y para incentivarlos les damos una parte llamada recompensa de bloque por cada bloque que minan.

#### Recompensas de bloque e incentivos (16:52) {#block-rewards-and-incentives-1652}

Así que en esta versión del bloque, Mallory tiene diez dólares, pero en esta versión Mike tiene diez dólares. Cada uno de estos dos jugadores está incentivado a seguir por su propia cadena, y el resto de la red necesita encontrar un consenso. Básicamente se reduce a quién tiene la cadena válida más larga.

Mike va a configurar su bloque como el padre y comenzará a trabajar en el siguiente bloque. Mallory va a hacer lo mismo. Y todo se reduce a quién más en la red elige qué lado. Dado que no queremos castigar a las personas con malas redes, estoy bastante seguro de que en Ethereum pagamos a los bloques tío (bloques válidos que no lograron entrar en la cadena más larga) porque todavía están ayudando a asegurar la red.

Teníamos este problema de coordinación y consenso, y lo resolvimos poniendo esta cantidad arbitraria de trabajo que tiene que estar involucrada para hacer que las transacciones sean válidas. Mallory hizo todo este trabajo de hashing y hashing y hashing para encontrar tres ceros a la izquierda de un hash de todas estas transacciones y el bloque anterior.

#### Consultando la cadena de bloques (18:30) {#querying-the-blockchain-1830}

Podemos comunicarnos con la cadena más larga, sea cual sea. Mike aún no ha llegado a siete, así que podemos ver que la altura sigue siendo seis por aquí. Y podemos hacer cosas como consultar los saldos de las personas. Así que presionamos saldo, ¿qué obtenemos? Quinientos veinticuatro. Así que Heidi ha estado sentada sobre 524 o cualquiera que sea el token nativo para esta cadena. Podemos ver su nonce, podemos hacer todo lo que podíamos hacer con el libro mayor, pero ahora estamos apilando bloques y esos bloques contienen transacciones.

Hemos abstraído el trabajo de los usuarios, que simplemente están enviando dinero, a los mineros, y los hemos incentivado dándoles esta recompensa de bloque. También habrá una pequeña cantidad que cada persona paga por transacción, pero llegaremos a eso en un episodio posterior. No queremos hablar de gas en este momento, pero ayuda saber que hay un incentivo no solo para minar un bloque, sino para minar un bloque completo con muchas transacciones. Pero ese es un incentivo menor; llegaremos a eso eventualmente.

#### Inmutabilidad de la cadena (19:51) {#chain-immutability-1951}

A medida que se minan los bloques, se vuelven cada vez más seguros. Déjenme mostrarles a qué me refiero. Así que Mike minó un bloque, Mallory estaba por aquí haciendo una demostración y no pudo minar un bloque. Así que ahora la cadena de Mike va a ser la más larga, y se propagará por la red. Todos la verán y dirán: de acuerdo, esta cadena tiene siete bloques, todos son válidos; esta es la que vamos a seguir. Puedes tener bifurcaciones duras (hard forks), bifurcaciones polémicas, donde las reglas bajo las que jugamos van a cambiar y diferentes grupos de humanos quieren seguir diferentes cadenas. Cosas geniales.

Bien, finalmente, si volvemos al bloque tres y cambiamos algo (cambiamos cualquier pequeño detalle), voy a entrar aquí. Hay alguna transacción para Frank. Digamos que en lugar de Frank lo cambiamos a Eve. Ahora miren lo que sucede cuando presiono aceptar: miren eso. Cambié una pequeña parte del bloque tres y, de repente, toda la cadena se desmorona. Ya no es válida. Si fuera a transmitir eso por la red, la gente se reiría de mí y me echaría.

No puedes cambiar nada una vez que se mina un bloque a menos que regreses y vuelvas a minar las cosas a medida que cambian. Básicamente tendría que conectar al minero de nuevo aquí e intentar tener suficiente poder para alcanzar a Mike hasta aquí con siete bloques. Sería muy, muy difícil. Cuanto más profundo es un bloque, más difícil es revertirlo. El hecho de que este bloque tres aquí donde Carlos envió 84 a Bob... Bob puede estar bastante seguro sabiendo que, a múltiples bloques de profundidad, ese dinero está ahí con certeza. No hay forma de que haya alguna bifurcación polémica aquí; estoy a salvo. Eso es lo que llamamos finalidad.

#### Resumen (22:00) {#summary-2200}

En lugar de tener un libro mayor y este problema de consenso, usamos la prueba de trabajo (PoW) para trabajar a tope en un hash y validar un bloque, y "válido" significa un número arbitrario de ceros a la izquierda. Todavía nos encontraremos con problemas a medida que construimos la cadena de bloques, donde los bloques minados pueden llegar a diferentes lugares en diferentes momentos. Así que tenemos un algoritmo de consenso adicional que dice: sigue la cadena más larga que sea válida y que siga el conjunto de reglas en el que deseas participar.

¡Muy bien, feliz viernes de pajarita! Eso fue la cadena de bloques en ETH.BUILD. Guardaré esto y lo subiré para que simplemente puedan presionar "cargar" y tener una cadena con la que jugar. ¡Feliz viernes!