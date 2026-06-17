---
title: استخدام إيثيريوم لمصادقة ويب 2
description: بعد قراءة هذا البرنامج التعليمي، سيتمكن المطور من دمج تسجيل الدخول عبر إيثيريوم (ويب 3) مع تسجيل الدخول عبر ⁦SAML⁩، وهو معيار يُستخدم في ويب 2 لتوفير تسجيل الدخول الموحد والخدمات الأخرى ذات الصلة. يتيح ذلك مصادقة الوصول إلى موارد ويب 2 من خلال توقيعات إيثيريوم، مع الحصول على سمات المستخدم من التصديقات.
author: أوري بوميرانتس
tags: ["web2", "المصادقة", "eas"]
skill: beginner
breadcrumb: إيثيريوم لمصادقة ويب 2
lang: ar
published: 2025-04-30
---

## مقدمة {#introduction}

[SAML](https://www.onelogin.com/learn/saml) هو معيار يُستخدم في ويب 2 للسماح لـ [مزود الهوية (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) بتوفير معلومات المستخدم لـ [مزودي الخدمة (SP)](https://en.wikipedia.org/wiki/Service_provider_(SAML).

في هذا البرنامج التعليمي، ستتعلم كيفية دمج توقيعات إيثيريوم مع <span dir="ltr">SAML</span> للسماح للمستخدمين باستخدام محافظ إيثيريوم الخاصة بهم لمصادقة أنفسهم في خدمات ويب 2 التي لا تدعم إيثيريوم بشكل أصلي حتى الآن.

لاحظ أن هذا البرنامج التعليمي مكتوب لجمهورين منفصلين:

- مستخدمو إيثيريوم الذين يفهمون إيثيريوم ويحتاجون إلى تعلم <span dir="ltr">SAML</span>
- مستخدمو ويب 2 الذين يفهمون <span dir="ltr">SAML</span> ومصادقة ويب 2 ويحتاجون إلى تعلم إيثيريوم

نتيجة لذلك، سيحتوي على الكثير من المواد التمهيدية التي تعرفها بالفعل. لا تتردد في تخطيها.

### <span dir="ltr">SAML</span> لمستخدمي إيثيريوم {#saml-for-ethereum-people}

<span dir="ltr">SAML</span> هو بروتوكول مركزي. لا يقبل مزود الخدمة (SP) التأكيدات (مثل "هذا هو المستخدم جون، ويجب أن يكون لديه أذونات للقيام بـ A وB وC") من مزود الهوية (IdP) إلا إذا كانت لديه علاقة ثقة مسبقة معه، أو مع [الجهة المانحة للشهادة](https://www.ssl.com/article/what-is-a-certificate-authority-ca/) التي وقعت شهادة مزود الهوية هذا.

على سبيل المثال، يمكن أن يكون مزود الخدمة وكالة سفر تقدم خدمات السفر للشركات، ويمكن أن يكون مزود الهوية موقع الويب الداخلي للشركة. عندما يحتاج الموظفون إلى حجز سفر للعمل، ترسلهم وكالة السفر للمصادقة من قبل الشركة قبل السماح لهم بحجز السفر فعليًا.

![Step by step SAML process](./fig-01-saml.png)

هذه هي الطريقة التي تتفاوض بها الكيانات الثلاثة، المتصفح ومزود الخدمة ومزود الهوية، من أجل الوصول. لا يحتاج مزود الخدمة إلى معرفة أي شيء عن المستخدم الذي يستخدم المتصفح مسبقًا، بل يحتاج فقط إلى الوثوق بمزود الهوية.

### إيثيريوم لمستخدمي <span dir="ltr">SAML</span> {#ethereum-for-saml-people}

إيثيريوم هو نظام لامركزي. 

![Ethereum logon](./fig-02-eth-logon.png)

يمتلك المستخدمون مفتاح خاص (يُحفظ عادةً في إضافة متصفح). من المفتاح الخاص يمكنك اشتقاق مفتاح عام، ومن ذلك عنوان بحجم <span dir="ltr">20-byte</span>. عندما يحتاج المستخدمون إلى تسجيل الدخول إلى نظام ما، يُطلب منهم توقيع رسالة باستخدام رقم فريد (قيمة تُستخدم لمرة واحدة). يمكن للخادم التحقق من أن التوقيع قد تم إنشاؤه بواسطة ذلك العنوان.

![Getting extra data from attestations](./fig-03-eas-data.png)

يتحقق التوقيع فقط من عنوان إيثيريوم. للحصول على سمات المستخدم الأخرى، تستخدم عادةً [التصديقات](https://attest.org/). يحتوي التصديق عادةً على هذه الحقول:

- **المُصدق (Attestor)**، العنوان الذي أجرى التصديق
- **المستلم (Recipient)**، العنوان الذي ينطبق عليه التصديق
- **البيانات (Data)**، البيانات التي يتم التصديق عليها، مثل الاسم والأذونات وما إلى ذلك.
- **المخطط (Schema)**، مُعرّف المخطط المستخدم لتفسير البيانات.

بسبب الطبيعة اللامركزية لإيثيريوم، يمكن لأي مستخدم إجراء تصديقات. هوية المُصدق مهمة لتحديد التصديقات التي نعتبرها موثوقة.

## الإعداد {#setup}

الخطوة الأولى هي جعل مزود خدمة <span dir="ltr">SAML</span> ومزود هوية <span dir="ltr">SAML</span> يتواصلان فيما بينهما.

1. قم بتنزيل البرنامج. البرنامج النموذجي لهذه المقالة موجود [على GitHub](https://github.com/qbzzt/250420-saml-ethereum). يتم تخزين المراحل المختلفة في فروع مختلفة، لهذه المرحلة ستحتاج إلى `saml-only`

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. قم بإنشاء مفاتيح بشهادات موقعة ذاتيًا. هذا يعني أن المفتاح هو الجهة المانحة للشهادة الخاصة به، ويحتاج إلى استيراده يدويًا إلى مزود الخدمة. راجع [مستندات OpenSSL](https://docs.openssl.org/master/man1/openssl-req/) لمزيد من المعلومات. 

    ```sh
    mkdir keys
    cd keys
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-sp.crt -keyout saml-sp.pem -subj /CN=sp/
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-idp.crt -keyout saml-idp.pem -subj /CN=idp/
    cd ..
    ```

3. ابدأ تشغيل الخوادم (كل من مزود الخدمة ومزود الهوية)

    ```sh
    pnpm start
    ```

4. تصفح إلى مزود الخدمة على الرابط [http://localhost:3000/](http://localhost:3000/) وانقر على الزر ليتم إعادة توجيهك إلى مزود الهوية (المنفذ <span dir="ltr">3001</span>).

5. زود مزود الهوية بعنوان بريدك الإلكتروني وانقر على **تسجيل الدخول إلى مزود الخدمة (Login to the service provider)**. لاحظ أنه يتم إعادة توجيهك مرة أخرى إلى مزود الخدمة (المنفذ <span dir="ltr">3000</span>) وأنه يعرفك من خلال عنوان بريدك الإلكتروني.

### شرح مفصل {#detailed-explanation}

هذا ما يحدث، خطوة بخطوة:

![Normal SAML logon without Ethereum](./fig-04-saml-no-eth.png)

#### src/config.mts {#srcconfigmts}

يحتوي هذا الملف على تكوين كل من مزود الهوية ومزود الخدمة. عادةً ما يكون هذان الكيانان مختلفين، ولكن هنا يمكننا مشاركة التعليمات البرمجية للتبسيط.

```typescript
const fs = await import("fs")

const protocol="http"
```

في الوقت الحالي نحن نختبر فقط، لذا لا بأس من استخدام <span dir="ltr">HTTP</span>.

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

اقرأ المفاتيح العامة، والتي تتوفر عادةً لكلا المكونين (وتكون إما موثوقة بشكل مباشر، أو موقعة من قبل جهة مانحة للشهادات موثوقة).

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

عناوين <span dir="ltr">URL</span> لكلا المكونين.

```typescript
export const spPublicData = {
```

البيانات العامة لمزود الخدمة.

```typescript
    entityID: `${spUrl}/metadata`,
```

حسب العرف، في <span dir="ltr">SAML</span> يكون `entityID` هو عنوان <span dir="ltr">URL</span> حيث تتوفر البيانات الوصفية للكيان. تتوافق هذه البيانات الوصفية مع البيانات العامة هنا، باستثناء أنها بتنسيق <span dir="ltr">XML</span>.

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

التعريف الأكثر أهمية لأغراضنا هو `assertionConsumerServer`. هذا يعني أنه لتأكيد شيء ما (على سبيل المثال، "المستخدم الذي يرسل لك هذه المعلومات هو somebody@example.com") لمزود الخدمة، نحتاج إلى استخدام [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) إلى عنوان <span dir="ltr">URL</span> `http://localhost:3000/sp/assertion`.

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

البيانات العامة لمزود الهوية مشابهة. وهي تحدد أنه لتسجيل دخول مستخدم، تقوم بإرسال <span dir="ltr">POST</span> إلى `http://localhost:3001/idp/login` ولتسجيل خروج مستخدم تقوم بإرسال <span dir="ltr">POST</span> إلى `http://localhost:3001/idp/logout`.

#### src/sp.mts {#srcspmts}

هذا هو الكود الذي ينفذ مزود الخدمة.

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

نستخدم مكتبة [`samlify`](https://www.npmjs.com/package/samlify) لتنفيذ <span dir="ltr">SAML</span>.

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

تتوقع مكتبة `samlify` وجود حزمة للتحقق من صحة <span dir="ltr">XML</span>، وأنه موقع بالمفتاح العام المتوقع، وما إلى ذلك. نستخدم [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint) لهذا الغرض.

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

[`Router`](https://expressjs.com/en/5x/api.html#router) الخاص بـ [`express`](https://expressjs.com/) هو "موقع ويب مصغر" يمكن تركيبه داخل موقع ويب. في هذه الحالة، نستخدمه لتجميع جميع تعريفات مزود الخدمة معًا.

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

تمثيل مزود الخدمة لنفسه هو جميع البيانات العامة، والمفتاح الخاص الذي يستخدمه لتوقيع المعلومات.

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

تحتوي البيانات العامة على كل ما يحتاج مزود الخدمة إلى معرفته عن مزود الهوية.

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

لتمكين قابلية التشغيل البيني مع مكونات <span dir="ltr">SAML</span> الأخرى، يجب أن تكون البيانات العامة (تسمى البيانات الوصفية) لمزودي الخدمة والهوية متاحة بتنسيق <span dir="ltr">XML</span> في `/metadata`.

```typescript
spRouter.post(`/assertion`,
```

هذه هي الصفحة التي يصل إليها المتصفح لتعريف نفسه. يتضمن التأكيد مُعرّف المستخدم (نستخدم هنا عنوان البريد الإلكتروني)، ويمكن أن يتضمن سمات إضافية. هذا هو المعالج للخطوة 7 في مخطط التسلسل أعلاه.

```typescript
  async (req, res) => {
    // console.log(`استجابة SAML:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

يمكنك استخدام الأمر المعلق (commented out) لرؤية بيانات <span dir="ltr">XML</span> المقدمة في التأكيد. إنها [مشفرة بـ base64](https://en.wikipedia.org/wiki/Base64).

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

تحليل طلب تسجيل الدخول من خادم الهوية.

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

إرسال استجابة <span dir="ltr">HTML</span>، فقط لإظهار للمستخدم أننا تلقينا تسجيل الدخول.

```typescript
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

إبلاغ المستخدم في حالة الفشل.

```typescript
spRouter.get('/login',
```

إنشاء طلب تسجيل دخول عندما يحاول المتصفح الحصول على هذه الصفحة. هذا هو المعالج للخطوة 1 في مخطط التسلسل أعلاه.

```typescript
  async (req, res) => {
    const loginRequest = await sp.createLoginRequest(idp, "post")
```

الحصول على المعلومات لإرسال طلب تسجيل الدخول.

```typescript
    res.send(`
      <html>
        <body>
          <script>
            window.onload = function () { document.forms[0].submit(); }            
          </script>
```

تقوم هذه الصفحة بإرسال النموذج (انظر أدناه) تلقائيًا. بهذه الطريقة لا يضطر المستخدم إلى فعل أي شيء ليتم إعادة توجيهه. هذه هي الخطوة 2 في مخطط التسلسل أعلاه.

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

إرسال <span dir="ltr">POST</span> إلى `loginRequest.entityEndpoint` (عنوان <span dir="ltr">URL</span> لنقطة نهاية مزود الهوية).

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

اسم الإدخال هو `loginRequest.type` (`SAMLRequest`). المحتوى لهذا الحقل هو `loginRequest.context`، وهو مرة أخرى <span dir="ltr">XML</span> مشفر بـ <span dir="ltr">base64</span>.

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

تقرأ [هذه البرمجية الوسيطة](https://expressjs.com/en/5x/api.html#express.urlencoded) نص [طلب HTTP](https://www.tutorialspoint.com/http/http_requests.htm). يتجاهله <span dir="ltr">express</span> افتراضيًا، لأن معظم الطلبات لا تتطلبه. نحن نحتاجه لأن <span dir="ltr">POST</span> يستخدم النص.

```typescript
app.use(`/${config.spDir}`, spRouter)
```

تركيب الموجه (router) في دليل مزود الخدمة (`/sp`).

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

إذا حاول متصفح الحصول على الدليل الجذر، فزوده برابط إلى صفحة تسجيل الدخول.

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

الاستماع إلى `spPort` باستخدام تطبيق <span dir="ltr">express</span> هذا.

#### src/idp.mts {#srcidpmts}

هذا هو مزود الهوية. إنه مشابه جدًا لمزود الخدمة، التفسيرات أدناه للأجزاء المختلفة.

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // الاحتفاظ بالسمات
    attributeNamePrefix: "@_", // بادئة للسمات
  }
)
```

نحتاج إلى قراءة وفهم طلب <span dir="ltr">XML</span> الذي نتلقاه من مزود الخدمة.

```typescript
const getLoginPage = requestId => `
```

تنشئ هذه الدالة الصفحة التي تحتوي على النموذج المُرسل تلقائيًا والذي يتم إرجاعه في الخطوة 4 من مخطط التسلسل أعلاه.

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

هناك حقلان نرسلهما إلى مزود الخدمة:

1. `requestId` الذي نرد عليه.
2. مُعرّف المستخدم (نستخدم عنوان البريد الإلكتروني الذي يقدمه المستخدم في الوقت الحالي).

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

هذا هو المعالج للخطوة 5 من مخطط التسلسل أعلاه. ينشئ [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) استجابة تسجيل الدخول. 

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

الجمهور (audience) هو مزود الخدمة.

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

المعلومات المستخرجة من الطلب. المعلمة الوحيدة التي نهتم بها في الطلب هي <span dir="ltr">requestId</span>، والتي تتيح لمزود الخدمة مطابقة الطلبات واستجاباتها.

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // ضمان التوقيع
```

نحتاج إلى `signingKey` للحصول على البيانات لتوقيع الاستجابة. لا يثق مزود الخدمة في الطلبات غير الموقعة.

```typescript
    },
    "post",
    {
      email: req.body.email
```

هذا هو الحقل الذي يحتوي على معلومات المستخدم التي نرسلها مرة أخرى إلى مزود الخدمة.

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

مرة أخرى، استخدم نموذجًا مُرسلًا تلقائيًا. هذه هي الخطوة 6 من مخطط التسلسل أعلاه.

```typescript

// نقطة نهاية IdP لطلبات تسجيل الدخول
idpRouter.post(`/login`,
```

هذه هي نقطة النهاية التي تتلقى طلب تسجيل دخول من مزود الخدمة. هذا هو المعالج للخطوة 3 من مخطط التسلسل أعلاه.

```typescript
  async (req, res) => {
    try {
      // حل بديل لأنني لم أتمكن من جعل parseLoginRequest يعمل.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

يجب أن نكون قادرين على استخدام [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) لقراءة مُعرّف طلب المصادقة. ومع ذلك، لم أتمكن من جعله يعمل ولم يكن الأمر يستحق قضاء الكثير من الوقت فيه، لذا استخدمت فقط [محلل XML للأغراض العامة](https://www.npmjs.com/package/fast-xml-parser). المعلومات التي نحتاجها هي سمة `ID` داخل وسم `<samlp:AuthnRequest>`، والذي يقع في المستوى الأعلى من <span dir="ltr">XML</span>.

## استخدام توقيعات إيثيريوم {#using-ethereum-signatures}

الآن بعد أن أصبح بإمكاننا إرسال هوية مستخدم إلى مزود الخدمة، فإن الخطوة التالية هي الحصول على هوية المستخدم بطريقة موثوقة. تتيح لنا <span dir="ltr">Viem</span> أن نطلب من المحفظة عنوان المستخدم ببساطة، ولكن هذا يعني طلب المعلومات من المتصفح. نحن لا نتحكم في المتصفح، لذا لا يمكننا الوثوق تلقائيًا بالاستجابة التي نحصل عليها منه.

بدلاً من ذلك، سيرسل مزود الهوية سلسلة نصية إلى المتصفح لتوقيعها. إذا قامت المحفظة في المتصفح بتوقيع هذه السلسلة، فهذا يعني أنها حقًا ذلك العنوان (أي أنها تعرف المفتاح الخاص الذي يتوافق مع العنوان).

لرؤية هذا عمليًا، أوقف مزود الهوية ومزود الخدمة الحاليين وقم بتشغيل هذه الأوامر:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

ثم تصفح [إلى مزود الخدمة](http://localhost:3000) واتبع التوجيهات.

لاحظ أنه في هذه المرحلة لا نعرف كيفية الحصول على عنوان البريد الإلكتروني من عنوان إيثيريوم، لذا بدلاً من ذلك نبلغ مزود الخدمة بـ `<ethereum address>@bad.email.address`.

### شرح مفصل {#detailed-explanation-2}

التغييرات موجودة في الخطوتين 4 و5 في المخطط السابق.

![SAML with an Ethereum signature](./fig-05-saml-w-signature.png)

الملف الوحيد الذي قمنا بتغييره هو `idp.mts`. إليك الأجزاء التي تم تغييرها.

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

نحتاج إلى هاتين المكتبتين الإضافيتين. نستخدم [`uuid`](https://www.npmjs.com/package/uuid) لإنشاء قيمة [الرقم الفريد](https://en.wikipedia.org/wiki/Cryptographic_nonce). القيمة نفسها لا تهم، بل حقيقة أنها تُستخدم مرة واحدة فقط.

تتيح لنا مكتبة [`viem`](https://viem.sh/) استخدام تعريفات إيثيريوم. نحتاجها هنا للتحقق من أن التوقيع صالح بالفعل.

```typescript
const loginPrompt = "To access the service provider, sign this nonce: "
```

تطلب المحفظة من المستخدم الإذن لتوقيع الرسالة. قد تؤدي الرسالة التي تتكون من رقم فريد فقط إلى إرباك المستخدمين، لذا نقوم بتضمين هذه المطالبة.

```typescript
// الاحتفاظ بـ requestIDs هنا
let nonces = {}
```

نحتاج إلى معلومات الطلب لنتمكن من الرد عليه. يمكننا إرسالها مع الطلب (الخطوة 4)، وتلقيها مرة أخرى (الخطوة 5). ومع ذلك، لا يمكننا الوثوق بالمعلومات التي نحصل عليها من المتصفح، والذي يخضع لسيطرة مستخدم قد يكون معاديًا. لذا من الأفضل تخزينها هنا، مع استخدام الرقم الفريد كمفتاح.

لاحظ أننا نقوم بذلك هنا كمتغير من أجل التبسيط. ومع ذلك، فإن هذا له عدة عيوب:

- نحن عرضة لهجوم حجب الخدمة. يمكن لمستخدم ضار محاولة تسجيل الدخول عدة مرات، مما يؤدي إلى ملء ذاكرتنا.
- إذا كانت عملية مزود الهوية بحاجة إلى إعادة التشغيل، فسنفقد القيم الموجودة.
- لا يمكننا موازنة الحمل عبر عمليات متعددة، لأن كل عملية سيكون لها متغيرها الخاص.

في نظام الإنتاج، سنستخدم قاعدة بيانات وننفذ نوعًا من آلية انتهاء الصلاحية.

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

إنشاء رقم فريد، وتخزين `requestId` للاستخدام المستقبلي.

```typescript
  return `
<html>
  <head>
    <script type="module">
```

يتم تنفيذ <span dir="ltr">JavaScript</span> هذا تلقائيًا عند تحميل الصفحة.

```typescript
      import { createWalletClient, custom, getAddress } from 'https://esm.sh/viem'
```

نحتاج إلى عدة دوال من `viem`.

```typescript
      if (!window.ethereum) {
          alert("Please install MetaMask or a compatible wallet and then reload")
      }
```

لا يمكننا العمل إلا إذا كانت هناك محفظة على المتصفح.

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

طلب قائمة الحسابات من المحفظة (`window.ethereum`). افترض أن هناك حسابًا واحدًا على الأقل، وقم بتخزين الحساب الأول فقط. 

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

إنشاء [عميل محفظة](https://viem.sh/docs/clients/wallet) للتفاعل مع محفظة المتصفح.

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

اطلب من المستخدم توقيع رسالة. نظرًا لأن كل هذا الـ <span dir="ltr">HTML</span> موجود في [سلسلة قالب (template string)](https://viem.sh/docs/clients/wallet)، يمكننا استخدام المتغيرات المحددة في عملية مزود الهوية. هذه هي الخطوة 4.5 في مخطط التسلسل.

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

إعادة التوجيه إلى `/idp/signature/<nonce>/<address>/<signature>`. هذه هي الخطوة 5 في مخطط التسلسل.

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

يتم إرسال التوقيع مرة أخرى بواسطة المتصفح، والذي قد يكون ضارًا (لا يوجد ما يمنعك من مجرد فتح `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` في المتصفح). لذلك، من المهم التحقق من أن عملية مزود الهوية تتعامل مع التوقيعات السيئة بشكل صحيح.

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

الباقي هو مجرد <span dir="ltr">HTML</span> قياسي.

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

احصل على مُعرّف الطلب، واحذف الرقم الفريد من `nonces` للتأكد من عدم إمكانية إعادة استخدامه.

```typescript
  try {
```

نظرًا لوجود العديد من الطرق التي يمكن أن يكون بها التوقيع غير صالح، فإننا نغلف هذا في كتلة `try ... catch` لالتقاط أي أخطاء يتم طرحها.

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

بقية المعالج تعادل ما قمنا به في معالج `/loginSubmitted` سابقًا، باستثناء تغيير واحد صغير.

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

ليس لدينا عنوان البريد الإلكتروني الفعلي (سنحصل عليه في القسم التالي)، لذا في الوقت الحالي نُرجع عنوان إيثيريوم ونميزه بوضوح على أنه ليس عنوان بريد إلكتروني.


```typescript
// نقطة نهاية IdP لطلبات تسجيل الدخول
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // حل بديل لأنني لم أتمكن من جعل parseLoginRequest يعمل.
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

## الحصول على عنوان البريد الإلكتروني {#getting-the-email-address}

الخطوة التالية هي الحصول على عنوان البريد الإلكتروني، وهو المُعرّف الذي يطلبه مزود الخدمة. للقيام بذلك، نستخدم [خدمة تصديق إيثيريوم (EAS)](https://attest.org/).

أسهل طريقة للحصول على التصديقات هي استخدام [GraphQL API](https://docs.attest.org/docs/developer-tools/api). نستخدم هذا الاستعلام:

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

يتضمن هذا [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) عنوان بريد إلكتروني فقط. يطلب هذا الاستعلام تصديقات لهذا المخطط. يُطلق على موضوع التصديق اسم `recipient`. وهو دائمًا عنوان إيثيريوم.

تحذير: الطريقة التي نحصل بها على التصديقات هنا بها مشكلتان أمنيتان.

- نحن ننتقل إلى نقطة نهاية <span dir="ltr">API</span>، `https://optimism.easscan.org/graphql`، وهي مكون مركزي. يمكننا الحصول على سمة `id` ثم إجراء بحث على السلسلة للتحقق من أن التصديق حقيقي، ولكن لا يزال بإمكان نقطة نهاية <span dir="ltr">API</span> فرض رقابة على التصديقات من خلال عدم إخبارنا بها. 

  هذه المشكلة ليست مستحيلة الحل، يمكننا تشغيل نقطة نهاية <span dir="ltr">GraphQL</span> الخاصة بنا والحصول على التصديقات من سجلات السلسلة، ولكن هذا مفرط لأغراضنا.

- نحن لا ننظر إلى هوية المُصدق. يمكن لأي شخص تزويدنا بمعلومات خاطئة. في التنفيذ في العالم الحقيقي، سيكون لدينا مجموعة من المُصدقين الموثوقين وننظر فقط إلى تصديقاتهم.

لرؤية هذا عمليًا، أوقف مزود الهوية ومزود الخدمة الحاليين وقم بتشغيل هذه الأوامر:

```sh
git checkout email-address
pnpm install
pnpm start
```

ثم قدم عنوان بريدك الإلكتروني. لديك طريقتان للقيام بذلك:

- استيراد محفظة باستخدام مفتاح خاص، واستخدام المفتاح الخاص للاختبار `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`.

- إضافة تصديق لعنوان بريدك الإلكتروني الخاص:

  1. تصفح إلى [المخطط في مستكشف التصديقات](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977).

  2. انقر على **التصديق باستخدام المخطط (Attest with Schema)**.

  3. أدخل عنوان إيثيريوم الخاص بك كمستلم، وعنوان بريدك الإلكتروني كعنوان بريد إلكتروني، وحدد **على السلسلة (Onchain)**. ثم انقر على **إجراء تصديق (Make Attestation)**.

  4. وافق على المعاملة في محفظتك. ستحتاج إلى بعض <span dir="ltr">ETH</span> على [سلسلة كتل أوبتيميزم](https://app.optimism.io/bridge/deposit) لدفع رسوم الغاز.

في كلتا الحالتين، بعد القيام بذلك، تصفح إلى [http://localhost:3000](http://localhost:3000) واتبع التوجيهات. إذا قمت باستيراد المفتاح الخاص للاختبار، فإن البريد الإلكتروني الذي تتلقاه هو `test_addr_0@example.com`. إذا استخدمت عنوانك الخاص، فيجب أن يكون ما قمت بالتصديق عليه.

### شرح مفصل {#detailed-explanation-3}

![Getting from Ethereum address to e-mail](./fig-06-saml-sig-n-email.png)

الخطوات الجديدة هي اتصال <span dir="ltr">GraphQL</span>، الخطوتان 5.6 و5.7.

مرة أخرى، إليك الأجزاء التي تم تغييرها من `idp.mts`.

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

استيراد المكتبات التي نحتاجها.

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

توجد [نقطة نهاية منفصلة لكل سلسلة كتل](https://docs.attest.org/docs/developer-tools/api).

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

إنشاء عميل `GraphQLClient` جديد يمكننا استخدامه للاستعلام عن نقطة النهاية.

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

يمنحنا <span dir="ltr">GraphQL</span> فقط كائن بيانات مبهمًا بالبايتات. لفهمه نحتاج إلى المخطط. 

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

دالة للحصول على عنوان بريد إلكتروني من عنوان إيثيريوم.

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

هذا استعلام <span dir="ltr">GraphQL</span>.

```typescript
      attestations(
```

نحن نبحث عن التصديقات.

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

التصديقات التي نريدها هي تلك الموجودة في مخططنا، حيث يكون المستلم هو `getAddress(ethAddr)`. تتأكد دالة [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) من أن عنواننا يحتوي على [المجموع الاختباري (checksum)](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md) الصحيح. هذا ضروري لأن <span dir="ltr">GraphQL</span> حساس لحالة الأحرف. "0xBAD060A7" و"0xBad060A7" و"0xbad060a7" هي قيم مختلفة.

```typescript
        take: 1
```

بغض النظر عن عدد التصديقات التي نجدها، فإننا نريد التصديق الأول فقط.

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

الحقول التي نريد تلقيها.

- `attester`: العنوان الذي أرسل التصديق. عادةً ما يُستخدم هذا لتحديد ما إذا كان يجب الوثوق بالتصديق أم لا.
- `id`: مُعرّف التصديق. يمكنك استخدام هذه القيمة لـ [قراءة التصديق على السلسلة](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64) للتحقق من صحة المعلومات الواردة من استعلام <span dir="ltr">GraphQL</span>.
- `data`: بيانات المخطط (في هذه الحالة، عنوان البريد الإلكتروني).

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

إذا لم يكن هناك تصديق، فأرجع قيمة غير صحيحة بوضوح، ولكنها ستبدو صالحة لمزود الخدمة.

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

إذا كانت هناك قيمة، فاستخدم `decodeData` لفك تشفير البيانات. لا نحتاج إلى البيانات الوصفية التي توفرها، بل القيمة نفسها فقط.

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

استخدم الدالة الجديدة للحصول على عنوان البريد الإلكتروني.

## ماذا عن اللامركزية؟ {#what-about-decentralization}

في هذا التكوين، لا يمكن للمستخدمين التظاهر بأنهم شخص آخر، طالما أننا نعتمد على مُصدقين جديرين بالثقة لتعيين عنوان إيثيريوم إلى عنوان البريد الإلكتروني. ومع ذلك، لا يزال مزود الهوية الخاص بنا مكونًا مركزيًا. يمكن لأي شخص يمتلك المفتاح الخاص لمزود الهوية إرسال معلومات خاطئة إلى مزود الخدمة.

قد يكون هناك حل باستخدام [الحوسبة متعددة الأطراف (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation). آمل أن أكتب عن ذلك في برنامج تعليمي مستقبلي.

## الخاتمة {#conclusion}

يواجه اعتماد معيار تسجيل الدخول، مثل توقيعات إيثيريوم، معضلة الدجاجة والبيضة. يرغب مزودو الخدمة في جذب أوسع سوق ممكن. ويرغب المستخدمون في التمكن من الوصول إلى الخدمات دون الحاجة إلى القلق بشأن دعم معيار تسجيل الدخول الخاص بهم.
يمكن أن يساعدنا إنشاء محولات، مثل مزود هوية إيثيريوم، في التغلب على هذه العقبة.

[انظر هنا للمزيد من أعمالي](https://cryptodocguy.pro/).