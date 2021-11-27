saltar al contenido
Su cuenta ha sido marcada.
Por eso, su perfil está oculto al público. Si cree que se trata de un error, póngase en contacto con el servicio de asistencia para que se revise el estado de su cuenta.
etéreo
/
ethereum-org-sitio web
Público
Ethereum.org es un recurso en línea principal para la comunidad Ethereum.

ethereum.org/
 Licencia MIT
 1.7k estrellas 1.7k tenedores 
Código
Cuestiones
95
Solicitudes de extracción
20
Comportamiento
Proyectos
Seguridad
Perspectivas
Último compromiso
@minimalsm
minimalsmo
...
hace 7 horas
Estadísticas de Git
Archivos
README.md
Netlify Status All Contributors Discord Twitter Follow Crowdin

ethereum logo

👋 ¡Bienvenido a ethereum.org!

Este es el repositorio del sitio web ethereum.org , un recurso para la comunidad Ethereum. El propósito del sitio es "Ser el mejor portal de Ethereum para nuestra creciente comunidad global" . Lea más sobre lo que esto significa aquí .

ethereum.org se mejora y cambia con el tiempo a través de las contribuciones de los miembros de la comunidad que envían contenido, brindan comentarios o ofrecen su tiempo como voluntarios para administrar su evolución. Si está interesado en ayudar a mejorar ethereum.org , descubra cómo contribuir .

¿Busca el código de la cadena de bloques de Ethereum?
Si está buscando la cadena de bloques Ethereum en sí, no hay un repositorio único. En cambio, Ethereum tiene múltiples implementaciones del protocolo escritas en diferentes lenguajes de programación para seguridad y diversidad. Mira las diferentes implementaciones

Cómo contribuir
Este proyecto sigue la especificación de todos los contribuyentes . ¡Contribuciones de cualquier tipo son bienvenidas!

Cómo se realizan las actualizaciones en ethereum.org:
Enviar un problema
Crea un nuevo problema .
Comente sobre el problema (si desea que se le asigne); de esa manera, nuestro equipo puede asignarle el problema .
Bifurcar el repositorio (repositorio)
Si no está seguro, aquí le mostramos cómo bifurcar el repositorio .
Configura tu entorno local (opcional)
Si está listo para contribuir y crear su PR, le ayudará a configurar un entorno local para que pueda ver sus cambios.

Configura tu entorno de desarrollo

Clona tu tenedor

Si es la primera vez que bifurca nuestro repositorio, esto es todo lo que necesita hacer para este paso:

$ git clone git@github.com:[your_github_handle]/ethereum-org-website.git && cd ethereum-org-website
Si ya ha bifurcado el repositorio, querrá asegurarse de que su bifurcación esté configurada y actualizada. Esto le evitará el dolor de cabeza de posibles conflictos de fusión.

Para configurar su fork :

$ git remote add upstream https://github.com/ethereum/ethereum-org-website.git
Para sincronizar su bifurcación con los últimos cambios :

$ git checkout dev
$ git fetch upstream
$ git merge upstream/dev
Instalar dependencias
$ yarn
Agregar token personal de la API de GitHub (gratis)
Recomendamos configurar esto cuando ejecute el proyecto localmente, ya que usamos la API de GitHub para obtener datos del repositorio para muchos proyectos y archivos.

Siga estas instrucciones para crear un token de API de GitHub personal
Al seleccionar ámbitos en el paso 8, deje todo sin marcar (los datos que obtenemos no requieren ningún ámbito )
En el directorio raíz del repositorio local: haga una copia .env.exampley asígnele un nombre.env
Copie y pegue su nuevo token de API de GitHub en .env
// .env Example:
GATSBY_GITHUB_TOKEN_READ_ONLY=48f84de812090000demo00000000697cf6e6a059
Agregue el token de la API de Etherscan (gratis)
Crea una cuenta en Etherscan
Navega a la página de configuración de tu cuenta
En la barra lateral, haga clic en 'API-KEYs' y agregue un nuevo token
Copie y pegue su Api-Key Token de Etherscan en .env
// .env Example:
ETHERSCAN_API_KEY=K6NUTARFJZJCIXHF1F1E1YGJZ8RQ29BE4U
Agregar token API DeFiPulse (gratis)
Siga esta guía para crear una cuenta y obtener su token API DeFiPulse
Copie y pegue su clave API activa de DeFiPulse en .env
// .env Example:
DEFI_PULSE_API_KEY=4953aaf7966dad9c129397e197a0630ed0594f66962dd5fb058972b250da
¡Haz cambios asombrosos!
Crea una nueva rama para tus cambios
$ git checkout -b new_branch_name
¡Empiece a desarrollar!
$ yarn start
Abra este directorio en su editor de texto / IDE favorito y vea sus cambios en vivo visitando localhost:8000desde su navegador
Consejo profesional: explore los scripts dentro package.jsonpara obtener más opciones de compilación
Comprometerse y prepararse para la solicitud de extracción (PR). En su mensaje de compromiso de relaciones públicas, haga referencia al problema que resuelve (vea cómo vincular un mensaje de compromiso a un problema usando una palabra clave ).
$ git commit -m "brief description of changes [Fixes #1234]"
Empuje a su cuenta de GitHub
$ git push
Desarrollo local con funciones lambda
Puede haber ocasiones en las que desarrolle funciones que realicen solicitudes de API externas a otros servicios. Para estos, escribimos funciones lambda para ofuscar las claves API. Para probarlos localmente, deberá hacer lo siguiente:

