"use client";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { PKBWithRelations } from "@/types";

export const generatePDF = (pkb: PKBWithRelations) => {
  const doc = new jsPDF({ orientation: "landscape", format: [241.3, 139.7] });

  // Set font
  doc.setFont("helvetica");

  // Header
  doc.setFontSize(13);
  doc.text("RAHARDJO MOTOR 17168", 10, 10);
  doc.setFontSize(10);
  doc.text("JL ADI SUMARMO 235 RT 002 RW 002 KEL BANYUANYAR", 10, 15);
  doc.text("0271727954 / 087847677781", 10, 20);

  // Right side header
  doc.setFontSize(13);
  doc.text("PERINTAH KERJA BENGKEL", 150, 10);
  doc.setFontSize(9);

  doc.text("Nomor", 150, 15);
  doc.text("Tanggal", 150, 20);

  doc.text(`: ${pkb.no_pkb}`, 170, 15);
  doc.text(`: ${new Date(pkb.tanggal).toLocaleDateString()}`, 170, 20);

  doc.line(10, 25, 200, 25);
  doc.line(10, 25.1, 200, 25.1);

  // Customer details
  doc.text(`No Polisi`, 10, 30);
  doc.text(`Pemilik`, 10, 35);
  doc.text(`Alamat`, 10, 40);
  doc.text(`: ${pkb.pemilik}`, 30, 35);
  doc.text(`: ${pkb.no_polisi}`, 30, 30);
  doc.text(`: ${pkb.alamat_ktp_pembawa}`, 30, 40, {
    maxWidth: 50,
    align: "left",
  });

  doc.text(`No. Telp/Hp`, 80, 30);
  doc.text(`No. Rangka/Mesin`, 80, 35);
  doc.text(`Tipe/Warna/Tahun`, 80, 40);
  doc.text(`: ${pkb.no_hp}`, 110, 30);
  doc.text(`: ${pkb.no_mesin}/${pkb.kendaraan.no_rangka}`, 110, 35);
  doc.text(
    `: ${pkb.kendaraan.namaTipeKendaraan}/${pkb.kendaraan.warna}/${pkb.tahun_motor}`,
    110,
    40,
  );

  doc.text(`Km`, 170, 30);
  doc.text(`No. Antri`, 170, 35);
  doc.text(`Keluhan`, 170, 40);
  doc.text(`: ${pkb.km_sekarang}`, 190, 30);
  doc.text(`: ${pkb.no_antrian}`, 190, 35);

  doc.text(`: ${pkb.keluhan || "-"}`, 190, 40);
  autoTable(doc, {
    startY: 50,
    tableWidth: 90,
    styles: {
      lineColor: "#000000",
      fillColor: "#FFFFFF",
      textColor: "#000000",
      lineWidth: 0.3,
      fontSize: 7,
    },
    head: [["No", "Nama Jasa", "Waktu"]],
    margin: { left: 10 },
    body: pkb.jasaPKB.map((jasa, index) => [
      index + 1,
      jasa.nama_jasa,
      jasa.jasa.waktuKerja + " min",
    ]),
  });

  autoTable(doc, {
    startY: 50,
    margin: { left: 110 },
    tableWidth: 90,
    styles: {
      lineColor: "#000000",
      fillColor: "#FFFFFF",
      textColor: "#000000",
      lineWidth: 0.3,
      fontSize: 7,
    },
    head: [["No", "Nama Part", "Qty", "Satuan"]],
    body: pkb.sparepartPKB.map((part, index) => [
      index + 1,
      part.nama_sparepart,
      part.quantity,
      "PCS",
    ]),
  });

  const total_waktu = pkb.jasaPKB.reduce(
    (sum, jasa) => sum + jasa.jasa.waktuKerja,
    0,
  );

  const total_harga = pkb.sparepartPKB.reduce(
    (sum, sp) => sum + sp.harga_sparepart,
    0,
  );

  const startYFooter = (doc as any).lastAutoTable.finalY + 10;

  doc.setFontSize(7);

  doc.text(`Mekanik : ${pkb.mekanik}`, 10, startYFooter);
  doc.text(`Catatan :`, 10, startYFooter + 5);
  doc.text(
    `- PKB ini merupakan SURAT KUASA dari pelanggan kepada BENGKEL`,
    12,
    startYFooter + 15,
  );
  doc.text(
    `a. Mengerjakan pekerjaan seperti yang tertulis pada PKB ini`,
    14,
    startYFooter + 20,
  );
  doc.text(`b. Ijin mencoba kendaraan di luar BENGKEL`, 14, startYFooter + 25);
  doc.text(
    `Distribusi: Asli => FrontDesk, Copy => Pelanggan`,
    12,
    startYFooter + 30,
  );
  doc.text(`Service terakhir tanggal :`, 12, startYFooter + 35);
  doc.text(`Mekanik :`, 60, startYFooter + 35);

  doc.setFontSize(8);

  const width = 25;

  const createPositionObject = (startX: any) => {
    const x1 = startX;
    const x2 = startX + width;
    const center = (x1 + x2) / 2;

    return { x1, x2, center };
  };

  const positions = {
    pemilik: createPositionObject(120),
    sa: createPositionObject(150),
    fi: createPositionObject(180),
  };

  doc.text(`Pemilik/Pembawa`, positions.pemilik.center, startYFooter + 20, {
    align: "center",
  });
  doc.text(`Service Advisor`, positions.sa.center, startYFooter + 20, {
    align: "center",
  });
  doc.text(`Final Inspector`, positions.fi.center, startYFooter + 20, {
    align: "center",
  });

  doc.text(pkb.pemilik, positions.pemilik.center, startYFooter + 40, {
    align: "center",
    maxWidth: width,
  });
  doc.line(
    positions.pemilik.x1,
    startYFooter + 45,
    positions.pemilik.x2,
    startYFooter + 45,
    "FD",
  );
  doc.line(
    positions.pemilik.x1,
    startYFooter + 45.1,
    positions.pemilik.x2,
    startYFooter + 45,
    "FD",
  );

  doc.text(pkb.service_advisor, positions.sa.center, startYFooter + 40, {
    align: "center",
    maxWidth: width,
  });
  doc.line(
    positions.sa.x1,
    startYFooter + 45,
    positions.sa.x2,
    startYFooter + 45,
  );
  doc.line(
    positions.sa.x1,
    startYFooter + 45.1,
    positions.sa.x2,
    startYFooter + 45,
  );

  doc.text(pkb.final_inspector, positions.fi.center, startYFooter + 40, {
    align: "center",
    maxWidth: width,
  });

  doc.line(
    positions.fi.x1,
    startYFooter + 45,
    positions.fi.x2,
    startYFooter + 45,
  );
  doc.line(
    positions.fi.x1,
    startYFooter + 45.1,
    positions.fi.x2,
    startYFooter + 45,
  );

  const formattedCurrency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(total_harga);

  doc.text(`Estimasi Waktu Kerja: ${total_waktu} Menit`, 160, startYFooter);
  doc.text(`Estimasi Biaya: ${formattedCurrency}`, 160, startYFooter + 5);

  // Save the PDF
  doc.save(`invoice_${pkb.no_pkb}.pdf`);
};
