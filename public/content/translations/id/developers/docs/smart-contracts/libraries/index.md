---
title: Pustaka kontrak pintar
description: Temukan pustaka kontrak pintar dan blok penyusun yang dapat digunakan kembali untuk mempercepat proyek pengembangan Ethereum Anda.
lang: id
---

Anda tidak perlu menulis setiap kontrak pintar dalam proyek Anda dari nol. Ada banyak pustaka kontrak pintar sumber terbuka tersedia yang menyediakan blok pembangun yang dapat digunakan kembali untuk proyek Anda yang bisa menghindarkan Anda dari keharusan untuk membuat ulang rodanya.

## Persyaratan {#prerequisites}

Sebelum masuk ke dalam pustaka kontrak pintar, adalah ide bagus untuk memiliki pemahaman yang baik tentang struktur dari sebuah kontrak pintar. Kunjungi [anatomi kontrak pintar](/developers/docs/smart-contracts/anatomy/) jika Anda belum melakukannya.

## Apa saja yang ada di dalam pustaka {#whats-in-a-library}

Anda biasanya dapat menemukan dua jenis blok pembangun di pustaka kontrak pintar: perilaku yang dapat digunakan kembali yang bisa Anda tambahkan ke kontrak Anda, dan implementasi dari berbagai standar.

### Perilaku {#behaviors}

Saat menulis kontrak pintar, kemungkinan besar Anda akan mendapati diri Anda menulis pola serupa berulang kali, seperti menetapkan alamat _admin_ untuk melakukan operasi yang dilindungi dalam kontrak, atau menambahkan tombol _jeda_ darurat jika terjadi masalah yang tidak terduga.

Pustaka kontrak pintar biasanya menyediakan implementasi yang dapat digunakan kembali dari perilaku ini sebagai [pustaka](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries) atau melalui [pewarisan](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance) di Solidity.

Sebagai contoh, berikut ini adalah versi yang disederhanakan dari [kontrak `Ownable`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol) dari [pustaka Kontrak OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts), yang menetapkan sebuah alamat sebagai pemilik kontrak, dan menyediakan sebuah pengubah untuk membatasi akses ke sebuah metode hanya kepada pemilik tersebut.

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

Untuk menggunakan blok pembangun seperti ini dalam kontrak, Anda perlu mengimpornya terlebih dahulu, dan kemudian memperpanjangnya dari kontrak milik Anda. Ini akan memungkinkan Anda untuk menggunakan pengubah yang disediakan oleh kontrak dasar `Ownable` untuk mengamankan fungsi Anda sendiri.

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

Untuk memfasilitasi [komposabilitas dan interoperabilitas](/developers/docs/smart-contracts/composability/), komunitas Ethereum telah menetapkan beberapa standar dalam bentuk **ERC**. Anda dapat membaca lebih lanjut tentangnya di bagian [standar](/developers/docs/standards/).