Descargue una extensión de navegador que habilite CORS (por ejemplo: https://chrome.google.com/webstore/search/cors ).
Habilite CORS en la extensión del navegador descargada.
Agregue la clave API relevante al .envarchivo.
Después de haber iniciado su servidor de desarrollo para ethereum.org (arriba), inicie un servidor netlify lambda usando:
yarn start:lambda
Cuando haga referencia a las funciones /.netlify para las llamadas al servidor, agregue un condicional para llamar a los puntos finales localhost: 9000 cuando no esté en el entorno de producción.
Envíe su PR
Después de que sus cambios se confirmen en su bifurcación de GitHub, envíe una solicitud de extracción (PR) a la devrama del ethereum/ethereum-org-websiterepositorio
En su descripción de relaciones públicas, haga referencia al problema que resuelve (consulte vincular una solicitud de extracción a un problema utilizando una palabra clave )
ex. Updates out of date content [Fixes #1234]
Netlify (nuestro servicio de alojamiento) implementa todos los RP en una URL de vista previa de acceso público, por ejemplo: Netlify deploy preview
Confirme la apariencia y las funciones de implementación de la vista previa de Netlify como se esperaba
¿Por qué no saludar y llamar la atención sobre sus relaciones públicas en nuestro servidor de discordia ?
Espere la revisión
El equipo del sitio web revisa todas las relaciones públicas
Vea cómo se toman las decisiones sobre los cambios de contenido
Los RP aceptables se aprobarán y fusionarán en la devsucursal
Liberación
master se sincroniza continuamente con Netlify y automáticamente implementará nuevas confirmaciones en ethereum.org
El equipo del sitio web se fusionará periódicamente deven master(por lo general varias veces por semana)
Puede ver el historial de lanzamientos , que incluyen aspectos destacados de relaciones públicas
Programa de traducción
El Programa de traducción es una iniciativa para traducir ethereum.org a diferentes idiomas y hacer que el sitio web sea accesible para personas de todo el mundo.

Si está buscando involucrarse como traductor, puede unirse a nuestro proyecto en Crowdin y comenzar a traducir el sitio web a su idioma de inmediato.

Para obtener más información sobre el programa, aprender a usar Crowdin, verificar el progreso o encontrar algunas herramientas útiles para traductores, visite la página del Programa de traducción .

La pila de sitios web de ethereum.org
Node.js
Administrador de paquetes de hilo
Gatsby
Gestiona la creación y la implementación de páginas
En configurable gatsby-node.js, gatsby-browser.js, gatsby-config.js, ygatsby-ssr.js
Tutorial de Gatsby
Gatsby Docs
React : una biblioteca de JavaScript para crear interfaces de usuario basadas en componentes
GraphQL : un lenguaje de consulta para API
Algolia : indexación del sitio, resultados de búsqueda rápidos dentro del sitio y análisis de búsqueda. Obtenga más información sobre cómo implementamos Algolia para la búsqueda de sitios .
Implementación primaria: /src/components/Search/index.js
Crowdin - crowdsourcing para nuestros esfuerzos de traducción (consulte "Iniciativa de traducción" a continuación)
Acciones de GitHub : administra CI / CD y seguimiento de problemas
Netlify : administración de DNS y host principal para la mastercompilación. También proporciona implementaciones de vista previa automáticas para todas las solicitudes de extracción.
Estructura de código
Carpeta	Uso primario
/src	Carpeta de origen principal para el desarrollo
/src/assets	Activos de imagen
/src/components	Reaccionar componentes que no funcionan como páginas independientes
/src/content	Archivos Markdown / MDX para el contenido del sitio almacenados aquí.
Por ejemplo: ethereum.org/en/about/se crea a partir de src/content/about/index.md
Los archivos de rebajas son analizados y representados por src/templates/static.js*
/src/content/developers/docs	* Los archivos de Markdown aquí usan la plantilla de Documentos: src/templates/docs.js
/src/content/developers/tutorials	* Los archivos de Markdown aquí usan la plantilla Tutorial: src/templates/tutorial.js
/src/data	Archivos de datos generales importables por componentes
/src/hooks	Ganchos de React personalizados
/src/intl	Archivos JSON de traducción de idiomas
/src/lambda	Scripts de función Lambda para llamadas a API
/src/pages
/src/pages-conditional	Reaccionar componentes que funcionan como páginas independientes.
Por ejemplo: ethereum.org/en/wallets/find-walletse construye a partir desrc/pages/wallets/find-wallet.js
/src/scripts
/src/utils	Scripts de utilidad personalizados
/src/styles	Almacena layout.cssque contiene estilo css de nivel raíz
/src/templates	Plantillas JSX que definen diseños de diferentes regiones del sitio.
/src/theme.js	Declara temas de color del sitio, puntos de interrupción y otras constantes (intente utilizar estos colores primero)
Convenciones del sitio web / mejores prácticas
❗️ Iniciativa de traducción
Lea atentamente si agrega o modifica cualquier contenido en lenguaje escrito.

La forma de preparar su contenido para la traducción depende de si está trabajando en una página de Markdown / MDX simple o en una página de componentes de React.

- Páginas MDX ( /src/content/page/)

Markdown se traducirá como páginas completas de contenido, por lo que no se requiere ninguna acción específica. Simplemente cree una nueva carpeta dentro /src/content/con el nombre de la página, luego coloque el archivo de índice de rebajas (es decir index.md) dentro de la nueva carpeta.

- Página del componente React

El texto en inglés debe colocarse en /src/intl/en/page-CORRESPONDING-PAGE.json

Crowdin es la plataforma que utilizamos para gestionar y colaborar con los esfuerzos de traducción. Utilice las siguientes convenciones para ayudar a simplificar este proceso.

Use mayúsculas y minúsculas de kebab (utilizando guiones-entre-palabras) para los nombres de archivo y las claves JSON

Utilice mayúsculas y minúsculas estándar para los valores de entrada

If capitalization styling required, it is preferable to style with CSS
Do this:
  JSON `"page-warning": "Be very careful"`
  CSS `text-transform: uppercase`
Not this:
  JSON `"page-warning": "BE VERY CAREFUL"`
This minimizes issues during translation, and allows consistent styling to all languages
Please avoid embedding links within a sentence. For a word/phrase to be a link, it requires a key/string in the intl JSON. If this is in the middle of another sentence, this results in the sentence being broken into multiple pieces, and requires coding the sentence structure into the JavaScript.

This results in significant challenges during translation process, as written syntax for each language will very in terms of ordering subjects/verbs/etc.
If you're wanting to link to something within your sentence, create a link at the end of the sentence or paragraph:
<p>All Ethereum transactions require a fee, known as Gas, that gets paid to the miner. <Link to="link">More on Gas</Link></p>
Once, you've added your English content to the appropriate JSON file, the above code should look something more like:

 <p><Translation id="page-transactions" />{" "}<Link to="link"><Translation id="page-transactions-gas-link" /></Link></p>
tl;dr Each individual JSON entry should be a complete phrase by itself
This is done using the Translation component. However there is an alternative method for regular JS: gatsby-plugin-intl with /src/utils/translations.js

Method one: <Translation /> component (preferred if only needed in JSX)

import { Translation } from "src/components/Translation"

// Utilize in JSX using
<Translation id="language-json-key" />
Method two: translateMessageId()

import { useIntl } from "gatsby-plugin-intl"
import { translateMessageId } from "src/utils/translations"

// Utilize anywhere in JS using
const intl = useIntl()
translateMessageId("language-json-key", intl)
const siteTitle = translateMessageId("site-title", intl)
React Hooks
Components and pages are written using arrow function syntax with React hooks in lieu of using class-based components
// Example
import React, { useState, useEffect } from 'react'

const ComponentName = props => {
  // useState hook for managing state variables
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    // useEffect hook for handling component lifecycle
    setGreeting('Hello world')
  }, [])

  return <div>{greeting}</div>
};

