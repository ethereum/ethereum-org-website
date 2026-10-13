---
title: Autentikasi di Ethereum
description: Pelajari cara kerja autentikasi pengguna dalam aplikasi Ethereum—tanpa kata sandi, hanya dompet dan tanda tangan.
lang: id
---

Jika Anda berasal dari pengembangan web tradisional, Anda terbiasa dengan login nama pengguna/kata sandi, alur OAuth, dan kuki sesi. Autentikasi di Ethereum bekerja secara berbeda—dan dalam banyak hal, lebih sederhana.

Di Ethereum, pengguna membuktikan identitas mereka dengan **menandatangani pesan dengan dompet mereka**. Tidak ada kata sandi yang perlu disimpan. Tidak ada basis data kredensial yang bisa bocor. Hanya kriptografi.

## Apa bedanya dengan Web2? {#how-is-it-different}

| Web2                              | Ethereum                                         |
| --------------------------------- | ------------------------------------------------ |
| Nama pengguna + kata sandi        | Alamat dompet + tanda tangan                     |
| Server menyimpan kredensial       | Pengguna memegang kunci privat                   |
| Sesi dikelola oleh kuki / JWT     | Sesi dimulai dengan tanda tangan dompet offchain |
| "Masuk dengan Google"             | "Masuk dengan Ethereum"                          |
| Alur pengaturan ulang kata sandi  | Pemulihan frasa benih                            |

Perubahan mendasarnya: di Web2, server terpusat mengautentikasi Anda. Di Ethereum, **Anda mengautentikasi diri sendiri** dengan membuktikan bahwa Anda mengendalikan alamat tertentu—dan siapa pun dapat memverifikasinya secara independen.

## Prasyarat {#prerequisites}

Pastikan Anda memahami:

- [Akun Ethereum dan cara kerjanya](/developers/docs/accounts/)
- [Apa itu dompet dan cara menghubungkannya](/wallets/)
- [Dasar-dasar kriptografi kunci publik-privat](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)

## Cara kerja autentikasi berbasis dompet {#how-wallet-auth-works}

Alur intinya sederhana:

1. **Aplikasi terdesentralisasi (dapp) Anda meminta pengguna untuk menghubungkan dompet mereka** (melalui MetaMask, Rainbow, WalletConnect, dll.)
2. **Dompet membagikan alamat Ethereum pengguna** - ini adalah pengidentifikasi publik mereka
3. **Dapp Anda menghasilkan pesan unik** (sebuah nonce atau tantangan)
4. **Pengguna menandatangani pesan** dengan kunci privat mereka (terjadi di dalam dompet)
5. **Backend Anda memverifikasi tanda tangan** terhadap alamat yang diklaim
6. **Jika valid, pengguna diautentikasi**

Tidak ada kata sandi yang pernah diketik, disimpan, atau dikirimkan.

## Masuk dengan Ethereum (EIP-4361) {#sign-in-with-ethereum}

