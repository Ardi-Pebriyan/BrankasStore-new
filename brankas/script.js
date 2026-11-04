const KONFIGURASI = {
    nomorWhatsApp: "6281234567890",
    pesanDefault: "Halo Bandung Brankas, saya ingin bertanya tentang brankas.",
};

const PRODUK = [
    {
        id: "taff-guard",
        nama: "Taff Guard Mini",
        merek: "Taff Guard",
        kategori: "Mini",
        harga: 649000,
        lama: "1 tahun",
        gambar: "TaffGuard.jpg",
        badge: "Paling Laris",
        deskripsi: "Brankas mini praktis untuk menyimpan uang, perhiasan, dan dokumen penting.",
        fitur: ["Kunci kombinasi", "Bodi baja", "Ukuran ringkas"],
    },
    {
        id: "krisbow",
        nama: "Krisbow Digital",
        merek: "Krisbow",
        kategori: "Digital",
        harga: 849900,
        lama: "1 tahun",
        gambar: "krisbow.jpg",
        badge: "Favorit",
        deskripsi: "Brankas digital dengan kode akses untuk kemudahan dan keamanan ekstra.",
        fitur: ["Kunci digital", "Alarm", "Bodi kokoh"],
    },
    {
        id: "ichiban",
        nama: "Ichiban Digital",
        merek: "Ichiban",
        kategori: "Digital",
        harga: 3575000,
        lama: "2 tahun",
        gambar: "ichiban.jpg",
        badge: "Populer",
        deskripsi: "Brankas digital berkapasitas besar untuk kebutuhan kantor dan usaha.",
        fitur: ["Kunci digital", "Kapasitas besar", "Lapisan tahan api"],
    },
    {
        id: "guardian",
        nama: "Guardian Premium",
        merek: "Chubbsafes",
        kategori: "Premium",
        harga: 103303000,
        lama: "3 tahun",
        gambar: "guardian.jpg",
        badge: "Premium",
        deskripsi: "Brankas premium dengan tingkat keamanan tinggi untuk aset bernilai.",
        fitur: ["Sertifikasi keamanan", "Bodi berat", "Kunci ganda"],
    },
    {
        id: "mini-safe",
        nama: "Mini Safe",
        merek: "Mini Safe",
        kategori: "Mini",
        harga: 349000,
        lama: "1 tahun",
        gambar: "Mini Safe.jpg",
        badge: "Hemat",
        deskripsi: "Pilihan hemat untuk menyimpan uang dan dokumen kecil di rumah.",
        fitur: ["Kunci kombinasi", "Ringan", "Mudah disimpan"],
    },
    {
        id: "press-safe",
        nama: "Press Safe",
        merek: "Pressafe",
        kategori: "Tahan Api",
        harga: 3500000,
        lama: "2 tahun",
        gambar: "press safe.jpg",
        badge: "Tahan Api",
        deskripsi: "Brankas tahan api untuk melindungi dokumen penting dari risiko kebakaran.",
        fitur: ["Tahan api", "Kunci kombinasi", "Ruang dokumen"],
    },
    {
        id: "taffguard-edition",
        nama: "Taffguard Edition",
        merek: "TaffGUARD",
        kategori: "Digital",
        harga: 885600,
        lama: "1 tahun",
        gambar: "TAFFGUARD.jpg",
        badge: "Baru",
        deskripsi: "Edisi digital dengan desain modern untuk rumah dan kantor.",
        fitur: ["Kunci digital", "Desain modern", "Bodi baja"],
    },
    {
        id: "uchida",
        nama: "Uchida Fireproof",
        merek: "Uchida",
        kategori: "Tahan Api",
        harga: 2677450,
        lama: "2 tahun",
        gambar: "uchida.jpg",
        badge: "Tahan Api",
        deskripsi: "Brankas tahan api dengan ruang penyimpanan dokumen yang lega.",
        fitur: ["Tahan api", "Ruang lega", "Kunci aman"],
    },
    {
        id: "black",
        nama: "Black Mini",
        merek: "Black",
        kategori: "Mini",
        harga: 385000,
        lama: "1 tahun",
        gambar: "black.jpg",
        badge: "Hemat",
        deskripsi: "Brankas mini serbaguna dengan harga terjangkau.",
        fitur: ["Kunci kombinasi", "Ringkas", "Mudah digunakan"],
    },
];

function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(angka);
}

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const filterChips = document.getElementById("filterChips");
const sortSelect = document.getElementById("sortSelect");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
const resetFilters = document.getElementById("resetFilters");
const menuToggle = document.getElementById("menuToggle");
const primaryNav = document.getElementById("primaryNav");
const siteHeader = document.getElementById("siteHeader");
const year = document.getElementById("year");

let kategoriAktif = "Semua";
let kataKunci = "";
let urutan = "default";

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function buatLinkWhatsApp(produk) {
    const pesan = `Halo Bandung Brankas, saya ingin bertanya tentang *${produk.nama}* (${formatRupiah(produk.harga)}). Apakah stok tersedia dan harganya bisa nego?`;
    return `https://wa.me/${KONFIGURASI.nomorWhatsApp}?text=${encodeURIComponent(pesan)}`;
}

