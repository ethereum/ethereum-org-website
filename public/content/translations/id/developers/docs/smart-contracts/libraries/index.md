---
title: Pustaka kontrak pintar
description:
lang: id
---

Anda tidak perlu menulis setiap kontrak pintar dalam proyek Anda dari nol. Ada banyak pustaka kontrak pintar sumber terbuka tersedia yang menyediakan blok pembangun yang dapat digunakan kembali untuk proyek Anda yang bisa menghindarkan Anda dari keharusan untuk membuat ulang rodanya.

## Prasyarat {#prerequisites}

Sebelum masuk ke dalam pustaka kontrak pintar, adalah ide bagus untuk memiliki pemahaman yang baik tentang struktur dari sebuah kontrak pintar. Lihat pada bagian [anatomi kontrak pintar](/developers/docs/smart-contracts/anatomy/) jika Anda belum melakukannya.

## Apa yang ada dalam pustaka {#whats-in-a-library}

Anda biasanya bisa menemukan dua jenis blok pembangun dalam pustaka kontrak pintar: perilaku yang dapat digunakan kembali yang bisa Anda tambahkan pada kontrak Anda, dan implementasi dari berbagai standar.

### Perilaku {#behaviors}

Ketika menulis kontrak pintar, ada kemungkinan Anda akan menemukan bahwa Anda menulis pola yang sama berulang kali, seperti menetapkan alamat _admin_ untuk melakukan operasi yang dilindungi dalam satu kontrak, atau menambahkan tombol _jeda_ darurat jika terjadi masalah tak terduga.

Pustaka kontrak pintar biasanya menyediakan implementasi yang dapat digunakan kembali dari perilaku ini sebagai [pustaka](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries) atau lewat [warisan](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance) dalam Solidity.

Sebagai contoh, berikut ini adalah versi sederhana dari kontrak [`Yang dapat Dimiliki`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol) dari [pustaka Kontrak OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts), yang mendesain alamat sebagai pemilik kontrak, dan menyediakan pengubah untuk membatasi akses pada metode yang hanya terkait dengan pemilik tersebut.

```solidity
contract Ownable {
    address public owner;

    constructor() internal {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }
}
```

Untuk menggunakan blok pembangun seperti ini dalam kontrak, Anda perlu mengimpornya terlebih dahulu, dan kemudian memperpanjangnya dari kontrak milik Anda. Ini akan memungkinkan Anda menggunakan pengubah yang disediakan oleh basis kontrak `Yang dapat dimiliki` untuk mengamankan fungsi Anda.

```solidity
import ".../Ownable.sol"; // Jalan ke pustaka yang diimpor

contract MyContract is Ownable {
    // Fungsi berikut ini hanya bisa dipanggil oleh pemilik
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

Contoh populer lainnya adalah [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) atau [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html). Ini adalah pustaka (jika dibandingkan dengan kontrak dasar) yang menyediakan fungsi aritmatika dengan pemeriksaan overflow, yang tidak disediakan oleh bahasa pemrograman. Adalah langkah yang baik untuk menggunakan salah satu dari kedua pustaka ini ketimbang operasi aritmatika asli untuk mengamankan kontrak Anda terhadap overflow, yang bisa membawa akibat fatal!

### Standar {#standards}

Untuk mendukung [komposabilitas dan interoperabilitas](/developers/docs/smart-contracts/composability/), komunitas Ethereum telah menetapkan beberapa standar dalam bentuk **ERC**. Anda bisa membaca selengkapnya tentang hal itu di bab [standar](/developers/docs/standards/).

Ketika memasukkan ERC sebagai bagian dari kontrak Anda, adalah ide bagus untuk mencari implementasi standar ketimbang mencoba membuatnya sendiri. Banyak pustaka kontrak pintar mencakup implementasi untuk ERC paling populer. Contohnya, [standar token yang dapat dipertukarkan ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) yang ada di mana-mana dapat ditemukan di [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md), [DappSys](https://github.com/dapphub/ds-token/) dan [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc20). Sebagai tambahan, beberapa ERC juga menyediakan implementasi kanonis sebagai bagian dari ERC sendiri.

Penting untuk menyebutkan bahwa beberapa ERC tidak bisa berdiri sendiri, tapi sebagai pelengkap bagi ERC lain. Contohnya, [ERC2612](https://eips.ethereum.org/EIPS/eip-2612) menambahkan ekstensi ke ERC20 untuk meningkatkan kegunaannya.

## Bagaimana menambahkan pustaka {#how-to}

Selalu merujuk pada dokumentasi pustaka yang Anda masukkan untuk instruksi spesifik tentang cara memasukkannya ke dalam proyek Anda. Beberapa library kontrak Solidity dikemas menggunakan `npm`, jadi cukup `npm install`. Sebagian besar alat untuk [mengompilasi](/developers/docs/smart-contracts/compiling/) kontrak akan melihat `node_modules` Anda untuk pustaka kontrak pintar, sehingga Anda dapat melakukan hal berikut:

```solidity
// Ini akan memuat  pustaka @openzeppelin/contracts dari node_modules Anda
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

