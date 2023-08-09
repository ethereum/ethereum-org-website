---
title: Keamanan kontrak pintar
description: Pertimbangan keamanan untuk pengembang Ethereum
lang: id
---

Kontrak pintar Ethereum sangat fleksibel, mampu menampung sejumlah besar token (sering kali lebih dari $1 Miliar) dan menjalankan logika yang tak bisa diubah berdasarkan kode kontrak pintar yang digunakan sebelumnya. Sekalipun hal ini telah menciptakan ekosistem kontrak pintar yang saling berhubungan dan tidak memerlukan kepercayaan yang penuh energi dan kreatif, juga merupakan ekosistem yang sempurna untuk menarik penyerang yang mencari keuntungan dengan mengeksploitasi kerentanan dalam kontrak pintar dan perilaku tak terduga di Ethereum. Kode kontrak pintar _biasanya_ tidak bisa diubah untuk menambal kelemahan keamanan, aset yang telah dicuri dari kontrak pintar tidak bisa didapatkan kembali, dan aset yang dicuri sangat sulit untuk dilacak. Jumlah total nilai yang dicuri atau hilang karena masalah kontrak pintardengan mudah bernilai $1 Miliar. Beberapa nilai yang lebih besar karena kesalahan pengodean kontrak pintar meliputi:

