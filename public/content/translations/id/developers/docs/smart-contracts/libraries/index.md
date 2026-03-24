---
title: Pustaka kontrak pintar
description: Temukan pustaka kontrak pintar dan blok penyusun yang dapat digunakan kembali untuk mempercepat proyek pengembangan Ethereum Anda.
lang: id
---

Anda tidak perlu menulis setiap kontrak pintar dalam proyek Anda dari awal. Ada banyak pustaka kontrak pintar sumber terbuka yang tersedia yang menyediakan blok penyusun yang dapat digunakan kembali untuk proyek Anda yang dapat menghindarkan Anda dari keharusan membuat semuanya dari nol.

## Prasyarat {#prerequisites}

Sebelum melompat ke pustaka kontrak pintar, ada baiknya Anda memiliki pemahaman yang baik tentang struktur kontrak pintar. Kunjungi [anatomi kontrak pintar](/developers/docs/smart-contracts/anatomy/) jika Anda belum melakukannya.

## Apa yang ada di dalam pustaka {#whats-in-a-library}

Anda biasanya dapat menemukan dua jenis blok penyusun dalam pustaka kontrak pintar: perilaku yang dapat digunakan kembali yang dapat Anda tambahkan ke kontrak Anda, dan implementasi dari berbagai standar.

### Perilaku {#behaviors}

Saat menulis kontrak pintar, ada kemungkinan besar Anda akan mendapati diri Anda menulis pola yang sama berulang kali, seperti menetapkan alamat _admin_ untuk melakukan operasi yang dilindungi dalam sebuah kontrak, atau menambahkan tombol _jeda_ darurat jika terjadi masalah yang tidak terduga.

Pustaka kontrak pintar biasanya menyediakan implementasi yang dapat digunakan kembali dari perilaku ini sebagai [pustaka](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries) atau melalui [pewarisan](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance) di Solidity.

