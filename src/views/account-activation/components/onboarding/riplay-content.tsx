import { logoBCA } from "images";
import React from "react";

const RiplayContent = () => {
    return (<>
        {/* header */}
        <section>
            <section className="text-center">
                <img src={logoBCA}
                    alt="BCA"
                    title="BCA"
                    className="logo text-center mb-2" />
                <h6 className="font-weight-bold"> Informasi Produk Sakuku Co-branding </h6>
                <br />
            </section>
            <h6 className="font-weight-bold">1. DEFINISI SAKUKU CO-BRANDING</h6>
            <p className="pl-3">Sakuku <i>Co-branding</i> merupakan bentuk kerja sama antara BCA dengan nasabah perusahaan kerja sama yang bertujuan untuk memasarkan dan memperluas penggunaan Sakuku sebagai sarana pembayaran transaksi menggunakan situs atau aplikasi perusahaan kerja sama.</p>
        </section>

        {/* fitur & manfaat */}
        <section>
            <p className="font-weight-bold">2. FITUR DAN MANFAAT</p>
            <ul className="pl-4">
                <li>Proses aktivasi dan registrasi Sakuku dapat dilakukan melalui aplikasi perusahaan kerjasama dengan data diri singkat</li>
                <li>Nasabah dapat mengetahui saldo Sakuku melalui aplikasi perusahaan kerjasama tanpa harus <i>mendownload</i> aplikasi Sakuku</li>
                <li>Nasabah dapat mengetahui <i>history</i> transaksi yang dilakukan</li>
                <li>User dapat menikmati promo Sakuku yang berlaku di <i>outlet merchant</i> Sakuku selama promo berlangsung</li>
                <li>Dapat melakukan pembayaran tranksasi <i>online</i> dan transaksi <i>QRIS</i> dengan menggunakan sumber dana Sakuku</li>
            </ul>
        </section>

        {/* Biaya dan Limit */}
        <section>
            <h6 className="font-weight-bold">3. BIAYA DAN LIMIT</h6>
            <ul className="pl-4">
                <li>Nasabah wajib menanggung biaya-biaya yang timbul sehubungan Transaksi serta biaya lainnya yang berlaku di BCA atau <i>Co-Partner</i>.</li>
                <li>BCA berhak untuk menentukan:
                    <ul className="pl-4 list-dashed">
                        <li>saldo minimum dan maksimum Sakuku;</li>
                        <li>pembatasan jumlah akun Sakuku yang dapat dimiliki oleh Nasabah;</li>
                        <li>pembatasan atas Transaksi termasuk namun tidak terbatas pada pembatasan frekuensi dan/atau nominal Transaksi yang dapat dilakukan oleh Nasabah melalui aplikasi Sakuku pada ponsel Nasabah, <i>Platform Co-Partner</i>, dan/atau melalui sarana lain sesuai ketentuan yang berlaku di BCA.</li>
                    </ul>
                </li>
                <li>BCA berhak untuk sewaktu-waktu mengubah ketentuan terkait biaya Transaksi dan biaya lainnya terkait Transaksi serta ketentuan terkait saldo minimum dan maksimum Sakuku, pembatasan jumlah akun Sakuku yang dapat dimiliki oleh Nasabah, dan pembatasan atas Transaksi berdasarkan kebijakan yang berlaku di BCA.</li>
                <li>Pemberitahuan mengenai biaya dan pembatasan akan diberitahukan oleh BCA kepada Nasabah dalam bentuk dan melalui sarana apa pun sesuai ketentuan hukum yang berlaku.</li>
            </ul>
        </section>

        {/* Ketentuan Penggunaan */}
        <section className="text-justify">
            <h6 className="font-weight-bold">4. KETENTUAN PENGGUNAAN</h6>
            <ul className="pl-4">
                <li>Nomor Sakuku adalah nomor ponsel yang digunakan Nasabah untuk melakukan registrasi atau aktivasi Sakuku pada aplikasi Sakuku atau <i>Platform Co-Partner</i>. Selanjutnya nomor ponsel Nasabah tersebut akan digunakan sebagai sarana otorisasi Transaksi.</li>
                <li>Nasabah wajib mendaftarkan dan menggunakan nomor ponsel milik Nasabah sendiri. Segala akibat yang timbul karena didaftarkannya nomor ponsel milik pihak lain menjadi tanggung jawab Nasabah sepenuhnya dan Nasabah dengan ini membebaskan BCA dari segala macam tuntutan, gugatan, dan/atau tindakan hukum lainnya dari pihak mana pun.</li>
                <li>Satu nomor ponsel hanya dapat digunakan untuk registrasi atau aktivasi 1 (satu) akun Sakuku pada aplikasi Sakuku dan/atau 1 (satu) akun pada <i>Platform Co-Partner</i> yang sama.</li>
                <li>Nasabah bertanggung jawab sepenuhnya atas penggunaan nomor Sakuku, termasuk dalam hal terjadi penyalahgunaan atas nomor Sakuku tersebut.</li>
                <li>Transaksi dapat dilakukan Nasabah melalui aplikasi Sakuku pada ponsel Nasabah, <i>Platform Co-Partner</i>, dan/atau melalui sarana lain sesuai ketentuan yang berlaku di BCA yang akan diberitahukan oleh BCA kepada Nasabah dalam bentuk dan melalui sarana apa pun sesuai ketentuan hukum yang berlaku.</li>
                <li>Nasabah wajib melakukan peningkatan versi (<i>upgrade</i>) aplikasi Sakuku dan/atau <i>Platform Co-Partner</i> setiap kali terdapat kebutuhan upgrade pada aplikasi Sakuku dan/atau <i>Platform Co-Partner</i>.</li>
                <li>Kelalaian Nasabah dalam melakukan peningkatan versi (<i>upgrade</i>) aplikasi Sakuku dan/atau <i>Platform Co-Partner</i> dapat mengakibatkan Nasabah tidak dapat menggunakan atau hanya dapat mengakses fitur tertentu pada aplikasi Sakuku dan/atau <i>Platform Co-Partner</i>.</li>
                <li>Nasabah akan dikenakan biaya pengiriman SMS untuk setiap transaksi terkait Sakuku yang memerlukan SMS seperti proses registrasi dan verifikasi. Besarnya biaya SMS adalah sesuai dengan yang ditentukan oleh Operator Seluler.</li>
                <li>Dalam hal <i>SIM Card</i> ponsel Nasabah dengan nomor ponsel yang terdaftar sebagai nomor Sakuku dicuri atau hilang, maka Nasabah wajib untuk secepatnya menghubungi Halo BCA.</li>
                <li>Dana di Sakuku tidak mendapatkan bunga dan tidak dikenakan pajak.</li>
                <li>Apabila terdapat perbedaan antara saldo pada Sakuku dengan saldo atau catatan yang tercatat pada pembukuan BCA, maka sebagai acuan dipergunakan saldo atau catatan yang tercatat pada pembukuan BCA, kecuali dapat dibuktikan sebaliknya.</li>
                <li>Nasabah dapat melakukan perubahan data Nasabah sesuai dengan ketentuan yang berlaku di BCA.</li>
                <li>Nasabah dengan ini memberikan persetujuan kepada BCA untuk memberikan data Nasabah, akun Sakuku Nasabah (termasuk nomor dan saldo Sakuku), dan data Transaksi yang dilakukan oleh Nasabah kepada <i>Co-Partner</i>.</li>
                <li>BCA berhak melakukan koreksi atas saldo Nasabah jika terjadi kesalahan <i>posting</i> (pencatatan) yang dilakukan oleh BCA.</li>
                <li>Penutupan akun Sakuku dapat dilakukan oleh Nasabah melalui Halo BCA.</li>
                <li>Dana yang ada di Sakuku bukan merupakan simpanan sebagaimana dimaksud dalam undang-undang mengenai perbankan sehingga dana yang tersimpan pada Sakuku tidak dijamin oleh Lembaga Penjamin Simpanan (LPS).</li>
                <li>Nasabah setuju bahwa BCA berhak untuk menyimpan dan menggunakan data personal Nasabah dan data lainnya yang melekat pada ponsel atau ditransmisikan oleh ponsel yang digunakan Nasabah untuk registrasi atau aktivasi Sakuku pada aplikasi Sakuku atau <i>Platform Co-Partner</i> antara lain untuk kenyamanan dan keamanan Nasabah dalam bertransaksi.</li>
                <li>Nasabah dengan ini setuju bahwa BCA berhak untuk menginformasikan nama, nomor Sakuku, dan/atau data Transaksi Nasabah kepada pihak lain yang terkait dengan Transaksi yang dilakukan oleh Nasabah.</li>
                <li>BCA berhak melakukan pemblokiran akun Sakuku, menolak transaksi terhadap akun Sakuku, dan/atau menutup hubungan usaha dengan Nasabah dalam hal:
                    <ul className="pl-4 list-dashed">
                        <li>Nasabah tidak memenuhi ketentuan hukum yang berlaku;</li>
                        <li>Nasabah tidak memberikan informasi dan dokumen pendukung sesuai ketentuan hukum yang berlaku;</li>
                        <li>Nasabah diketahui dan/atau patut diduga menggunakan dokumen palsu dan/atau memberikan data yang tidak benar kepada BCA;</li>
                        <li>Nasabah menyampaikan informasi yang diragukan kebenarannya;</li>
                        <li>Nasabah memiliki sumber dana Transaksi yang diketahui dan/atau patut diduga berasal dari hasil tindak pidana; dan/atau</li>
                        <li>Nasabah melakukan Transaksi di luar batas kewajaran.</li>
                    </ul>
                </li>
                <li>Apabila diperlukan, BCA berhak untuk melakukan pendebetan atas saldo pada akun Sakuku Nasabah dalam hal terdapat indikasi kecurangan, penyalahgunaan Sakuku, pelanggaran Ketentuan ini, adanya tindak pidana atau tindakan yang melanggar hukum lainnya yang menimbulkan kerugian bagi BCA atau pihak lain.</li>
                <li>Dengan membuka dan menggunakan Sakuku, maka Nasabah tunduk dan menyetujui Ketentuan ini dan ketentuan lainnya yang mengatur mengenai Transaksi. BCA berhak untuk mengubah Ketentuan ini dan ketentuan terkait Transaksi yang akan diberitahukan oleh BCA dalam bentuk dan melalui sarana apa pun sesuai ketentuan hukum yang berlaku. Dalam hal Nasabah melakukan registrasi dan Transaksi pada <i>Platform Co-Partner</i>, maka Nasabah setuju untuk terikat pada dan mengikuti ketentuan yang berlaku pada <i>Co-Partner</i>.</li>
            </ul>
        </section>

        {/*Informasi Tambahan */}
        <section>
            <h6 className="font-weight-bold">5. INFORMASI TAMBAHAN</h6>
            <ul className="text-justify pl-4">
                <li>PIN Sakuku hanya boleh digunakan oleh Nasabah yang bersangkutan.</li>
                <li>Setiap kali Nasabah melakukan Transaksi, Nasabah harus memasukkan PIN sebagai sarana otorisasi Transaksi.</li>
                <li>Nasabah wajib menjaga kerahasiaan PIN dan OTP (<i>One Time Password</i>). Nasabah bertanggung jawab sepenuhnya atas penggunaan PIN dan OTP, termasuk dalam hal terjadi penyalahgunaan PIN dan OTP.</li>
                <li>Nasabah wajib merahasiakan PIN dan OTP dengan cara:
                    <ul className="pl-4 list-dashed">
                        <li>tidak memberitahukan PIN dan OTP kepada orang lain termasuk kepada anggota keluarga atau orang terdekat Nasabah;</li>
                        <li>tidak menyimpan PIN dan OTP pada ponsel, benda-benda lainnya atau sarana apa pun yang memungkinkan PIN dan OTP diketahui oleh orang lain;</li>
                        <li>berhati-hati dalam menggunakan PIN dan OTP agar tidak terlihat oleh orang lain; dan/atau</li>
                        <li>tidak menggunakan PIN yang ditentukan atau dipilihkan oleh orang lain, atau yang mudah diterka seperti tanggal lahir atau kombinasinya dan nomor telepon.</li>
                    </ul>
                </li>
                <li>Segala penyalahgunaan PIN atau OTP merupakan tanggung jawab Nasabah sepenuhnya. Nasabah dengan ini membebaskan BCA dari segala tuntutan, gugatan, dan/atau tindakan hukum lainnya yang timbul, baik dari pihak lain maupun Nasabah sendiri sebagai akibat penyalahgunaan PIN atau OTP.</li>
                <li>Penggunaan PIN dan OTP pada Sakuku mempunyai kekuatan hukum yang sama dengan perintah tertulis yang ditandatangani oleh Nasabah.</li>
                <li>Nasabah wajib memastikan bahwa ponsel yang digunakan untuk bertransaksi menggunakan Sakuku bebas dari <i>virus</i>, <i>malware </i>, dan/atau hal lainnya yang dapat merugikan Nasabah. Segala akibat yang timbul sehubungan dengan hal tersebut menjadi tanggung jawab Nasabah sepenuhnya.</li>
                <li>Akun Sakuku akan diblokir jika:
                    <ul className="pl-4 list-dashed">
                        <li>Nasabah salah memasukkan PIN sebanyak 3 (tiga) kali berturut-turut;</li>
                        <li>Nasabah mengajukan permohonan pemblokiran akun Sakuku karena <i>SIM Card</i> dari nomor Sakuku Nasabah atau ponsel milik Nasabah kedaluwarsa/hilang/dicuri/dipindahtangankan kepada pihak lain.</li>
                    </ul>
                </li>
                <li>Akun Sakuku akan ditutup jika Nasabah salah memasukkan data diri pada saat aktivasi akun Sakuku. Selanjutnya Nasabah dapat melakukan registrasi ulang akun Sakuku dalam jangka waktu yang ditentukan oleh BCA dan menghubungi Halo BCA untuk pengkreditan saldo Sakuku ke rekening BCA yang ditunjuk oleh Nasabah.</li>
                <li>Dalam hal akun Sakuku terblokir, maka Nasabah dapat melakukan aktivasi ulang akun Sakuku pada aplikasi Sakuku atau <i>Platform Co-Partner</i>.</li>
                <li>Apabila <i>SIM Card</i> Operator Seluler atau ponsel milik Nasabah kedaluwarsa/hilang/dicuri/dipindahtangankan kepada pihak lain, Nasabah harus memberitahukan hal tersebut kepada Halo BCA untuk dilakukan pemblokiran akun Sakuku. Segala instruksi transaksi berdasarkan penggunaan nomor Sakuku, PIN, atau OTP yang terjadi sebelum BCA menerima pemberitahuan tersebut dari Nasabah menjadi tanggung jawab Nasabah sepenuhnya.</li>
                <li>Keluhan/pengaduan kepada BCA sehubungan dengan Sakuku dapat disampaikan oleh Nasabah kepada Halo BCA. Untuk keperluan penanganan keluhan/pengaduan tersebut, BCA berhak meminta Nasabah untuk menyerahkan fotokopi identitas diri Nasabah dan dokumen pendukung lainnya.</li>
                <li>BCA akan menanggapi keluhan tersebut sesuai dengan ketentuan hukum yang berlaku.</li>
                <li>Setiap keluhan terkait penggunaan Sakuku harus disampaikan oleh Nasabah kepada BCA selambat-lambatnya 3 (tiga) bulan sejak tanggal Transaksi.</li>
                <li>Keluhan/pengaduan sehubungan dengan Transaksi pada <i>Platform Co-Partner</i> wajib disampaikan oleh Nasabah kepada <i>Co-Partner</i>. Untuk keperluan penanganan keluhan/pengaduan tersebut, <i>Co-Partner</i> berhak meminta Nasabah untuk menyerahkan fotokopi identitas diri Nasabah dan dokumen pendukung lainnya.</li>
                <li>Nasabah setuju bahwa setiap perselisihan atau perbedaan pendapat yang timbul dari dan/atau berkenaan dengan pelaksanaan Ketentuan ini antara Nasabah dengan BCA akan diselesaikan dengan cara musyawarah.</li>
                <li>Setiap perselisihan atau perbedaan pendapat yang tidak dapat diselesaikan secara musyawarah oleh Nasabah dengan BCA, akan diselesaikan melalui fasilitasi perbankan di Bank Indonesia atau Otoritas Jasa Keuangan atau mediasi yang dilakukan melalui Lembaga Alternatif Penyelesaian Sengketa yang tercantum dalam Daftar Lembaga Alternatif Penyelesaian Sengketa yang ditetapkan Otoritas Jasa Keuangan.</li>
                <li>Setiap perselisihan atau perbedaan pendapat yang tidak dapat diselesaikan baik secara musyawarah, fasilitasi perbankan, dan/atau mediasi sebagaimana dimaksud di atas, akan diselesaikan melalui Pengadilan Negeri Jakarta Pusat, dengan tidak mengurangi hak BCA untuk mengajukan gugatan atau tuntutan melalui Pengadilan Negeri lainnya dalam wilayah Republik Indonesia.</li>
            </ul>
        </section>
    </>);
}

export default RiplayContent;