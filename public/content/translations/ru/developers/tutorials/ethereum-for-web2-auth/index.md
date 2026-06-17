---
title: Использование Эфириума для аутентификации в Веб2
description: После прочтения этого руководства разработчик сможет интегрировать вход через Эфириум (web3) с входом через SAML — стандартом, используемым в Веб2 для обеспечения единого входа и других связанных сервисов. Это позволяет аутентифицировать доступ к ресурсам Веб2 с помощью подписей Эфириума, при этом атрибуты пользователя берутся из аттестаций.
author: Ори Померанц
tags:
  - Веб2
  - аутентификация
  - eas
skill: beginner
breadcrumb: Эфириум для аутентификации в Веб2
lang: ru
published: 2025-04-30
---

## Введение {#introduction}

[SAML](https://www.onelogin.com/learn/saml) — это стандарт, используемый в Веб2, который позволяет [поставщику учетных данных (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) предоставлять информацию о пользователе [поставщикам услуг (SP)](https://en.wikipedia.org/wiki/Service_provider_(SAML).

В этом руководстве вы узнаете, как интегрировать подписи Эфириума с SAML, чтобы позволить пользователям использовать свои кошельки Эфириума для аутентификации в сервисах Веб2, которые еще не поддерживают Эфириум нативно.

Обратите внимание, что это руководство написано для двух разных аудиторий:

- Специалистов по Эфириуму, которые понимают Эфириум и хотят изучить SAML
- Специалистов по Веб2, которые понимают SAML и аутентификацию в Веб2 и хотят изучить Эфириум

В результате оно будет содержать много вводного материала, который вы уже знаете. Можете смело его пропускать.

### SAML для специалистов по Эфириуму {#saml-for-ethereum-people}

SAML — это централизованный протокол. Поставщик услуг (SP) принимает утверждения (например, «это мой пользователь Джон, у него должны быть разрешения на выполнение A, B и C») от поставщика учетных данных (IdP) только в том случае, если у него есть заранее установленные доверительные отношения либо с ним, либо с [центром сертификации](https://www.ssl.com/article/what-is-a-certificate-authority-ca/), который подписал сертификат этого IdP.

Например, SP может быть туристическим агентством, предоставляющим туристические услуги компаниям, а IdP — внутренним веб-сайтом компании. Когда сотрудникам нужно забронировать деловую поездку, туристическое агентство отправляет их на аутентификацию в компанию, прежде чем позволить им фактически забронировать поездку.

![Step by step SAML process](./fig-01-saml.png)

Именно так три сущности — браузер, SP и IdP — договариваются о доступе. SP не нужно заранее ничего знать о пользователе, использующем браузер, достаточно лишь доверять IdP.

### Эфириум для специалистов по SAML {#ethereum-for-saml-people}

Эфириум — это децентрализованная система. 

![Ethereum logon](./fig-02-eth-logon.png)

У пользователей есть приватный ключ (обычно хранящийся в расширении браузера). Из приватного ключа можно получить открытый ключ, а из него — 20-байтовый адрес. Когда пользователям нужно войти в систему, их просят подписать сообщение с нонсом (одноразовым значением). Сервер может проверить, что подпись была создана этим адресом.

![Getting extra data from attestations](./fig-03-eas-data.png)

Подпись подтверждает только адрес Эфириума. Чтобы получить другие атрибуты пользователя, обычно используются [аттестации](https://attest.org/). Аттестация обычно имеет следующие поля:

- **Attestor** (Аттестующий) — адрес, который создал аттестацию
- **Recipient** (Получатель) — адрес, к которому относится аттестация
- **Data** (Данные) — аттестуемые данные, такие как имя, разрешения и т. д.
- **Schema** (Схема) — ID схемы, используемой для интерпретации данных.

Из-за децентрализованной природы Эфириума любой пользователь может создавать аттестации. Личность аттестующего важна для определения того, какие аттестации мы считаем надежными.

## Настройка {#setup}

Первый шаг — настроить взаимодействие между SAML SP и SAML IdP.

1. Загрузите программное обеспечение. Пример программного обеспечения для этой статьи находится [на GitHub](https://github.com/qbzzt/250420-saml-ethereum). Различные этапы хранятся в разных ветках, для этого этапа вам понадобится `saml-only`

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. Создайте ключи с самоподписанными сертификатами. Это означает, что ключ сам является своим центром сертификации и должен быть импортирован вручную поставщику услуг. Дополнительную информацию см. в [документации OpenSSL](https://docs.openssl.org/master/man1/openssl-req/). 

    ```sh
    mkdir keys
    cd keys
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-sp.crt -keyout saml-sp.pem -subj /CN=sp/
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-idp.crt -keyout saml-idp.pem -subj /CN=idp/
    cd ..
    ```

3. Запустите серверы (как SP, так и IdP)

    ```sh
    pnpm start
    ```

4. Перейдите к SP по URL-адресу [http://localhost:3000/](http://localhost:3000/) и нажмите кнопку, чтобы вас перенаправило к IdP (порт 3001).

5. Укажите IdP свой адрес электронной почты и нажмите **Login to the service provider** (Войти к поставщику услуг). Убедитесь, что вас перенаправило обратно к поставщику услуг (порт 3000) и что он узнает вас по вашему адресу электронной почты.

### Подробное объяснение {#detailed-explanation}

Вот что происходит шаг за шагом:

![Normal SAML logon without Ethereum](./fig-04-saml-no-eth.png)

#### src/config.mts {#srcconfigmts}

Этот файл содержит конфигурацию как для поставщика учетных данных, так и для поставщика услуг. Обычно это две разные сущности, но здесь мы можем использовать общий код для простоты.

```typescript
const fs = await import("fs")

const protocol="http"
```

Пока мы просто тестируем, поэтому использовать HTTP вполне нормально.

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

Считайте открытые ключи, которые обычно доступны обоим компонентам (и либо доверяются напрямую, либо подписаны доверенным центром сертификации).

```typescript
export const spPort = 3000
export const spHostname = "localhost"
export const spDir = "sp"

export const idpPort = 3001
export const idpHostname = "localhost"
export const idpDir = "idp"

export const spUrl = `${protocol}://${spHostname}:${spPort}/${spDir}`
export const idpUrl = `${protocol}://${idpHostname}:${idpPort}/${idpDir}`
```

URL-адреса для обоих компонентов.

```typescript
export const spPublicData = {
```

Публичные данные для поставщика услуг.

```typescript
    entityID: `${spUrl}/metadata`,
```

По соглашению, в SAML `entityID` — это URL-адрес, по которому доступны метаданные сущности. Эти метаданные соответствуют публичным данным здесь, за исключением того, что они представлены в формате XML.

```typescript
    wantAssertionsSigned: true,
    authnRequestsSigned: false,
    signingCert: spCert,
    allowCreate: true,
    assertionConsumerService: [{
        Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
        Location: `${spUrl}/assertion`,
    }]
  }
```

Самое важное определение для наших целей — это `assertionConsumerServer`. Это означает, что для передачи утверждения (например, «пользователь, который отправляет вам эту информацию, — somebody@example.com») поставщику услуг нам нужно использовать [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) на URL-адрес `http://localhost:3000/sp/assertion`.

```typescript
export const idpPublicData = {
    entityID: `${idpUrl}/metadata`,
    signingCert: idpCert,
    wantAuthnRequestsSigned: false,
    singleSignOnService: [{
      Binding: "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST",
      Location: `${idpUrl}/login`
    }],
    singleLogoutService: [{
      Binding: "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST",
      Location: `${idpUrl}/logout`
    }],
  }
```

Публичные данные для поставщика учетных данных аналогичны. В них указано, что для входа пользователя нужно отправить POST-запрос на `http://localhost:3001/idp/login`, а для выхода — POST-запрос на `http://localhost:3001/idp/logout`.

#### src/sp.mts {#srcspmts}

Это код, который реализует поставщика услуг.

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

Мы используем библиотеку [`samlify`](https://www.npmjs.com/package/samlify) для реализации SAML.

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

Библиотека `samlify` ожидает наличия пакета для проверки правильности XML, его подписи ожидаемым открытым ключом и т. д. Для этой цели мы используем [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint).

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

[`Router`](https://expressjs.com/en/5x/api.html#router) в [`express`](https://expressjs.com/) — это «мини-веб-сайт», который можно встроить внутрь веб-сайта. В данном случае мы используем его, чтобы сгруппировать все определения поставщика услуг вместе.

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

Собственное представление поставщика услуг о себе — это все публичные данные и приватный ключ, который он использует для подписи информации.

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

Публичные данные содержат все, что поставщику услуг нужно знать о поставщике учетных данных.

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

Для обеспечения интероперабельности с другими компонентами SAML поставщики услуг и учетных данных должны предоставлять свои публичные данные (называемые метаданными) в формате XML по адресу `/metadata`.

```typescript
spRouter.post(`/assertion`,
```

Это страница, к которой обращается браузер для идентификации. Утверждение включает идентификатор пользователя (здесь мы используем адрес электронной почты) и может включать дополнительные атрибуты. Это обработчик для шага 7 на диаграмме последовательности выше.

```typescript
  async (req, res) => {
    // console.log(`SAML-ответ:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

Вы можете использовать закомментированную команду, чтобы увидеть XML-данные, предоставленные в утверждении. Они [закодированы в base64](https://en.wikipedia.org/wiki/Base64).

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

Разбор запроса на вход от сервера учетных данных.

```typescript
      res.send(`
        <html>
          <body>
            <h2>Hello ${loginResponse.extract.nameID}</h2>
          </body>
        </html>
      `)
      res.send();
```

Отправка HTML-ответа, просто чтобы показать пользователю, что мы получили данные для входа.

```typescript
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

Информирование пользователя в случае сбоя.

```typescript
spRouter.get('/login',
```

Создание запроса на вход, когда браузер пытается получить эту страницу. Это обработчик для шага 1 на диаграмме последовательности выше.

```typescript
  async (req, res) => {
    const loginRequest = await sp.createLoginRequest(idp, "post")
```

Получение информации для отправки POST-запроса на вход.

```typescript
    res.send(`
      <html>
        <body>
          <script>
            window.onload = function () { document.forms[0].submit(); }            
          </script>
```

Эта страница отправляет форму (см. ниже) автоматически. Таким образом, пользователю не нужно ничего делать для перенаправления. Это шаг 2 на диаграмме последовательности выше.

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

POST-запрос на `loginRequest.entityEndpoint` (URL-адрес конечной точки поставщика учетных данных).

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

Имя поля ввода — `loginRequest.type` (`SAMLRequest`). Содержимое этого поля — `loginRequest.context`, которое снова представляет собой XML, закодированный в base64.

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[Это промежуточное ПО (middleware)](https://expressjs.com/en/5x/api.html#express.urlencoded) считывает тело [HTTP-запроса](https://www.tutorialspoint.com/http/http_requests.htm). По умолчанию express игнорирует его, так как для большинства запросов оно не требуется. Нам оно нужно, потому что POST использует тело запроса.

```typescript
app.use(`/${config.spDir}`, spRouter)
```

Монтирование маршрутизатора в каталог поставщика услуг (`/sp`).

```typescript
app.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <button onClick="document.location.href='${config.spUrl}/login'">
           Click here to log on
        </button>
      </body>
    </html>
  `)
})
```

Если браузер пытается получить корневой каталог, предоставьте ему ссылку на страницу входа.

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

Прослушивание `spPort` с помощью этого приложения express.

#### src/idp.mts {#srcidpmts}

Это поставщик учетных данных. Он очень похож на поставщика услуг, приведенные ниже объяснения касаются только тех частей, которые отличаются.

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // Сохранить атрибуты
    attributeNamePrefix: "@_", // Префикс для атрибутов
  }
)
```

Нам нужно прочитать и понять XML-запрос, который мы получаем от поставщика услуг.

```typescript
const getLoginPage = requestId => `
```

Эта функция создает страницу с автоматически отправляемой формой, которая возвращается на шаге 4 диаграммы последовательности выше.

```typescript
<html>
  <head>
    <title>Login page</title>
  </head>
  <body>
    <h2>Login page</h2>
    <form method="post" action="./loginSubmitted">
      <input type="hidden" name="requestId" value="${requestId}" />
      Email address: <input name="email" />
      <br />
      <button type="Submit">
        Login to the service provider
      </button>
```

Мы отправляем поставщику услуг два поля:

1. `requestId`, на который мы отвечаем.
2. Идентификатор пользователя (пока мы используем адрес электронной почты, предоставленный пользователем).

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

Это обработчик для шага 5 диаграммы последовательности выше. [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) создает ответ на вход. 

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

Аудитория — это поставщик услуг.

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

Информация, извлеченная из запроса. Единственный параметр, который нас интересует в запросе, — это requestId, который позволяет поставщику услуг сопоставлять запросы и ответы на них.

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // Обеспечить наличие подписи
```

Нам нужен `signingKey`, чтобы иметь данные для подписи ответа. Поставщик услуг не доверяет неподписанным запросам.

```typescript
    },
    "post",
    {
      email: req.body.email
```

Это поле с информацией о пользователе, которую мы отправляем обратно поставщику услуг.

```typescript      
    }
  );

  res.send(`
    <html>
      <body>
        <script>
          window.onload = function () { document.forms[0].submit(); }
        </script>
        
        <form method="post" action="${loginResponse.entityEndpoint}">
          <input type="hidden" name="${loginResponse.type}" value="${loginResponse.context}" />
        </form>
      </body>
    </html>
  `)
})
```

Снова используем автоматически отправляемую форму. Это шаг 6 диаграммы последовательности выше.

```typescript

// Эндпоинт IdP для запросов на вход
idpRouter.post(`/login`,
```

Это конечная точка, которая получает запрос на вход от поставщика услуг. Это обработчик для шага 3 диаграммы последовательности выше.

```typescript
  async (req, res) => {
    try {
      // Обходной путь, так как мне не удалось заставить parseLoginRequest работать.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

Мы должны иметь возможность использовать [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) для чтения ID запроса на аутентификацию. Однако мне не удалось заставить это работать, и не стоило тратить на это много времени, поэтому я просто использую [универсальный XML-парсер](https://www.npmjs.com/package/fast-xml-parser). Нужная нам информация — это атрибут `ID` внутри тега `<samlp:AuthnRequest>`, который находится на верхнем уровне XML.

## Использование подписей Эфириума {#using-ethereum-signatures}

Теперь, когда мы можем отправить идентификатор пользователя поставщику услуг, следующий шаг — получить идентификатор пользователя надежным способом. Viem позволяет нам просто запросить у кошелька адрес пользователя, но это означает запрос информации у браузера. Мы не контролируем браузер, поэтому не можем автоматически доверять полученному от него ответу.

Вместо этого IdP отправит браузеру строку для подписи. Если кошелек в браузере подпишет эту строку, это означает, что это действительно тот самый адрес (то есть он знает приватный ключ, соответствующий этому адресу).

Чтобы увидеть это в действии, остановите существующие IdP и SP и выполните следующие команды:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

Затем перейдите [к SP](http://localhost:3000) и следуйте инструкциям.

Обратите внимание, что на данном этапе мы не знаем, как получить адрес электронной почты из адреса Эфириума, поэтому вместо этого мы сообщаем SP `<ethereum address>@bad.email.address`.

### Подробное объяснение {#detailed-explanation-2}

Изменения касаются шагов 4-5 на предыдущей диаграмме.

![SAML with an Ethereum signature](./fig-05-saml-w-signature.png)

Единственный файл, который мы изменили, — это `idp.mts`. Вот измененные части.

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

Нам нужны эти две дополнительные библиотеки. Мы используем [`uuid`](https://www.npmjs.com/package/uuid) для создания значения [нонса](https://en.wikipedia.org/wiki/Cryptographic_nonce). Само значение не имеет значения, важен лишь тот факт, что оно используется только один раз.

Библиотека [`viem`](https://viem.sh/) позволяет нам использовать определения Эфириума. Здесь она нужна нам для проверки того, что подпись действительно действительна.

```typescript
const loginPrompt = "To access the service provider, sign this nonce: "
```

Кошелек запрашивает у пользователя разрешение на подпись сообщения. Сообщение, состоящее только из нонса, может сбить пользователей с толку, поэтому мы включаем эту подсказку.

```typescript
// Сохранять requestIDs здесь
let nonces = {}
```

Нам нужна информация о запросе, чтобы иметь возможность ответить на него. Мы могли бы отправить ее вместе с запросом (шаг 4) и получить обратно (шаг 5). Однако мы не можем доверять информации, которую получаем от браузера, находящегося под контролем потенциально враждебного пользователя. Поэтому лучше хранить ее здесь, используя нонс в качестве ключа.

Обратите внимание, что ради простоты мы делаем это здесь в виде переменной. Однако у этого есть несколько недостатков:

- Мы уязвимы для атаки типа «отказ в обслуживании» (DoS). Злоумышленник может попытаться войти в систему несколько раз, переполняя нашу память.
- Если процесс IdP потребуется перезапустить, мы потеряем существующие значения.
- Мы не можем балансировать нагрузку между несколькими процессами, потому что у каждого будет своя переменная.

В рабочей системе мы бы использовали базу данных и реализовали какой-либо механизм истечения срока действия.

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

Создание нонса и сохранение `requestId` для будущего использования.

```typescript
  return `
<html>
  <head>
    <script type="module">
```

Этот JavaScript выполняется автоматически при загрузке страницы.

```typescript
      import { createWalletClient, custom, getAddress } from 'https://esm.sh/viem'
```

Нам нужно несколько функций из `viem`.

```typescript
      if (!window.ethereum) {
          alert("Please install MetaMask or a compatible wallet and then reload")
      }
```

Мы можем работать только в том случае, если в браузере есть кошелек.

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

Запрос списка аккаунтов у кошелька (`window.ethereum`). Предполагаем, что есть хотя бы один, и сохраняем только первый. 

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

Создание [клиента кошелька](https://viem.sh/docs/clients/wallet) для взаимодействия с кошельком браузера.

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

Просим пользователя подписать сообщение. Поскольку весь этот HTML находится в [шаблонной строке](https://viem.sh/docs/clients/wallet), мы можем использовать переменные, определенные в процессе idp. Это шаг 4.5 на диаграмме последовательности.

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

Перенаправление на `/idp/signature/<nonce>/<address>/<signature>`. Это шаг 5 на диаграмме последовательности.

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

Подпись отправляется обратно браузером, который потенциально может быть вредоносным (ничто не мешает вам просто открыть `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` в браузере). Поэтому важно убедиться, что процесс IdP правильно обрабатывает недействительные подписи.

```typescript
    </script>
  </head>
  <body>
    <h2>Please sign</h2>
    <button onClick="window.goodSignature()">
      Submit a good (valid) signature
    </button>
    <br/>
    <button onClick="window.badSignature()">
      Submit a bad (invalid) signature
    </button>
  </body>
</html>  
`
}
```

Остальное — просто стандартный HTML.

```typescript
idpRouter.get("/signature/:nonce/:account/:signature", async (req, res) => {
```

Это обработчик для шага 5 на диаграмме последовательности.

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("Bad nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

Получение ID запроса и удаление нонса из `nonces`, чтобы убедиться, что его нельзя использовать повторно.

```typescript
  try {
```

Поскольку существует множество причин, по которым подпись может быть недействительной, мы оборачиваем это в блок `try ... catch`, чтобы перехватить любые выброшенные ошибки.

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

Использование [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage) для реализации шага 5.5 на диаграмме последовательности.

```typescript
    if (!validSignature)
      throw("Bad signature")
  } catch (err) {
    res.send("Error:" + err)
    return ;
  }
```

Остальная часть обработчика эквивалентна тому, что мы делали в обработчике `/loginSubmitted` ранее, за исключением одного небольшого изменения.

```typescript
  const loginResponse = await idp.createLoginResponse(
      .
      .
      .
    {
      email: req.params.account + "@bad.email.address"
    }
  );
```

У нас нет фактического адреса электронной почты (мы получим его в следующем разделе), поэтому пока мы возвращаем адрес Эфириума и четко помечаем, что это не адрес электронной почты.


```typescript
// Эндпоинт IdP для запросов на вход
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // Обходной путь, так как мне не удалось заставить parseLoginRequest работать.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getSignaturePage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

Вместо `getLoginPage` теперь используйте `getSignaturePage` в обработчике шага 3.

## Получение адреса электронной почты {#getting-the-email-address}

Следующий шаг — получить адрес электронной почты, идентификатор, запрашиваемый поставщиком услуг. Для этого мы используем [Ethereum Attestation Service (EAS)](https://attest.org/).

Самый простой способ получить аттестации — использовать [GraphQL API](https://docs.attest.org/docs/developer-tools/api). Мы используем этот запрос:

```
query GetAttestationsByRecipient {
  attestations(
    where: { 
      recipient: { equals: "${getAddress(ethAddr)}" }
      schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
    }
    take: 1
  ) { 
    data
    id
    attester
  }
}
```

Эта [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) включает только адрес электронной почты. Этот запрос запрашивает аттестации по этой схеме. Субъект аттестации называется `recipient`. Это всегда адрес Эфириума.

Предупреждение: Способ, которым мы получаем аттестации здесь, имеет две проблемы с безопасностью.

- Мы обращаемся к конечной точке API `https://optimism.easscan.org/graphql`, которая является централизованным компонентом. Мы можем получить атрибут `id`, а затем выполнить поиск ончейн, чтобы убедиться, что аттестация настоящая, но конечная точка API все равно может цензурировать аттестации, не сообщая нам о них. 

  Эту проблему можно решить: мы могли бы запустить собственную конечную точку GraphQL и получать аттестации из логов цепи, но для наших целей это излишне.

- Мы не проверяем личность аттестующего. Кто угодно может предоставить нам ложную информацию. В реальной реализации у нас был бы набор доверенных аттестующих, и мы бы рассматривали только их аттестации.

Чтобы увидеть это в действии, остановите существующие IdP и SP и выполните следующие команды:

```sh
git checkout email-address
pnpm install
pnpm start
```

Затем укажите свой адрес электронной почты. У вас есть два способа сделать это:

- Импортировать кошелек с помощью приватного ключа и использовать тестовый приватный ключ `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`.

- Добавить аттестацию для собственного адреса электронной почты:

  1. Перейдите к [схеме в обозревателе аттестаций](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977).

  2. Нажмите **Attest with Schema** (Аттестовать с помощью схемы).

  3. Введите свой адрес Эфириума в качестве получателя, свой адрес электронной почты в поле email address и выберите **Onchain**. Затем нажмите **Make Attestation** (Создать аттестацию).

  4. Одобрите транзакцию в своем кошельке. Вам понадобится немного ETH в [блокчейне Optimism](https://app.optimism.io/bridge/deposit) для оплаты газа.

В любом случае, после того как вы это сделаете, перейдите по адресу [http://localhost:3000](http://localhost:3000) и следуйте инструкциям. Если вы импортировали тестовый приватный ключ, вы получите адрес электронной почты `test_addr_0@example.com`. Если вы использовали свой собственный адрес, это будет тот адрес, который вы аттестовали.

### Подробное объяснение {#detailed-explanation-3}

![Getting from Ethereum address to e-mail](./fig-06-saml-sig-n-email.png)

Новые шаги — это взаимодействие с GraphQL, шаги 5.6 и 5.7.

Опять же, вот измененные части `idp.mts`.

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

Импорт необходимых нам библиотек.

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

Существует [отдельная конечная точка для каждого блокчейна](https://docs.attest.org/docs/developer-tools/api).

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

Создание нового клиента `GraphQLClient`, который мы можем использовать для запросов к конечной точке.

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL дает нам только непрозрачный объект данных с байтами. Чтобы понять его, нам нужна схема. 

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

Функция для получения адреса электронной почты из адреса Эфириума.

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

Это запрос GraphQL.

```typescript
      attestations(
```

Мы ищем аттестации.

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

Нам нужны аттестации в нашей схеме, где получателем является `getAddress(ethAddr)`. Функция [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) гарантирует, что наш адрес имеет правильную [контрольную сумму](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md). Это необходимо, так как GraphQL чувствителен к регистру. «0xBAD060A7», «0xBad060A7» и «0xbad060a7» — это разные значения.

```typescript
        take: 1
```

Независимо от того, сколько аттестаций мы найдем, нам нужна только первая.

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

Поля, которые мы хотим получить.

- `attester`: Адрес, который отправил аттестацию. Обычно это используется для принятия решения о том, доверять аттестации или нет.
- `id`: ID аттестации. Вы можете использовать это значение, чтобы [прочитать аттестацию ончейн](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64) и убедиться, что информация из запроса GraphQL верна.
- `data`: Данные схемы (в данном случае адрес электронной почты).

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

Если аттестации нет, возвращаем значение, которое явно неверно, но будет казаться действительным для поставщика услуг.

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

Если значение есть, используем `decodeData` для декодирования данных. Нам не нужны предоставляемые им метаданные, только само значение.

```typescript
  const loginResponse = await idp.createLoginResponse(
    sp, 
    {
      .
      .
      .
    },
    "post",
    {
      email: await ethereumAddressToEmail(req.params.account)
    }
  );
```

Использование новой функции для получения адреса электронной почты.

## Как насчет децентрализации? {#what-about-decentralization}

В этой конфигурации пользователи не могут выдавать себя за тех, кем они не являются, пока мы полагаемся на надежных аттестующих для сопоставления адреса Эфириума с адресом электронной почты. Однако наш поставщик учетных данных по-прежнему является централизованным компонентом. Тот, у кого есть приватный ключ поставщика учетных данных, может отправить ложную информацию поставщику услуг.

Возможно, существует решение с использованием [многосторонних вычислений (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation). Я надеюсь написать об этом в будущем руководстве.

## Заключение {#conclusion}

Внедрение стандарта входа, такого как подписи Эфириума, сталкивается с проблемой курицы и яйца. Поставщики услуг хотят привлечь как можно более широкий рынок. Пользователи хотят иметь возможность получать доступ к сервисам, не беспокоясь о поддержке своего стандарта входа.
Создание адаптеров, таких как Ethereum IdP, может помочь нам преодолеть это препятствие.

[Здесь вы можете найти больше моих работ](https://cryptodocguy.pro/).