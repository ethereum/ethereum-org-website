---
title: "استخدام إيثريوم للمصادقة على الويب 2"
description: "بعد قراءة هذا البرنامج التعليمي، سيتمكن المطور من دمج تسجيل الدخول باستخدام إيثريوم (الويب 3) مع تسجيل الدخول باستخدام SAML، وهو معيار يُستخدم في الويب 2 لتوفير تسجيل الدخول الموحد والخدمات الأخرى ذات الصلة. يسمح هذا بمصادقة الوصول إلى موارد الويب 2 من خلال توقيعات إيثريوم، مع سمات المستخدم القادمة من المصادقات."
author: Ori Pomerantz
tags: [ "ويب2", "المصادقة", "eas" ]
skill: beginner
lang: ar
published: 2025-04-30
---

## مقدمة

[SAML](https://www.onelogin.com/learn/saml) هو معيار يُستخدم في الويب 2 للسماح [لموفر الهوية (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) بتوفير معلومات المستخدم [لمقدمي الخدمة (SP)](https://en.wikipedia.org/wiki/Service_provider_\(SAML\)).

في هذا البرنامج التعليمي، ستتعلم كيفية دمج توقيعات إيثريوم مع SAML للسماح للمستخدمين باستخدام محافظ إيثريوم الخاصة بهم لمصادقة أنفسهم على خدمات الويب 2 التي لا تدعم إيثريوم أصلاً حتى الآن.

لاحظ أن هذا البرنامج التعليمي مكتوب لجمهورين منفصلين:

- مستخدمو إيثريوم الذين يفهمون إيثريوم ويحتاجون إلى تعلم SAML
- مستخدمو الويب 2 الذين يفهمون SAML ومصادقة الويب 2 ويحتاجون إلى تعلم إيثريوم

نتيجة لذلك، سيحتوي على الكثير من المواد التمهيدية التي تعرفها بالفعل. لا تتردد في تخطيها.

### SAML لمستخدمي إيثريوم

SAML هو بروتوكول مركزي. لا يقبل مقدم الخدمة (SP) التأكيدات (مثل \

على سبيل المثال، يمكن أن يكون مقدم الخدمة (SP) وكالة سفر تقدم خدمات السفر للشركات، ويمكن أن يكون موفر الهوية (IdP) موقع الويب الداخلي للشركة. عندما يحتاج الموظفون إلى حجز سفر عمل، ترسلهم وكالة السفر للمصادقة من قبل الشركة قبل السماح لهم بحجز السفر فعليًا.

![عملية SAML خطوة بخطوة](./fig-01-saml.png)

هذه هي الطريقة التي تتفاوض بها الكيانات الثلاثة، المتصفح، ومقدم الخدمة (SP)، وموفر الهوية (IdP)، للوصول. لا يحتاج مقدم الخدمة (SP) إلى معرفة أي شيء عن المستخدم الذي يستخدم المتصفح مسبقًا، فقط أن يثق في موفر الهوية (IdP).

### إيثريوم لمستخدمي SAML

إيثريوم نظام لامركزي.

![تسجيل الدخول باستخدام إيثريوم](./fig-02-eth-logon.png)

يمتلك المستخدمون مفتاحًا خاصًا (يُحتفظ به عادةً في ملحق متصفح). من المفتاح الخاص يمكنك اشتقاق مفتاح عام، ومنه عنوان بحجم 20 بايت. عندما يحتاج المستخدمون إلى تسجيل الدخول إلى نظام ما، يُطلب منهم توقيع رسالة باستخدام nonce (قيمة تستخدم مرة واحدة). يمكن للخادم التحقق من أن التوقيع تم إنشاؤه بواسطة ذلك العنوان.

![الحصول على بيانات إضافية من المصادقات](./fig-03-eas-data.png)

يتحقق التوقيع فقط من عنوان إيثريوم. للحصول على سمات المستخدم الأخرى، تستخدم عادةً [المصادقات](https://attest.org/). تحتوي المصادقة عادةً على هذه الحقول:

- **المُصادِق**، العنوان الذي قام بالمصادقة
- **المستلم**، العنوان الذي تنطبق عليه المصادقة
- **البيانات**، البيانات التي يتم المصادقة عليها، مثل الاسم، الأذونات، إلخ.
- **المخطط**، معرف المخطط المستخدم لتفسير البيانات.

بسبب الطبيعة اللامركزية لإيثريوم، يمكن لأي مستخدم إجراء مصادقات. هوية المُصادِق مهمة لتحديد أي المصادقات نعتبرها موثوقة.

## الإعداد

الخطوة الأولى هي أن يكون لديك مقدم خدمة SAML (SP) وموفر هوية SAML (IdP) يتواصلان فيما بينهما.

1. قم بتنزيل البرنامج. البرنامج النموذجي لهذه المقالة موجود [على github](https://github.com/qbzzt/250420-saml-ethereum). يتم تخزين المراحل المختلفة في فروع مختلفة، لهذه المرحلة تريد `saml-only`

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. أنشئ مفاتيح بشهادات موقعة ذاتيًا. هذا يعني أن المفتاح هو هيئة إصدار الشهادات الخاصة به، ويحتاج إلى استيراده يدويًا إلى مقدم الخدمة. راجع [مستندات OpenSSL](https://docs.openssl.org/master/man1/openssl-req/) لمزيد من المعلومات.

    ```sh
    mkdir keys
    cd keys
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-sp.crt -keyout saml-sp.pem -subj /CN=sp/
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-idp.crt -keyout saml-idp.pem -subj /CN=idp/
    cd ..
    ```

3. ابدأ الخوادم (كل من SP و IdP)

    ```sh
    pnpm start
    ```

4. تصفح مقدم الخدمة (SP) على الرابط [http://localhost:3000/](http://localhost:3000/) وانقر على الزر ليتم إعادة توجيهك إلى موفر الهوية (IdP) (المنفذ 3001).

5. زوّد موفر الهوية (IdP) بعنوان بريدك الإلكتروني وانقر على **تسجيل الدخول إلى مقدم الخدمة**. سترى أنه يتم إعادة توجيهك مرة أخرى إلى مقدم الخدمة (المنفذ 3000) وأنه يعرفك من خلال عنوان بريدك الإلكتروني.

### شرح مفصل

هذا ما يحدث خطوة بخطوة:

![تسجيل دخول SAML العادي بدون إيثريوم](./fig-04-saml-no-eth.png)

#### src/config.mts

يحتوي هذا الملف على تكوين كل من موفر الهوية ومقدم الخدمة. عادةً ما يكون هذان الكيانان مختلفين، ولكن هنا يمكننا مشاركة النص البرمجي للتبسيط.

```typescript
const fs = await import("fs")

const protocol="http"
```

في الوقت الحالي نحن نختبر فقط، لذلك لا بأس من استخدام HTTP.

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

اقرأ المفاتيح العامة، والتي تكون متاحة عادةً لكلا المكونين (إما موثوق بها مباشرة، أو موقعة من قبل هيئة إصدار شهادات موثوقة).

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

عناوين URL لكلا المكونين.

```typescript
export const spPublicData = {
```

البيانات العامة لمقدم الخدمة.

```typescript
    entityID: `${spUrl}/metadata`,
```

حسب الاصطلاح، في SAML، يكون `entityID` هو عنوان URL حيث تتوفر البيانات الوصفية للكيان. تتوافق هذه البيانات الوصفية مع البيانات العامة هنا، باستثناء أنها في شكل XML.

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

التعريف الأكثر أهمية لأغراضنا هو `assertionConsumerServer`. هذا يعني أنه لتأكيد شيء ما (على سبيل المثال، \

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

البيانات العامة لموفر الهوية مماثلة. يحدد أنه لتسجيل دخول مستخدم، تقوم بإجراء POST إلى `http://localhost:3001/idp/login` ولتسجيل خروج مستخدم، تقوم بإجراء POST إلى `http://localhost:3001/idp/logout`.

#### src/sp.mts

هذا هو النص البرمجي الذي ينفذ مقدم الخدمة.

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

نحن نستخدم مكتبة [`samlify`](https://www.npmjs.com/package/samlify) لتنفيذ SAML.

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

تتوقع مكتبة `samlify` وجود حزمة للتحقق من أن XML صحيح، وموقع بالمفتاح العام المتوقع، إلخ. نحن نستخدم [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint) لهذا الغرض.

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

إن [`express`](https://expressjs.com/) [`Router`](https://expressjs.com/en/5x/api.html#router) هو \ في هذه الحالة، نستخدمه لتجميع كل تعريفات مقدم الخدمة معًا.

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

التمثيل الخاص لمقدم الخدمة لنفسه هو كل البيانات العامة، والمفتاح الخاص الذي يستخدمه لتوقيع المعلومات.

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

تحتوي البيانات العامة على كل ما يحتاجه مقدم الخدمة لمعرفته حول موفر الهوية.

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

لتمكين التشغيل البيني مع مكونات SAML الأخرى، يجب أن تكون البيانات العامة لمقدمي الخدمة والهوية (تسمى البيانات الوصفية) متاحة بتنسيق XML في `/metadata`.

```typescript
spRouter.post(`/assertion`,
```

هذه هي الصفحة التي يصل إليها المتصفح لتعريف نفسه. يتضمن التأكيد معرف المستخدم (هنا نستخدم عنوان البريد الإلكتروني)، ويمكن أن يتضمن سمات إضافية. هذا هو المعالج للخطوة 7 في مخطط التسلسل أعلاه.

```typescript
  async (req, res) => {
    // console.log(`استجابة SAML:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

يمكنك استخدام الأمر المعلق لرؤية بيانات XML المقدمة في التأكيد. إنه [مشفر بـ base64](https://en.wikipedia.org/wiki/Base64).

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

حلل طلب تسجيل الدخول من خادم الهوية.

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

أرسل استجابة HTML، فقط لإظهار للمستخدم أننا حصلنا على تسجيل الدخول.

```typescript
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

أبلغ المستخدم في حالة الفشل.

```typescript
spRouter.get('/login',
```

أنشئ طلب تسجيل دخول عندما يحاول المتصفح الحصول على هذه الصفحة. هذا هو المعالج للخطوة 1 في مخطط التسلسل أعلاه.

```typescript
  async (req, res) => {
    const loginRequest = await sp.createLoginRequest(idp, "post")
```

احصل على المعلومات لنشر طلب تسجيل دخول.

```typescript
    res.send(`
      <html>
        <body>
          <script>
            window.onload = function () { document.forms[0].submit(); }            
          </script>
```

هذه الصفحة تقدم النموذج (انظر أدناه) تلقائيًا. بهذه الطريقة، لا يتعين على المستخدم فعل أي شيء لإعادة توجيهه. هذه هي الخطوة 2 في مخطط التسلسل أعلاه.

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

انشر إلى `loginRequest.entityEndpoint` (عنوان URL لنقطة نهاية موفر الهوية).

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

اسم الإدخال هو `loginRequest.type` (`SAMLRequest`). المحتوى لهذا الحقل هو `loginRequest.context`، وهو مرة أخرى XML مشفر بـ base64.

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[هذا البرنامج الوسيط](https://expressjs.com/en/5x/api.html#express.urlencoded) يقرأ نص [طلب HTTP](https://www.tutorialspoint.com/http/http_requests.htm). بشكل افتراضي، يتجاهله express، لأن معظم الطلبات لا تتطلبه. نحن بحاجة إليه لأن POST يستخدم النص.

```typescript
app.use(`/${config.spDir}`, spRouter)
```

حمّل جهاز التوجيه في دليل مقدم الخدمة (`/sp`).

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

إذا حاول المتصفح الحصول على الدليل الجذر، فزوده برابط إلى صفحة تسجيل الدخول.

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

استمع إلى `spPort` باستخدام تطبيق express هذا.

#### src/idp.mts

هذا هو موفر الهوية. إنه مشابه جدًا لمقدم الخدمة، والتوضيحات أدناه للأجزاء المختلفة.

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // الحفاظ على السمات
    attributeNamePrefix: "@_", // بادئة للسمات
  }
)
```

نحتاج إلى قراءة وفهم طلب XML الذي نتلقاه من مقدم الخدمة.

```typescript
const getLoginPage = requestId => `
```

تنشئ هذه الوظيفة الصفحة مع النموذج المقدم تلقائيًا والذي يتم إرجاعه في الخطوة 4 من مخطط التسلسل أعلاه.

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

هناك حقلان نرسلهما إلى مقدم الخدمة:

1. `requestId` الذي نرد عليه.
2. معرف المستخدم (نستخدم عنوان البريد الإلكتروني الذي يوفره المستخدم في الوقت الحالي).

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

هذا هو المعالج للخطوة 5 في مخطط التسلسل أعلاه. [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) ينشئ استجابة تسجيل الدخول.

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

الجمهور هو مقدم الخدمة.

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

المعلومات المستخرجة من الطلب. المعلمة الوحيدة التي نهتم بها في الطلب هي requestId، والتي تتيح لمقدم الخدمة مطابقة الطلبات واستجاباتها.

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // تأكد من التوقيع
```

نحن بحاجة إلى `signingKey` للحصول على البيانات لتوقيع الاستجابة. لا يثق مقدم الخدمة في الطلبات غير الموقعة.

```typescript
    },
    "post",
    {
      email: req.body.email
```

هذا هو الحقل الذي يحتوي على معلومات المستخدم التي نرسلها مرة أخرى إلى مقدم الخدمة.

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

مرة أخرى، استخدم نموذجًا يتم تقديمه تلقائيًا. هذه هي الخطوة 6 في مخطط التسلسل أعلاه.

```typescript

// نقطة نهاية IdP لطلبات تسجيل الدخول
idpRouter.post(`/login`,
```

هذه هي نقطة النهاية التي تتلقى طلب تسجيل دخول من مقدم الخدمة. هذا هو المعالج للخطوة 3 في مخطط التسلسل أعلاه.

```typescript
  async (req, res) => {
    try {
      // حل بديل لأنني لم أتمكن من تشغيل parseLoginRequest.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

يجب أن نكون قادرين على استخدام [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) لقراءة معرف طلب المصادقة. ومع ذلك، لم أتمكن من تشغيله ولم يكن الأمر يستحق قضاء الكثير من الوقت عليه، لذلك استخدمت فقط [محلل XML للأغراض العامة](https://www.npmjs.com/package/fast-xml-parser). المعلومات التي نحتاجها هي سمة `ID` داخل علامة `<samlp:AuthnRequest>`، والتي تقع في المستوى الأعلى من XML.

## استخدام توقيعات إيثريوم

الآن بعد أن أصبح بإمكاننا إرسال هوية المستخدم إلى مقدم الخدمة، فإن الخطوة التالية هي الحصول على هوية المستخدم بطريقة موثوقة. يسمح لنا Viem بطلب عنوان المستخدم من المحفظة مباشرةً، ولكن هذا يعني طلب المعلومات من المتصفح. نحن لا نتحكم في المتصفح، لذلك لا يمكننا الوثوق تلقائيًا بالاستجابة التي نحصل عليها منه.

بدلاً من ذلك، سيرسل موفر الهوية (IdP) سلسلة للمتصفح لتوقيعها. إذا قامت المحفظة في المتصفح بتوقيع هذه السلسلة، فهذا يعني أنها بالفعل ذلك العنوان (أي أنها تعرف المفتاح الخاص الذي يتوافق مع العنوان).

لرؤية هذا أثناء العمل، أوقف موفر الهوية (IdP) ومقدم الخدمة (SP) الحاليين وقم بتشغيل هذه الأوامر:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

ثم تصفح [إلى مقدم الخدمة (SP)](http://localhost:3000) واتبع الإرشادات.

لاحظ أننا في هذه المرحلة لا نعرف كيفية الحصول على عنوان البريد الإلكتروني من عنوان إيثريوم، لذلك بدلاً من ذلك نبلغ `<عنوان إيثريوم>@bad.email.address` إلى مقدم الخدمة (SP).

### شرح مفصل

التغييرات في الخطوتين 4-5 في الرسم التخطيطي السابق.

![SAML مع توقيع إيثريوم](./fig-05-saml-w-signature.png)

الملف الوحيد الذي غيرناه هو `idp.mts`. فيما يلي الأجزاء التي تم تغييرها.

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

نحن بحاجة إلى هاتين المكتبتين الإضافيتين. نحن نستخدم [`uuid`](https://www.npmjs.com/package/uuid) لإنشاء قيمة [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). القيمة نفسها لا تهم، فقط حقيقة أنها تستخدم مرة واحدة فقط.

تتيح لنا مكتبة [`viem`](https://viem.sh/) استخدام تعريفات إيثريوم. هنا نحتاجه للتحقق من أن التوقيع صالح بالفعل.

```typescript
const loginPrompt = "To access the service provider, sign this nonce: "
```

تطلب المحفظة من المستخدم الإذن لتوقيع الرسالة. قد تؤدي الرسالة التي هي مجرد nonce إلى إرباك المستخدمين، لذلك نقوم بتضمين هذا الموجه.

```typescript
// احتفظ بمعرفات الطلب هنا
let nonces = {}
```

نحن بحاجة إلى معلومات الطلب لنتمكن من الرد عليه. يمكننا إرسالها مع الطلب (الخطوة 4)، واستلامها مرة أخرى (الخطوة 5). ومع ذلك، لا يمكننا الوثوق بالمعلومات التي نحصل عليها من المتصفح، والتي تخضع لسيطرة مستخدم قد يكون معاديًا. لذلك من الأفضل تخزينها هنا، مع استخدام nonce كمفتاح.

لاحظ أننا نفعل ذلك هنا كمتغير من أجل التبسيط. ومع ذلك، فإن هذا له عدة عيوب:

- نحن عرضة لهجوم حجب الخدمة. يمكن لمستخدم ضار محاولة تسجيل الدخول عدة مرات، مما يملأ ذاكرتنا.
- إذا احتاجت عملية موفر الهوية (IdP) إلى إعادة التشغيل، فإننا نفقد القيم الموجودة.
- لا يمكننا موازنة التحميل عبر عمليات متعددة، لأن كل عملية سيكون لها متغيرها الخاص.

في نظام الإنتاج، سنستخدم قاعدة بيانات ونطبق نوعًا من آلية انتهاء الصلاحية.

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

أنشئ nonce، وقم بتخزين `requestId` للاستخدام المستقبلي.

```typescript
  return `
<html>
  <head>
    <script type="module">
```

يتم تنفيذ هذا الجافا سكريبت تلقائيًا عند تحميل الصفحة.

```typescript
      import { createWalletClient, custom, getAddress } from 'https://esm.sh/viem'
```

نحن بحاجة إلى عدة وظائف من `viem`.

```typescript
      if (!window.ethereum) {
          alert("Please install MetaMask or a compatible wallet and then reload")
      }
```

لا يمكننا العمل إلا إذا كانت هناك محفظة في المتصفح.

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

اطلب قائمة الحسابات من المحفظة (`window.ethereum`). افترض أن هناك حسابًا واحدًا على الأقل، وقم بتخزين الحساب الأول فقط.

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

أنشئ [عميل محفظة](https://viem.sh/docs/clients/wallet) للتفاعل مع محفظة المتصفح.

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

اطلب من المستخدم توقيع رسالة. نظرًا لأن كل هذا الـ HTML موجود في [قالب نصي](https://viem.sh/docs/clients/wallet)، يمكننا استخدام المتغيرات المحددة في عملية موفر الهوية. هذه هي الخطوة 4.5 في مخطط التسلسل.

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

أعد التوجيه إلى `/idp/signature/<nonce>/<address>/<signature>`. هذه هي الخطوة 5 في مخطط التسلسل.

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

يتم إرسال التوقيع مرة أخرى بواسطة المتصفح، والذي قد يكون ضارًا (لا يوجد ما يمنعك من مجرد فتح `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` في المتصفح). لذلك، من المهم التحقق من أن عملية موفر الهوية (IdP) تتعامل مع التوقيعات السيئة بشكل صحيح.

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

الباقي هو مجرد HTML قياسي.

```typescript
idpRouter.get("/signature/:nonce/:account/:signature", async (req, res) => {
```

هذا هو المعالج للخطوة 5 في مخطط التسلسل.

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("Bad nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

احصل على معرف الطلب، واحذف الـ nonce من `nonces` للتأكد من عدم إمكانية إعادة استخدامه.

```typescript
  try {
```

نظرًا لوجود العديد من الطرق التي يمكن أن يكون بها التوقيع غير صالح، فإننا نلف هذا في `try ...` كتلة `catch` لالتقاط أي أخطاء تم طرحها.

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

استخدم [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage) لتنفيذ الخطوة 5.5 في مخطط التسلسل.

```typescript
    if (!validSignature)
      throw("Bad signature")
  } catch (err) {
    res.send("Error:" + err)
    return ;
  }
```

بقية المعالج مكافئ لما فعلناه في معالج `/loginSubmitted` سابقًا، باستثناء تغيير صغير واحد.

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

ليس لدينا عنوان البريد الإلكتروني الفعلي (سنحصل عليه في القسم التالي)، لذلك في الوقت الحالي نعيد عنوان إيثريوم ونميزه بوضوح على أنه ليس عنوان بريد إلكتروني.

```typescript
// IdP endpoint for login requests
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // Workaround because I couldn't get parseLoginRequest to work.
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

بدلاً من `getLoginPage`، استخدم الآن `getSignaturePage` في معالج الخطوة 3.

## الحصول على عنوان البريد الإلكتروني

الخطوة التالية هي الحصول على عنوان البريد الإلكتروني، المعرف الذي يطلبه مقدم الخدمة. للقيام بذلك، نستخدم [خدمة توثيق إيثريوم (EAS)](https://attest.org/).

أسهل طريقة للحصول على المصادقات هي استخدام [واجهة برمجة تطبيقات GraphQL](https://docs.attest.org/docs/developer-tools/api). نستخدم هذا الاستعلام:

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

يتضمن [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) هذا عنوان بريد إلكتروني فقط. يطلب هذا الاستعلام مصادقات لهذا المخطط. يُطلق على موضوع المصادقة اسم `المستلم`. إنه دائمًا عنوان إيثريوم.

تحذير: الطريقة التي نحصل بها على المصادقات هنا بها مشكلتان أمنيتان.

- نحن نذهب إلى نقطة نهاية واجهة برمجة التطبيقات `https://optimism.easscan.org/graphql`، وهي مكون مركزي. يمكننا الحصول على سمة `id` ثم إجراء بحث على السلسلة للتحقق من أن المصادقة حقيقية، ولكن لا يزال بإمكان نقطة نهاية واجهة برمجة التطبيقات فرض رقابة على المصادقات من خلال عدم إخبارنا بها.

  هذه المشكلة ليست مستحيلة الحل، يمكننا تشغيل نقطة نهاية GraphQL الخاصة بنا والحصول على المصادقات من سجلات السلسلة، ولكن هذا مفرط بالنسبة لأغراضنا.

- نحن لا ننظر إلى هوية المصادق. يمكن لأي شخص أن يزودنا بمعلومات كاذبة. في تطبيق العالم الحقيقي، سيكون لدينا مجموعة من المصادقين الموثوق بهم وننظر فقط في مصادقاتهم.

لرؤية هذا أثناء العمل، أوقف موفر الهوية (IdP) ومقدم الخدمة (SP) الحاليين وقم بتشغيل هذه الأوامر:

```sh
git checkout email-address
pnpm install
pnpm start
```

ثم قم بتوفير عنوان بريدك الإلكتروني. لديك طريقتان للقيام بذلك:

- استورد محفظة باستخدام مفتاح خاص، واستخدم المفتاح الخاص للاختبار `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`.

- أضف مصادقة لعنوان بريدك الإلكتروني الخاص:

  1. تصفح [المخطط في مستكشف المصادقات](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977).

  2. انقر على **المصادقة باستخدام المخطط**.

  3. أدخل عنوان إيثريوم الخاص بك كمستلم، وعنوان بريدك الإلكتروني كعنوان بريد إلكتروني، وحدد **على السلسلة**. ثم انقر على **إجراء المصادقة**.

  4. وافق على المعاملة في محفظتك. ستحتاج إلى بعض ETH على [بلوكتشين Optimism](https://app.optimism.io/bridge/deposit) لدفع ثمن الغاز.

في كلتا الحالتين، بعد القيام بذلك، تصفح [http://localhost:3000](http://localhost:3000) واتبع التعليمات. إذا قمت باستيراد مفتاح الاختبار الخاص، فإن البريد الإلكتروني الذي تتلقاه هو `test_addr_0@example.com`. إذا كنت قد استخدمت عنوانك الخاص، فيجب أن يكون هو ما صادقت عليه.

### شرح مفصل

![الحصول على البريد الإلكتروني من عنوان إيثريوم](./fig-06-saml-sig-n-email.png)

الخطوات الجديدة هي اتصال GraphQL، الخطوتان 5.6 و 5.7.

مرة أخرى، إليك الأجزاء التي تم تغييرها من `idp.mts`.

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

استورد المكتبات التي نحتاجها.

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

هناك [نقطة نهاية منفصلة لكل بلوكتشين](https://docs.attest.org/docs/developer-tools/api).

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

أنشئ عميل `GraphQLClient` جديدًا يمكننا استخدامه للاستعلام عن نقطة النهاية.

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

يعطينا GraphQL فقط كائن بيانات غير شفاف مع بايتات. لفهم ذلك نحن بحاجة إلى المخطط.

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

وظيفة للانتقال من عنوان إيثريوم إلى عنوان بريد إلكتروني.

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

هذا استعلام GraphQL.

```typescript
      attestations(
```

نحن نبحث عن المصادقات.

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

المصادقات التي نريدها هي تلك الموجودة في مخططنا، حيث يكون المستلم هو `getAddress(ethAddr)`. تتأكد دالة [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) من أن عنواننا يحتوي على [المجموع الاختباري](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md) الصحيح. هذا ضروري لأن GraphQL حساس لحالة الأحرف. `\

```typescript
        take: 1
```

بغض النظر عن عدد المصادقات التي نجدها، نريد فقط المصادقة الأولى.

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

الحقول التي نريد استلامها.

- `المصادق`: العنوان الذي قدم المصادقة. عادةً ما يتم استخدام هذا لتحديد ما إذا كنت تثق في المصادقة أم لا.
- `id`: معرف المصادقة. يمكنك استخدام هذه القيمة [لقراءة المصادقة على السلسلة](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64) للتحقق من صحة المعلومات من استعلام GraphQL.
- `data`: بيانات المخطط (في هذه الحالة، عنوان البريد الإلكتروني).

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

إذا لم تكن هناك مصادقة، فقم بإرجاع قيمة غير صحيحة بشكل واضح، ولكنها ستبدو صالحة لمزود الخدمة.

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

إذا كانت هناك قيمة، فاستخدم `decodeData` لفك تشفير البيانات. لسنا بحاجة إلى البيانات الوصفية التي توفرها، فقط القيمة نفسها.

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

استخدم الوظيفة الجديدة للحصول على عنوان البريد الإلكتروني.

## ماذا عن اللامركزية؟

في هذا التكوين، لا يمكن للمستخدمين التظاهر بأنهم شخص آخر ليسوا هم، طالما أننا نعتمد على مصادقين جديرين بالثقة لربط عنوان إيثريوم بعنوان البريد الإلكتروني. ومع ذلك، لا يزال موفر الهوية الخاص بنا مكونًا مركزيًا. يمكن لأي شخص لديه المفتاح الخاص لموفر الهوية إرسال معلومات خاطئة إلى مقدم الخدمة.

قد يكون هناك حل باستخدام [الحوسبة متعددة الأطراف (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation). آمل أن أكتب عن ذلك في برنامج تعليمي مستقبلي.

## الخاتمة

يواجه تبني معيار تسجيل الدخول، مثل توقيعات إيثريوم، مشكلة الدجاجة والبيضة. يريد مقدمو الخدمات جذب أوسع سوق ممكن. يريد المستخدمون أن يكونوا قادرين على الوصول إلى الخدمات دون الحاجة إلى القلق بشأن دعم معيار تسجيل الدخول الخاص بهم.
يمكن أن يساعدنا إنشاء محولات، مثل موفر هوية إيثريوم، في التغلب على هذه العقبة.

[انظر هنا لمزيد من أعمالي](https://cryptodocguy.pro/).