function pasangLinkWhatsApp() {
    document.querySelectorAll("[data-wa-general]").forEach((link) => {
        link.href = `https://wa.me/${KONFIGURASI.nomorWhatsApp}?text=${encodeURIComponent(KONFIGURASI.pesanDefault)}`;
    });

    const pesanService = "Halo Bandung Brankas, saya ingin bertanya tentang service atau perbaikan brankas.";
    document.querySelectorAll("[data-wa-service]").forEach((link) => {
        link.href = `https://wa.me/${KONFIGURASI.nomorWhatsApp}?text=${encodeURIComponent(pesanService)}`;
    });
}

function ambilProdukTampil() {
    let daftar = [...PRODUK];

    if (kategoriAktif !== "Semua") {
        daftar = daftar.filter((produk) => produk.kategori === kategoriAktif);
    }

    if (kataKunci) {
        const kunci = kataKunci.toLowerCase();
        daftar = daftar.filter((produk) => {
            const teks = `${produk.nama} ${produk.merek} ${produk.kategori}`.toLowerCase();
            return teks.includes(kunci);
        });
    }

    if (urutan === "termurah") {
        daftar.sort((a, b) => a.harga - b.harga);
    } else if (urutan === "termahal") {
        daftar.sort((a, b) => b.harga - a.harga);
    } else if (urutan === "nama") {
        daftar.sort((a, b) => a.nama.localeCompare(b.nama, "id"));
    }

    return daftar;
}

function buatKartu(produk, index) {
    const kartu = document.createElement("article");
    kartu.className = "product-card";
    kartu.style.setProperty("--i", index);

    const badge = produk.badge
        ? `<span class="product-badge">${escapeHtml(produk.badge)}</span>`
        : "";

    kartu.innerHTML = `
        <div class="product-media">
            ${badge}
            <img src="${escapeHtml(produk.gambar)}" alt="Brankas ${escapeHtml(produk.nama)}" loading="lazy" decoding="async" width="480" height="360">
        </div>
        <div class="product-body">
            <div class="product-meta">
                <span>${escapeHtml(produk.merek)}</span>
                <span class="dot-sep"></span>
                <span>${escapeHtml(produk.kategori)}</span>
            </div>
            <h3>${escapeHtml(produk.nama)}</h3>
            <p class="product-price">${formatRupiah(produk.harga)}</p>
            <p class="product-note">Harga bisa nego via WhatsApp</p>
            <a class="btn btn-wa btn-block" href="${buatLinkWhatsApp(produk)}" target="_blank" rel="noopener noreferrer" data-wa-product>
                <svg class="icon" aria-hidden="true"><use href="#icon-whatsapp"></use></svg>
                Beli via WhatsApp
                <svg class="icon icon-arrow" aria-hidden="true"><use href="#icon-arrow"></use></svg>
            </a>
        </div>
    `;

    return kartu;
}

function renderKatalog() {
    const daftar = ambilProdukTampil();

    productGrid.innerHTML = "";
    resultCount.textContent =
        daftar.length === PRODUK.length
            ? `Menampilkan ${daftar.length} produk`
            : `Menampilkan ${daftar.length} dari ${PRODUK.length} produk`;
    emptyState.hidden = daftar.length !== 0;

    const fragment = document.createDocumentFragment();
    daftar.forEach((produk, index) => {
        fragment.appendChild(buatKartu(produk, index));
    });
    productGrid.appendChild(fragment);
}

function aturMenu(terbuka) {
    primaryNav.classList.toggle("is-open", terbuka);
    menuToggle.classList.toggle("is-open", terbuka);
    menuToggle.setAttribute("aria-expanded", String(terbuka));
    menuToggle.setAttribute("aria-label", terbuka ? "Tutup menu" : "Buka menu");
    document.body.classList.toggle("nav-open", terbuka);
}

searchInput.addEventListener("input", (event) => {
    kataKunci = event.target.value.trim();
    renderKatalog();
});

filterChips.addEventListener("click", (event) => {
    const tombol = event.target.closest("[data-category]");
    if (!tombol) return;

    kategoriAktif = tombol.dataset.category;
    filterChips.querySelectorAll("[data-category]").forEach((chip) => {
        chip.classList.toggle("is-active", chip === tombol);
    });
    renderKatalog();
});

sortSelect.addEventListener("change", (event) => {
    urutan = event.target.value;
    renderKatalog();
});

resetFilters.addEventListener("click", () => {
    kategoriAktif = "Semua";
    kataKunci = "";
    urutan = "default";
    searchInput.value = "";
    sortSelect.value = "default";
    filterChips.querySelectorAll("[data-category]").forEach((chip) => {
        chip.classList.toggle("is-active", chip.dataset.category === "Semua");
    });
    renderKatalog();
    searchInput.focus();
});

menuToggle.addEventListener("click", () => {
    aturMenu(!primaryNav.classList.contains("is-open"));
});

primaryNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
        aturMenu(false);
    }
});

document.addEventListener("click", (event) => {
    if (!primaryNav.classList.contains("is-open")) return;
    if (!event.target.closest(".site-header")) {
        aturMenu(false);
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        aturMenu(false);
    }
});

function perbaruiHeader() {
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 8);
}

window.addEventListener("scroll", perbaruiHeader, { passive: true });
perbaruiHeader();

const revealItems = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window && revealItems.length) {
    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    obs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealItems.forEach((item) => observer.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (year) {
    year.textContent = new Date().getFullYear();
}

pasangLinkWhatsApp();
renderKatalog();
