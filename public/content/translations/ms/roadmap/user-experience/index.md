---
title: Menambah baik pengalaman pengguna
description: Ethereum masih agak kompleks untuk kebanyakan orang. Untuk menggalakkan penggunaan secara meluas, Ethereum perlu mengurangkan halangan kemasukan dengan drastik - pengguna mesti mendapat manfaat daripada akses Ethereum yang terdesentralisasi, tanpa kebenaran dan tahan penapisan, tetapi ia haruslah semudah menggunakan aplikasi web2 tradisional.
lang: ms
image: /images/roadmap/roadmap-ux.png
alt: "Peta hala tuju Ethereum"
template: roadmap
---

**Penggunaan Ethereum perlu dipermudah**; daripada mengurus [kunci](/glossary/#key) dan [dompet](/glossary/#wallet) hingga memulakan transaksi. Untuk memudahkan penggunaan secara meluas, Ethereum perlu meningkatkan kemudahan penggunaan dengan drastik, membolehkan pengguna untuk mengalami akses tanpa kebenaran dan tahan penapisan ke Ethereum yang semudah menggunakan aplikasi [Web2](/glossary/#web2).

## Lebih daripada frasa benih {#no-more-seed-phrases}

Akaun Ethereum dilindungi oleh sepasang kunci yang digunakan untuk mengenal pasti akaun (kunci awam) dan menandatangi mesej (kunci peribadi). Kunci peribadi diibaratkan seperti kata laluan utama, ia memberikan akses penuh kepada akaun Ethereum. Cari mengoperasinya agak berbeza bagi kebanyakan orang yang lebih biasa dengan bank dan aplikasi Web2 yang mengurus akaun bagi pihak pengguna. Untuk Ethereum mencapai penggunaan secara meluas tanpa perlu bergantung kepada pihak ketiga yang berpusat, pasti ada cara yang lebih mudah dan lancar bagi pengguna untuk mengurus aset mereka sendiri dan memastikan kawalan sepenuhnya ke atas data mereka tanpa perlu memahami kriptografi kunci awam-peribadi dan pengurusan kunci.

Penyelesaiannya adalah dengan menggunakan dompet [kontrak pintar](/glossary/#smart-contract) untuk berinteraksi dengan Ethereum. Dompet kontrak pintar membolehkan perlindungan akaun jika kunci hilang atau dicuri, memberikan peluang untuk pengesanan penipuan dan pertahanan yang lebih baik, dan membolehkan dompet menerima fungsi baharu. Walaupun dompet kontrak pintar sudah wujud pada hari ini, pembinaannya masih agak rumit kerana protokol Ethereum belum menyokongnya dengan baik. Sokongan tambahan ini dikenali sebagai abstraksi akaun.

<ButtonLink variant="outline-color" href="/roadmap/account-abstraction/">Lebih lanjut tentang abstraksi akaun</ButtonLink>

## Nod untuk semua

Pengguna yang menjalankan [nod](/glossary/#node) tidak perlu mempercayai pihak ketiga untuk mendapatkan data, dan mereka boleh berinteraksi dengan cepat, secara peribadi, dan tanpa kebenaran dengan [blok rantai](/glossary/#blockchain) Ethereum. Namun, untuk menjalankan nod memerlukan pengetahuan teknikal dan ruang cakera yang besar, bermaksud ramai orang mesti mempercayai perantara sebagai ganti.

Ada beberapa naik taraf yang menjadikan pengendalian nod jauh lebih mudah dan kurang menggunakan sumber. Cara penyimpanan data akan diubah untuk menggunakan struktur yang lebih cekap ruang, dikenali sebagai **Verkle Tree**. Selain itu, dengan [keadaan tanpa status](/roadmap/statelessness) atau [luput data](/roadmap/statelessness/#data-expiry), nod Ethereum tidak perlu menyimpan salinan keseluruhan data keadaan Ethereum, sekali gus mengurangkan keperluan ruang cakera keras dengan drastik. [Nod ringan](/developers/docs/nodes-and-clients/light-clients/) akan memberikan banyak manfaat sebagaimana mengendalikan nod penuh, tetapi turut boleh beroperasi dengan mudah pada telefon mudah alih atau dalam aplikasi pelayar ringkas.

<ButtonLink variant="outline-color" href="/roadmap/verkle-trees/">Baca tentang Verkle tree</ButtonLink>

Dengan naik taraf ini, halangan untuk mengendalikan nod dikurangkan sehingga hampir sifar. Para pengguna akan mendapat manfaat daripada akses yang selamat dan tanpa kebenaran ke Ethereum tanpa perlu mengorbankan ruang cakera atau CPU dalam komputer atau telefon mudah alih mereka, dan tidak perlu lagi bergantung kepada pihak ketiga untuk mendapatkan akses data atau rangkaian semasa menggunakan aplikasi.

## Kemajuan semasa {#current-progress}

Dompet kontrak pintar sudah tersedia, tetapi lebih banyak naik taraf yang diperlukan untuk menjadikan ia sepenuhnya terdesentralisasi dan tanpa kebenaran. EIP-4337 ialah satu cadangan matang yang tidak memerlukan sebarang perubahan terhadap protokol Ethereum. Kontrak pintar utama yang diperlukan untuk EIP-4337 **telah dilancarkan pada Mac 2023**.

**Keadaan tanpa status penuh masih dalam fasa penyelidikan** dan mungkin mengambil masa beberapa tahun lagi sebelum ia dapat dilaksanakan. Terdapat beberapa pencapaian penting dalam usaha menuju ke arah keadaan tanpa status penuh, termasuk pelupusan data, yang mungkin boleh dilaksanakan lebih awal. Perkara lain dalam pelan hala tuju, seperti [Verkle Tree](/roadmap/verkle-trees/) dan [pemisahan pencadang-pembina](/roadmap/pbs/) perlu disiapkan terlebih dahulu.

Rangkaian ujian Verkle tree sudah pun beroperasi, dan fasa seterusnya ialah menjalankan klien yang didayakan Verkle Tree secara peribadi, seterusnya rangkaian ujian awam. Anda boleh membantu mempercepat kemajuan dengan melancarkan kontrak ke rangkaian ujian atau menjalankan klien rangkaian ujian.
