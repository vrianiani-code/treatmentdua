// Penyimpanan data di localStorage
let daftarData = JSON.parse(localStorage.getItem('dataLayanan')) || [];
let indeksEdit = null; // Menandai data yang sedang diedit

// Simpan perubahan ke penyimpanan
function simpanKeStorage() {
    localStorage.setItem('dataLayanan', JSON.stringify(daftarData));
}

// === HALAMAN FORM INPUT ===
const formInput = document.getElementById('formInput');
if (formInput) {
    formInput.addEventListener('submit', function(e) {
        e.preventDefault(); // Mencegah halaman muat ulang

        // Ambil nilai dari form
        const dataBaru = {
            nama: document.getElementById('nama').value.trim(),
            nim: document.getElementById('nim').value.trim(),
            layanan: document.getElementById('layanan').value,
            keterangan: document.getElementById('keterangan').value.trim() || '-'
        };

        // Cek: Tambah baru atau Simpan hasil edit
        if (indeksEdit === null) {
            // Tambah data baru
            daftarData.push(dataBaru);
            alert('✅ Data berhasil ditambahkan!');
        } else {
            // Perbarui data yang diedit
            daftarData[indeksEdit] = dataBaru;
            indeksEdit = null;
            alert('✅ Data berhasil diperbarui!');
            // Kembalikan tulisan tombol
            formInput.querySelector('button[type="submit"]').textContent = 'Simpan Data';
        }

        simpanKeStorage();
        formInput.reset();
    });
}

// === HALAMAN TABEL DATA ===
const isiTabel = document.getElementById('tabelData');
if (isiTabel) {
    tampilkanData();

    // Tombol hapus semua data
    document.getElementById('hapusSemua').addEventListener('click', function() {
        if (confirm('Yakin hapus SEMUA data?')) {
            daftarData = [];
            simpanKeStorage();
            tampilkanData();
        }
    });
}

// === FUNGSI TAMPILKAN DATA KE TABEL ===
function tampilkanData() {
    if (daftarData.length === 0) {
        isiTabel.innerHTML = `<tr><td colspan="6" class="pesan-kosong">Belum ada riwayat pengajuan layanan</td></tr>`;
        return;
    }

    isiTabel.innerHTML = '';
    daftarData.forEach((item, nomor) => {
        const baris = document.createElement('tr');
        baris.innerHTML = `
            <td>${nomor + 1}</td>
            <td>${item.nama}</td>
            <td>${item.nim}</td>
            <td>${item.layanan}</td>
            <td>${item.keterangan}</td>
            <td>
                <button class="btn-edit" onclick="editData(${nomor})">
                    <i class="fas fa-pen"></i> Edit
                </button>
                <button class="btn-hapus" onclick="hapusData(${nomor})">
                    <i class="fas fa-trash"></i> Hapus
                </button>
            </td>
        `;
        isiTabel.appendChild(baris);
    });
}

// === FUNGSI EDIT DATA ===
function editData(nomor) {
    // Simpan posisi data yang diedit
    indeksEdit = nomor;
    const data = daftarData[nomor];

    // Pindah ke halaman form dan isi nilai lama
    window.location.href = 'input.html';
    
    // Isi form setelah halaman input dimuat
    setTimeout(() => {
        document.getElementById('nama').value = data.nama;
        document.getElementById('nim').value = data.nim;
        document.getElementById('layanan').value = data.layanan;
        document.getElementById('keterangan').value = data.keterangan === '-' ? '' : data.keterangan;
        // Ubah tulisan tombol simpan jadi perbarui
        document.querySelector('button[type="submit"]').textContent = 'Perbarui Data';
    }, 300);
}

// === FUNGSI HAPUS SATU DATA ===
function hapusData(nomor) {
    if (confirm('Yakin ingin menghapus data ini?')) {
        daftarData.splice(nomor, 1);
        simpanKeStorage();
        tampilkanData();
    }
}