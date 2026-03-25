---
title: Menggunakan Ethereum untuk autentikasi web2
description: Setelah membaca tutorial ini, pengembang akan dapat mengintegrasikan login Ethereum (web3) dengan login SAML, sebuah standar yang digunakan di web2 untuk menyediakan sistem masuk tunggal (single sign-on) dan layanan terkait lainnya. Hal ini memungkinkan akses ke sumber daya web2 untuk diautentikasi melalui tanda tangan Ethereum, dengan atribut pengguna yang berasal dari pengesahan.
author: Ori Pomerantz
tags: ["web2", "autentikasi", "eas"]
skill: beginner
lang: id
published: 2025-04-30
---

## Pengantar

[SAML](https://www.onelogin.com/learn/saml) adalah standar yang digunakan di web2 untuk memungkinkan [penyedia identitas (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) menyediakan informasi pengguna untuk [penyedia layanan (SP)](https://en.wikipedia.org/wiki/Service_provider_(SAML)).

Dalam tutorial ini Anda akan mempelajari cara mengintegrasikan tanda tangan Ethereum dengan SAML untuk memungkinkan pengguna menggunakan dompet Ethereum mereka untuk mengautentikasi diri mereka sendiri ke layanan web2 yang belum mendukung Ethereum secara bawaan.

Perhatikan bahwa tutorial ini ditulis untuk dua audiens yang berbeda:

- Orang-orang Ethereum yang memahami Ethereum dan perlu mempelajari SAML
- Orang-orang Web2 yang memahami SAML dan autentikasi web2 dan perlu mempelajari Ethereum

Akibatnya, tutorial ini akan berisi banyak materi pengantar yang mungkin sudah Anda ketahui. Jangan ragu untuk melewatinya.

### SAML untuk orang-orang Ethereum

SAML adalah protokol terpusat. Penyedia layanan (SP) hanya menerima asersi (seperti "ini adalah pengguna saya John, dia harus memiliki izin untuk melakukan A, B, dan C") dari penyedia identitas (IdP) jika ia memiliki hubungan kepercayaan yang sudah ada sebelumnya baik dengannya, atau dengan [otoritas sertifikat](https://www.ssl.com/article/what-is-a-certificate-authority-ca/) yang menandatangani sertifikat IdP tersebut.

Sebagai contoh, SP dapat berupa agen perjalanan yang menyediakan layanan perjalanan untuk perusahaan, dan IdP dapat berupa situs web internal perusahaan. Ketika karyawan perlu memesan perjalanan bisnis, agen perjalanan mengirim mereka untuk autentikasi oleh perusahaan sebelum membiarkan mereka benar-benar memesan perjalanan.

![Proses SAML langkah demi langkah](./fig-01-saml.png)

Ini adalah cara ketiga entitas, yaitu peramban, SP, dan IdP, bernegosiasi untuk mendapatkan akses. SP tidak perlu mengetahui apa pun tentang pengguna yang menggunakan peramban sebelumnya, hanya perlu memercayai IdP.

### Ethereum untuk orang-orang SAML

Ethereum adalah sistem desentralisasi. 

![Logon Ethereum](./fig-02-eth-logon.png)

Pengguna memiliki kunci pribadi (biasanya disimpan dalam ekstensi peramban). Dari kunci pribadi Anda dapat memperoleh kunci publik, dan dari situ sebuah alamat 20-byte. Ketika pengguna perlu masuk ke dalam sistem, mereka diminta untuk menandatangani pesan dengan nonce (nilai sekali pakai). Server dapat memverifikasi bahwa tanda tangan tersebut dibuat oleh alamat tersebut.

![Mendapatkan data tambahan dari pengesahan](./fig-03-eas-data.png)

Tanda tangan hanya memverifikasi alamat Ethereum. Untuk mendapatkan atribut pengguna lainnya, Anda biasanya menggunakan [pengesahan](https://attest.org/). Sebuah pengesahan biasanya memiliki bidang-bidang berikut:

- **Attestor**, alamat yang membuat pengesahan
- **Penerima**, alamat yang menjadi tujuan pengesahan
- **Data**, data yang disahkan, seperti nama, izin, dll.
- **Skema**, ID dari skema yang digunakan untuk menafsirkan data.

Karena sifat desentralisasi dari Ethereum, setiap pengguna dapat membuat pengesahan. Identitas attestor penting untuk mengidentifikasi pengesahan mana yang kita anggap dapat diandalkan.

## Persiapan

Langkah pertama adalah membuat SAML SP dan SAML IdP berkomunikasi satu sama lain.

1. Unduh perangkat lunaknya. Perangkat lunak sampel untuk artikel ini ada [di github](https://github.com/qbzzt/250420-saml-ethereum). Tahapan yang berbeda disimpan di cabang yang berbeda, untuk tahap ini Anda memerlukan `saml-only`

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
```

2. Buat kunci dengan sertifikat yang ditandatangani sendiri. Ini berarti bahwa kunci tersebut adalah otoritas sertifikatnya sendiri, dan perlu diimpor secara manual ke penyedia layanan. Lihat [dokumentasi OpenSSL](https://docs.openssl.org/master/man1/openssl-req/) untuk informasi lebih lanjut. 

    ```sh
    mkdir keys
    cd keys
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-sp.crt -keyout saml-sp.pem -subj /CN=sp/
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-idp.crt -keyout saml-idp.pem -subj /CN=idp/
    cd ..
```

3. Mulai server (baik SP maupun IdP)

    ```sh
    pnpm start
```

4. Buka SP di URL [http://localhost:3000/](http://localhost:3000/) dan klik tombol untuk diarahkan ke IdP (port 3001).

5. Berikan alamat email Anda kepada IdP dan klik **Login to the service provider**. Lihat bahwa Anda diarahkan kembali ke penyedia layanan (port 3000) dan bahwa ia mengenali Anda dari alamat email Anda.

### Penjelasan terperinci

Inilah yang terjadi, langkah demi langkah:

![Logon SAML normal tanpa Ethereum](./fig-04-saml-no-eth.png)

#### src/config.mts

File ini berisi konfigurasi untuk Penyedia Identitas dan Penyedia Layanan. Biasanya keduanya akan menjadi entitas yang berbeda, tetapi di sini kita dapat berbagi kode demi kesederhanaan.

```typescript
const fs = await import("fs")

const protocol="http"
```

Untuk saat ini kita hanya melakukan pengujian, jadi tidak masalah menggunakan HTTP.

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

Baca kunci publik, yang biasanya tersedia untuk kedua komponen (dan baik dipercaya secara langsung, atau ditandatangani oleh otoritas sertifikat tepercaya).

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

URL untuk kedua komponen.

```typescript
export const spPublicData = {
```

Data publik untuk penyedia layanan.

```typescript
    entityID: `${spUrl}/metadata`,
```

Berdasarkan konvensi, dalam SAML `entityID` adalah URL tempat metadata entitas tersedia. Metadata ini sesuai dengan data publik di sini, kecuali dalam bentuk XML.

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

Definisi yang paling penting untuk tujuan kita adalah `assertionConsumerServer`. Ini berarti bahwa untuk menegaskan sesuatu (misalnya, "pengguna yang mengirimi Anda informasi ini adalah somebody@example.com") kepada penyedia layanan, kita perlu menggunakan [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) ke URL `http://localhost:3000/sp/assertion`.

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

Data publik untuk penyedia identitas juga serupa. Ini menentukan bahwa untuk memasukkan pengguna, Anda melakukan POST ke `http://localhost:3001/idp/login` dan untuk mengeluarkan pengguna, Anda melakukan POST ke `http://localhost:3001/idp/logout`.

#### src/sp.mts

Ini adalah kode yang mengimplementasikan penyedia layanan.

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

Kita menggunakan pustaka [`samlify`](https://www.npmjs.com/package/samlify) untuk mengimplementasikan SAML.

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

Pustaka `samlify` mengharapkan adanya paket yang memvalidasi bahwa XML sudah benar, ditandatangani dengan kunci publik yang diharapkan, dll. Kita menggunakan [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint) untuk tujuan ini.

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

Sebuah [`Router`](https://expressjs.com/en/5x/api.html#router) [`express`](https://expressjs.com/) adalah "situs web mini" yang dapat dipasang di dalam sebuah situs web. Dalam hal ini, kita menggunakannya untuk mengelompokkan semua definisi penyedia layanan bersama-sama.

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

Representasi penyedia layanan itu sendiri adalah semua data publik, dan kunci pribadi yang digunakannya untuk menandatangani informasi.

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

Data publik berisi semua yang perlu diketahui oleh penyedia layanan tentang penyedia identitas.

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

Untuk memungkinkan interoperabilitas dengan komponen SAML lainnya, penyedia layanan dan identitas harus memiliki data publik mereka (disebut metadata) yang tersedia dalam format XML di `/metadata`.

```typescript
spRouter.post(`/assertion`,
```

Ini adalah halaman yang diakses oleh peramban untuk mengidentifikasi dirinya sendiri. Asersi tersebut mencakup pengidentifikasi pengguna (di sini kita menggunakan alamat email), dan dapat mencakup atribut tambahan. Ini adalah penangan untuk langkah 7 dalam diagram urutan di atas.

```typescript
  async (req, res) => {
    // console.log(`SAML response:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`) // console.log(`SAML response:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

Anda dapat menggunakan perintah yang dikomentari untuk melihat data XML yang disediakan dalam asersi. Data tersebut [dikodekan dengan base64](https://en.wikipedia.org/wiki/Base64).

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

Urai permintaan masuk dari server identitas.

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

Kirim respons HTML, hanya untuk menunjukkan kepada pengguna bahwa kita telah menerima proses masuk.

```typescript
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

Beri tahu pengguna jika terjadi kegagalan.

```typescript
spRouter.get('/login',
```

Buat permintaan masuk ketika peramban mencoba mendapatkan halaman ini. Ini adalah penangan untuk langkah 1 dalam diagram urutan di atas.

```typescript
  async (req, res) => {
    const loginRequest = await sp.createLoginRequest(idp, "post")
```

Dapatkan informasi untuk memposting permintaan masuk.

```typescript
    res.send(`
      <html>
        <body>
          <script>
            window.onload = function () { document.forms[0].submit(); }            
          </script>
```

Halaman ini mengirimkan formulir (lihat di bawah) secara otomatis. Dengan cara ini pengguna tidak perlu melakukan apa pun untuk diarahkan. Ini adalah langkah 2 dalam diagram urutan di atas.

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

Posting ke `loginRequest.entityEndpoint` (URL dari titik akhir penyedia identitas).

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

Nama inputnya adalah `loginRequest.type` (`SAMLRequest`). Konten untuk bidang tersebut adalah `loginRequest.context`, yang sekali lagi merupakan XML yang dikodekan dengan base64.

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[Middleware ini](https://expressjs.com/en/5x/api.html#express.urlencoded) membaca isi dari [permintaan HTTP](https://www.tutorialspoint.com/http/http_requests.htm). Secara default express mengabaikannya, karena sebagian besar permintaan tidak memerlukannya. Kita memerlukannya karena POST memang menggunakan isi.

```typescript
app.use(`/${config.spDir}`, spRouter)
```

Pasang router di direktori penyedia layanan (`/sp`).

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

Jika peramban mencoba mendapatkan direktori root, berikan tautan ke halaman masuk.

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

Dengarkan `spPort` dengan aplikasi express ini.

#### src/idp.mts

Ini adalah penyedia identitas. Ini sangat mirip dengan penyedia layanan, penjelasan di bawah ini adalah untuk bagian-bagian yang berbeda.

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // Preserve attributes // Pertahankan atribut
    attributeNamePrefix: "@_", // Prefix for attributes // Awalan untuk atribut
  }
)
```

Kita perlu membaca dan memahami permintaan XML yang kita terima dari penyedia layanan.

```typescript
const getLoginPage = requestId => `
```

Fungsi ini membuat halaman dengan formulir yang dikirimkan secara otomatis yang dikembalikan pada langkah 4 dari diagram urutan di atas.

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

Ada dua bidang yang kita kirim ke penyedia layanan:

1. `requestId` yang sedang kita tanggapi.
2. Pengidentifikasi pengguna (kita menggunakan alamat email yang diberikan pengguna untuk saat ini).

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

Ini adalah penangan untuk langkah 5 dari diagram urutan di atas. [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) membuat respons masuk. 

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

Audiensnya adalah penyedia layanan.

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

Informasi yang diekstrak dari permintaan. Satu parameter yang kita pedulikan dalam permintaan adalah requestId, yang memungkinkan penyedia layanan mencocokkan permintaan dan responsnya.

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // Ensure signing // Pastikan penandatanganan
```

Kita memerlukan `signingKey` untuk memiliki data guna menandatangani respons. Penyedia layanan tidak memercayai permintaan yang tidak ditandatangani.

```typescript
    },
    "post",
    {
      email: req.body.email
```

Ini adalah bidang dengan informasi pengguna yang kita kirim kembali ke penyedia layanan.

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

Sekali lagi, gunakan formulir yang dikirimkan secara otomatis. Ini adalah langkah 6 dari diagram urutan di atas.

```typescript

// IdP endpoint for login requests // Endpoint IdP untuk permintaan login
idpRouter.post(`/login`,
```

Ini adalah titik akhir yang menerima permintaan masuk dari penyedia layanan. Ini adalah penangan untuk langkah 3 dari diagram urutan di atas.

```typescript
  async (req, res) => {
    try {
      // Workaround because I couldn't get parseLoginRequest to work. // Solusi sementara karena saya tidak bisa membuat parseLoginRequest berfungsi.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req) // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

Kita seharusnya dapat menggunakan [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) untuk membaca ID permintaan autentikasi. Namun, saya tidak dapat membuatnya berfungsi dan tidak sepadan menghabiskan banyak waktu untuk itu, jadi saya hanya menggunakan [pengurai XML serbaguna](https://www.npmjs.com/package/fast-xml-parser). Informasi yang kita butuhkan adalah atribut `ID` di dalam tag `<samlp:AuthnRequest>`, yang berada di tingkat atas XML.

## Menggunakan tanda tangan Ethereum

Sekarang setelah kita dapat mengirim identitas pengguna ke penyedia layanan, langkah selanjutnya adalah mendapatkan identitas pengguna dengan cara yang tepercaya. Viem memungkinkan kita untuk sekadar meminta alamat pengguna dari dompet, tetapi ini berarti meminta informasi tersebut dari peramban. Kita tidak mengontrol peramban, jadi kita tidak dapat secara otomatis memercayai respons yang kita dapatkan darinya.

Sebagai gantinya, IdP akan mengirimkan string ke peramban untuk ditandatangani. Jika dompet di peramban menandatangani string ini, itu berarti bahwa itu benar-benar alamat tersebut (yaitu, ia mengetahui kunci pribadi yang sesuai dengan alamat tersebut).

Untuk melihat ini beraksi, hentikan IdP dan SP yang ada dan jalankan perintah ini:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

Kemudian buka [SP](http://localhost:3000) dan ikuti petunjuknya.

Perhatikan bahwa pada titik ini kita tidak tahu cara mendapatkan alamat email dari alamat Ethereum, jadi sebagai gantinya kita melaporkan `<ethereum address>@bad.email.address` ke SP.

### Penjelasan terperinci

Perubahannya ada pada langkah 4-5 dalam diagram sebelumnya.

![SAML dengan tanda tangan Ethereum](./fig-05-saml-w-signature.png)

Satu-satunya file yang kita ubah adalah `idp.mts`. Berikut adalah bagian-bagian yang diubah.

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

Kita memerlukan dua pustaka tambahan ini. Kita menggunakan [`uuid`](https://www.npmjs.com/package/uuid) untuk membuat nilai [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). Nilainya sendiri tidak masalah, hanya fakta bahwa ia hanya digunakan sekali.

Pustaka [`viem`](https://viem.sh/) memungkinkan kita menggunakan definisi Ethereum. Di sini kita memerlukannya untuk memverifikasi bahwa tanda tangan tersebut memang valid.

```typescript
const loginPrompt = "To access the service provider, sign this nonce: "
```

Dompet meminta izin kepada pengguna untuk menandatangani pesan. Pesan yang hanya berupa nonce dapat membingungkan pengguna, jadi kita menyertakan prompt ini.

```typescript
// Keep requestIDs here // Simpan requestIDs di sini
let nonces = {}
```

Kita memerlukan informasi permintaan untuk dapat menanggapinya. Kita dapat mengirimkannya bersama permintaan (langkah 4), dan menerimanya kembali (langkah 5). Namun, kita tidak dapat memercayai informasi yang kita dapatkan dari peramban, yang berada di bawah kendali pengguna yang berpotensi bermusuhan. Jadi lebih baik menyimpannya di sini, dengan nonce sebagai kunci.

Perhatikan bahwa kita melakukannya di sini sebagai variabel demi kesederhanaan. Namun, ini memiliki beberapa kelemahan:

- Kita rentan terhadap serangan penolakan layanan. Pengguna yang jahat dapat mencoba masuk berkali-kali, memenuhi memori kita.
- Jika proses IdP perlu dimulai ulang, kita kehilangan nilai yang ada.
- Kita tidak dapat melakukan penyeimbangan beban di beberapa proses, karena masing-masing akan memiliki variabelnya sendiri.

Pada sistem produksi, kita akan menggunakan basis data dan mengimplementasikan semacam mekanisme kedaluwarsa.

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

Buat nonce, dan simpan `requestId` untuk penggunaan di masa mendatang.

```typescript
  return `
<html>
  <head>
    <script type="module">
```

JavaScript ini dieksekusi secara otomatis saat halaman dimuat.

```typescript
      import { createWalletClient, custom, getAddress } from 'https://esm.sh/viem'
```

Kita memerlukan beberapa fungsi dari `viem`.

```typescript
      if (!window.ethereum) {
          alert("Please install MetaMask or a compatible wallet and then reload")
      }
```

Kita hanya dapat bekerja jika ada dompet di peramban.

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

Minta daftar akun dari dompet (`window.ethereum`). Asumsikan setidaknya ada satu, dan hanya simpan yang pertama. 

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

Buat [klien dompet](https://viem.sh/docs/clients/wallet) untuk berinteraksi dengan dompet peramban.

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

Minta pengguna untuk menandatangani pesan. Karena seluruh HTML ini berada dalam [string templat](https://viem.sh/docs/clients/wallet), kita dapat menggunakan variabel yang didefinisikan dalam proses idp. Ini adalah langkah 4.5 dalam diagram urutan.

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

Arahkan ke `/idp/signature/<nonce>/<address>/<signature>`. Ini adalah langkah 5 dalam diagram urutan.

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

Tanda tangan dikirim kembali oleh peramban, yang berpotensi berbahaya (tidak ada yang menghentikan Anda untuk sekadar membuka `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` di peramban). Oleh karena itu, penting untuk memverifikasi bahwa proses IdP menangani tanda tangan yang buruk dengan benar.

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

Sisanya hanyalah HTML standar.

```typescript
idpRouter.get("/signature/:nonce/:account/:signature", async (req, res) => {
```

Ini adalah penangan untuk langkah 5 dalam diagram urutan.

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("Bad nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

Dapatkan ID permintaan, dan hapus nonce dari `nonces` untuk memastikan ia tidak dapat digunakan kembali.

```typescript
  try {
```

Karena ada begitu banyak cara di mana tanda tangan bisa menjadi tidak valid, kita membungkus ini dalam blok `try ... catch` untuk menangkap kesalahan apa pun yang dilemparkan.

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

Gunakan [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage) untuk mengimplementasikan langkah 5.5 dalam diagram urutan.

```typescript
    if (!validSignature)
      throw("Bad signature")
  } catch (err) {
    res.send("Error:" + err)
    return ;
  }
```

Sisa penangan ini setara dengan apa yang telah kita lakukan di penangan `/loginSubmitted` sebelumnya, kecuali untuk satu perubahan kecil.

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

Kita tidak memiliki alamat email yang sebenarnya (kita akan mendapatkannya di bagian selanjutnya), jadi untuk saat ini kita mengembalikan alamat Ethereum dan menandainya dengan jelas sebagai bukan alamat email.


```typescript
// IdP endpoint for login requests // Endpoint IdP untuk permintaan login
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // Workaround because I couldn't get parseLoginRequest to work. // Solusi sementara karena saya tidak bisa membuat parseLoginRequest berfungsi.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req) // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getSignaturePage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

Alih-alih `getLoginPage`, sekarang gunakan `getSignaturePage` di penangan langkah 3.

## Mendapatkan alamat email

Langkah selanjutnya adalah mendapatkan alamat email, pengidentifikasi yang diminta oleh penyedia layanan. Untuk melakukannya, kita menggunakan [Ethereum Attestation Service (EAS)](https://attest.org/).

Cara termudah untuk mendapatkan pengesahan adalah dengan menggunakan [GraphQL API](https://docs.attest.org/docs/developer-tools/api). Kita menggunakan kueri ini:

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

[`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) ini hanya menyertakan alamat email. Kueri ini meminta pengesahan dari skema ini. Subjek pengesahan disebut `recipient`. Ini selalu berupa alamat Ethereum.

Peringatan: Cara kita mendapatkan pengesahan di sini memiliki dua masalah keamanan.

- Kita menuju ke titik akhir API, `https://optimism.easscan.org/graphql`, yang merupakan komponen terpusat. Kita bisa mendapatkan atribut `id` dan kemudian melakukan pencarian onchain untuk memverifikasi bahwa pengesahan itu nyata, tetapi titik akhir API masih dapat menyensor pengesahan dengan tidak memberi tahu kita tentangnya. 

  Masalah ini bukan tidak mungkin untuk dipecahkan, kita dapat menjalankan titik akhir GraphQL kita sendiri dan mendapatkan pengesahan dari log rantai, tetapi itu berlebihan untuk tujuan kita.

- Kita tidak melihat identitas attester. Siapa pun dapat memberi kita informasi palsu. Dalam implementasi dunia nyata, kita akan memiliki sekumpulan attester tepercaya dan hanya melihat pengesahan mereka.

Untuk melihat ini beraksi, hentikan IdP dan SP yang ada dan jalankan perintah ini:

```sh
git checkout email-address
pnpm install
pnpm start
```

Kemudian berikan alamat email Anda. Anda memiliki dua cara untuk melakukannya:

- Impor dompet menggunakan kunci pribadi, dan gunakan kunci pribadi pengujian `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`.

- Tambahkan pengesahan untuk alamat email Anda sendiri:

  1. Buka [skema di penjelajah pengesahan](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977).

  2. Klik **Attest with Schema**.

  3. Masukkan alamat Ethereum Anda sebagai penerima, alamat email Anda sebagai alamat email, dan pilih **Onchain**. Kemudian klik **Make Attestation**.

  4. Setujui transaksi di dompet Anda. Anda akan memerlukan sejumlah ETH di [Blockchain Optimism](https://app.optimism.io/bridge/deposit) untuk membayar gas.

Apa pun caranya, setelah Anda melakukan ini, buka [http://localhost:3000](http://localhost:3000) dan ikuti petunjuknya. Jika Anda mengimpor kunci pribadi pengujian, email yang Anda terima adalah `test_addr_0@example.com`. Jika Anda menggunakan alamat Anda sendiri, itu harus sesuai dengan apa yang Anda sahkan.

### Penjelasan terperinci

![Mendapatkan dari alamat Ethereum ke email](./fig-06-saml-sig-n-email.png)

Langkah-langkah baru adalah komunikasi GraphQL, langkah 5.6 dan 5.7.

Sekali lagi, berikut adalah bagian-bagian yang diubah dari `idp.mts`.

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

Impor pustaka yang kita butuhkan.

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

Terdapat [titik akhir terpisah untuk setiap blockchain](https://docs.attest.org/docs/developer-tools/api).

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

Buat klien `GraphQLClient` baru yang dapat kita gunakan untuk menanyakan titik akhir.

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL hanya memberi kita objek data buram dengan byte. Untuk memahaminya kita memerlukan skema. 

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

Fungsi untuk mendapatkan dari alamat Ethereum ke alamat email.

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

Ini adalah kueri GraphQL.

```typescript
      attestations(
```

Kita mencari pengesahan.

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

Pengesahan yang kita inginkan adalah yang ada di skema kita, di mana penerimanya adalah `getAddress(ethAddr)`. Fungsi [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) memastikan alamat kita memiliki [checksum](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md) yang benar. Ini diperlukan karena GraphQL peka terhadap huruf besar/kecil. "0xBAD060A7", "0xBad060A7", dan "0xbad060a7" adalah nilai yang berbeda.

```typescript
        take: 1
```

Terlepas dari berapa banyak pengesahan yang kita temukan, kita hanya menginginkan yang pertama.

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

Bidang-bidang yang ingin kita terima.

- `attester`: Alamat yang mengirimkan pengesahan. Biasanya ini digunakan untuk memutuskan apakah akan memercayai pengesahan atau tidak.
- `id`: ID pengesahan. Anda dapat menggunakan nilai ini untuk [membaca pengesahan onchain](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64) untuk memverifikasi bahwa informasi dari kueri GraphQL sudah benar.
- `data`: Data skema (dalam hal ini, alamat email).

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

Jika tidak ada pengesahan, kembalikan nilai yang jelas-jelas salah, tetapi akan tampak valid bagi penyedia layanan.

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

Jika ada nilai, gunakan `decodeData` untuk mendekode data. Kita tidak memerlukan metadata yang disediakannya, hanya nilainya saja.

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

Gunakan fungsi baru untuk mendapatkan alamat email.

## Bagaimana dengan desentralisasi?

Dalam konfigurasi ini pengguna tidak dapat berpura-pura menjadi orang lain, selama kita mengandalkan attester yang dapat dipercaya untuk pemetaan alamat Ethereum ke email. Namun, penyedia identitas kita masih merupakan komponen terpusat. Siapa pun yang memiliki kunci pribadi penyedia identitas dapat mengirimkan informasi palsu ke penyedia layanan.

Mungkin ada solusi menggunakan [komputasi multi-pihak (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation). Saya berharap dapat menulis tentang hal itu di tutorial mendatang.

## Kesimpulan

Adopsi standar masuk, seperti tanda tangan Ethereum, menghadapi masalah ayam dan telur. Penyedia layanan ingin menarik pasar seluas mungkin. Pengguna ingin dapat mengakses layanan tanpa harus khawatir tentang dukungan standar masuk mereka.
Membuat adaptor, seperti Ethereum IdP, dapat membantu kita mengatasi rintangan ini.

[Lihat di sini untuk karya saya yang lain](https://cryptodocguy.pro/).