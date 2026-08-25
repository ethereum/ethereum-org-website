---
title: Tambahkan penandatanganan yang jelas ke protokol Anda dengan ERC-7730
description: Pelajari cara menulis deskriptor ERC-7730 agar interaksi kontrak pintar Anda menampilkan detail yang dapat dibaca manusia di dompet sebelum pengguna menandatangani.
author: Hester Bruikman
lang: id
tags: ["ERC-7730", "keamanan", "penandatanganan", "kontrak pintar", "dompet"]
skill: intermediate
breadcrumb: Penandatanganan yang jelas
published: 2026-05-11
---

Sebagian besar eksploitasi besar Ethereum memiliki langkah akhir yang sama: pengguna menyetujui transaksi yang tidak dapat mereka pahami secara bermakna. Dompet perangkat keras menampilkan data panggilan (calldata) hex mentah, dan lebih buruk lagi memaksa Anda untuk mengaktifkan penandatanganan buta (blind signing). Dompet perangkat lunak menampilkan bidang yang didekodekan, tetapi hanya ketika mereka mengenali kontrak tersebut. Ketika tidak, entah karena protokolnya baru, aplikasinya disusupi, atau perangkatnya sedang luring, pengguna menandatangani secara buta.

[ERC-7730](https://eips.ethereum.org/EIPS/eip-7730) mendefinisikan format JSON standar untuk mendeskripsikan apa *arti* dari panggilan fungsi kontrak Anda. 

Dompet yang mendukung ERC-7730 membaca deskriptor Anda dan menampilkan:

> **Tukar**  
> Kirim: 1.000 USDC  
> Terima minimum: 0,42 WETH  
> Protokol: Uniswap V3

Atau satu kalimat terstruktur yang dapat dibaca oleh manusia maupun agen:

> Tukar 1.000 USDC dengan setidaknya 0,42 WETH

Alih-alih pemilih fungsi dan daftar nilai bilangan bulat mentah.

Ini adalah [penandatanganan yang jelas](https://clearsigning.org/) — "Apa Yang Anda Lihat Adalah Apa Yang Anda Tandatangani." Tutorial ini memandu Anda dalam menulis deskriptor untuk kontrak Anda sendiri, memvalidasinya dengan alat CLI resmi, dan mengirimkannya ke registri terbuka.

## Prasyarat {#prerequisites}

- Keakraban dengan Solidity dan ABI kontrak pintar
- Kontrak pintar yang telah disebarkan dengan ABI yang terverifikasi (verifikasi [Sourcify](https://sourcify.dev) diwajibkan sebelum deskriptor diterima di registri) 
- Python 3.12+ untuk CLI validasi 
- Pengetahuan dasar JSON

## Apa itu deskriptor ERC-7730? {#what-is-an-erc-7730-descriptor}

Deskriptor adalah satu file JSON dengan tiga bagian:

| Bagian | Tujuan |
| :---- | :---- |
| `context` | Mengikat deskriptor ke penyebaran kontrak tertentu berdasarkan ID rantai dan alamat |
| `metadata` | Menamai proyek dan mendefinisikan konstanta yang dapat digunakan kembali |
| `display` | Memetakan setiap tanda tangan fungsi ke label yang dapat dibaca manusia dan format bidang |

Karena deskriptor terpisah dari kontrak itu sendiri, Anda dapat menambahkan dukungan penandatanganan yang jelas ke protokol apa pun yang ada tanpa penyebaran ulang. Dompet mengambil deskriptor dari registri dan menggunakannya pada saat penandatanganan.

## Langkah 1: Buat kerangka file {#step-1-create-the-file-skeleton}

Buat file bernama `calldata-<contractname>-<descriptorversion>.json`. Awalan `calldata-` memberi tahu registri bahwa deskriptor ini mencakup panggilan fungsi kontrak, berbeda dengan `eip712-` untuk pesan data yang diketik (typed-data). `descriptorversion` memberi tahu registri versi file deskriptor, 0 secara default jika tidak ada versi yang diberikan.


```json
{
  "$schema": "https://eips.ethereum.org/assets/eip-7730/erc7730-v2.schema.json",
  "context": {},
  "metadata": {},
  "display": {
    "formats": {}
  }
}
```

## Langkah 2: Tulis bagian konteks {#step-2-write-the-context-section}

Bagian `context` mengikat deskriptor ke satu atau lebih penyebaran kontrak. Dompet menggunakan ini untuk mencocokkan transaksi yang masuk dengan deskriptor yang benar.

```json
"context": {
  "$id": "uniswap-v3-router-mainnet",
  "contract": {
    "deployments": [
      { "chainId": 1, "address": "0xYourContractAddressOnMainnet" },
      { "chainId": 137, "address": "0xYourContractAddressOnPolygon" }
    ]
  }
}
```

### Bidang konteks {#context-fields}

- `context.$id` — Pengidentifikasi unik untuk dokumen deskriptor atau konfigurasi penyebaran ini.
- `contract.deployments` — Kumpulan penyebaran yang berlaku untuk deskriptor ini.
- `deployments[].chainId` — ID rantai EVM untuk penyebaran. Sertakan setiap rantai tempat kontrak Anda disebarkan.
- `deployments[].address` — Alamat kontrak yang harus dikaitkan oleh dompet dengan deskriptor ini. Gunakan alamat implementasi yang menyimpan logika eksekusi.

## Langkah 3: Tulis bagian metadata {#step-3-write-the-metadata-section}

Bagian metadata menyediakan informasi yang dapat dibaca manusia tentang proyek dan kontrak yang dijelaskan oleh file ini. Dompet dapat menggunakan informasi ini untuk menampilkan nama protokol, tautan, dan detail kontekstual lainnya selama penandatanganan.

```json
"metadata": {
  "owner": "Example Swap Protocol",
  "info": { "url": "https://example.xyz" },
  "contractName": "SwapRouter"
}
```

### Bidang metadata {#metadata-fields}

- `owner` — Proyek, protokol, organisasi, atau pengelola yang bertanggung jawab atas deskriptor ini.
- `info.url` — URL proyek atau dokumentasi kanonis yang dapat ditampilkan dompet kepada pengguna untuk konteks tambahan.
- `contractName` — Nama kontrak atau implementasi yang dijelaskan oleh file ini, biasanya cocok dengan kode sumber atau ABI yang terverifikasi.

Jika file ERC-7730 Anda mendeskripsikan kontrak ERC-20, Anda juga harus menambahkan objek token. 

## Langkah 4: Tulis bagian format tampilan {#step-4-write-the-displayformats-section}

Objek `display.formats` memetakan tanda tangan fungsi ke instruksi penandatanganan yang dapat dibaca manusia. Ini adalah cara dompet menampilkan fungsi Anda kepada pengguna sebelum mereka menyetujui transaksi!

Setiap kunci adalah fragmen ABI yang dapat dibaca manusia — tanda tangan fungsi termasuk nama parameter dan tipe parameter persis seperti yang muncul di ABI Anda.


### Contoh: Mendeskripsikan tukar token {#eg-describing-token-swap}

```json
"display": {
  "formats": {
    "swapExactTokensForTokens(uint256 amountIn,uint256 amountOutMin,address[] path,address to,uint256 deadline)": {
      "intent": "Swap",
      "interpolatedIntent": "Swap {amountIn} for at least {amountOutMin}",
      "fields": [
        {
          "path": "#.amountIn",
          "label": "Send",
          "format": "tokenAmount",
          "params": {
            "tokenPath": "#.path[0]"
          }
        },
        {
          "path": "#.amountOutMin",
          "label": "Receive minimum",
          "format": "tokenAmount",
          "params": {
            "tokenPath": "#.path[1]"
          }
        },
        {
          "path": "#.to",
          "label": "Recipient",
          "format": "addressName",
          "params": {
            "types": ["eoa", "contract"],
            "sources": ["local", "ens"]
          }
        },
        {
          "path": "#.deadline",
          "label": "Expires",
          "format": "date",
          "params": {
            "encoding": "timestamp"
          }
        }
      ]
    }
  }
}

```

### Bidang tampilan {#display-fields}

- **`intent`** — **(Wajib)** Deskripsi tindakan yang singkat dan ramah pengguna, seperti "Tukar".
- **`interpolatedIntent`** — **(Disarankan)** Templat kalimat yang lebih kaya yang menyematkan nilai bidang yang diformat, seperti `"Swap {amountIn} for at least {amountOutMin}"`. Sertakan ini bersama `intent` untuk memberikan deskriptor yang lebih ramah pengguna yang dapat dipilih dompet untuk ditampilkan dengan mempertimbangkan batasan tampilan apa pun.
- **`fields`** — **(Wajib)** Daftar berurutan dari bidang transaksi yang harus ditampilkan dompet kepada pengguna.
  - **`path`** — **(Wajib)** Referensi ke data transaksi. `#.fieldName` menunjuk ke parameter data panggilan yang didekodekan berdasarkan nama di ABI. `@.value` merujuk pada nilai ETH yang dikirim bersama transaksi.
  - **`label`** — **(Wajib)** Label yang dapat dibaca manusia yang ditampilkan di samping nilai.
  - **`format`** — **(Disarankan)** Mengontrol bagaimana nilai harus dirender. Format umum meliputi:
    - `tokenAmount`
    - `addressName`
    - `date`

    Gunakan `raw` ketika tidak ada pemformatan tambahan yang diperlukan. Beberapa format menerima konfigurasi **`params`** tambahan. Misalnya:

    - `tokenAmount` dapat menggunakan `tokenPath` untuk mengidentifikasi alamat token mana yang menyediakan desimal dan metadata ticker.
    - `date` dapat menggunakan `encoding` untuk mendeskripsikan bagaimana stempel waktu dienkode.

    Jika format yang dipilih tidak memerlukan informasi tambahan, abaikan `params`.

## Deskriptor lengkap {#the-complete-descriptor}

```json
{
  "$schema": "https://eips.ethereum.org/assets/eip-7730/erc7730-v2.schema.json",
  "context": {
    "$id": "uniswap-v3-router-mainnet",
    "contract": {
      "deployments": [
        {
          "chainId": 1,
          "address": "0xYourContractAddressOnMainnet"
        },
        {
          "chainId": 137,
          "address": "0xYourContractAddressOnPolygon"
        }
      ]
    }
  },
  "metadata": {
    "owner": "Example Swap Protocol",
    "info": {
      "url": "https://example.xyz"
    },
    "contractName": "SwapRouter"
  },
  "display": {
    "formats": {
      "swapExactTokensForTokens(uint256 amountIn,uint256 amountOutMin,address[] path,address to,uint256 deadline)": {
        "intent": "Swap",
        "interpolatedIntent": "Swap {amountIn} for at least {amountOutMin}",
        "fields": [
          {
            "path": "#.amountIn",
            "label": "Send",
            "format": "tokenAmount",
            "params": {
              "tokenPath": "#.path[0]"
            }
          },
          {
            "path": "#.amountOutMin",
            "label": "Receive minimum",
            "format": "tokenAmount",
            "params": {
              "tokenPath": "#.path[1]"
            }
          },
          {
            "path": "#.to",
            "label": "Recipient",
            "format": "addressName",
            "params": {
              "types": ["eoa", "contract"],
              "sources": ["local", "ens"]
            }
          },
          {
            "path": "#.deadline",
            "label": "Expires",
            "format": "date",
            "params": {
              "encoding": "timestamp"
            }
          }
        ]
      }
    }
  }
}
```

## Langkah 5: Kirim ke registri {#step-5-submit-to-the-registry}

[Registri ERC-7730](https://github.com/ethereum/clear-signing-erc7730-registry) adalah repositori terbuka yang di-host oleh [Yayasan Ethereum](/foundation/) sebagai pengelola netral. Siapa pun bebas untuk mengkloning dan meng-host-nya sendiri — dompet secara independen memutuskan instans registri mana yang mereka percayai.

1. Lakukan percabangan (fork) repositori di GitHub  
2. Buat folder di `registry/<your-project-name>/`  
3. Tempatkan file Anda di dalamnya: `registry/myproject/calldata-mycontract-0_0.json`  
4. Perbarui bidang `$schema` ke jalur relatif yang digunakan di dalam repo: `"../../specs/erc7730-v2.schema.json"`  
5. Buka permintaan tarik (pull request)

Saat Anda membuka PR, CI secara otomatis menjalankan validasi skema, memeriksa bahwa tanda tangan fungsi menghasilkan pemilih yang valid, mengonfirmasi alamat kontrak diverifikasi di Sourcify, dan menandai ketidakkonsistenan ABI. Hasil pemeriksaan muncul sebaris pada PR. Pengelola registri menyaring kiriman untuk deskriptor yang cacat atau berpotensi berbahaya. Penyertaan dalam registri tidak menyiratkan audit atau dukungan.

<Alert variant="info">
<AlertContent>
<AlertDescription>
**Catatan:** Kontrak Anda harus diverifikasi di <a href="https://repo.sourcify.dev">Sourcify</a> sebelum PR Anda dapat diterima. Jika belum diverifikasi, <a href="https://verify.sourcify.dev/">kirimkan verifikasi</a> terlebih dahulu.
</AlertDescription>
</AlertContent>
</Alert>

## Apa yang terjadi setelah penggabungan? {#what-happens-after-merging}

Semua deskriptor di registri terbuka untuk auditor. Setelah PR Anda digabungkan, auditor mana pun dapat meninjau deskriptor Anda dan menerbitkan atestasi kriptografi (di bawah [ERC-8176](https://github.com/ethereum/ERCs/pull/1576)) yang mengonfirmasi keakuratannya. 

Sinyal atestasi ini memungkinkan dompet menerapkan kebijakan kepercayaan mereka sendiri — deskriptor dengan beberapa atestasi independen memiliki bobot lebih daripada yang tidak memilikinya. Anda dapat menjangkau komunitas auditor melalui [clearsigning.org](https://clearsigning.org).

Dompet memilih registri mana yang akan mereka dukung. Setelah deskriptor Anda berada di registri, dompet yang mendukung ERC-7730 akan mulai mengambilnya jika ada di registri mereka dan akan menampilkan data yang dapat dibaca manusia ketika pengguna berinteraksi dengan kontrak Anda.

## Bacaan lebih lanjut {#further-reading}

- [Spesifikasi ERC-7730](https://eips.ethereum.org/EIPS/eip-7730)  
- [Registri ERC-7730](https://github.com/ethereum/clear-signing-erc7730-registry)  
- [clearsigning.org](https://clearsigning.org) — perkakas, status ekosistem, dan tata kelola  
- [Verifikasi kontrak Sourcify](https://sourcify.dev)  
- [Inisiatif Keamanan Triliunan Dolar (Trillion Dollar Security)](https://trilliondollarsecurity.org)