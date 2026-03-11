---
title: "Использование Ethereum для аутентификации web2"
description: "После прочтения этого руководства разработчик сможет интегрировать вход в систему Ethereum (web3) с входом в систему SAML — стандартом, используемым в web2 для обеспечения единого входа и других сопутствующих услуг. Это позволяет аутентифицировать доступ к ресурсам web2 с помощью подписей Ethereum, при этом атрибуты пользователя берутся из аттестаций."
author: Ori Pomerantz
tags: [ "web2", "аутентификация", "eas" ]
skill: beginner
lang: ru
published: 2025-04-30
---

## Введение

[SAML](https://www.onelogin.com/learn/saml) — это стандарт, используемый в web2, который позволяет [поставщику удостоверений (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) предоставлять информацию о пользователе [поставщикам услуг (SP)](https://en.wikipedia.org/wiki/Service_provider_\(SAML\)).

В этом руководстве вы узнаете, как интегрировать подписи Ethereum с SAML, чтобы позволить пользователям использовать свои кошельки Ethereum для аутентификации в сервисах web2, которые пока не поддерживают Ethereum нативно.

Обратите внимание, что это руководство предназначено для двух разных аудиторий:

- Пользователи Ethereum, которые разбираются в Ethereum и хотят изучить SAML
- Пользователи Web2, которые разбираются в SAML и аутентификации web2 и хотят изучить Ethereum

В результате в нем будет много вводного материала, который вы уже знаете. Не стесняйтесь пропускать его.

### SAML для пользователей Ethereum

SAML — это централизованный протокол. Поставщик услуг (SP) принимает утверждения (например, "это мой пользователь John, у него должны быть разрешения на выполнение A, B и C") от поставщика удостоверений (IdP), только если у него есть предварительно установленные доверительные отношения либо с ним, либо с [центром сертификации](https://www.ssl.com/article/what-is-a-certificate-authority-ca/), который подписал сертификат этого IdP.

Например, SP может быть туристическим агентством, предоставляющим туристические услуги компаниям, а IdP — внутренним веб-сайтом компании. Когда сотрудникам необходимо забронировать деловую поездку, туристическое агентство отправляет их на аутентификацию в компанию, прежде чем позволить им фактически забронировать поездку.

![Пошаговый процесс SAML](./fig-01-saml.png)

Таким образом три сущности — браузер, SP и IdP — договариваются о доступе. SP не нужно заранее ничего знать о пользователе, использующем браузер, ему достаточно доверять IdP.

### Ethereum для пользователей SAML

Ethereum — это децентрализованная система.

![Вход в Ethereum](./fig-02-eth-logon.png)

У пользователей есть приватный ключ (обычно хранящийся в расширении браузера). Из приватного ключа можно получить публичный ключ, а из него — 20-байтовый адрес. Когда пользователям необходимо войти в систему, им предлагается подписать сообщение с помощью nonce (одноразового значения). Сервер может проверить, что подпись была создана этим адресом.

![Получение дополнительных данных из аттестаций](./fig-03-eas-data.png)

Подпись подтверждает только адрес Ethereum. Чтобы получить другие атрибуты пользователя, обычно используются [аттестации](https://attest.org/). Аттестация обычно содержит следующие поля:

- **Аттестующий**, адрес, который сделал аттестацию
- **Получатель**, адрес, к которому применяется аттестация
- **Данные**, аттестуемые данные, такие как имя, разрешения и т. д.
- **Схема**, идентификатор схемы, используемой для интерпретации данных.

Из-за децентрализованной природы Ethereum любой пользователь может делать аттестации. Личность аттестующего важна для определения того, какие аттестации мы считаем надежными.

## Настройка

Первый шаг — обеспечить взаимодействие между SAML SP и SAML IdP.

1. Загрузите программное обеспечение. Пример программного обеспечения для этой статьи находится [на GitHub](https://github.com/qbzzt/250420-saml-ethereum). Разные этапы хранятся в разных ветках, для этого этапа вам нужна ветка `saml-only`

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. Создайте ключи с самоподписанными сертификатами. Это означает, что ключ является собственным центром сертификации и должен быть импортирован вручную поставщику услуг. Дополнительную информацию см. в [документации OpenSSL](https://docs.openssl.org/master/man1/openssl-req/).

    ```sh
    mkdir keys
    cd keys
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-sp.crt -keyout saml-sp.pem -subj /CN=sp/
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-idp.crt -keyout saml-idp.pem -subj /CN=idp/
    cd ..
    ```

3. Запустите серверы (и SP, и IdP)

    ```sh
    pnpm start
    ```

4. Перейдите по URL-адресу SP [http://localhost:3000/](http://localhost:3000/) и нажмите кнопку для перенаправления на IdP (порт 3001).

5. Укажите свой адрес электронной почты в IdP и нажмите **Login to the service provider**. Убедитесь, что вы были перенаправлены обратно к поставщику услуг (порт 3000) и что он распознает вас по вашему адресу электронной почты.

### Подробное объяснение

Вот что происходит, шаг за шагом:

![Обычный вход в систему SAML без Ethereum](./fig-04-saml-no-eth.png)

#### src/config.mts

Этот файл содержит конфигурацию как для поставщика удостоверений, так и для поставщика услуг. Обычно это две разные сущности, но здесь для простоты мы можем использовать общий код.

```typescript
const fs = await import("fs")

const protocol="http"
```

Пока мы просто тестируем, поэтому можно использовать HTTP.

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

Прочтите публичные ключи, которые обычно доступны обоим компонентам (и либо доверяются напрямую, либо подписаны доверенным центром сертификации).

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

По соглашению, в SAML `entityID` — это URL-адрес, по которому доступны метаданные сущности. Эти метаданные соответствуют здешним публичным данным, за исключением того, что они представлены в формате XML.

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

Самым важным определением для наших целей является `assertionConsumerServer`. Это означает, что для утверждения чего-либо (например, "пользователь, который отправляет вам эту информацию, — somebody@example.com") поставщику услуг нам нужно использовать [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) на URL-адрес `http://localhost:3000/sp/assertion`.

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

Публичные данные для поставщика удостоверений похожи. В нем указано, что для входа пользователя в систему необходимо отправить POST-запрос на `http://localhost:3001/idp/login`, а для выхода — на `http://localhost:3001/idp/logout`.

#### src/sp.mts

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

Библиотека `samlify` ожидает наличия пакета для проверки того, что XML-документ корректен, подписан ожидаемым публичным ключом и т. д. Для этой цели мы используем [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint).

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

[`Router`](https://expressjs.com/en/5x/api.html#router) из [`express`](https://expressjs.com/) — это "мини-веб-сайт", который можно встроить в другой веб-сайт. В данном случае мы используем его для группировки всех определений поставщика услуг.

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

Публичные данные содержат все, что поставщик услуг должен знать о поставщике удостоверений.

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

Чтобы обеспечить совместимость с другими компонентами SAML, поставщики услуг и удостоверений должны предоставлять свои публичные данные (называемые метаданными) в формате XML по адресу `/metadata`.

```typescript
spRouter.post(`/assertion`,
```

Это страница, к которой обращается браузер для самоидентификации. Утверждение включает идентификатор пользователя (здесь мы используем адрес электронной почты) и может содержать дополнительные атрибуты. Это обработчик для шага 7 на диаграмме последовательности выше.

```typescript
  async (req, res) => {
    // console.log(`SAML response:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

Вы можете использовать закомментированную команду, чтобы увидеть данные XML, предоставленные в утверждении. Они [закодированы в base64](https://en.wikipedia.org/wiki/Base64).

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);"
```

Проанализируйте запрос на вход от сервера удостоверений.

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

Отправьте HTML-ответ, чтобы показать пользователю, что мы получили запрос на вход.

```typescript
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

Сообщите пользователю в случае сбоя.

```typescript
spRouter.get('/login',
```

Создайте запрос на вход, когда браузер пытается получить эту страницу. Это обработчик для шага 1 на диаграмме последовательности выше.

```typescript
  async (req, res) => {
    const loginRequest = await sp.createLoginRequest(idp, "post")
```

Получите информацию для отправки запроса на вход.

```typescript
    res.send(`
      <html>
        <body>
          <script>
            window.onload = function () { document.forms[0].submit(); }            
          </script>
```

Эта страница автоматически отправляет форму (см. ниже). Таким образом, пользователю не нужно ничего делать для перенаправления. Это шаг 2 на диаграмме последовательности выше.

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

Отправьте POST-запрос на `loginRequest.entityEndpoint` (URL-адрес конечной точки поставщика удостоверений).

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

Имя поля ввода — `loginRequest.type` (`SAMLRequest`). Содержимое этого поля — `loginRequest.context`, что снова является XML, закодированным в base64.

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[Это промежуточное ПО](https://expressjs.com/en/5x/api.html#express.urlencoded) читает тело [HTTP-запроса](https://www.tutorialspoint.com/http/http_requests.htm). По умолчанию express игнорирует его, потому что большинство запросов этого не требуют. Нам это нужно, потому что POST использует тело запроса.

```typescript
app.use(`/${config.spDir}`, spRouter)
```

Подключите маршрутизатор в каталоге поставщика услуг (`/sp`).

```typescript
app.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <button onClick="document.location.href='${config.spUrl}/login'">
           Нажмите здесь, чтобы войти
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

Прослушивайте `spPort` с помощью этого приложения express.

#### src/idp.mts

Это поставщик удостоверений. Он очень похож на поставщика услуг, приведенные ниже объяснения относятся к тем частям, которые отличаются.

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // Сохранять атрибуты
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
    <title>Страница входа</title>
  </head>
  <body>
    <h2>Страница входа</h2>
    <form method="post" action="./loginSubmitted">
      <input type="hidden" name="requestId" value="${requestId}" />
      Адрес электронной почты: <input name="email" />
      <br />
      <button type="Submit">
        Войти в систему поставщика услуг
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

Это обработчик для шага 5 на диаграмме последовательности выше. [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) создает ответ на запрос входа.

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
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // Обеспечить подпись
```

Нам нужен `signingKey` для получения данных для подписи ответа. Поставщик услуг не доверяет неподписанным запросам.

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

Опять же, используйте автоматически отправляемую форму. Это шаг 6 на диаграмме последовательности выше.

```typescript

// Конечная точка IdP для запросов на вход
idpRouter.post(`/login`,
```

Это конечная точка, которая получает запрос на вход от поставщика услуг. Это обработчик для шага 3 на диаграмме последовательности выше.

```typescript
  async (req, res) => {
    try {
      // Обходной путь, потому что мне не удалось заставить parseLoginRequest работать.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

Мы должны иметь возможность использовать [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) для чтения ID запроса на аутентификацию. Однако мне не удалось заставить его работать, и не стоило тратить на это много времени, поэтому я просто использую [XML-парсер общего назначения](https://www.npmjs.com/package/fast-xml-parser). Информация, которая нам нужна, — это атрибут `ID` внутри тега `<samlp:AuthnRequest>`, который находится на верхнем уровне XML.

## Использование подписей Ethereum

Теперь, когда мы можем отправлять идентификатор пользователя поставщику услуг, следующий шаг — получить идентификатор пользователя надежным способом. Viem позволяет нам просто запросить у кошелька адрес пользователя, но это означает запрос информации у браузера. Мы не контролируем браузер, поэтому не можем автоматически доверять ответу, который мы от него получаем.

Вместо этого IdP отправит браузеру строку для подписи. Если кошелек в браузере подписывает эту строку, это означает, что это действительно тот самый адрес (то есть он знает приватный ключ, соответствующий этому адресу).

Чтобы увидеть это в действии, остановите существующие IdP и SP и выполните следующие команды:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

Затем перейдите [к SP](http://localhost:3000) и следуйте инструкциям.

Обратите внимание, что на данном этапе мы не знаем, как получить адрес электронной почты из адреса Ethereum, поэтому вместо этого мы сообщаем SP `<адрес Ethereum>@bad.email.address`.

### Подробное объяснение

Изменения касаются шагов 4-5 на предыдущей диаграмме.

![SAML с подписью Ethereum](./fig-05-saml-w-signature.png)

Единственный файл, который мы изменили, — `idp.mts`. Вот измененные части.

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

Нам нужны эти две дополнительные библиотеки. Мы используем [`uuid`](https://www.npmjs.com/package/uuid) для создания значения [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). Само значение не имеет значения, важен лишь тот факт, что оно используется только один раз.

Библиотека [`viem`](https://viem.sh/) позволяет нам использовать определения Ethereum. Здесь она нужна нам для проверки действительности подписи.

```typescript
const loginPrompt = "Чтобы получить доступ к поставщику услуг, подпишите этот nonce: "
```

Кошелек запрашивает у пользователя разрешение на подписание сообщения. Сообщение, которое является просто nonce, может сбить с толку пользователей, поэтому мы включаем это приглашение.

```typescript
// Храните здесь requestID
let nonces = {}
```

Нам нужна информация о запросе, чтобы иметь возможность ответить на него. Мы могли бы отправить ее с запросом (шаг 4) и получить обратно (шаг 5). Однако мы не можем доверять информации, которую получаем от браузера, находящегося под контролем потенциально враждебного пользователя. Поэтому лучше хранить ее здесь, используя nonce в качестве ключа.

Обратите внимание, что для простоты мы делаем это здесь в виде переменной. Однако у этого есть несколько недостатков:

- Мы уязвимы для атаки типа «отказ в обслуживании». Злонамеренный пользователь может попытаться войти в систему несколько раз, заполнив нашу память.
- Если процесс IdP необходимо перезапустить, мы потеряем существующие значения.
- Мы не можем распределять нагрузку между несколькими процессами, потому что у каждого будет своя переменная.

В производственной системе мы бы использовали базу данных и реализовали какой-либо механизм истечения срока действия.

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

Создайте nonce и сохраните `requestId` для будущего использования.

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
          alert("Пожалуйста, установите MetaMask или совместимый кошелек, а затем перезагрузите страницу")
      }
```

Мы можем работать, только если в браузере есть кошелек.

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

Запросите список аккаунтов из кошелька (`window.ethereum`). Предположим, что есть хотя бы один, и сохраним только первый.

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

Создайте [клиент кошелька](https://viem.sh/docs/clients/wallet) для взаимодействия с кошельком браузера.

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

Попросите пользователя подписать сообщение. Поскольку весь этот HTML-код находится в [шаблонной строке](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Template_literals), мы можем использовать переменные, определенные в процессе idp. Это шаг 4.5 на диаграмме последовательности.

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

Перенаправление на `/idp/signature/<nonce>/<адрес>/<подпись>`. Это шаг 5 на диаграмме последовательности.

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

Подпись отправляется обратно браузером, который потенциально является злонамеренным (ничто не мешает вам просто открыть `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` в браузере). Поэтому важно убедиться, что процесс IdP правильно обрабатывает неверные подписи.

```typescript
    </script>
  </head>
  <body>
    <h2>Пожалуйста, подпишите</h2>
    <button onClick="window.goodSignature()">
      Отправить правильную (действительную) подпись
    </button>
    <br/>
    <button onClick="window.badSignature()">
      Отправить неверную (недействительную) подпись
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

Получите ID запроса и удалите nonce из `nonces`, чтобы убедиться, что его нельзя использовать повторно.

```typescript
  try {
```

Поскольку существует так много способов, которыми подпись может быть недействительной, мы оборачиваем это в `try ...` блок `catch`, чтобы перехватить любые возникающие ошибки.

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

Используйте [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage) для реализации шага 5.5 на диаграмме последовательности.

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

У нас нет фактического адреса электронной почты (мы получим его в следующем разделе), поэтому пока мы возвращаем адрес Ethereum и четко помечаем его как не являющийся адресом электронной почты.

```typescript
// Конечная точка IdP для запросов на вход
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // Обходной путь, потому что мне не удалось заставить parseLoginRequest работать.
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

## Получение адреса электронной почты

Следующий шаг — получение адреса электронной почты, идентификатора, запрошенного поставщиком услуг. Для этого мы используем [Ethereum Attestation Service (EAS)](https://attest.org/).

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

Этот [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) включает только адрес электронной почты. Этот запрос запрашивает аттестации этой схемы. Субъект аттестации называется `recipient`. Это всегда адрес Ethereum.

Внимание: способ получения аттестаций здесь имеет две проблемы с безопасностью.

- Мы обращаемся к конечной точке API, `https://optimism.easscan.org/graphql`, которая является централизованным компонентом. Мы можем получить атрибут `id`, а затем выполнить поиск он-чейн, чтобы проверить, что аттестация реальна, но конечная точка API все еще может подвергать цензуре аттестации, не сообщая нам о них.

  Эту проблему можно решить: мы могли бы запустить собственную конечную точку GraphQL и получать аттестации из логов цепи, но это излишне для наших целей.

- Мы не смотрим на личность аттестующего. Любой может предоставить нам ложную информацию. В реальной реализации у нас был бы набор доверенных аттестующих, и мы бы рассматривали только их аттестации.

Чтобы увидеть это в действии, остановите существующие IdP и SP и выполните следующие команды:

```sh
git checkout email-address
pnpm install
pnpm start
```

Затем укажите свой адрес электронной почты. У вас есть два способа сделать это:

- Импортируйте кошелек, используя приватный ключ, и используйте тестовый приватный ключ `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`.

- Добавьте аттестацию для своего собственного адреса электронной почты:

  1. Перейдите к [схеме в обозревателе аттестаций](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977).

  2. Нажмите **Attest with Schema**.

  3. Введите свой адрес Ethereum в качестве получателя, свой адрес электронной почты в качестве адреса электронной почты и выберите **Onchain**. Затем нажмите **Make Attestation**.

  4. Одобрите транзакцию в своем кошельке. Вам понадобится немного ETH в [блокчейне Optimism](https://app.optimism.io/bridge/deposit), чтобы заплатить за газ.

В любом случае, после этого перейдите по адресу [http://localhost:3000](http://localhost:3000) и следуйте инструкциям. Если вы импортировали тестовый приватный ключ, вы получите электронное письмо `test_addr_0@example.com`. Если вы использовали свой собственный адрес, это должно быть то, что вы аттестовали.

### Подробное объяснение

![Получение электронной почты из адреса Ethereum](./fig-06-saml-sig-n-email.png)

Новые шаги — это взаимодействие GraphQL, шаги 5.6 и 5.7.

И снова, вот измененные части `idp.mts`.

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

Импортируйте необходимые нам библиотеки.

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

Для каждого блокчейна существует [отдельная конечная точка](https://docs.attest.org/docs/developer-tools/api).

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

Создайте новый клиент `GraphQLClient`, который мы можем использовать для запросов к конечной точке.

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL дает нам только непрозрачный объект данных с байтами. Чтобы понять его, нам нужна схема.

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

Функция для получения адреса электронной почты из адреса Ethereum.

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

Это GraphQL-запрос.

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

Аттестации, которые нам нужны, — это те, что находятся в нашей схеме, где получателем является `getAddress(ethAddr)`. Функция [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) гарантирует, что наш адрес имеет правильную [контрольную сумму](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md). Это необходимо, поскольку GraphQL чувствителен к регистру. "0xBAD060A7", "0xBad060A7" и "0xbad060a7" — это разные значения.

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

- `attester`: адрес, который отправил аттестацию. Обычно это используется для принятия решения о том, доверять ли аттестации.
- `id`: идентификатор аттестации. Вы можете использовать это значение, чтобы [прочитать аттестацию он-чейн](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64) и проверить, верна ли информация из запроса GraphQL.
- `data`: данные схемы (в данном случае адрес электронной почты).

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

Если аттестации нет, верните очевидно неверное значение, которое, однако, будет выглядеть действительным для поставщика услуг.

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

Если значение есть, используйте `decodeData` для его декодирования. Нам не нужны предоставляемые метаданные, только само значение.

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

Используйте новую функцию для получения адреса электронной почты.

## Что насчет децентрализации?

В этой конфигурации пользователи не могут выдавать себя за кого-то другого, пока мы полагаемся на надежных аттестующих для сопоставления адресов Ethereum с адресами электронной почты. Однако наш поставщик удостоверений по-прежнему является централизованным компонентом. Любой, у кого есть приватный ключ поставщика удостоверений, может отправить ложную информацию поставщику услуг.

Возможно, есть решение с использованием [многосторонних вычислений (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation). Я надеюсь написать об этом в будущем руководстве.

## Заключение

Внедрение стандарта входа в систему, такого как подписи Ethereum, сталкивается с проблемой «курицы и яйца». Поставщики услуг хотят привлечь как можно более широкий рынок. Пользователи хотят иметь возможность получать доступ к услугам, не беспокоясь о поддержке своего стандарта входа.
Создание адаптеров, таких как Ethereum IdP, может помочь нам преодолеть это препятствие.

[Больше моих работ смотрите здесь](https://cryptodocguy.pro/).
