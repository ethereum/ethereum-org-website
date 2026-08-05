---
title: "Especial del Día de la Privacidad de los Datos - Vigilancia de metadatos y Nym"
description: "Una conversación en el Día de la Privacidad de los Datos sobre la vigilancia de metadatos: qué revelan los metadatos sobre ti incluso cuando el contenido de los mensajes está cifrado, y cómo funcionan las herramientas de privacidad a nivel de red como Nym para protegerlos."
lang: es
youtubeId: "QBX5AK3DXqw"
uploadDate: 2023-01-30
duration: "0:07:49"
educationLevel: beginner
topic:
  - "privacy"
format: interview
author: Nym
breadcrumb: "Privacidad"
---

Un reportaje de **Nym** con la científica jefa de Nym, Claudia Diaz, que explora la mecánica de los metadatos, su papel fundamental en la vigilancia moderna, los detalles personales que exponen y los pasos que podemos dar para recuperar nuestra privacidad.

*Esta transcripción es una copia accesible de la [transcripción original del video](https://www.youtube.com/watch?v=QBX5AK3DXqw) publicada por Nym. Ha sido ligeramente editada para facilitar su lectura.*

#### Introducción (0:04) {#intro-004}

¿Qué son los metadatos de las comunicaciones? Se refieren a todo lo relacionado con una comunicación que no es el contenido de lo que realmente se está diciendo. Esto incluye, por ejemplo, el origen de la comunicación, el destino, la hora a la que se envía la información, cuánta información se envía y cualquier patrón detectable, incluidos los tiempos y tamaños de los paquetes que se intercambian.

#### Metadatos de las comunicaciones (0:27) {#communications-metadata-027}

Los metadatos de las comunicaciones están expuestos por defecto en todos los protocolos de internet: TCP/IP, HTTP, UDP, FTP. Incluso los protocolos seguros como TLS o DNS seguro, que protegen el contenido con cifrado de extremo a extremo, siguen mostrando los metadatos de las comunicaciones: el origen, el destino, el tiempo, la longitud, etc.

Así que esta información está expuesta, pero ¿a quién? ¿Quién puede obtenerla?

#### Quién tiene acceso a los metadatos (1:10) {#who-gets-access-to-metadata-110}

Hay una serie de entidades que son intermediarias en las comunicaciones de internet que pueden acceder a estos metadatos de las comunicaciones. Esto incluye a los grandes actores de la infraestructura de internet, como los proveedores de servicios de internet, los puntos de intercambio, los sistemas autónomos, los enrutadores BGP y los participantes de la red troncal de internet en general; ellos pueden tener acceso a una gran cantidad de metadatos de las comunicaciones. 

Pero incluso los actores pequeños, como quienquiera que esté administrando el enrutador Wi-Fi o una red de área local, o alguien que pueda espiar localmente, también tienen acceso a los metadatos de las comunicaciones. Y, por supuesto, se sabe que adversarios a nivel de estado-nación como la NSA recopilan metadatos a gran escala y los analizan para extraer todo tipo de inteligencia.

#### Por qué son importantes los metadatos (2:00) {#why-is-metadata-important-200}

Hay más razones por las que los metadatos son un tipo de datos muy interesante para recopilar y explotar. Son legibles por máquinas, porque hablan el lenguaje de las computadoras; es básicamente un lenguaje para que las computadoras puedan enrutar las comunicaciones desde su origen hasta su destino de manera adecuada. Por lo tanto, son legibles por máquinas, y eso significa que las máquinas pueden darles sentido a gran escala muy fácilmente, a diferencia del lenguaje humano natural, que es mucho más difícil de interpretar, porque tal vez las personas usan las palabras de cierta manera, o tienen matices, y esto es mucho más difícil de interpretar. Los metadatos, por otro lado, son realmente fáciles.

También tienen un volumen mucho menor que el contenido. Si piensas en un video de YouTube, por ejemplo, el contenido en sí puede ser de varios gigabytes, pero los metadatos solo incluirían cuál es la URL del video, cuántos bytes contiene y a qué hora se vio. Por lo tanto, pueden ser mucho menos que el contenido real, y también son manejables en términos de tamaño.

Los metadatos también tienen una protección mucho menor que el contenido. No es legal simplemente interceptar las comunicaciones de las personas y mirar el contenido, esto está protegido por la ley. Pero los metadatos, debido a que no se consideran tan sensibles, tienen una protección mucho menor. Por lo tanto, muchas entidades pueden recopilar legalmente estos metadatos y analizarlos para obtener información sobre lo que las personas están haciendo en internet.

Entonces, ¿es esto un gran problema? Podemos decir: "Bueno, solo son metadatos. Mientras no sepas lo que estoy diciendo, ¿debería realmente preocuparme de que sepas con quién hablo y a qué hora?" 

Hay algunas citas que muestran cómo los metadatos se consideran en realidad extremadamente valiosos. El asesor general de la NSA, Stewart Baker, dijo que los metadatos te dicen absolutamente todo sobre la vida de alguien: si tienes suficientes metadatos, realmente no necesitas el contenido. Así de poderosos son para poder entender en qué está interesada una persona, cuál es su red social, cuáles son sus pasatiempos, cuáles son sus intenciones, cuáles son sus intereses. En realidad, no necesitas escuchar lo que están diciendo; es suficiente con que puedas observar todos los metadatos.

Y Whitfield Diffie y Susan Landau, en su libro *Privacy on the Line*, dicen que el análisis de tráfico, no el criptoanálisis, es la columna vertebral de la inteligencia de comunicaciones. Esto se debe a que puedes recopilarlo a gran escala, puedes analizarlo a gran escala, y te dará todos los grandes patrones, todo el panorama general, que luego te permite acercarte para irrumpir en los objetivos específicos que encuentres más interesantes. Pero los encuentras primero con el análisis de tráfico en los metadatos.

El análisis de tráfico de los metadatos puede incluso usarse para recuperar contenido cifrado sin romper la criptografía. Supongamos que tenemos una criptografía perfecta: ninguna cantidad de criptoanálisis es capaz de romperla, y las claves secretas son perfectamente secretas. Deberíamos tener la confianza de que este contenido está protegido y que un adversario no es capaz de obtener información sobre este contenido.

Sin embargo, hay muchas situaciones en las que el análisis de tráfico de los metadatos de las comunicaciones puede actuar como un canal lateral que revela este contenido cifrado.

#### Vigilancia de metadatos (5:15) {#metadata-surveillance-515}

Un ejemplo es cuando navegas por un sitio web con HTTPS. En principio, debido a que la comunicación con este sitio web está cifrada, alguien que esté observando tu comunicación no puede saber a qué página específica estás accediendo en el sitio web. Por ejemplo, si vas a WebMD para consultar enfermedades, un observador o espía podrá ver: "De acuerdo, estás consultando información médica en WebMD", pero no puede saber qué enfermedad específica estás buscando.

Sin embargo, la forma de saber lo que alguien está haciendo en este escenario sería que un adversario primero descargara todas las páginas del sitio y registrara, para cada página, el patrón de paquetes que se ven en la línea de comunicación. Básicamente, qué número de paquetes va en qué dirección, cuáles son los tamaños de estos paquetes y cuál es el período entre un paquete y el siguiente. 

Al hacer esto, puedes construir una huella digital de cada una de estas páginas, de modo que cuando el objetivo esté descargando una página del sitio cifrado, puedas hacer coincidir el número de paquetes en cada dirección y sus tamaños para adivinar qué página web específica están mirando, a pesar de que la página web en sí está cifrada y no deberías poder conocer este contenido.

Esto es obviamente preocupante. Aunque podamos tener cifrado de extremo a extremo, estamos muy lejos de haber terminado en términos de proteger la privacidad de nuestras comunicaciones.

#### Una lista de deseos para las comunicaciones privadas (6:40) {#a-wish-list-for-private-communications-640}

Entonces, si quisiéramos tener una lista de deseos de lo que ofrecería una red de comunicación perfectamente segura, ¿cuáles son las propiedades que queremos? 

Obviamente, queremos proteger lo que un usuario está diciendo a través del canal cifrado, y el cifrado de extremo a extremo ya es un paso muy importante para lograrlo. Pero no solo eso, también queremos ocultar con quién se está comunicando el usuario, es decir, quién es el interlocutor, de quién estás recibiendo paquetes o a quién estás enviando paquetes. También la ubicación, es decir, desde dónde te estás comunicando; cuándo y durante cuánto tiempo te estás comunicando; cuántos bytes de datos estás intercambiando; y cualquier otro patrón en la comunicación. E incluso podrías llegar a decir que queremos ocultar si alguien se está comunicando o no.

Todas estas son propiedades que los sistemas de comunicación anónima pretenden proporcionar, y en el espacio de soluciones, las redes mixtas (mixnets) son una de las mejores soluciones que tenemos para proporcionar este tipo de propiedades.