Sebagai contoh, berikut adalah versi yang disederhanakan dari [kontrak `Ownable`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol) dari [pustaka OpenZeppelin Contracts](https://github.com/OpenZeppelin/openzeppelin-contracts), yang menetapkan sebuah alamat sebagai pemilik kontrak, dan menyediakan pengubah untuk membatasi akses ke suatu metode hanya untuk pemilik tersebut.

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

Untuk menggunakan blok penyusun seperti ini di kontrak Anda, Anda harus mengimpornya terlebih dahulu, dan kemudian memperluasnya di kontrak Anda sendiri. Ini akan memungkinkan Anda untuk menggunakan pengubah yang disediakan oleh kontrak dasar `Ownable` untuk mengamankan fungsi Anda sendiri.

```solidity
import ".../Ownable.sol"; // Path to the imported library // Jalur ke pustaka yang diimpor

contract MyContract is Ownable {
    // The following function can only be called by the owner // Fungsi berikut hanya dapat dipanggil oleh pemilik
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

Contoh populer lainnya adalah [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) atau [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html). Ini adalah pustaka (berbeda dengan kontrak dasar) yang menyediakan fungsi aritmatika dengan pemeriksaan luapan (overflow), yang tidak disediakan oleh bahasa tersebut. Merupakan praktik yang baik untuk menggunakan salah satu dari pustaka ini alih-alih operasi aritmatika bawaan untuk menjaga kontrak Anda dari luapan, yang dapat memiliki konsekuensi yang membawa bencana!

### Standar {#standards}

Untuk memfasilitasi [komposabilitas dan interoperabilitas](/developers/docs/smart-contracts/composability/), komunitas Ethereum telah mendefinisikan beberapa standar dalam bentuk **ERC**. Anda dapat membaca lebih lanjut tentang hal tersebut di bagian [standar](/developers/docs/standards/).

Saat menyertakan ERC sebagai bagian dari kontrak Anda, ada baiknya untuk mencari implementasi standar daripada mencoba membuat sendiri. Banyak pustaka kontrak pintar menyertakan implementasi untuk ERC yang paling populer. Misalnya, [standar token sepadan ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) yang ada di mana-mana dapat ditemukan di [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md), [DappSys](https://github.com/dapphub/ds-token/) dan [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc20). Selain itu, beberapa ERC juga menyediakan implementasi kanonis sebagai bagian dari ERC itu sendiri.

Perlu disebutkan bahwa beberapa ERC tidak berdiri sendiri, melainkan merupakan tambahan untuk ERC lainnya. Misalnya, [ERC2612](https://eips.ethereum.org/EIPS/eip-2612) menambahkan ekstensi ke ERC20 untuk meningkatkan kegunaannya.

## Cara menambahkan pustaka {#how-to}

Selalu merujuk ke dokumentasi pustaka yang Anda sertakan untuk instruksi spesifik tentang cara menyertakannya dalam proyek Anda. Beberapa pustaka kontrak Solidity dikemas menggunakan `npm`, jadi Anda cukup melakukan `npm install` pada pustaka tersebut. Sebagian besar alat untuk [mengompilasi](/developers/docs/smart-contracts/compiling/) kontrak akan melihat ke dalam `node_modules` Anda untuk pustaka kontrak pintar, sehingga Anda dapat melakukan hal berikut:

```solidity
// This will load the @openzeppelin/contracts library from your node_modules // Ini akan memuat pustaka @openzeppelin/contracts dari node_modules Anda
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

Terlepas dari metode yang Anda gunakan, saat menyertakan pustaka, selalu perhatikan versi [bahasa](/developers/docs/smart-contracts/languages/). Misalnya, Anda tidak dapat menggunakan pustaka untuk Solidity 0.6 jika Anda menulis kontrak Anda di Solidity 0.5.

## Kapan harus menggunakan {#when-to-use}

Menggunakan pustaka kontrak pintar untuk proyek Anda memiliki beberapa manfaat. Pertama dan terpenting, ini menghemat waktu Anda dengan menyediakan blok penyusun siap pakai yang dapat Anda sertakan dalam sistem Anda, daripada harus mengodenya sendiri.

Keamanan juga merupakan nilai tambah yang besar. Pustaka kontrak pintar sumber terbuka juga sering diteliti dengan cermat. Mengingat banyak proyek bergantung padanya, ada insentif yang kuat dari komunitas untuk terus meninjaunya. Jauh lebih umum menemukan kesalahan dalam kode aplikasi daripada di pustaka kontrak yang dapat digunakan kembali. Beberapa pustaka juga menjalani [audit eksternal](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits) untuk keamanan tambahan.

Namun, menggunakan pustaka kontrak pintar membawa risiko menyertakan kode yang tidak Anda kenal ke dalam proyek Anda. Sangat menggoda untuk mengimpor kontrak dan menyertakannya langsung ke dalam proyek Anda, tetapi tanpa pemahaman yang baik tentang apa yang dilakukan kontrak tersebut, Anda mungkin secara tidak sengaja memasukkan masalah ke dalam sistem Anda karena perilaku yang tidak terduga. Selalu pastikan untuk membaca dokumentasi kode yang Anda impor, dan kemudian tinjau kode itu sendiri sebelum menjadikannya bagian dari proyek Anda!

Terakhir, saat memutuskan apakah akan menyertakan pustaka, pertimbangkan penggunaan keseluruhannya. Pustaka yang diadopsi secara luas memiliki manfaat memiliki komunitas yang lebih besar dan lebih banyak mata yang melihatnya untuk mencari masalah. Keamanan harus menjadi fokus utama Anda saat membangun dengan kontrak pintar!

## Alat terkait {#related-tools}

**OpenZeppelin Contracts -** **_Pustaka paling populer untuk pengembangan kontrak pintar yang aman._**

- [Dokumentasi](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Forum Komunitas](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Blok penyusun yang aman, sederhana, dan fleksibel untuk kontrak pintar._**

- [Dokumentasi](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 -** **_Proyek Solidity dengan kontrak, pustaka, dan contoh untuk membantu Anda membangun aplikasi terdistribusi berfitur lengkap untuk dunia nyata._**

- [GitHub](https://github.com/HQ20/contracts)

**thirdweb Solidity SDK -** **_Menyediakan alat yang diperlukan untuk membangun kontrak pintar kustom secara efisien_**

- [Dokumentasi](https://portal.thirdweb.com/contracts/build/overview)
- [GitHub](https://github.com/thirdweb-dev/contracts)

## Tutorial terkait {#related-tutorials}

- [Pertimbangan keamanan untuk pengembang Ethereum](/developers/docs/smart-contracts/security/) _– Tutorial tentang pertimbangan keamanan saat membangun kontrak pintar, termasuk penggunaan pustaka._
- [Memahami kontrak pintar token ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _-Tutorial tentang standar ERC20, yang disediakan oleh berbagai pustaka._

## Bacaan lebih lanjut {#further-reading}

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_