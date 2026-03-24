---
title: "Mensponsori biaya gas: Cara menanggung biaya transaksi untuk pengguna Anda"
description: Sangat mudah untuk membuat kunci pribadi dan alamat; ini hanya masalah menjalankan perangkat lunak yang tepat. Namun, ada banyak tempat di dunia di mana mendapatkan ETH untuk mengirim transaksi jauh lebih sulit. Dalam tutorial ini Anda akan mempelajari cara menanggung biaya gas onchain untuk mengeksekusi data terstruktur offchain yang ditandatangani pengguna di kontrak pintar Anda. Anda meminta pengguna menandatangani struktur yang berisi informasi transaksi, yang kemudian dikirimkan oleh kode offchain Anda ke blockchain sebagai transaksi.
author: Ori Pomerantz
tags: ["tanpa gas", "Solidity", "eip-712", "transaksi meta"]
skill: intermediate
lang: id
published: 2026-02-27
---

## Pengantar {#introduction}

Jika kita ingin Ethereum melayani [satu miliar orang lagi](https://blog.ethereum.org/category/next-billion), kita perlu menghilangkan hambatan dan membuatnya semudah mungkin untuk digunakan. Salah satu sumber hambatan ini adalah kebutuhan akan ETH untuk membayar biaya gas.

Jika Anda memiliki dapp yang menghasilkan uang dari pengguna, mungkin masuk akal untuk membiarkan pengguna mengirimkan transaksi melalui server Anda dan Anda sendiri yang membayar biaya transaksinya. Karena pengguna masih menandatangani [pesan otorisasi EIP-712](https://eips.ethereum.org/EIPS/eip-712) di dompet mereka, mereka mempertahankan jaminan integritas Ethereum. Ketersediaan bergantung pada server yang meneruskan transaksi, sehingga lebih terbatas. Namun, Anda dapat mengatur agar pengguna juga dapat mengakses kontrak pintar secara langsung (jika mereka mendapatkan ETH), dan membiarkan orang lain menyiapkan server mereka sendiri jika mereka ingin mensponsori transaksi.

Teknik dalam tutorial ini hanya berfungsi ketika Anda mengontrol kontrak pintar. Ada teknik lain, termasuk [abstraksi akun](https://eips.ethereum.org/EIPS/eip-4337) yang memungkinkan Anda mensponsori transaksi ke kontrak pintar lain, yang saya harap dapat dibahas dalam tutorial mendatang.

Catatan: Ini _bukan_ kode tingkat produksi. Kode ini rentan terhadap serangan signifikan dan tidak memiliki fitur-fitur utama. Pelajari lebih lanjut di [bagian kerentanan dari panduan ini](#vulnerabilities).

### Prasyarat {#prerequisites}

Untuk memahami tutorial ini, Anda harus sudah familier dengan:

- Solidity
- JavaScript
- React dan WAGMI. Jika Anda tidak familier dengan alat antarmuka pengguna ini, [kami memiliki tutorial untuk itu](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

## Aplikasi sampel {#sample-app}

Aplikasi sampel di sini adalah varian dari kontrak `Greeter` milik Hardhat. Anda dapat melihatnya [di GitHub](https://github.com/qbzzt/260301-gasless). Kontrak pintar ini sudah diterapkan di [Sepolia](https://sepolia.dev/), pada alamat [`0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA`](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA).

Untuk melihatnya beraksi, ikuti langkah-langkah berikut.

1. Klon repositori dan instal perangkat lunak yang diperlukan.

   ```sh
   git clone https://github.com/qbzzt/260301-gasless.git
   cd 260301-gasless/server
   npm install
```

2. Edit `.env` untuk mengatur `PRIVATE_KEY` ke dompet yang memiliki ETH di Sepolia. Jika Anda membutuhkan ETH Sepolia, [gunakan faucet](/developers/docs/networks/#sepolia). Idealnya, kunci pribadi ini harus berbeda dari yang Anda miliki di dompet peramban Anda.

3. Mulai server.

   ```sh
   npm run dev
```

4. Buka aplikasi pada URL [`http://localhost:5173`](http://localhost:5173).

5. Klik **Connect with Injected** untuk terhubung ke dompet. Setujui di dompet, dan setujui perubahan ke Sepolia jika perlu.

6. Tulis sapaan baru dan klik **Update greeting via sponsor**.

7. Tandatangani pesan.

8. Tunggu sekitar 12 detik (waktu blok di Sepolia). Sambil menunggu, Anda dapat melihat URL di konsol server untuk melihat transaksi.

9. Lihat bahwa sapaan telah berubah, dan nilai alamat yang terakhir memperbarui sekarang adalah alamat dompet peramban Anda.

Untuk memahami cara kerjanya, kita perlu melihat bagaimana pesan dibuat di antarmuka pengguna, bagaimana pesan diteruskan oleh server, dan bagaimana kontrak pintar memprosesnya.

### Antarmuka pengguna {#ui-changes}

Antarmuka pengguna didasarkan pada [WAGMI](https://wagmi.sh/); Anda dapat membacanya [di tutorial ini](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

Berikut adalah cara kita menandatangani pesan:

```js
const signGreeting = useCallback(
```

Hook React [`useCallback`](https://react.dev/reference/react/useCallback) memungkinkan kita meningkatkan kinerja dengan menggunakan kembali fungsi yang sama saat komponen digambar ulang.

```js
    async (greeting) => {
        if (!account) throw new Error("Wallet not connected")
```

Jika tidak ada akun, munculkan kesalahan. Ini seharusnya tidak pernah terjadi karena tombol UI yang memulai proses yang memanggil `signGreeting` dinonaktifkan dalam kasus tersebut. Namun, pemrogram di masa mendatang mungkin menghapus pengamanan tersebut, jadi ada baiknya untuk memeriksa kondisi ini di sini juga.

```js
        const domain = {
            name: "Greeter",
            version: "1",
            chainId,
            verifyingContract: contractAddr,
        }
```

Parameter untuk [pemisah domain](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator). Nilai ini konstan, jadi dalam implementasi yang lebih dioptimalkan, kita mungkin menghitungnya sekali daripada menghitungnya kembali setiap kali fungsi dipanggil.

- `name` adalah nama yang dapat dibaca pengguna, seperti nama dapp yang tanda tangannya sedang kita buat.
- `version` adalah versinya. Versi yang berbeda tidak kompatibel.
- `chainId` adalah rantai yang kita gunakan, seperti yang disediakan [oleh WAGMI](https://wagmi.sh/react/api/hooks/useChainId).
- `verifyingContract` adalah alamat kontrak yang akan memverifikasi tanda tangan ini. Kita tidak ingin tanda tangan yang sama berlaku untuk beberapa kontrak, seandainya ada beberapa kontrak `Greeter` dan kita ingin mereka memiliki sapaan yang berbeda.

```js

        const types = {
            GreetingRequest: [
                { name: "greeting", type: "string" },
            ],
        }
```

Tipe data yang kita tandatangani. Di sini, kita memiliki parameter tunggal, `greeting`, tetapi sistem di kehidupan nyata biasanya memiliki lebih banyak.

```js
        const message = { greeting }
```

Pesan sebenarnya yang ingin kita tandatangani dan kirim. `greeting` adalah nama bidang sekaligus nama variabel yang mengisinya.

```js
        const signature = await signTypedDataAsync({
            domain,
            types,
            primaryType: "GreetingRequest",
            message,
        })
```

Benar-benar mendapatkan tanda tangan. Fungsi ini asinkron karena pengguna membutuhkan waktu lama (dari sudut pandang komputer) untuk menandatangani data.

```js
        const r = `0x${signature.slice(2, 66)}`
        const s = `0x${signature.slice(66, 130)}`
        const v = parseInt(signature.slice(130, 132), 16)

        return {
            req: { greeting },
            v,
            r,
            s,
        }
    },
```

Fungsi ini mengembalikan nilai heksadesimal tunggal. Di sini kita membaginya menjadi beberapa bidang.

```js
    [account, chainId, contractAddr, signTypedDataAsync],
)
```

Jika salah satu dari variabel ini berubah, buat instans baru dari fungsi tersebut. Parameter `account` dan `chainId` dapat diubah oleh pengguna di dompet. `contractAddr` adalah fungsi dari Id rantai. `signTypedDataAsync` seharusnya tidak berubah, tetapi kita mengimpornya dari [sebuah hook](https://wagmi.sh/react/api/hooks/useSignTypedData), jadi kita tidak bisa memastikannya, dan sebaiknya menambahkannya di sini.

Sekarang setelah sapaan baru ditandatangani, kita perlu mengirimkannya ke server.

```js
  const sponsoredGreeting = async () => {
    try {
```

Fungsi ini mengambil tanda tangan dan mengirimkannya ke server.

```js
      const signedMessage = await signGreeting(newGreeting)
      const response = await fetch("/server/sponsor", {
```

Kirim ke jalur `/server/sponsor` di server asal kita.

```js
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signedMessage),
      })
```

Gunakan `POST` untuk mengirim informasi yang dienkode JSON.

```js
      const data = await response.json()
      console.log("Server response:", data)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

Keluarkan respons. Pada sistem produksi, kita juga akan menampilkan respons kepada pengguna.

### Server {#server}

Saya suka menggunakan [Vite](https://vite.dev/) sebagai front-end saya. Ini secara otomatis menyajikan pustaka React dan memperbarui peramban saat kode front-end berubah. Namun, Vite tidak menyertakan perkakas backend.

Solusinya ada di [`index.js`](https://github.com/qbzzt/260301-gasless/blob/main/server/index.js).

```js
  app.post("/server/sponsor", async (req, res) => {
    ...
  })

  // Let Vite handle everything else // Biarkan Vite menangani semua hal lainnya
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)
```

Pertama kita mendaftarkan penangan untuk permintaan yang kita tangani sendiri (`POST` ke `/server/sponsor`). Kemudian kita membuat dan menggunakan server Vite untuk menangani semua URL lainnya.

```js
  app.post("/server/sponsor", async (req, res) => {
    try {
      const signed = req.body

      const txHash = await sepoliaClient.writeContract({
        address: greeterAddr,
        abi: greeterABI,
        functionName: 'sponsoredSetGreeting',
        args: [signed.req, signed.v, signed.r, signed.s],
      })
    } ...
  })
```

Ini hanyalah panggilan blockchain [viem](https://viem.sh/) standar.

### Kontrak pintar {#smart-contract}

Terakhir, [`Greeter.sol`](https://github.com/qbzzt/260301-gasless/blob/main/contracts/src/Greeter.sol) perlu memverifikasi tanda tangan.

```solidity
    constructor(string memory _greeting) {
        greeting = _greeting;

        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes("Greeter")),
                keccak256(bytes("1")),
                block.chainid,
                address(this)
            )
        );
    }
```

Konstruktor membuat [pemisah domain](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator), mirip dengan kode antarmuka pengguna di atas. Eksekusi blockchain jauh lebih mahal, jadi kita hanya menghitungnya sekali.

```solidity
    struct GreetingRequest {
        string greeting;
    }
```

Ini adalah struktur yang ditandatangani. Di sini kita hanya memiliki satu bidang.

```solidity
    bytes32 private constant GREETING_TYPEHASH =
        keccak256("GreetingRequest(string greeting)");
```

Ini adalah [pengidentifikasi struktur](https://eips.ethereum.org/EIPS/eip-712#definition-of-hashstruct). Ini dihitung setiap kali di antarmuka pengguna.

```solidity
    function sponsoredSetGreeting(
        GreetingRequest calldata req,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
```

Fungsi ini menerima permintaan yang ditandatangani dan memperbarui sapaan.

```solidity
        // Compute EIP-712 digest // Hitung digest EIP-712
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        GREETING_TYPEHASH,
                        keccak256(bytes(req.greeting))
                    )
                )
            )
        );
```

Buat intisari sesuai dengan [EIP 712](https://eips.ethereum.org/EIPS/eip-712).

```solidity
        // Recover signer // Pulihkan penandatangan
        address signer = ecrecover(digest, v, r, s);
        require(signer != address(0), "Invalid signature");
```

Gunakan [`ecrecover`](https://www.evm.codes/precompiled?fork=osaka#0x01) untuk mendapatkan alamat penandatangan. Perhatikan bahwa tanda tangan yang buruk masih dapat menghasilkan alamat yang valid, hanya saja alamatnya acak.

```solidity
        // Apply greeting as if signer called it // Terapkan sapaan seolah-olah penandatangan yang memanggilnya
        greeting = req.greeting;
        emit SetGreeting(signer, req.greeting);
    }
```

Perbarui sapaan.

## Kerentanan {#vulnerabilities}

Ini _bukan_ kode tingkat produksi. Kode ini rentan terhadap serangan signifikan dan tidak memiliki fitur-fitur utama. Berikut adalah beberapa di antaranya, beserta cara menyelesaikannya.

Untuk melihat beberapa serangan ini, klik tombol di bawah judul _Attacks_ dan lihat apa yang terjadi. Untuk tombol **Invalid signature**, periksa konsol server untuk melihat respons transaksi.

### Penolakan layanan di server {#dos-on-server}

Serangan termudah adalah serangan [penolakan layanan (denial-of-service)](https://en.wikipedia.org/wiki/Denial-of-service_attack) di server. Server menerima permintaan dari mana saja di Internet dan berdasarkan permintaan tersebut mengirimkan transaksi. Sama sekali tidak ada yang mencegah penyerang mengeluarkan banyak tanda tangan, baik yang valid maupun tidak valid. Masing-masing akan menyebabkan transaksi. Pada akhirnya server akan kehabisan ETH untuk membayar gas.

Salah satu solusi untuk masalah ini adalah membatasi laju menjadi satu transaksi per blok. Jika tujuannya adalah untuk menampilkan sapaan ke [akun yang dimiliki secara eksternal](/developers/docs/accounts/#key-differences), tidak masalah apa sapaannya di tengah blok.

Solusi lain adalah melacak alamat dan hanya mengizinkan tanda tangan dari pelanggan yang valid.

### Tanda tangan sapaan yang salah {#wrong-greeting-sigs}

Saat Anda mengeklik **Signature for wrong greeting**, Anda mengirimkan tanda tangan yang valid untuk alamat tertentu (`0xaA92c5d426430D4769c9E878C1333BDe3d689b3e`) dan sapaan (`Hello`). Namun, ini mengirimkannya dengan sapaan yang berbeda. Hal ini membingungkan `ecrecover`, yang mengubah sapaan tetapi memiliki alamat yang salah.

Untuk menyelesaikan masalah ini, tambahkan alamat ke [struktur yang ditandatangani](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx#L122-L124). Dengan cara ini, alamat acak `ecrecover` tidak akan cocok dengan alamat di tanda tangan, dan kontrak pintar akan menolak pesan tersebut.

### Serangan pemutaran ulang {#replay-attack}

Saat Anda mengeklik **Replay attack**, Anda mengirimkan tanda tangan "Saya 0xaA92c5d426430D4769c9E878C1333BDe3d689b3e, dan saya ingin sapaannya menjadi `Hello`" yang sama, tetapi dengan sapaan yang benar. Akibatnya, kontrak pintar percaya bahwa alamat tersebut (yang bukan milik Anda) mengubah sapaan kembali menjadi `Hello`. Informasi untuk melakukan ini tersedia untuk umum di [informasi transaksi](https://eth-sepolia.blockscout.com/tx/0xa66afe4bbf886f59533e677a798c802ceab1ac0f9db6e83a4d4b59a45cf7c1b1).

Jika ini menjadi masalah, salah satu solusinya adalah menambahkan [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). Buat [pemetaan](https://docs.soliditylang.org/en/latest/types.html#mapping-types) antara alamat dan angka, dan tambahkan bidang nonce ke tanda tangan. Jika bidang nonce cocok dengan pemetaan untuk alamat tersebut, terima tanda tangan dan tingkatkan pemetaan untuk waktu berikutnya. Jika tidak, tolak transaksi.

Solusi lain adalah menambahkan stempel waktu ke data yang ditandatangani dan menerima tanda tangan sebagai valid hanya selama beberapa detik setelah stempel waktu tersebut. Ini lebih sederhana dan lebih murah, tetapi kita berisiko mengalami serangan pemutaran ulang dalam jendela waktu tersebut, dan kegagalan transaksi yang sah jika jendela waktu terlampaui.

## Fitur lain yang hilang {#other-missing-features}

Ada fitur tambahan yang akan kita tambahkan dalam pengaturan produksi.

### Akses dari server lain {#other-servers}

Saat ini, kita mengizinkan alamat mana pun untuk mengirimkan `sponsorSetGreeting`. Ini mungkin persis seperti yang kita inginkan, demi kepentingan desentralisasi. Atau mungkin kita ingin memastikan bahwa transaksi yang disponsori melalui server _kita_, dalam hal ini kita akan memeriksa `msg.sender` di kontrak pintar.

Bagaimanapun, ini harus menjadi keputusan desain yang sadar, bukan hanya hasil dari tidak memikirkan masalah tersebut.

### Penanganan kesalahan {#error-handling}

Seorang pengguna mengirimkan sapaan. Mungkin itu diperbarui di blok berikutnya. Mungkin juga tidak. Kesalahan tidak terlihat. Pada sistem produksi, pengguna harus dapat membedakan antara kasus-kasus ini:

- Sapaan baru belum dikirimkan
- Sapaan baru telah dikirimkan, dan sedang diproses
- Sapaan baru telah ditolak

## Kesimpulan {#conclusion}

Pada titik ini, Anda seharusnya dapat menciptakan pengalaman tanpa gas untuk pengguna dapp Anda, dengan mengorbankan sedikit sentralisasi.

Namun, ini hanya berfungsi dengan kontrak pintar yang mendukung ERC-712. Untuk mentransfer token ERC-20, misalnya, transaksi perlu ditandatangani oleh pemiliknya, bukan hanya pesan. Solusinya adalah [abstraksi akun (ERC-4337)](https://docs.erc4337.io/index.html). Saya berharap dapat menulis tutorial di masa mendatang tentang hal ini.

[Lihat di sini untuk karya saya yang lain](https://cryptodocguy.pro/).