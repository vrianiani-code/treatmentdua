// Ambil data dari penyimpanan browser atau buat daftar kosong
let daftarData = JSON.parse(localStorage.getItem('dataLayanan')) || [];

// Fungsi simpan data ke localStorage
function simpanKeStorage() {
    localStorage.setItem('dataLayanan', JSON.stringify(daftarData));
}

// === HALAMAN INPUT FORM ===
const formInput = document.getElementById('formInput');
if (formInput) {
    formInput.addEventListener('submit', function(e) {
        e.preventDefault();

        // Ambil nilai dari setiap kolom
        const dataBaru = {
            nama: document.getElementById('nama').value.trim(),
            nim: document.getElementById('nim').value.trim(),
            layanan: document.getElementById('layanan').value,
            keterangan: document.getElementById('keterangan').value.trim() || '-'
        };

        // Tambah ke daftar dan simpan
        daftarData.push(dataBaru);
        simpanKeStorage();

        // Beri notifikasi dan reset form
        alert('✅ Data berhasil disimpan!');
        formInput.reset();
    });
}

// === HALAMAN TABEL DATA ===
const isiTabel = document.getElementById('tabelData');
if (isiTabel) {
    tampilkanData();

    // Tombol hapus semua data
    document.getElementById('hapusSemua').addEventListener('click', function() {
        if (confirm('Yakin ingin menghapus SEMUA data? Tindakan ini tidak bisa dibatalkan!')) {
            daftarData = [];
            simpanKeStorage();
            tampilkanData();
        }
    });
}

// Fungsi tampilkan data ke tabel
function tampilkanData() {
    if (daftarData.length === 0) {
        isiTabel.innerHTML = `<tr><td colspan="6" class="pesan-kosong">Belum ada data yang dimasukkan</td></tr>`;
        return;
    }

    isiTabel.innerHTML = '';
    daftarData.forEach((item, indeks) => {
        const baris = document.createElement('tr');
        baris.innerHTML = `
            <td>${indeks + 1}</td>
            <td>${item.nama}</td>
            <td>${item.nim}</td>
            <td>${item.layanan}</td>
            <td>${item.keterangan}</td>
            <td>
                <button class="btn-hapus" onclick="hapusSatu(${indeks})">
                    <i class="fas fa-trash"></i> Hapus
                </button>
            </td>
        `;
        isiTabel.appendChild(baris);
    });
}

// Fungsi hapus satu baris data
function hapusSatu(indeks) {
    if (confirm('Yakin ingin menghapus data ini?')) {
        daftarData.splice(indeks, 1);
        simpanKeStorage();
        tampilkanData();
    }
}