Terlepas dari metode yang Anda gunakan, ketika memasukkan pustaka, selalu pastikan versi [bahasanya](/developers/docs/smart-contracts/languages/). Sebagai contoh, Anda tidak bisa menggunakan pustaka untuk Solidity 0.6 jika Anda menulis kontrak dalam Solidity 0.5.

## Kapan menggunakannya {#when-to-use}

Menggunakan pustaka kontrak pintar dalam proyek Anda memiliki beberapa manfaat. Pertama dan terutama, menghemat waktu Anda dengan menyediakan blok pembangun yang siap dipakai yang bisa dimasukkan ke dalam sistem Anda, daripada harus membuat kodenya sendiri.

Keamanan juga adalah satu kelebihan utamanya. Pustaka kontrak pintar sumber terbuka juga sering diperiksa secara ketat. Karena banyak proyek bergantung padanya, ada insentif kuat dari komunitas untuk tetap memeriksanya secara konstan. Kesalahan dalam kode aplikasi jauh lebih sering ditemukan daripada dalam pustaka kontrak yang dapat digunakan kembali. Beberapa pustaka juga menjalani [audit eksternal](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audit) sebagai pengamanan tambahan.

Namun, menggunakan pustaka kontrak pintar membawa risiko memasukkan kode yang tidak Anda kenali ke dalam proyek. Mengimpor kontrak dan memasukkannya langsung ke dalam proyek Anda memang menggoda, tetapi tanpa pemahaman yang baik tentang apa yang dilakukan kontra, Anda mungkin secara tidak sengaja menimbulkan masalah di sistem Anda karena perilaku yang tidak terduga. Selalu pastikan untuk membaca dokumentasi kode yang Anda impor, lalu tinjau kode itu sendiri sebelum menjadikannya bagian dari proyek Anda!

Terakhir, saat memutuskan apakah akan memasukkan suatu pustaka, pertimbangkan penggunaannya secara keseluruhan. Pustaka yang diterima secara luas memiliki keuntungan memiliki komunitas yang lebih besar dan banyak mata yang mengawasinya untuk melihat masalah. Keamanan harus menjadi fokus utama Anda saat membangun dengan kontrak pintar!

## Peralatan terkait {#related-tools}

**Kontrak OpenZeppelin -** **_Pustaka paling populer untuk pengembangan kontrak pintar yang aman._**

- [Dokumentasi](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Forum Komunitas](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Blok pembangun yang aman, sederhana, dan fleksibel untuk kontrak pintar._**

- [Dokumentasi](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 -** **_Sebuah proyek Solidity dengan kontrak, pustaka, dan contoh untuk menolong Anda membangun aplikasi yang terdistribusi dengan fitur lengkap untuk dunia nyata._**

- [GitHub](https://github.com/HQ20/contracts)

## Tutorial terkait {#related-tutorials}

- [Pertimbangan keamanan untuk pengembang Ethereum](/developers/docs/smart-contracts/security/) _– Sebuah tutorial tentang pertimbangan keamanan ketika menyusun kontrak pintar, termasuk pemakaian pustaka._
- [Pahami kontrak pintar token ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _- Tutorial tentang standar ERC20, yang disediakan oleh berbagai pustaka._

## Bacaan lebih lanjut {#further-reading}

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_
