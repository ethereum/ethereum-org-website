---
title: Використання Етеріуму для автентифікації у Веб2
description: Після прочитання цього посібника розробник зможе інтегрувати вхід через Етеріум (web3) із входом через SAML — стандартом, що використовується у Веб2 для забезпечення єдиного входу та інших пов'язаних сервісів. Це дозволяє автентифікувати доступ до ресурсів Веб2 за допомогою підписів Етеріуму, при цьому атрибути користувача отримуються з атестацій.
author: Орі Померанц
tags: ["Веб2", "автентифікація", "eas"]
skill: beginner
breadcrumb: Етеріум для автентифікації у Веб2
lang: uk
published: 2025-04-30
---

## Вступ {#introduction}

[SAML](https://www.onelogin.com/learn/saml) — це стандарт, який використовується у Веб2, щоб дозволити [постачальнику ідентифікаційної інформації (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) надавати інформацію про користувача для [постачальників послуг (SP)](https://en.wikipedia.org/wiki/Service_provider_(SAML).

У цьому посібнику ви дізнаєтеся, як інтегрувати підписи Етеріуму з SAML, щоб дозволити користувачам використовувати свої гаманці Етеріуму для автентифікації у сервісах Веб2, які ще не підтримують Етеріум нативно.

Зверніть увагу, що цей посібник написаний для двох різних аудиторій:

- Фахівців з Етеріуму, які розуміють Етеріум і яким потрібно вивчити SAML
- Фахівців з Веб2, які розуміють SAML та автентифікацію у Веб2 і яким потрібно вивчити Етеріум

Як наслідок, він міститиме багато вступного матеріалу, який ви вже знаєте. Не соромтеся його пропускати.

### SAML для фахівців з Етеріуму {#saml-for-ethereum-people}

SAML — це централізований протокол. Постачальник послуг (SP) приймає твердження (наприклад, «це мій користувач Джон, він повинен мати дозволи на виконання A, B і C») від постачальника ідентифікаційної інформації (IdP) лише в тому випадку, якщо він має з ним попередньо встановлені довірчі відносини, або з [центром сертифікації](https://www.ssl.com/article/what-is-a-certificate-authority-ca/), який підписав сертифікат цього IdP.

Наприклад, SP може бути туристичним агентством, що надає туристичні послуги компаніям, а IdP — внутрішнім вебсайтом компанії. Коли працівникам потрібно забронювати ділову поїздку, туристичне агентство відправляє їх на автентифікацію в компанію, перш ніж дозволити їм фактично забронювати поїздку.

![Step by step SAML process](./fig-01-saml.png)

Саме так три сутності — браузер, SP та IdP — домовляються про доступ. SP не потрібно заздалегідь нічого знати про користувача, який використовує браузер, достатньо лише довіряти IdP.

### Етеріум для фахівців із SAML {#ethereum-for-saml-people}

Етеріум — це децентралізована система. 

![Ethereum logon](./fig-02-eth-logon.png)

Користувачі мають приватний ключ (який зазвичай зберігається у розширенні браузера). З приватного ключа можна отримати відкритий ключ, а з нього — 20-байтову адресу. Коли користувачам потрібно увійти в систему, їх просять підписати повідомлення з нонсом (одноразовим значенням). Сервер може перевірити, що підпис був створений цією адресою.

![Getting extra data from attestations](./fig-03-eas-data.png)

Підпис лише підтверджує адресу Етеріуму. Щоб отримати інші атрибути користувача, зазвичай використовують [атестації](https://attest.org/). Атестація зазвичай має такі поля:

- **Атестатор (Attestor)**, адреса, яка здійснила атестацію
- **Одержувач (Recipient)**, адреса, якої стосується атестація
- **Дані (Data)**, дані, що атестуються, такі як ім'я, дозволи тощо.
- **Схема (Schema)**, ідентифікатор схеми, що використовується для інтерпретації даних.

Через децентралізовану природу Етеріуму будь-який користувач може створювати атестації. Особа атестатора важлива для визначення того, які атестації ми вважаємо надійними.

## Налаштування {#setup}

Першим кроком є налаштування зв'язку між SAML SP та SAML IdP.

1. Завантажте програмне забезпечення. Приклад програмного забезпечення для цієї статті знаходиться [на GitHub](https://github.com/qbzzt/250420-saml-ethereum). Різні етапи зберігаються в різних гілках, для цього етапу вам потрібна `saml-only`

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. Створіть ключі із самопідписаними сертифікатами. Це означає, що ключ є власним центром сертифікації, і його потрібно імпортувати до постачальника послуг вручну. Для отримання додаткової інформації дивіться [документацію OpenSSL](https://docs.openssl.org/master/man1/openssl-req/). 

    ```sh
    mkdir keys
    cd keys
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-sp.crt -keyout saml-sp.pem -subj /CN=sp/
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-idp.crt -keyout saml-idp.pem -subj /CN=idp/
    cd ..
    ```

3. Запустіть сервери (як SP, так і IdP)

    ```sh
    pnpm start
    ```

4. Перейдіть до SP за URL-адресою [http://localhost:3000/](http://localhost:3000/) і натисніть кнопку, щоб вас перенаправило до IdP (порт 3001).

5. Надайте IdP свою електронну адресу та натисніть **Login to the service provider**. Переконайтеся, що вас перенаправлено назад до постачальника послуг (порт 3000) і що він розпізнає вас за вашою електронною адресою.

### Детальне пояснення {#detailed-explanation}

Ось що відбувається крок за кроком:

![Normal SAML logon without Ethereum](./fig-04-saml-no-eth.png)

#### src/config.mts {#srcconfigmts}

Цей файл містить конфігурацію як для постачальника ідентифікаційної інформації, так і для постачальника послуг. Зазвичай це дві різні сутності, але тут ми можемо використовувати спільний код для простоти.

```typescript
const fs = await import("fs")

const protocol="http"
```

Поки що ми лише тестуємо, тому використання HTTP є цілком прийнятним.

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

Зчитування відкритих ключів, які зазвичай доступні обом компонентам (і яким довіряють безпосередньо, або які підписані довіреним центром сертифікації).

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

URL-адреси для обох компонентів.

```typescript
export const spPublicData = {
```

Публічні дані для постачальника послуг.

```typescript
    entityID: `${spUrl}/metadata`,
```

За домовленістю, у SAML `entityID` — це URL-адреса, за якою доступні метадані сутності. Ці метадані відповідають публічним даних тут, за винятком того, що вони у форматі XML.

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

Найважливішим визначенням для наших цілей є `assertionConsumerServer`. Це означає, що для того, щоб стверджувати щось (наприклад, «користувач, який надсилає вам цю інформацію, — somebody@example.com») постачальнику послуг, нам потрібно використати [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) на URL-адресу `http://localhost:3000/sp/assertion`.

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

Публічні дані для постачальника ідентифікаційної інформації є подібними. Вони вказують, що для входу користувача потрібно надіслати POST-запит на `http://localhost:3001/idp/login`, а для виходу — POST-запит на `http://localhost:3001/idp/logout`.

#### src/sp.mts {#srcspmts}

Це код, який реалізує постачальника послуг.

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

Ми використовуємо бібліотеку [`samlify`](https://www.npmjs.com/package/samlify) для реалізації SAML.

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

Бібліотека `samlify` очікує наявності пакета для перевірки правильності XML, його підписання очікуваним відкритим ключем тощо. Для цього ми використовуємо [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint).

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

[`Router`](https://expressjs.com/en/5x/api.html#router) в [`express`](https://expressjs.com/) — це «міні-вебсайт», який можна вмонтувати всередину вебсайту. У цьому випадку ми використовуємо його, щоб згрупувати всі визначення постачальника послуг разом.

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

Власне представлення постачальника послуг — це всі публічні дані та приватний ключ, який він використовує для підписання інформації.

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

Публічні дані містять усе, що постачальнику послуг потрібно знати про постачальника ідентифікаційної інформації.

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

Щоб забезпечити інтероперабельність з іншими компонентами SAML, постачальники послуг та ідентифікаційної інформації повинні мати свої публічні дані (які називаються метаданими) доступними у форматі XML за адресою `/metadata`.

```typescript
spRouter.post(`/assertion`,
```

Це сторінка, до якої звертається браузер для ідентифікації. Твердження включає ідентифікатор користувача (тут ми використовуємо електронну адресу) і може містити додаткові атрибути. Це обробник для кроку 7 на діаграмі послідовності вище.

```typescript
  async (req, res) => {
    // console.log(`Відповідь SAML:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

Ви можете використати закоментовану команду, щоб побачити XML-дані, надані у твердженні. Вони [закодовані у base64](https://en.wikipedia.org/wiki/Base64).

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

Розбір запиту на вхід від сервера ідентифікації.

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

Надсилання HTML-відповіді, просто щоб показати користувачеві, що ми отримали вхід.

```typescript
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

Інформування користувача у разі помилки.

```typescript
spRouter.get('/login',
```

Створення запиту на вхід, коли браузер намагається отримати цю сторінку. Це обробник для кроку 1 на діаграмі послідовності вище.

```typescript
  async (req, res) => {
    const loginRequest = await sp.createLoginRequest(idp, "post")
```

Отримання інформації для надсилання запиту на вхід.

```typescript
    res.send(`
      <html>
        <body>
          <script>
            window.onload = function () { document.forms[0].submit(); }            
          </script>
```

Ця сторінка автоматично надсилає форму (див. нижче). Таким чином користувачеві не потрібно нічого робити для перенаправлення. Це крок 2 на діаграмі послідовності вище.

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

POST-запит на `loginRequest.entityEndpoint` (URL-адреса кінцевої точки постачальника ідентифікаційної інформації).

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

Ім'я поля вводу — `loginRequest.type` (`SAMLRequest`). Вмістом цього поля є `loginRequest.context`, що знову ж таки є XML, закодованим у base64.

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[Це проміжне програмне забезпечення (middleware)](https://expressjs.com/en/5x/api.html#express.urlencoded) зчитує тіло [HTTP-запиту](https://www.tutorialspoint.com/http/http_requests.htm). За замовчуванням express ігнорує його, оскільки більшість запитів його не потребують. Нам воно потрібне, оскільки POST використовує тіло запиту.

```typescript
app.use(`/${config.spDir}`, spRouter)
```

Монтування маршрутизатора в каталозі постачальника послуг (`/sp`).

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

Якщо браузер намагається отримати кореневий каталог, надайте йому посилання на сторінку входу.

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

Прослуховування `spPort` за допомогою цього застосунку express.

#### src/idp.mts {#srcidpmts}

Це постачальник ідентифікаційної інформації. Він дуже схожий на постачальника послуг, наведені нижче пояснення стосуються частин, які відрізняються.

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // Зберегти атрибути
    attributeNamePrefix: "@_", // Префікс для атрибутів
  }
)
```

Нам потрібно прочитати та зрозуміти XML-запит, який ми отримуємо від постачальника послуг.

```typescript
const getLoginPage = requestId => `
```

Ця функція створює сторінку з формою, що автоматично надсилається, яка повертається на кроці 4 діаграми послідовності вище.

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

Ми надсилаємо постачальнику послуг два поля:

1. `requestId`, на який ми відповідаємо.
2. Ідентифікатор користувача (наразі ми використовуємо електронну адресу, яку надає користувач).

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

Це обробник для кроку 5 діаграми послідовності вище. [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) створює відповідь на вхід. 

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

Аудиторією є постачальник послуг.

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

Інформація, витягнута із запиту. Єдиний параметр, який нас цікавить у запиті, — це requestId, який дозволяє постачальнику послуг зіставляти запити та їхні відповіді.

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // Забезпечити підписання
```

Нам потрібен `signingKey`, щоб мати дані для підписання відповіді. Постачальник послуг не довіряє непідписаним запитам.

```typescript
    },
    "post",
    {
      email: req.body.email
```

Це поле з інформацією про користувача, яку ми надсилаємо назад постачальнику послуг.

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

Знову ж таки, використовується форма, що автоматично надсилається. Це крок 6 діаграми послідовності вище.

```typescript

// Кінцева точка IdP для запитів на вхід
idpRouter.post(`/login`,
```

Це кінцева точка, яка отримує запит на вхід від постачальника послуг. Це обробник для кроку 3 діаграми послідовності вище.

```typescript
  async (req, res) => {
    try {
      // Обхідний шлях, оскільки мені не вдалося змусити працювати parseLoginRequest.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

Ми мали б мати можливість використовувати [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) для зчитування ідентифікатора запиту на автентифікацію. Однак мені не вдалося змусити його працювати, і не варто було витрачати на це багато часу, тому я просто використовую [універсальний парсер XML](https://www.npmjs.com/package/fast-xml-parser). Інформація, яка нам потрібна, — це атрибут `ID` всередині тегу `<samlp:AuthnRequest>`, який знаходиться на верхньому рівні XML.

## Використання підписів Етеріуму {#using-ethereum-signatures}

Тепер, коли ми можемо надіслати ідентифікаційну інформацію користувача постачальнику послуг, наступним кроком є отримання ідентифікаційної інформації користувача у надійний спосіб. Viem дозволяє нам просто запитати у гаманця адресу користувача, але це означає запит інформації у браузера. Ми не контролюємо браузер, тому не можемо автоматично довіряти відповіді, яку отримуємо від нього.

Натомість IdP надішле браузеру рядок для підписання. Якщо гаманець у браузері підпише цей рядок, це означатиме, що це дійсно та адреса (тобто він знає приватний ключ, який відповідає цій адресі).

Щоб побачити це в дії, зупиніть існуючі IdP та SP і виконайте ці команди:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

Потім перейдіть [до SP](http://localhost:3000) і дотримуйтесь інструкцій.

Зверніть увагу, що на цьому етапі ми не знаємо, як отримати електронну адресу з адреси Етеріуму, тому замість цього ми повідомляємо `<ethereum address>@bad.email.address` до SP.

### Детальне пояснення {#detailed-explanation-2}

Зміни стосуються кроків 4-5 на попередній діаграмі.

![SAML with an Ethereum signature](./fig-05-saml-w-signature.png)

Єдиний файл, який ми змінили, — це `idp.mts`. Ось змінені частини.

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

Нам потрібні ці дві додаткові бібліотеки. Ми використовуємо [`uuid`](https://www.npmjs.com/package/uuid) для створення значення [нонсу](https://en.wikipedia.org/wiki/Cryptographic_nonce). Саме значення не має значення, важливий лише той факт, що воно використовується лише один раз.

Бібліотека [`viem`](https://viem.sh/) дозволяє нам використовувати визначення Етеріуму. Тут вона потрібна нам для перевірки того, що підпис дійсно є дійсним.

```typescript
const loginPrompt = "To access the service provider, sign this nonce: "
```

Гаманець просить у користувача дозвіл на підписання повідомлення. Повідомлення, яке є просто нонсом, може заплутати користувачів, тому ми додаємо цю підказку.

```typescript
// Зберігати requestIDs тут
let nonces = {}
```

Нам потрібна інформація про запит, щоб мати можливість відповісти на нього. Ми могли б надіслати її разом із запитом (крок 4) і отримати назад (крок 5). Однак ми не можемо довіряти інформації, яку отримуємо від браузера, що знаходиться під контролем потенційно ворожого користувача. Тому краще зберігати її тут, використовуючи нонс як ключ.

Зверніть увагу, що ми робимо це тут як змінну заради простоти. Однак це має кілька недоліків:

- Ми вразливі до атаки на відмову в обслуговуванні (DoS). Зловмисник може спробувати увійти в систему кілька разів, заповнюючи нашу пам'ять.
- Якщо процес IdP потрібно перезапустити, ми втрачаємо існуючі значення.
- Ми не можемо балансувати навантаження між кількома процесами, оскільки кожен з них матиме власну змінну.

У виробничій системі ми б використовували базу даних і реалізували б певний механізм закінчення терміну дії.

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

Створення нонсу та збереження `requestId` для подальшого використання.

```typescript
  return `
<html>
  <head>
    <script type="module">
```

Цей JavaScript виконується автоматично під час завантаження сторінки.

```typescript
      import { createWalletClient, custom, getAddress } from 'https://esm.sh/viem'
```

Нам потрібно кілька функцій з `viem`.

```typescript
      if (!window.ethereum) {
          alert("Please install MetaMask or a compatible wallet and then reload")
      }
```

Ми можемо працювати лише за наявності гаманця у браузері.

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

Запит списку акаунтів з гаманця (`window.ethereum`). Припускаємо, що є принаймні один, і зберігаємо лише перший. 

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

Створення [клієнта гаманця](https://viem.sh/docs/clients/wallet) для взаємодії з гаманцем браузера.

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

Просимо користувача підписати повідомлення. Оскільки весь цей HTML знаходиться у [шаблонному рядку](https://viem.sh/docs/clients/wallet), ми можемо використовувати змінні, визначені у процесі idp. Це крок 4.5 на діаграмі послідовності.

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

Перенаправлення на `/idp/signature/<nonce>/<address>/<signature>`. Це крок 5 на діаграмі послідовності.

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

Підпис надсилається назад браузером, який є потенційно шкідливим (ніщо не заважає вам просто відкрити `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` у браузері). Тому важливо переконатися, що процес IdP правильно обробляє недійсні підписи.

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

Решта — це просто стандартний HTML.

```typescript
idpRouter.get("/signature/:nonce/:account/:signature", async (req, res) => {
```

Це обробник для кроку 5 на діаграмі послідовності.

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("Bad nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

Отримання ідентифікатора запиту та видалення нонсу з `nonces`, щоб переконатися, що його не можна використати повторно.

```typescript
  try {
```

Оскільки існує так багато причин, через які підпис може бути недійсним, ми загортаємо це у блок `try ... catch`, щоб перехопити будь-які згенеровані помилки.

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

Використання [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage) для реалізації кроку 5.5 на діаграмі послідовності.

```typescript
    if (!validSignature)
      throw("Bad signature")
  } catch (err) {
    res.send("Error:" + err)
    return ;
  }
```

Решта обробника еквівалентна тому, що ми робили в обробнику `/loginSubmitted` раніше, за винятком однієї невеликої зміни.

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

У нас немає фактичної електронної адреси (ми отримаємо її в наступному розділі), тому наразі ми повертаємо адресу Етеріуму і чітко позначаємо, що це не електронна адреса.


```typescript
// Кінцева точка IdP для запитів на вхід
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // Обхідний шлях, оскільки мені не вдалося змусити працювати parseLoginRequest.
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

Замість `getLoginPage` тепер використовуйте `getSignaturePage` в обробнику кроку 3.

## Отримання електронної адреси {#getting-the-email-address}

Наступним кроком є отримання електронної адреси — ідентифікатора, який запитує постачальник послуг. Для цього ми використовуємо [Службу атестації Етеріуму (EAS)](https://attest.org/).

Найпростіший спосіб отримати атестації — використати [API GraphQL](https://docs.attest.org/docs/developer-tools/api). Ми використовуємо цей запит:

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

Ця [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) містить лише електронну адресу. Цей запит запитує атестації цієї схеми. Суб'єкт атестації називається `recipient`. Це завжди адреса Етеріуму.

Попередження: Спосіб, у який ми отримуємо атестації тут, має дві проблеми з безпекою.

- Ми звертаємося до кінцевої точки API, `https://optimism.easscan.org/graphql`, яка є централізованим компонентом. Ми можемо отримати атрибут `id`, а потім виконати пошук ончейн, щоб перевірити, чи є атестація справжньою, але кінцева точка API все одно може цензурувати атестації, не повідомляючи нам про них. 

  Цю проблему можна вирішити, ми могли б запустити власну кінцеву точку GraphQL і отримувати атестації з логів ланцюга, але це надмірно для наших цілей.

- Ми не перевіряємо особу атестатора. Будь-хто може надати нам неправдиву інформацію. У реальній реалізації ми мали б набір довірених атестаторів і розглядали б лише їхні атестації.

Щоб побачити це в дії, зупиніть існуючі IdP та SP і виконайте ці команди:

```sh
git checkout email-address
pnpm install
pnpm start
```

Потім вкажіть свою електронну адресу. У вас є два способи зробити це:

- Імпортувати гаманець за допомогою приватного ключа та використати тестовий приватний ключ `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`.

- Додати атестацію для власної електронної адреси:

  1. Перейдіть до [схеми в оглядачі атестацій](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977).

  2. Натисніть **Attest with Schema**.

  3. Введіть свою адресу Етеріуму як одержувача, свою електронну адресу як email address і виберіть **Onchain**. Потім натисніть **Make Attestation**.

  4. Схваліть транзакцію у своєму гаманці. Вам знадобиться трохи ETH у [блокчейні Optimism](https://app.optimism.io/bridge/deposit) для оплати за газ.

У будь-якому випадку, після цього перейдіть за адресою [http://localhost:3000](http://localhost:3000) і дотримуйтесь інструкцій. Якщо ви імпортували тестовий приватний ключ, електронна адреса, яку ви отримаєте, буде `test_addr_0@example.com`. Якщо ви використовували власну адресу, це має бути те, що ви атестували.

### Детальне пояснення {#detailed-explanation-3}

![Getting from Ethereum address to e-mail](./fig-06-saml-sig-n-email.png)

Новими кроками є комунікація через GraphQL, кроки 5.6 та 5.7.

Знову ж таки, ось змінені частини `idp.mts`.

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

Імпорт необхідних нам бібліотек.

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

Існує [окрема кінцева точка для кожного блокчейну](https://docs.attest.org/docs/developer-tools/api).

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

Створення нового клієнта `GraphQLClient`, який ми можемо використовувати для запитів до кінцевої точки.

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL дає нам лише непрозорий об'єкт даних із байтами. Щоб зрозуміти його, нам потрібна схема. 

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

Функція для отримання електронної адреси з адреси Етеріуму.

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

Це запит GraphQL.

```typescript
      attestations(
```

Ми шукаємо атестації.

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

Атестації, які нам потрібні, — це ті, що відповідають нашій схемі, де одержувачем є `getAddress(ethAddr)`. Функція [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) гарантує, що наша адреса має правильну [контрольну суму](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md). Це необхідно, оскільки GraphQL чутливий до регістру. "0xBAD060A7", "0xBad060A7" та "0xbad060a7" — це різні значення.

```typescript
        take: 1
```

Незалежно від того, скільки атестацій ми знайдемо, нам потрібна лише перша.

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

Поля, які ми хочемо отримати.

- `attester`: Адреса, яка подала атестацію. Зазвичай це використовується для прийняття рішення про те, чи довіряти атестації, чи ні.
- `id`: Ідентифікатор атестації. Ви можете використати це значення, щоб [прочитати атестацію ончейн](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64) для перевірки правильності інформації із запиту GraphQL.
- `data`: Дані схеми (у цьому випадку — електронна адреса).

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

Якщо атестації немає, повертається значення, яке є очевидно неправильним, але яке здаватиметься дійсним для постачальника послуг.

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

Якщо значення є, використовується `decodeData` для декодування даних. Нам не потрібні метадані, які він надає, лише саме значення.

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

Використання нової функції для отримання електронної адреси.

## А як щодо децентралізації? {#what-about-decentralization}

У цій конфігурації користувачі не можуть видавати себе за когось іншого, доки ми покладаємося на надійних атестаторів для зіставлення адреси Етеріуму з електронною адресою. Однак наш постачальник ідентифікаційної інформації все ще є централізованим компонентом. Той, хто має приватний ключ постачальника ідентифікаційної інформації, може надсилати неправдиву інформацію постачальнику послуг.

Можливо, існує рішення з використанням [багатосторонніх обчислень (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation). Я сподіваюся написати про це в майбутньому посібнику.

## Висновок {#conclusion}

Впровадження стандарту входу, такого як підписи Етеріуму, стикається з проблемою курки та яйця. Постачальники послуг хочуть охопити якомога ширший ринок. Користувачі хочуть мати можливість отримувати доступ до послуг, не турбуючись про підтримку свого стандарту входу.
Створення адаптерів, таких як Ethereum IdP, може допомогти нам подолати цю перешкоду.

[Дивіться тут більше моїх робіт](https://cryptodocguy.pro/).