export default ComponentName;
Styling
src/theme.js - Declares site color themes, breakpoints and other constants (try to utilize these colors first)

We use styled-components

Tagged template literals are used to style custom components
// Example of styling syntax using styled-components

import styled from "styled-components"

const GenericButton = styled.div`
  width: 200px;
  height: 50px;
`
const PrimaryButton = styled(GenericButton)`
  background: blue;
`
const SecondaryButton = styled(GenericButton)`
  background: red;
`

// These are each components, capitalized by convention, and can be used within JSX code
// ie: <PrimaryButton>Text</PrimaryButton>
Complemento de VS Code recomendado: vscode-styled-components
Para instalar: Abra VS Code> Ctrl+P/ Cmd+P> Ejecutar:
ext install vscode-styled-components
Los valores de src/theme.jsse pasan automáticamente como un objeto de apoyo a los componentes con estilo.

// Example of theme.js usage

import styled from "styled-components"

const Container = styled.div`
  background: ${(props) => props.theme.colors.background};
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    font-size: #{(props) => props.theme.fontSized.s};
  }
`
Framer Motion : una biblioteca de movimiento de código abierto y lista para producción para React en la web, que se utiliza para nuestros diseños animados.

Emojis : utilizamos Twemoji , un conjunto de emojis de código abierto creado por Twitter. Estos son alojados por nosotros y se utilizan para proporcionar una experiencia coherente en todos los sistemas operativos.

