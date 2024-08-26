import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email harus diisi!"),
  password: z.string().min(1, "Password harus diisi!"),
});

export const registerSchema = z.object({
  nama: z.string().min(5, "Nama harus diisi minimal 5 karakter!"),
  email: z.string().email("Email harus diisi!"),
  password: z.string().min(8, "Password harus diisi minimal 8 karakter!"),
});

export const jasaFormSchema = z.object({
  kode: z.string().min(1, { message: "Kode harus diisi." }),
  nama: z.string().min(5, { message: "Nama harus setidaknya 5 karakter." }),
  jobType: z.string().min(1, { message: "Job Type harus diisi." }),
  jobTypeDesc: z
    .string()
    .min(5, { message: "Job Type Desc harus setidaknya 5 karakter." }),
  kategoriPekerjaan: z
    .string()
    .min(1, { message: "Kategori Pekerjaan harus diisi." }),
  hargaJual: z.coerce.number(),
  waktuKerja: z.coerce.number().min(1, { message: "Waktu Kerja harus diisi." }),
  satuanKerja: z.string().min(1, { message: "Satuan Kerja harus diisi." }),
  catatan: z.string().nullable(), // Adjusted to handle null values
  statusAktif: z.boolean().default(false),
});

export const karyawanFormSchema = z.object({
  id: z.coerce.number(),
  name: z.string().min(5, {
    message: "Nama harus setidaknya 5 karakter.",
  }),
  alamat: z.string().min(5, {
    message: "Alamat harus setidaknya 5 karakter.",
  }),
  provinsi: z.string().min(1, {
    message: "Harus diisi!",
  }),
  kabupaten: z.string().min(1, {
    message: "Harus diisi!",
  }),
  kecamatan: z.string().min(1, {
    message: "Harus diisi!",
  }),
  kelurahan: z.string().min(1, {
    message: "Harus diisi!",
  }),
  kodepos: z.string().min(5, {
    message: "Kodepos harus setidaknya 5 karakter.",
  }),
  notelp: z.string().nullable().optional(),
  nohp: z.string().min(5, {
    message: "Nomor HP harus setidaknya 5 karakter.",
  }),
  email: z.string().nullable().optional(),
  catatan: z.string().nullable().optional(),
  // Biodata
  noktp: z.string(),
  tempat_lahir: z.string(),
  tanggal_lahir: z.coerce.date().nullable().optional(),
  gender: z.string(),
  agama: z.string(),
  berlaku_hingga: z.coerce.date().nullable().optional(),
  status_kawin: z.string().nullable().optional(),
  status_kebangsaan: z.string().nullable().optional(),
  // Status karyawan
  status_karyawan_tetap: z.string().nullable().optional(),
  honda_id: z.string().nullable().optional(),
  tanggal_masuk: z.coerce.date().nullable().optional(),
  tanggal_berhenti: z.coerce.date().nullable().optional(),
  jabatan: z.string().nullable().optional(),
  level_training: z.string().nullable().optional(),
  status_pit: z.string().nullable().optional(),
  // Komisi dan gaji
  komisi_penjualan: z.string().nullable().optional(),
  gaji_pokok: z.coerce.number().nullable().optional(),
  tunjangan_jabatan: z.coerce.number().nullable().optional(),
  kesehatan: z.coerce.number().nullable().optional(),
  transport: z.coerce.number().nullable().optional(),
  uang_harian: z.coerce.number().nullable().optional(),
});

export const sparepartFormSchema = z.object({
  kodeSparepart: z.string().min(1, { message: "Kode harus diisi." }),
  aktif: z.boolean().default(false),
  namaSparepart: z.string().min(5, { message: "Nama harus diisi." }),
  namaLokalSparepart: z.string().nullable().optional(),
  grupSparepart: z.string().min(1, { message: "Group harus diisi." }),
  hargaLokal: z.coerce.number(),
  hargaNasional: z.coerce.number().nullable().optional(),
  uom: z.string().min(1, { message: "Satuan harus diisi." }),
  grupKodeAHM: z.string().nullable().optional(),
});

export const customerFormSchema = z.object({
  kode: z.string(),
  status: z.boolean().default(false),
  title: z.string().min(1, { message: "title harus diisi." }),
  nama: z.string().min(5, { message: "Nama harus diisi." }),
  noktp: z.string().min(5, { message: "No. KTP harus diisi." }),
  pekerjaan: z.string().nullable().optional(),
  agama: z.string().nullable().optional(),
  tanggal_lahir: z.coerce.date().nullable().optional(),
  nopassport: z.string().nullable().optional(),
  alamat: z.string().min(5, {
    message: "Alamat harus setidaknya 5 karakter.",
  }),
  provinsi: z.string().min(1, {
    message: "Harus diisi!",
  }),
  kabupaten: z.string().min(1, {
    message: "Harus diisi!",
  }),
  kecamatan: z.string().min(1, {
    message: "Harus diisi!",
  }),
  kelurahan: z.string().min(1, {
    message: "Harus diisi!",
  }),
  kodepos: z.string().nullable().optional(),
  notelp: z.string(),
  nohp: z.string().min(5, {
    message: "Nomor HP harus setidaknya 5 karakter.",
  }),
  email: z.string().nullable().optional(),
  catatan: z.string().nullable().optional(),

  namaKontakPerson: z.string().nullable().optional(),
  notelpKontakPerson: z.string().nullable().optional(),
  nohpKontakPerson: z.string().nullable().optional(),

  alamatKirim: z.string().nullable().optional(),
  up: z.string().nullable().optional(),
  noTelpAlamatKirim: z.string().nullable().optional(),
});