- [Masalah partity multi-sig #1 - kehilangan $30 Juta](https://www.coindesk.com/30-million-ether-reported-stolen-parity-wallet-breach)
- [Masalah parity multi-sig #2 - $300 Juta terkunci](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether)
- [Peretasan TheDAO, 3,6 Juta ETH! Lebih dari $1 Miliar dalam harga ETH saat ini](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/)

## Prasyarat {#prerequisites}

Ini akan membahas keamanan kontrak pintar jadi pastikan Anda terbiasa dengan [kontrak pintar](/developers/docs/smart-contracts/) sebelum menangani tentang keamanan.

## Bagaimana menulis kode kontrak pintar yang lebih aman {#how-to-write-more-secure-smart-contract-code}

Sebelum meluncurkan kode apa pun ke Jaringan Utama, penting untuk mengambil langkah pencegahan yang memadai untuk melindungi segala sesuatu yang bernilai yang dipercayakan oleh kontrak pintar Anda. Dalam artikel ini, kita akan membahas tentang beberapa serangan spesifik, menyediakan sumber daya untuk mempelajari selengkapnya tentang jenis serangan, dan memberi Anda beberapa peralatan dasar dan praktik terbaik untuk memastikan kontrak Anda berfungsi dengan benar dan dengan aman.

## Audit bukan sebuah solusi ampuh {#audits-are-not-a-silver-bullet}

Beberapa tahun sebelumnya, peralatan untuk menulis, mengompilasi, menguji, dan menggunakan kontrak pintar sangat belum matang, mengakibatkan banyak proyek menulis kode Solidity dengan cara yang berantakan, menghalangi auditor yang akan melakukan investigasi kode guna memastikannya berfungsi dengan aman dan sesuai harapan. Pada tahun 2020, proses pengembangan dan peralatan yang mendukung penulisan Solidity jauh lebih baik; memanfaatkan praktik terbaik ini tidak hanya memastikan proyek Anda lebih mudah dikelola, tapi juga merupakan bagian vital dari keamanan proyek Anda. Sebuat proses audit pada akhir penulisan kontrak pintar Anda tidak lagi cukup sebagai satu-satunya pertimbangan keamanan yang bisa dibuat dalam proyek Anda. Keamanan dimulai sebelum Anda menulis baris pertama dari kode kontrak pintar Anda, **keamanan dimulai dengan desain dan proses pengembangan yang baik**.

## Proses pengembangan kontrak pintar {#smart-contract-development-process}

Paling sedikit:

- Semua kode disimpan dalam sistem kontrol versi, seperti git
- Semua modifikasi kode dibuat lewat Tarik Permintaan
- Semua Tarik Permintaan harus memiliki setidaknya satu pengulas. _Jika proyek Anda bersifat tunggal, pertimbangkanlah untuk mencari penulis tunggal lainnya dan saling bertukar ulasan!_
- Satu perintah mengompilasikan, menggunakan, dan menjalankan serangkaian pengujian terhadap kode Anda menggunakan lingkungan Ethereum pengembangan (Lihat: Truffle)
- Anda harus menjalankan kode Anda melalui peralatan analisis kode dasar seperti Mythril dan Slither, secara ideal sebelum tiap tarik permintaan digabungkan, yang membandingkan perbedaan output
- Solidity tidak menampilkan peringatan pengompilasi APA PUN
- Kode Anda terdokumentasi dengan baik

Masih ada banyak hal yang harus dibahas terkait proses pengembangan, tapi item-item ini adalah tempat yang bagus untuk memulai. Untuk item dan penjelasan mendetail selengkapnya, lihat [daftar periksa kualitas proses yang disediakan oleh DeFiSafety](https://docs.defisafety.com/review-process-documentation/process-quality-audit-process). [DefiSafety](https://defisafety.com/) adalah layanan publik tidak resmi yang menerbitkan ulasan atas berbagai dApp Ethereum publik yang besar. Bagian dari sistem rating DeFiSafety meliputi seberapa baik proyek mematuhi daftar periksa kualitas proses ini. Dengan mengikuti proses ini:

- Anda akan menghasilkan kode yang lebih aman, melalui pengujian otomatis yang dapat dibuat kembali
- Auditor akan dapat mengulas proyek Anda dengan lebih efektif
- Orientasi yang lebih mudah bagi pengembang baru
- Memungkinkan pengembang untuk dengan cepat mengulangi, menguji, dan mendapat masukan tentang modifikasi
- Proyek Anda lebih jarang mengalami regresi

## Serangan dan kerentanan {#attacks-and-vulnerabilities}

Karena sekarang Anda akan menulis kode Solidity menggunakan proses pengembangan yang efisien, mari lihat beberapa kerentanan umum Solidity untuk mengetahui apa yang salah.

### Re-entrancy {#re-entrancy}

Re-entrancy adalah salah satu dari masalah keamanan yang paling besar dan paling penting untuk dipertimbangkan saat mengembangkan Kontrak Pintar. Meskipun EVM tidak bisa menjalankan beberapa kontrak pada saat bersamaan, sebuah kontrak yang memanggil kontrak lainnya membuat jeda pada eksekusi pemanggilan kontrak dan state memori sampai pemanggilan kembali, di mana dalam proses ini, eksekusi berjalan secara normal. Menjeda dan memulai kembali ini bisa menciptakan kerentanan yang dikenal sebagai "re-entrancy".

Ini adalah versi sederhana dari sebuah kontrak yang rentan terhadap re-entrancy:

```solidity
// KONTRAK INI SENGAJA DIBUAT MEMILIKI KERENTANAN, JANGAN DISALIN
contract Victim {
    mapping (address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
        balances[msg.sender] = 0;
    }
}
```

Untuk memungkinkan seorang pengguna menarik ETH yang telah disimpan sebelumnya pada kontrak, fungsi ini

1. Membaca jumlah saldo yang dimiliki pengguna
2. Mengirimkan kepada pengguna jumlah saldo dalam ETH
3. Mengatur ulang saldo pengguna ke 0, sehingga mereka tidak bisa menarik saldo mereka lagi.

Jika dipanggil dari akun reguler (seperti akun MetaMask milik Anda), ini berfungsi sebagaimana mestinya: msg.sender.call.value(), mengirimkan ETH ke akun Anda. Akan tetapi, kontrak pintar juga bisa membuat pemanggilan. Jika kontrak kustom yang jahat adalah kontrak yang memanggil `withdraw()`, msg.sender.call.value() tidak hanya akan mengirim `amount` ETH, tetapi secara implisit juga akan memanggil kontrak untuk memulai eksekusi kode. Bayangkan kontrak jahat ini:

```solidity
contract Attacker {
    function beginAttack() external payable {
        Victim(VICTIM_ADDRESS).deposit.value(1 ether)();
        Victim(VICTIM_ADDRESS).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(VICTIM_ADDRESS).withdraw();
        }
    }
}
```

Memanggil Attacker.beginAttack() akan memulai satu siklus yang terlihat seperti ini:

```
0.) Attacker's EOA calls Attacker.beginAttack() with 1 ETH
0.) Attacker.beginAttack() deposits 1 ETH into Victim

  1.) Attacker -> Victim.withdraw()
  1.) Victim reads balances[msg.sender]
  1.) Victim sends ETH to Attacker (which executes default function)
    2.) Attacker -> Victim.withdraw()
    2.) Victim reads balances[msg.sender]
    2.) Victim sends ETH to Attacker (which executes default function)
      3.) Attacker -> Victim.withdraw()
      3.) Victim reads balances[msg.sender]
      3.) Victim sends ETH to Attacker (which executes default function)
        4.) Attacker no longer has enough gas, returns without calling again
      3.) balances[msg.sender] = 0;
    2.) balances[msg.sender] = 0; (it was already 0)
  1.) balances[msg.sender] = 0; (it was already 0)
```

Memanggil Attacker.beginAttack dengan 1 ETH akan menyerang Korban secara re-entrancy, yang menarik lebih banyak ETH dari yang disediakan (diambil dari saldo pengguna lain, menyebabkan kontrak Korban menjadi di bawah penjaminan)

### Bagaimana mengatasi re-entrancy (cara yang salah) {#how-to-deal-with-re-entrancy-the-wrong-way}

Seseorang mungkin menganggap mengalahkan re-entrancy cukup dengan mencegah kontrak pintar apa pun berinteraksi dengan kode Anda. Anda mencari tumpukan yang meluap, Anda menemukan potongan kode ini dengan banyak suara positif:

```solidity
function isContract(address addr) internal returns (bool) {
  uint size;
  assembly { size := extcodesize(addr) }
  return size > 0;
}
```

Tampak masuk akal: kontrak memiliki kode, jika pemanggil memiliki kode apa pun, jangan membiarkannya melakukan deposito. Mari tambahkan ini:

```solidity
// KONTRAK INI SENGAJA DIBUAT MEMILIKI KERENTANAN, JANGAN DISALIN
contract ContractCheckVictim {
    mapping (address => uint256) public balances;

    function isContract(address addr) internal returns (bool) {
        uint size;
        assembly { size := extcodesize(addr) }
        return size > 0;
    }

    function deposit() external payable {
        require(!isContract(msg.sender)); // <- NEW LINE
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
        balances[msg.sender] = 0;
    }
}
```

Sekarang, untuk mendepositokan ETH, Anda tidak boleh memiliki kode kontrak pintar di alamat Anda. Akan tetapi, ini bisa dengan mudah dikalahkan dengan kontrak Penyerang berikut ini:

```solidity
contract ContractCheckAttacker {
    constructor() public payable {
        ContractCheckVictim(VICTIM_ADDRESS).deposit(1 ether); // <- New line
    }

    function beginAttack() external payable {
        ContractCheckVictim(VICTIM_ADDRESS).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(VICTIM_ADDRESS).withdraw();
        }
   }
}
```

Sementara serangan pertama adalah serangan pada logika kontrak, ini adalah serangan pada perilaku penggunaan kontrak Ethereum. Dalam pembuatannya, kontrak belum mengembalikan kodenya untuk digunakan pada alamatnya, tapi mempertahankan kontrol penuh EVM SELAMA proses ini.

Secara teknis, hal ini dimungkinkan untuk mencegah kontrak pintar memanggil kode Anda, menggunakan baris ini:

```solidity
require(tx.origin == msg.sender)
```

Namun, ini tetap bukanlah solusi yang bagus. Satu dari aspek paling menyenangkan dari Ethereum adalah komposabilitasnya, kontrak pintar saling terintegrasi dan membangun satu sama lain. Dengan menggunakan baris di atas, Anda sedang membatasi daya guna proyek Anda.

### Bagaimana mengatasi re-entrancy (cara yang benar) {#how-to-deal-with-re-entrancy-the-right-way}

Hanya dengan mengalihkan urutan pembaruan penyimpanan dan pemanggilan eksternal, kita mencegah kondisi re-entrancy yang memungkinkan penyerangan. Memanggil kembali penarikan, sekalipun dimungkinkan, tidak akan menguntungkan penyerang, karena penyimpanan `saldo` telah diatur ke 0.

```solidity
contract NoLongerAVictim {
    function withdraw() external {
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        (bool success, ) = msg.sender.pemanggilan.value(amount)("");
        require(success);
    }
}
```

Kode di atas mengikuti pola desain "Pemeriksaan-Efek-Interaksi", yang membantu perlindungan terhadap re-entrancy. Anda bisa [membaca selengkapnya tentang Pemeriksaan-Efek-Interaksi di sini](https://fravoll.github.io/solidity-patterns/checks_effects_interactions.html)

### Bagaimana mengatasi re-entrancy (opsi inti) {#how-to-deal-with-re-entrancy-the-nuclear-option}

Setiap kali Anda mengirim ETH ke alamat tak terpercaya atau berinteraksi dengan kontrak yang tidak dikenal (seperti pemanggilan `transfer()` dari alamat token yang disediakan pengguna), Anda membuka diri untuk kemungkinan serangan re-entrancy. **Dengan mendesain kontrak yang tidak mengirim ETH maupun memanggil kontrak tak terpercaya, Anda mencegah kemungkinan serangan re-entrancy!**

## Jenis serangan lainnya {#more-attack-types}

Jenis serangan di atas mencakup masalah pengodean kontrak pintar (re-entrancy) dan keanehan pada Ethereum (menjalankan kode di dalam pembangun kontrak, sebelum kode tersedia di alamat kontrak). Masih banyak jenis serangan yang perlu diwaspadai, seperti:

- Front-running
- Penolakan pengiriman ETH
- Overflow/underflow integer

Bacaan lebih lanjut:

- [Serangan yang Diketahui pada Kontrak Pintar Consensys](https://consensys.github.io/smart-contract-best-practices/attacks/) - Penjelasan yang sangat mudah dibaca tentang kerentanan paling signifikan, disertai contoh kode untuk sebagian besar kerentanan.
- [Daftar SWC](https://swcregistry.io/docs/SWC-128) - Daftar terkurasi CWE yang berlaku untuk Ethereum dan kontrak pintar

## Perangkat keamanan {#security-tools}

Sekalipun memahami dasar-dasar keamanan Ethereum dan melibatkan jasa firma pengauditan profesional untuk mengulas kode Anda tak tergantikan, ada banyak peralatan yang tersedia untuk menolong menyoroti potensi masalah dalam kode Anda.

### Keamanan kontrak pintar {#smart-contract-security}

**Slither -** **_Kerangka kerja analisis statis untuk Solidity yang ditulis dalam Python 3._**

- [GitHub](https://github.com/crytic/slither)

**MythX -** **_API analis keamanan untuk kontrak pintar Ethereum._**

- [mythx.io](https://mythx.io/)
- [Dokumentasi](https://docs.mythx.io/)

**Mythril -** **_Peralatan analis keamanan untuk kode bita EVM._**

- [mythril](https://github.com/ConsenSys/mythril)
- [Dokumentasi](https://mythril-classic.readthedocs.io/en/master/about.html)

**Manticore -** **_Antarmuka baris perintah yang menggunakan sebuah perangkat eksekusi simbolis pada kontrak pintar dan biner._**

- [GitHub](https://github.com/trailofbits/manticore)
- [Dokumentasi](https://github.com/trailofbits/manticore/wiki)

**Securify -** **_Pemindai keamanan untuk kontrak pintar Ethereum._**

- [securify.chainsecurity.com](https://securify.chainsecurity.com/)
- [Discord](https://discordapp.com/invite/nN77ckb)

**ERC20 Verifier -** **_Peralatan verifikasi untuk memeriksa apakah sebuah kontrak memenuhi standar ERC20._**

- [erc20-verifier.openzeppelin.com](https://erc20-verifier.openzeppelin.com)
- [Forum](https://forum.openzeppelin.com/t/online-erc20-contract-verifier/1575)

### Verifikasi Formal {#formal-verification}

**Informasi mengenai Verifikasi Formal**

- [Bagaimana cara kerja verifikasi formal pada kontrak pintar](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/) _20 Juli 2018 - Brian Marick_
- [Bagaimana Verifikasi Formal Dapat Memastikan Kontrak Pintar Sempurna](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1) _29 Januari 2018 - Bernard Mueller_

### Menggunakan peralatan {#using-tools}

Dua dari peralatan paling populer untuk analisis keamanan kontrak pintar adalah:

- [Slither](https://github.com/crytic/slither) oleh [Trail of Bits](https://www.trailofbits.com/) (versi yang telah dihost: [Crytic](https://crytic.io/))
- [Mythril](https://github.com/ConsenSys/mythril) oleh [ConsenSys](https://consensys.net/) (versi yang telah dihost: [MythX](https://mythx.io/))

Keduanya adalah peralatan berguna yang menganalisa kode Anda dan melaporkan masalah. Masing-masing mempunyai versi yang telah dihost [commercial], tapi juga tersedia secara gratis untuk dijalankan secara lokal. Berikuti ini adalah contoh singkat bagaimana menjalankan Slither, yang tersedia dalam gambar Docker yang mudah dipahami `trailofbits/eth-security-toolbox`. Anda akan perlu [menginstal Docker jika Anda belum melakukannya](https://docs.docker.com/get-docker/).

```bash
$ mkdir test-slither
$ curl https://gist.githubusercontent.com/epheph/460e6ff4f02c4ac582794a41e1f103bf/raw/9e761af793d4414c39370f063a46a3f71686b579/gistfile1.txt > bad-contract.sol
$ docker run -v `pwd`:/share  -it --rm trailofbits/eth-security-toolbox
docker$ cd /share
docker$ solc-select 0.5.11
docker$ slither bad-contract.sol
```

Akan menghasilkan output ini:

```bash
ethsec@1435b241ca60:/share$ slither bad-contract.sol
INFO:Detectors:
Reentrancy in Victim.withdraw() (bad-contract.sol#11-16):
    External calls:
    - (success) = msg.sender.call.value(amount)() (bad-contract.sol#13)
    State variables written after the call(s):
    - balances[msg.sender] = 0 (bad-contract.sol#15)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities
INFO:Detectors:
Low level call in Victim.withdraw() (bad-contract.sol#11-16):
    - (success) = msg.sender.call.value(amount)() (bad-contract.sol#13)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#low-level-calls
INFO:Slither:bad-contract.sol analyzed (1 contracts with 46 detectors), 2 result(s) found
INFO:Slither:Use https://crytic.io/ to get access to additional detectors and GitHub integration
```

Slither telah mengidentifikasi potensi re-entrancy di sini, mengidentifikasi baris kunci di mana masalah mungkin muncul, dan memberi kita sebuah tautan untuk informasi lebih detail tentang masalahnya:

> Referensi: https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities

memungkinkan Anda dengan cepat belajar tentang potensi masalah dalam kode Anda. Seperti semua peralatan pengujian otomatis, Slither tidak sempurna, dan terlalu sering membuat kesalahan pada aspek pelaporan. Slither bisa memperingatkan potensi re-entrancy, bahkan ketika tidak ada kerentanan yang bisa diekspoloitasi. Sering kali, meninjau ulang PERBEDAAN dalam output Slither di antara perubahan kode sangat memberi kelejasan, membantu menemukan kerentanan yang ditimbulkan sebelumnya daripada menunggu sampai kode proyek Anda selesai.

## Bacaan lebih lanjut {#further-reading}

**Panduan praktik terbaik untuk keamanan kontrak pintar**

- [consensys.github.io/smart-contract-best-practices/](https://consensys.github.io/smart-contract-best-practices/)
- [GitHub](https://github.com/ConsenSys/smart-contract-best-practices/)
- [Daftar rekomendasi keamanan dan praktik terbaik](https://github.com/guylando/KnowledgeLists/blob/master/EthereumSmartContracts.md)

**Standar verifikasi keamanan kontrak pintar (SCSVS)**

- [securing.github.io/SCSVS/](https://securing.github.io/SCSVS/)

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Tutorial terkait {#related-tutorials}

- [Alur kerja pengembangan yang aman](/developers/tutorials/secure-development-workflow/)
- [Cara menggunakan Slither untuk menemukan bug kontrak pintar](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Cara menggunakan Manticore untuk menemukan bug kontrak pintar](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Pedoman kemananan](/developers/tutorials/smart-contract-security-guidelines/)
- [Kemananan token](/developers/tutorials/token-integration-checklist/)