Ketika memasukkan ERC sebagai bagian dari kontrak Anda, adalah ide bagus untuk mencari implementasi standar ketimbang mencoba membuatnya sendiri. Banyak pustaka kontrak pintar mencakup implementasi untuk ERC paling populer. Sebagai contoh, [standar token fungible ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) yang ada di mana-mana dapat ditemukan di [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md), [DappSys](https://github.com/dapphub/ds-token/), dan [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc20). Sebagai tambahan, beberapa ERC juga menyediakan implementasi kanonis sebagai bagian dari ERC sendiri.

Penting untuk menyebutkan bahwa beberapa ERC tidak bisa berdiri sendiri, tapi sebagai pelengkap bagi ERC lain. Sebagai contoh, [ERC2612](https://eips.ethereum.org/EIPS/eip-2612) menambahkan ekstensi ke ERC20 untuk meningkatkan kegunaannya.

## Cara menambahkan pustaka {#how-to}

Selalu merujuk pada dokumentasi pustaka yang Anda masukkan untuk instruksi spesifik tentang cara memasukkannya ke dalam proyek Anda. Beberapa pustaka kontrak Solidity dikemas menggunakan `npm`, jadi Anda bisa langsung melakukan `npm install`. Sebagian besar perangkat untuk [mengompilasi](/developers/docs/smart-contracts/compiling/) kontrak akan mencari di dalam `node_modules` Anda untuk pustaka kontrak pintar, sehingga Anda dapat melakukan hal berikut:

```solidity
// Ini akan memuat  pustaka @openzeppelin/contracts dari node_modules Anda
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

Terlepas dari metode yang Anda gunakan, saat menyertakan sebuah pustaka, selalu perhatikan versi [bahasa](/developers/docs/smart-contracts/languages/) yang digunakan. Sebagai contoh, Anda tidak bisa menggunakan pustaka untuk Solidity 0.6 jika Anda menulis kontrak dalam Solidity 0.5.

## Kapan harus digunakan {#when-to-use}

Menggunakan pustaka kontrak pintar dalam proyek Anda memiliki beberapa manfaat. Pertama dan terutama, menghemat waktu Anda dengan menyediakan blok pembangun yang siap dipakai yang bisa dimasukkan ke dalam sistem Anda, daripada harus membuat kodenya sendiri.

Keamanan juga adalah satu kelebihan utamanya. Pustaka kontrak pintar sumber terbuka juga sering diperiksa secara ketat. Karena banyak proyek bergantung padanya, ada insentif kuat dari komunitas untuk tetap memeriksanya secara konstan. Kesalahan dalam kode aplikasi jauh lebih sering ditemukan daripada dalam pustaka kontrak yang dapat digunakan kembali. Beberapa pustaka juga menjalani [audit eksternal](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits) untuk keamanan tambahan.

Namun, menggunakan pustaka kontrak pintar membawa risiko memasukkan kode yang tidak Anda kenali ke dalam proyek. Mengimpor kontrak dan memasukkannya langsung ke dalam proyek Anda memang menggoda, tetapi tanpa pemahaman yang baik tentang apa yang dilakukan kontra, Anda mungkin secara tidak sengaja menimbulkan masalah di sistem Anda karena perilaku yang tidak terduga. Selalu pastikan untuk membaca dokumentasi kode yang Anda impor, lalu tinjau kode itu sendiri sebelum menjadikannya bagian dari proyek Anda!

Terakhir, saat memutuskan apakah akan memasukkan suatu pustaka, pertimbangkan penggunaannya secara keseluruhan. Pustaka yang diterima secara luas memiliki keuntungan memiliki komunitas yang lebih besar dan banyak mata yang mengawasinya untuk melihat masalah. Keamanan harus menjadi fokus utama Anda saat membangun dengan kontrak pintar!

## Perangkat terkait {#related-tools}

**OpenZeppelin Contracts -** **_Pustaka paling populer untuk pengembangan kontrak pintar yang aman._**

- [Dokumentasi](https://docs.openzeppelin.com/contracts/)
- [github](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Forum Komunitas](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Blok pembangun yang aman, sederhana, dan fleksibel untuk kontrak pintar._**

- [Dokumentasi](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 -** **_Sebuah proyek Solidity dengan kontrak, pustaka, dan contoh untuk membantu Anda membangun aplikasi terdistribusi berfitur lengkap untuk dunia nyata._**

- [github](https://github.com/HQ20/contracts)

**thirdweb Solidity SDK -** **_Menyediakan perangkat yang dibutuhkan untuk membangun kontrak pintar kustom secara efisien_**

- [Dokumentasi](https://portal.thirdweb.com/contracts/build/overview)
- [github](https://github.com/thirdweb-dev/contracts)

## Tutorial terkait {#related-tutorials}

- [Pertimbangan keamanan untuk pengembang Ethereum](/developers/docs/smart-contracts/security/) _– Sebuah tutorial tentang pertimbangan keamanan saat membangun kontrak pintar, termasuk penggunaan pustaka._
- [Memahami kontrak pintar token ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _-Tutorial tentang standar ERC20, yang disediakan oleh banyak pustaka._

## Bacaan lebih lanjut {#further-reading}

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_