// Example of emoji use
import Emoji from "./Emoji"

// Within JSX:
<Emoji text=":star:" size={1} /> // sized in `em`
Iconos : utilizamos React Icons
src/components/Icon.js es el componente que se utiliza para importar los iconos que se utilizarán
Si un icono que desea usar no está en la lista, deberá agregarlo a este archivo.
src/components/Icon.js:

// Example of how to add new icon not listed
import { ZzIconName } from "react-icons/zz"

// Then add to IconContect.Provider children:
{name === "alias" && <ZzIconName />}
Desde el componente React:

// Example of icon use
import Icon from "./Icon"

// Within JSX:
<Icon name="alias" />
Carga de imágenes y llamadas a API usando GraphQL
Gatsby + GraphQL utilizado para cargar imágenes y preferido para llamadas a API (en lugar de REST, si es posible / práctico). Utiliza consultas de páginas estáticas que se ejecutan en el momento de la compilación, no en el tiempo de ejecución, lo que optimiza el rendimiento.
Ejemplo de carga de imágenes:
import { graphql } from "gatsby"

export const query = graphql`
  query {
    hero: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
// These query results get passed as an object `props.data` to your component
Ejemplo de llamada a API:
import { graphql } from "gatsby"

export const repoInfo = graphql`
  fragment repoInfo on GitHub_Repository {
    stargazerCount
    languages(orderBy: { field: SIZE, direction: DESC }, first: 2) {
      nodes {
        name
      }
    }
    url
  }
`
export const query = graphql`
  query {
    hardhatGitHub: github {
      repository(owner: "nomiclabs", name: "hardhat") {
        ...repoInfo
      }
    }
  }