export const kendaraanFormSchema = z.object({
  no_polisi: z.string().min(1, { message: "No. Polisi harus diisi." }),
  kode_customer: z.string().min(1, { message: "Kode Customer harus diisi." }),
  kode_pemilik: z.string().min(1, { message: "Kode Pemilik harus diisi." }),
  no_mesin: z.string().min(1, { message: "No. Mesin harus diisi." }),
  statusAktif: z.boolean().default(false),
  warna: z.string().min(1, { message: "Warna harus diisi." }),
  no_rangka: z.string().min(1, { message: "No. Rangka harus diisi." }),
  namaTipeKendaraan: z
    .string()
    .min(1, { message: "Nama Tipe Kendaraan harus diisi." }),
  tahun_rakit: z.string().min(4, { message: "Tahun Rakit harus diisi." }),
});

export const jasaModalSchema = z.object({
  jasa: jasaFormSchema.nullable().optional(),
  total_harga_jasa: z.number(),
  harga_jasa: z.number(),
  kode_jasa: z.string().min(1, "Input kode jasa!"),
  nama_jasa: z.string(),
  tambahan_harga_jasa: z.number().min(0),
  persentase_diskon: z.number(),
  opl: z.string().min(1),
});

export const sparepartModalSchema = z.object({
  sparepart: sparepartFormSchema,
  total_harga_sparepart: z.coerce.number(),
  harga_sparepart: z.coerce.number(),
  tambahan_harga_sparepart: z.coerce.number(),
  persentase_diskon: z.coerce.number(),
  quantity: z.coerce.number().gt(0, "Kuantitas harus lebih dari 0!"),
  nama_sparepart: z.string(),
  kode_sparepart: z.string().min(1, "Input kode sparepart!"),
  ref_jasa: z.string().min(1, "Ref jasa harus dipilih!"),
});

const booleanField = z.union([
  z.boolean(),
  z.string().transform((val) => val === "true"),
]);

export const pkbFormSchema = z.object({
  no_pkb: z.string().nullable().optional(),
  no_antrian: z.string().nullable().optional(),
  tanggal: z.coerce.date(),
  jam_kedatangan_customer: z.coerce.date(),
  no_polisi: z.string().min(1).trim(),
  tipe_antrian: z.string().min(1),
  tipe_kedatangan: z.string().min(1),
  activity_capacity: z.string().min(1),
  pemilik: z.string().min(1),
  no_hp: z.string().min(1),
  no_mesin: z.string().min(1),
  tahun_motor: z.string().min(1),
  indikator_bensin: z.number().array(),
  pembawa: z.string().min(1),
  no_hp_pembawa: z.string().min(1),
  no_ktp_pembawa: z.string().min(1),
  alamat_ktp_pembawa: z.string().min(1),
  alamat_domisili_pembawa: z.string().min(1),
  kota_pembawa: z.string(),
  kecamatan_pembawa: z.string().min(1),
  hubungan_pembawa: z.string().min(1),
  alasan_ke_ahass: z.string().min(1),
  dari_dealer_sendiri: booleanField,
  part_bekas_dibawa: booleanField,
  konfirmasi_pergantian_part: booleanField,
  km_sekarang: z.coerce.number().min(0),
  km_berikutnya: z.coerce.number().min(0),
  gudang: z.string().min(1),
  no_stnk: z.string(),
  customer_yang_datang: z.string().min(1),
  status_pkb: z.string().min(1),
  keluhan: z.string().min(1),
  gejala: z.string().min(1),
  uang_muka: z.coerce.number(),
  mekanik: z.string().min(1),
  service_advisor: z.string().min(1),
  final_inspector: z.string().min(1),
  estimasi_jam_selesai: z.coerce.date(),
  jasaPKB: z.array(jasaModalSchema),
  sparepartPKB: z.array(sparepartModalSchema),

  tanggal_bayar: z.coerce.date().nullable().optional(),
  no_bayar: z.string().nullable().optional(),
  uang_bayar: z.coerce.number(),
  uang_kembalian: z.coerce.number(),
  tipe_pembayaran: z.string().min(1),
});

export const gudangFormSchema = z.object({
  kode: z.string().min(1, { message: "Kode harus diisi." }),
  statusAktif: z.boolean().default(false),
  nama: z.string().min(5, { message: "Nama harus setidaknya 5 karakter." }),
  alamat: z.string().min(5, {
    message: "Alamat harus setidaknya 5 karakter.",
  }),
  provinsi: z.string().min(1, {
    message: "Provinsi harus diisi!",
  }),
  kabupaten: z.string().min(1, {
    message: "Kabupaten harus diisi!",
  }),
  kecamatan: z.string().min(1, {
    message: "Kecamatan Harus diisi!",
  }),
  kelurahan: z.string().min(1, {
    message: "Kelurahan Harus diisi!",
  }),
  kodepos: z.string().min(5, {
    message: "Kodepos harus setidaknya 5 karakter.",
  }),
  notelp: z.string().min(1, {
    message: "Nomor Telpon harus setidaknya 5 karakter.",
  }),
  nohp: z.string().min(5, {
    message: "Nomor HP harus setidaknya 5 karakter.",
  }),
  email: z.string().min(1, {
    message: "Email harus diisi!",
  }),
  catatan: z.string().nullable().optional(),
});

export const sparepartBAGSchema = z.object({
  sparepart: sparepartFormSchema,
  namaSparepart: z.string(),
  quantity: z.coerce.number().gt(0, "Kuantitas harus lebih dari 0!"),
});

export const BAGFormSchema = z.object({
  tanggal: z.coerce.date(),
  gudangId: z.string().min(1, { message: "Gudang harus dipilih!" }),
  tipeBagIsIncoming: z.coerce.boolean(),
  alasan: z.string().min(1, { message: "Alasan harus diisi!" }),
  sparepartBAG: z.array(sparepartBAGSchema),
});