[EIP-4361](https://eips.ethereum.org/EIPS/eip-4361) mendefinisikan format pesan standar untuk masuk dengan Ethereum, yang umumnya disebut **SIWE** (Sign-In with Ethereum). Ini menggantikan penandatanganan pesan ad-hoc dengan standar yang terstruktur dan aman.

Pesan SIWE terlihat seperti ini:

```yaml
example.com wants you to sign in with your Ethereum account:
0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B

I accept the Terms of Service: https://example.com/tos

URI: https://example.com/login
Version: 1
Chain ID: 1
Nonce: 32891757
Issued At: 2024-06-12T14:30:00Z
```

Fitur utama SIWE:

- **Pengikatan domain** - pesan menyertakan domain, mencegah phishing
- **ID Rantai** - menentukan jaringan mana tanda tangan tersebut valid
- **Nonce** - mencegah serangan pemutaran ulang (replay attacks)
- **Kedaluwarsa** - stempel waktu opsional yang membatasi jendela validitas
- **Sumber daya** - URI opsional untuk akses dengan cakupan tertentu

### Pustaka SIWE {#siwe-libraries}

- **[siwe](https://github.com/spruceid/siwe)** - Implementasi resmi TypeScript oleh Spruce
- **[siwe-rs](https://github.com/spruceid/siwe-rs)** - Implementasi Rust
- **[siwe-go](https://github.com/spruceid/siwe-go)** - Implementasi Go

### Contoh: masuk sisi klien dengan siwe {#example-siwe-client}

```ts
import { SiweMessage } from 'siwe'
import { BrowserProvider } from 'ethers'

async function signIn() {
  const provider = new BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const address = await signer.getAddress()

  // 1. Dapatkan nonce dari backend Anda
  const { nonce } = await fetch('/api/auth/nonce').then(r => r.json())

  // 2. Buat dan tandatangani pesan SIWE
  const message = new SiweMessage({
    domain: window.location.host,
    address,
    statement: 'Sign in to My Dapp',
    uri: window.location.origin,
    version: '1',
    chainId: 1,
    nonce,
  })

  const signature = await signer.signMessage(message.prepareMessage())

  // 3. Kirim ke backend untuk verifikasi
  await fetch('/api/auth/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, signature }),
  })
}
```

### Contoh: verifikasi sisi server (Node.js) {#example-siwe-server}

```ts
import { SiweMessage, generateNonce } from 'siwe'

// Keluarkan nonce dan simpan di sesi sehingga /verify dapat memeriksanya nanti
app.get('/api/auth/nonce', (req, res) => {
  req.session.nonce = generateNonce()
  res.json({ nonce: req.session.nonce })
})

app.post('/api/auth/verify', async (req, res) => {
  try {
    const { message, signature } = req.body
    const siweMessage = new SiweMessage(message)

    const { success, data } = await siweMessage.verify({
      signature,
      nonce: req.session.nonce,
    })

    if (success) {
      // data.address adalah alamat Ethereum yang terverifikasi
      // Buat sesi atau JWT untuk pengguna
      req.session.address = data.address
      res.json({ ok: true, address: data.address })
    }
  } catch {
    res.status(401).json({ error: 'Invalid signature' })
  }
})
```

## Pustaka koneksi dompet {#wallet-connection-libraries}

Sebelum mengautentikasi, Anda perlu pengguna untuk menghubungkan dompet mereka. Pustaka-pustaka ini membuatnya mudah:

- **[RainbowKit](https://www.rainbowkit.com/)** - Komponen React siap pakai dengan UI yang indah
- **[ConnectKit](https://docs.family.co/connectkit)** - Modal koneksi dompet drop-in
- **[AppKit (WalletConnect)](https://reown.com/appkit)** - Koneksi dompet multirantai dengan SIWE bawaan
- **[Wagmi](https://wagmi.sh)** - Pustaka React Hooks dengan `useAccount`, `useConnect`

## Memverifikasi tanda tangan secara manual {#verifying-manually}

Jika Anda lebih suka tidak menggunakan SIWE, Anda dapat memverifikasi tanda tangan secara langsung:

```ts
import { verifyMessage } from 'ethers'

// Pesan yang ditandatangani pengguna
const message = `Sign in to My Dapp. Nonce: ${storedNonce}`

// Pulihkan alamat penandatangan dari tanda tangan
const recoveredAddress = verifyMessage(message, signature)

// Bandingkan dengan alamat yang diklaim
if (recoveredAddress.toLowerCase() === claimedAddress.toLowerCase()) {
  // Autentikasi berhasil
}
```

### Catatan keamanan penting {#security-notes}

- **Selalu gunakan nonce** - mencegah serangan pemutaran ulang di mana tanda tangan lama digunakan kembali
- **Sertakan domain** - mencegah tanda tangan menjadi valid di berbagai situs yang berbeda
- **Periksa kedaluwarsa** - tanda tangan harus memiliki jendela validitas yang terbatas
- **Gunakan SIWE (EIP-4361) jika memungkinkan** - ini menangani semua hal di atas untuk Anda
- **Jangan pernah mengekspos kunci privat** - penandatanganan terjadi di dalam dompet; aplikasi Anda hanya melihat hasilnya

## Manajemen sesi {#session-management}

Setelah diautentikasi, Anda masih memerlukan sesi—sama seperti Web2. Pola umum:

- **Token JWT** - terbitkan JWT setelah memverifikasi tanda tangan, gunakan untuk permintaan API
- **Sesi sisi server** - simpan alamat yang diverifikasi dalam kuki sesi
- **SIWE dengan sumber daya** - tentukan token akses dengan cakupan yang ditautkan ke URI tertentu

Perbedaan utama dari Web2: alamat Ethereum pengguna adalah identitas persisten mereka. Mereka dapat menggunakannya di seluruh dapp mana pun tanpa membuat akun baru.

## Identitas terdesentralisasi {#decentralized-identity}

Autentikasi Ethereum adalah bagian dari gerakan yang lebih luas menuju **identitas berdaulat sendiri (self-sovereign identity)**. Standar dan proyek di ruang ini meliputi:

- **[Ethereum Name Service (ENS)](https://ens.domains/)** - Nama yang dapat dibaca manusia (misalnya, `vitalik.eth`) yang diselesaikan menjadi alamat
- **[Ethereum Attestation Service (EAS)](https://attest.org/)** - Atestasi onchain tentang identitas dan kredensial
- **[W3C Decentralized Identifiers (DIDs)](https://www.w3.org/TR/did-core/)** - Standar global untuk identitas terdesentralisasi (DID) yang dapat diverifikasi
- **[Ceramic Network](https://ceramic.network/)** - Aliran data terdesentralisasi yang terikat pada sebuah DID

## Bacaan lebih lanjut {#further-reading}

- [EIP-4361: Masuk dengan Ethereum](https://eips.ethereum.org/EIPS/eip-4361)
- [Dokumentasi SIWE](https://docs.login.xyz/)
- [Masuk dengan Ethereum di Auth0](https://auth0.com/blog/sign-in-with-ethereum-siwe-now-available-on-auth0/)
- [Dokumentasi autentikasi Reown AppKit](https://docs.reown.com/appkit/authentication)
- [Dokumentasi ENS](https://docs.ens.domains/)

## Topik terkait {#related-topics}

- [Akun Ethereum](/developers/docs/accounts/)
- [Pustaka API JavaScript](/developers/docs/apis/javascript/)
- [Pustaka API Backend](/developers/docs/apis/backend/)
- [Dompet](/wallets/)