`
// These query results get passed as an object `props.data` to your component
POAP Logo

¡Reclama tu POAP!
¿Qué es POAP?
El Protocolo de prueba de asistencia es una aplicación que distribuye insignias en forma de tokens ERC-721 para demostrar que participó en un evento. Más sobre POAP .

ethereum.org 2021 Colaborador POAP
Si ha cometido algún cambio en 2021 hasta ahora que se fusionó en nuestro repositorio, ¡tiene un POAP esperando!

Esto incluye a nuestros traductores dedicados en Crowdin

Discord

👆 Para reclamar su POAP de colaborador, únase a nuestro servidor de Discord y pegue un enlace a su contribución en # poaps-🏆 canal

¡Un miembro de nuestro equipo verificará la solicitud y le enviará un mensaje de correo electrónico con un enlace personalizado para reclamar su propio objeto de colección POAP recién acuñado!

Para ayudar con la verificación, solicitamos a los colaboradores de GitHub que conecten su cuenta de GitHub con su cuenta de Discord (Discord> Configuración> Conexiones> GitHub). Los colaboradores de Crowdin serán verificados directamente a través de Crowdin por nuestro equipo.

Si aún no ha contribuido y le gustaría ganar un POAP para mostrar su lealtad al espacio Ethereum, diríjase a la pestaña de problemas para comenzar.

Colaboradores
Gracias a estas maravillosas personas ( clave emoji ):


Éxodo Actual
🌍	
Anna Karpińska
🌍	
8 bits
🖋	
Rousos Alexandros
🖋	
EvanVanNessEth
🖋	
JesseAbram
🖋	
Lililashka
🎨 🐛

vrde
🖋	
Richard McSorley
💻	
Alejandro Santander
🖋	
Jason Carver
🖋	
Chaitanya Potti
🖋	
chriseth
🖋 👀	
Craig Williams
🖋

Damian Rusinek
🖋	
Danny Ryan
🖋 👀	
Franco Zeoli
🖋 👀	
Guy Lando
🖋	
James Connolly
🖋	
Jacob Burden
🖋	
Joshorig
🖋

mariapaulafn
🖋	
Martín
🖋	
Mattias Nystrom
🖋	
nabetse
🖋	
Ahorradores de Nick
🖋	
Nina Breznik
🖋	
Ven Gist
🖋

Paul Fletcher-Hill
🖋	
Phil
🖋	
Rémi Prévost
🖋	
Shane
🖋	
Andrey Petrov
🖋 🤔 ️️️️♿️	
Santiago Palladino
🖋 🤔	
Tim Beiko
🖋 👀

Wanseob Lim
🖋 🌍	
Wil Barnes
🖋	
Aniket
🖋	
Chris Chinchilla
🖋	
George Spasov
🖋	
Pierrick TURELIER
💻	
Solexplorer
🖋

Sunghee Lee
🖋	
Awallendahl
🖋	
Boris Mann
🖋	
carumusan
🖋	
econoar
🖋	
Gustavo Esquinca
🖋	
Javier Tarazaga
🖋

Kendall Cole
🖋	
Brendan Lee
🖋	
Mahesh Murthy
🖋	
Patrick Gallagher
🖋	
Ali Abbas
🖋	
wtf
💻 👀 🚇	
Aleksandr Sobolev
🖋

Zak Cole
🖋	
Bogdan Habic
🖋	
Nick Sawinyh
🖋	
Miguel Angel Gordián
💻	
Eswara Sai
💻	
éteres
🖋 🤔	
Felipe Faraggi
🖋 🌍 🤔 👀

Maureliano
💻 👀 🖋	
CPSTL
🖋 👀 📖	
Hudson Jameson
🖋 📖	
Shayan Eskandari
💻 🌍	
Lukas Sägesser
💻	
Virgil Griffith
🖋	
Eugene Aseev
🖋

Jannis Pohlmann
🖋	
pensar en el universo
💻 🖋	
Josh Stark
🖋 👀 📆	
Alan Woo
💻 🎨	
Manank Patni
🖋	
Rogério Araújo
🌍	
Natacha Souza
🌍

sorumfactory
🌍 📆 🖋 🐛	
Sam Richards
💻 🖋 📖 📆	
Antonio Della Porta
💻	
Abhimanyu Shekhawat
🖋	
William Entriken
🖋 📖	
Sangphil Kim
🌍	
peijie
🌍

Jokyash
🌍	
Pedro rivera
🌍	
Gabriele Rigo
🌍	
Tilen Držan
🌍	
jJosko1986
🌍	
ECN
🌍	
Damiano Azzolini
🌍

matteopey
🌍	
Hun Ryu
🌍	
nake13
🌍	
alexiskefalas
🌍	
Behrad Khodayar
🌍	
Frankaus
🌍	
hacktar
💻 🌍

Jaroslav Macej
🌍	
Eman Herawy
🌍 💻	
Bellinas
🌍	
Alexander Cherkashin
🌍	
Enoch Mbaebie
🌍	
inlak16
🌍	
Bob Jiang
🌍

Suhun Kim
🌍	
Jean Zundel
🌍	
Hachemi
🌍	
hanzoh
🌍	
Vincent Le Gallic
🌍	
Enigmatic331
🖋	
Ganesh Prasad Kumble
🖋 🌍

Pandiyaraja Ramamoorthy
🖋 🌍	
Archan Roychoudhury
🖋 🌍	
SAI PRASHANTH VUPPALA
🖋 🌍	
Sayid Almahdy
🌍	
jeedani
🌍	
Akira
🌍	
karansinghgit
💻

Marc Garreau
🖋 🤔 🐛	
mul53
💻	
Apoorv Lathey
💻	
Ken Sato
🖋	
Sesamestrong
💻	
ChrisK
🖋	
Stefan van As
🖋

Grégoire Jeanmart
🖋	
nysxah
🖋	
Rachel
🖋	
wschwab
💻 🖋	
Edson Ayllon
🖋 🤔	
Peteris Erins
🖋	
jimmyshi
🖋

Jefte Costa
🌍 💻	
Jinho Jang
🖋	
Julien Klepatch
🖋	
Yaz Khoury
🖋	
Yos Riady
🖋	
Andrew Cohen
🐛	
Wesley van Heije
🖋

gr0uch0dev
🖋	
sooyoung
🖋	
Adria Massanet
🖋	
Alex Singh
🎨	
Carl Fairclough
🎨 💻 🐛	
Kaven C
🖋	
Markus Hatvan
💻

Evans Tucker
🖋	
Adina Cretu
🌍	
tvanepps
🐛 🖋	
Victor Guyard
️️️️♿️	
Abhranil Das
🐛	
Ahmet Emin Koçal
🌍	
Aqeel
🤔

Linda Xie
👀 🖋	
Ian Eck
👀 🖋	
Chris Waring
💻 🤔	
Ev
🤔 🐛 🖋	
Ivan Martinez
🖋	
Sebastian T F
💻	
Anett Rolikova
🖋

Pooja Ranjan
🖋	
sassal
🖋	
Robert Zaremba
🖋	
Tas
🤔 🖋	
Sylvain Pace
💻	
Sina Habibian
🤔	
Dennison Bertram
🤔

Artur Gontijo
🤔 🖋	
ethjoe
🖋 👀	
cooganb
🤔	
drequinox
🖋	
Tarun Gupta
🖋	
Jamie Pitts
🤔 🖋	
Chris Seifert
🐛

John Craig
💻	
Noam Eppel
🐛	
Jacob Willemsma
🖋	
Alex
🤔	
Paul Razvan Berg
🖋	
ph5500
🖋 💻	
John Monarch
🖋

Shadab Khan
💻	
ryancreatescopy
📖 💻 🎨 🐛 🤔 👀 🖋	
Hammad Jutt
🖋	
Becaz
🤔	
Caos
🖋	
codingsh
💻	
Artem
🖋

Cristian Espinoza Garner
🖋	
Daniel Schlabach
🖋	
Marius van der Wijden
🖋 🤔	
Markus Waas
🖋	
Keith Yeung
💻	
Jordan Lyall
🖋	
elanh
🖋

Mohamed Hayibor
🖋	
Conor Svensson
🖋	
Aranha
💻	
Jung Sup (James) Yoo
🌍	
Veit Progl
🤔	
jcamilli
🖋	
Martin Holst Swende
🐛

Steven Gilbert
🖋	
Sacha Saint-Leger
🖋	
Griffin Ichiba Hotchkiss
🖋	
Scott Bigelow
🖋	
Harikrishnan Mulackal
🖋	
Matthieu Caneill
🖋	
Arjuna Sky Kok
🐛

Brian Gu
🖋	
Gonçalo Hora de Carvalho
🐛	
Mário Havel
🖋	
JosefJ
🖋	
Christoph Burgdorf
🤔	
slipperybeluga
🤔	
David Liu
🖋

shreyashariharan3
🖋	
Adrián Calvo
🖋	
daviroo
🖋	
Wim Notredame
💻	
vasa
🖋	
Franziska Heintel
🖋	
Muhammad Umair Irshad
🖋

Nazzareno Massari
🖋	
Mayemene Fomene Jean Vladimir
🐛 🖋	
Yahsin Huang
🖋 🌍	
James Zaki
🖋	
Greg Lang
🖋	
Matt Voska
🐛	
mustafa
🖋

Paul Wackerow
💻 🐛	
Attaphong Rattanaveerachanon
🐛 🖋	
LoinLiao
🖋	
DrMad92
🐛	
Patricio Palladino
👀 🤔	
David Murdoch
👀	
MashhoodIjaz
🐛 🖋

Dan Nolan
🖋 📖	
Marek Kirejczyk
🖋	
Jon Cursi
🖋	
James Farrell
🐛 🖋	
Xavi Arias Seguí
🐛 🖋	
ANKIT_PAL
💻	
İsmail Kerim Cem
🐛

Joanne
🖋	
michael60634
🐛 🤔	
Andrei Maiboroda
🖋	
Anki
🖋	
Michelle Plur
🐛	
PAAlmasi
🖋	
Ben Edgington
🐛 🖋

alexsantee
🐛 🖋	
peth-yursick
🖋	
Alwin Stockinger
🐛 🖋	
Roberto Henríquez Perozo
🖋	
strykerin
🖋	
jddxf
🐛 🖋	
LucasRoorda
🖋

Mihir Luthra
🖋	
tentodev
🖋 🐛	
MiZiet
🖋	
Vaibhav Chopra
🖋	
Lakshman Sankar
🐛 🖋	
hewigovens
🖋 🐛	
DragonDev1906
🐛 🖋

Ryan Ghods
🖋	
Oliver
🖋	
Kristiyan
🐛 💻	
Matthieu Riou
🖋	
pansay
🖋 🐛	
eirtscience
🖋	
Francis Lewis
🐛 🖋

baub
🖋 🐛	
lamone
🖋	
Sean O'Connor
🖋	
Tara Rowell
🖋	
Aleksi Cohen
🐛 🖋	
Kartikaya Gupta (kats)
🐛 🖋	
siddhantkharode
🖋 🐛

Renan Dincer
🐛 🖋	
Zhangyuan Nie
🐛 🖋	
Patrick Collins
🖋	
Sant Deleon
💻	
Martin Huschenbett
🖋 🐛	
Kalle Moen
🐛 🖋	
Vitaly
💻

Nikolay Yushkevich
🖋	
darkwater4213
🐛 🖋	
Akash Nimare
🖋	
Dave Mackey
🖋	
Emanuel Tesař
🖋	
DeFiDude
🐛	
Austin Griffith
🖋

Chase Manning
🐛 🖋	
Colin Steil
🖋	
MonarthS
💻	
Adam Dry
🐛 🖋	
Nikolai Vavilov
🐛 🖋	
Katie
🐛 🖋	
comeToThinkOfEth
🐛

catsnackattack
🐛	
Maurycy
🖋	
Igor Papandinas
🐛 💻 🖋	
Tahir Alvi
🤔	
amirmehdi
🐛 🖋	
Dan Dadybaev
🖋	
Finley
🤔

nobd
🖋	
Alexander Sadovskyi
🖋	
Ethan Sarif-Kattan
🐛 🖋	
C.J. Kozarski
🖋	
Yakko Majuri
💻	
John Adler
🖋 🐛	
Just some guy
🖋

Vedvardhan
🖋 🐛	
Yussuf Elarif
🐛	
David Awad
🖋	
Alex Beregszaszi
🖋	
Adam Goth
🐛 🖋	
Anurag Pal
💻 📖	
Vishal Pratap Singh
💻

qbzzt
🖋 🤔	
Ewa Kowalska
🖋	
Aheesh
🖋	
tophersjones
🖋	
Andrew Yang
🖋	
$hoot->Pairs
🖋	
NilsKaden
💻

Stuart Reynolds
🤔	
Gwenael Le Bodic
🖋	
Anurag Verma
🐛 💻	
Nikolai Golub
🖋	
Elliot Lee
🖋 🐛	
Viktor Garske
🐛 🖋	
Kristjan Grm
🖋

Mac L
🖋	
Bruce MacDonald
🖋	
Ronnie Sherfey
💻	
Ali Rahman
🖋	
Erik Vandeputte
🖋 🐛	
TM Lee
🐛	
mic0des
💻

Hakeem Almidan
🖋 💻	
Julien Rioux
🖋	
Justin Chow
🖋	
Gabi
🖋	
Rohit Gopal
🐛	
Jordan Overbye
🐛 💻	
Peter LaFontaine
🐛 🖋

Joshua Welsh
🐛	
Robert Dosa
🖋	
SatoshiMiracle
🐛	
James Boyle
🤔 🖋	
Kevin Ziechmann
🐛	
Evan
🖋	
ETHorHIL
🖋

shashvatshah9
🖋	
slightlyfloating
🐛	
Luis Miranda
🐛	
Alex Ismodes
🖋	
Joshua
🐛 💻	
Ensar Yusuf Yılmaz
🐛	
Leo Gutiérrez Ramírez
🐛

Abdul Malik
🐛	
Jay Welsh
🐛	
linkastic
🖋	
Chan Jing Hong
🖋	
Ozora Ogino
🖋 🌍	
Ikko Ashimine
🐛 🖋	
Cameron Honis
🐛

Chirag Shetty
🐛	
Michael Bianco
🐛	
Tom Robiquet
💻	
Stanislav Bezkorovainyi
🖋	
Rootul Patel
🐛	
Zachary DeRose
🖋	
Arshan Khanifar
🐛

David Schnurr
🖋	
Kevin Leffew
🖋	
Pierre Grimaud
🐛	
Jack Clancy
🖋	
Justin Spradlin
🐛 🖋	
Aditya Anand M C
🖋	
James Dixon
🖋

Vasu Manhas
🐛	
jp_aulet
💻	
manojmsrit
🤔	
David Kim
🖋	
Bhavish Yalamanchi
🖋	
awg0013-PR
🖋	
Devin
🖋

Dave
🤔	
Rafael Matias
🐛 🖋	
Colman Glagovich
🖋	
endorphin
🖋	
Nebali
🖋	
Shubh Agrawal
🖋	
cth0604
💻

zjpetersen
🐛	
frankie224
🐛	
Alexandru Turcanu
🖋	
Brett
🖋	
João Monteiro
🖋 🐛	
Arun Lodhi
🖋	
Tim
🖋

Vitaliy Hayda
🐛 🖋	
Ayushman Singh Chauhan
🐛 🖋	
Keqi Huang
🐛 🖋	
davidplutus
🤔	
Karthickmerk
🤔	
Sihong
💻	
AmirAliM
🖋

Rub3cula
🖋	
Paweł Urbanek
🖋	
Aditya Dhir
🐛	
Ammar Husain
🖋 🐛	
miiiguel
🖋	
Uttam Singh
🐛	
Chase Wright
🖋

Bic
🖋	
devELIOper
🖋 🐛	
Vadym Barda
🖋	
Leo Cuéllar
🖋 💻 🐛	
pheeque
🐛 🖋	
Jeremy Musighi
🖋	
tbollinger
🐛

Ryan Grunest
🖋	
Aniket Raj
🖋	
Kamil Zarzycki
🌍 🖋	
Filip Martinsson
🖋	
zeroservices
🐛	
LukaK
🖋 🤔	
Luke Ingalls
🖋

cstradtman
🐛	
G Surendar Thina
🖋	
Scott Dodge
🐛	
Artur Cygan
🐛	
Rory
🐛	
Connor Mann
🐛	
Phanindra
🖋

kwsorensen
🖋	
Theo Pack
🐛	
kirati-su
🤔	
oliver renwick
🤔 🐛	
Pankaj Patil
🖋	
esale
🐛	
RaynHarr
🖋

n4rsil
🖋	
John Bishop
🖋	
robriks
🐛 📆 💬 📖	
Nishant Chandla
💻 🐛	
@paulapivat
🖋	
Graeme Blackwood
🐛	
il3ven
💻

Hayden Briese
🐛	
Trevor French
🖋	
Antonio Sanso
📖	
Siddharth S
📖 🐛	
jbgwu
📖	
ethosdev
🖋	
Joseph Schiarizzi
🖋

Rodney Olav C Melby
🖋	
Raman
🖋	
Roeland Werring
🐛	
Stan Kladko
📖	
Jared Flomen
📖 🐛	
Joseph Wallace
🐛	
Ahmed Prusevic
💻

Matt
🖋	
ytrezq
📖	
Ricky
🐛	
smudgil
🖋	
Don Cross
📖	
Jackson Taylor
🤔	
MrBrain295
🐛 📖 🤔 🖋

SafePalWallet
🖋	
Vishal Vaddadhi
🖋	
Matt Kula
🐛	
Hamza Shahzad
💻 🐛	
Mukul Kolpe
💻 🐛 📖	
Corwin Smith
💻	
spiolat
📖

hosyminh95
📖	
Chiara Wilden
🤔 📖	
DanhPTHTech
📖	
James Hooper
🐛 📖	
Christopher Hegre
📖	
Najeeb Nabwani
📖	
Alexander Goncalves
📖

Gabe Casalett
📖	
waynedyer12
📖	
tap (pts.eth)
🖋	
James Morgan
🤔	
Sharon Wang
🐛 📖	
Enrique Jose Avila Asapche
🤔	
Gianni Alessandroni
📖

Raj Shekhar Bhardwaj
📖	
joakimengerstam
📖	
Nikita Drozd
🐛 📖	
Scott
🎨 🐛	
Stefan Sathianathen
📖	
Miroslav Lehotsky
📖	
Remco
📖

Shailendra Shukla
📖	
Skylar Weaver
📖	
agorismlabs
🤔	
Tanishq Sharma
🤔	
Mark Strefford
🐛	
Andrzej Wódkiewicz
📖	
Hugo
🖋

Joseph Harris
📖	
Ozgur
📖	
Alec Dilanchian
📖	
Horacio Bertorello
📖	
m4sterbunny
📖	
愚指导
📖	
Ray Jasson
📖

Calvin Storoschuk
🐛 💻	
Clashinm
📖	
james-prysm
🤔	
William Buck
📖	
metalocal
🐛 📖	
Himanshu Singh
🐛 📖 🤔	
Andrew B Coathup
📖 🐛

Andrew Gallagher
🖋	
Phat Nguyen Luu
📖	
Andreas Sofos
💻	
Felipe Selmo
📖	
Bingwei Qin
📖	
Mikko Ohtamaa
🤔 📖	
Kabilan
🤔

Colin Steidtmann
🖋 🐛	
SNikhill
💻	
SlashHash
🤔	
Harsh Mathur
🖋	
pranav desai
🖋	
Lukáš Kotol
📖	
Nick Carbone
📖

Ashwin Nair
💻	
Julian Ste
💻 📖 🖋	
Pranay Reddy
💻	
marc
📖	
Mariano Baragiola
📖	
under3415
🤔	
Gaurav Kumar Shah
🤔

Hubert Sikorski
📖	
Corey Rice
📖	
Ezenwankwo Gabriel
📖	
Thomas Lisankie
📖	
Tyler Ilunga
📖	
Kasia Kosturek
📖	
solarpunklabs
🤔

aakhtar3
📖	
Shreyas Londhe
🖋	
Tim Beccue
🖋	
Robert Joseph Wayne
📖 🖋	
pdesmondflynn
🖋	
Daniel Damilola Obiokeke
🖋	
mpj
🖋

Hung Doan
🐛	
Paweł Wilczyński
🌍	
joaoMpf
🌍	
Bhaskar Kashyap
📖 🖋	
bleesherman
🖋	
Robert Miller
🖋	
Florian Sesser
📖

xianxiongwang
📖	
Slava Shirokov
📖	
BenOfTheBlockchain
🤔	
0xngmi
📖	
Shivam Rajput
📖	
Raymond
💻	
Justin Johnson
📖

SA KSH AM
🖋	
Samrat
🖋	
Justin Shaw
🖋	
meoww-bot
📖	
Philip Vu
📖	
Conner Jensen
📖	
Jhaymes
🤔

daniel sieradski
📖	
bgillcode
📖 💻	
Cameron Fink
📖 🤔	
Venom
📖	
JulienM
💻	
Jem Mawson
📖	
Mislav
💻 📖

Justin Hunter
📖	
Enton Biba
️️️️♿️	
Oriol Serra
🐛	
Nicolas LARCHE
🐛	
A. Tyler Benson
📖	
Derek周朝晖
📖 🌍	
Damian Schenkelman
📖

Hendrik Eeckhaut
📖	
Susannah Evans
📖	
Minimalist Optimalist
🐛	
vluna
💻	
Arghya Biswas
💻	
abhi-go
📖	
Franco Victorio
📖 🐛

Kevin Jones
💻 🐛	
Shubhankar Kanchan Gupta
🐛	
Vishvanathan K
📖	
Alexander Gryaznov
🤔	
Pablo Pettinari
📖
This project follows the all-contributors specification. Contributions of any kind welcome!

Join our Discord server
We have a space to discuss all things ethereum.org – share your ideas or just say hi over on Discord.

Releases 155
v2.46.1
Latest
hace 10 días
+ 154 releases
Contributors 550
@samajammin
@allcontributors[bot]
@wackerow
@minimalsm
@ryancreatescopy
@alancwoo
@carlfairclough
@jjmstark
@corwintines
@qbzzt
@Kristiyan96
+ 539 contributors
Languages
JavaScript
98.2%
 
CSS
1.2%
 
Other
0.6%
© 2021 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
