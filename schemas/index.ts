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
  kode: z.string().min(1, { message: "Kode harus diisi." }),
  status: z.boolean().default(false),
  title: z.string().min(5, { message: "title harus diisi." }),
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
  notelp: z.string().min(1, {
    message: "Nomor Telpon harus setidaknya 5 karakter.",
  }),
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
