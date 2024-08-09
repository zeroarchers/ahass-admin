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
  doc.text("NOTA SERVIS", 150, 10);
  doc.setFontSize(9);

  doc.text("Nomor", 150, 15);
  doc.text("Tanggal", 150, 20);

  doc.text(`: ${pkb.no_bayar}`, 170, 15);
  doc.text(`: ${new Date(pkb.tanggal).toLocaleTimeString()}`, 170, 20);

  doc.line(10, 25, 200, 25);
  doc.line(10, 25.1, 200, 25.1);

  // Customer details
  doc.text(`No Polisi`, 10, 30);
  doc.text(`Pemilik`, 10, 35);
  doc.text(`: ${pkb.pemilik}`, 30, 35);
  doc.text(`: ${pkb.no_polisi}`, 30, 30);

  doc.text(`No. Telp/Hp`, 80, 30);
  doc.text(`Tipe/Warna/Tahun`, 80, 35);
  doc.text(`: ${pkb.no_hp}`, 110, 30);
  doc.text(
    `: ${pkb.kendaraan.namaTipeKendaraan}/${pkb.kendaraan.warna}/${pkb.tahun_motor}`,
    110,
    35,
  );

  doc.text(`Km`, 170, 30);
  doc.text(`Km Next`, 170, 35);
  doc.text(`: ${pkb.km_sekarang}`, 190, 30);
  doc.text(`: ${pkb.km_berikutnya}`, 190, 35);
  // Services table
  autoTable(doc, {
    startY: 40,
    margin: { left: 10 },
    tableWidth: 190,
    styles: {
      lineColor: "#000000",
      fillColor: "#FFFFFF",
      textColor: "#000000",
      lineWidth: 0.3,
      fontSize: 7,
      cellPadding: 1,
      minCellHeight: 1,
    },
    head: [["No", "Kode Jasa", "Nama Jasa", "Harga", "Diskon", "Jumlah"]],
    body: pkb.jasaPKB.map((jasa, index) => [
      index + 1,
      jasa.kode_jasa,
      jasa.nama_jasa,
      jasa.harga_jasa.toLocaleString("id-ID"),
      jasa.persentase_diskon,
      (
        jasa.harga_jasa -
        (jasa.harga_jasa * jasa.persentase_diskon) / 100
      ).toLocaleString("id-ID"),
    ]),
    foot: [
      [
        {
          content: "Jasa: ",
          colSpan: 5,
          styles: {
            halign: "right",
          },
        },
        pkb.jasaPKB
          .reduce((sum, jasa) => sum + jasa.total_harga_jasa, 0)
          .toLocaleString("id-ID"),
      ],
    ],
  });

  const startYFooter1 = (doc as any).lastAutoTable.finalY;
  // Parts table
  autoTable(doc, {
    startY: startYFooter1,
    margin: { left: 10 },
    tableWidth: 190,
    styles: {
      lineColor: "#000000",
      fillColor: "#FFFFFF",
      textColor: "#000000",
      lineWidth: 0.3,
      fontSize: 7,
      cellPadding: 1,
      minCellHeight: 1,
    },
    head: [
      [
        "No",
        "Kode Part",
        "Nama Part",
        "Qty",
        "Satuan",
        "Harga",
        "Diskon",
        "Jumlah",
      ],
    ],
    body: pkb.sparepartPKB.map((part, index) => [
      index + 1,
      part.kode_sparepart,
      part.nama_sparepart,
      part.quantity,
      "PCS",
      part.harga_sparepart.toLocaleString("id-ID"),
      part.persentase_diskon,
      (
        part.harga_sparepart * part.quantity -
        (part.harga_sparepart * part.quantity * part.persentase_diskon) / 100
      ).toLocaleString("id-ID"),
    ]),
    foot: [
      [
        {
          content: "Part: ",
          colSpan: 7,
          styles: {
            halign: "right",
          },
        },
        pkb.sparepartPKB
          .reduce((sum, part) => sum + part.total_harga_sparepart, 0)
          .toLocaleString("id-ID"),
      ],
    ],
  });

  const startYFooter2 = (doc as any).lastAutoTable.finalY + 5;

  doc.setFontSize(7);
  doc.text(
    "ANDA MENDAPATKAN VOUCHER DARI MOTORKU X SEBESAR RP 0",
    200,
    startYFooter2,
    {
      align: "right",
    },
  );
  doc.text(
    "*Total Biaya yang tertera belum termasuk pengurangan Voucher",
    200,
    startYFooter2 + 3,
    {
      align: "right",
    },
  );

  doc.text(`Mekanik: ${pkb.mekanik}`, 10, startYFooter2 + 5);
  doc.text(`No. PKB: ${pkb.no_pkb}`, 75, startYFooter2 + 5);

  const subTotal =
    pkb.jasaPKB.reduce((sum, jasa) => sum + jasa.total_harga_jasa, 0) +
    pkb.sparepartPKB.reduce((sum, part) => sum + part.total_harga_sparepart, 0);

  const total = subTotal - pkb.uang_muka;

  const formatToIDR = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  };

  autoTable(doc, {
    startY: startYFooter2 + 5,
    margin: { left: 140 },
    tableWidth: 50,
    theme: "plain",
    styles: {
      fontSize: 7,
      halign: "right",
      cellPadding: 1,
      minCellHeight: 1,
    },
    body: [
      [
        {
          content: "Subtotal",
          styles: {
            halign: "left",
          },
        },
        ":",
        {
          content: formatToIDR(subTotal),
          styles: {
            halign: "right",
          },
        },
      ],
      [
        {
          content: "Diskon final (0 %)",
          styles: {
            halign: "left",
          },
        },
        ":",
        {
          content: "0",
          styles: {
            halign: "right",
          },
        },
      ],
      [
        {
          content: "DP",
          styles: {
            halign: "left",
          },
        },
        ":",
        {
          content: formatToIDR(pkb.uang_muka),
          styles: {
            halign: "right",
          },
        },
      ],
      [
        {
          content: "Total",
          styles: {
            halign: "left",
          },
        },
        ":",
        {
          content: formatToIDR(total),
          styles: {
            halign: "right",
          },
        },
      ],
      [
        {
          content: "Bayar",
          styles: {
            halign: "left",
          },
        },
        ":",
        {
          content: formatToIDR(pkb.uang_bayar),
          styles: {
            halign: "right",
          },
        },
      ],
      [
        {
          content: "Kembalian",
          styles: {
            halign: "left",
          },
        },
        ":",
        {
          content: formatToIDR(pkb.uang_bayar - total),
          styles: {
            halign: "right",
          },
        },
      ],
    ],
  });

  const width = 25;

  const createPositionObject = (startX: any) => {
    const x1 = startX;
    const x2 = startX + width;
    const center = (x1 + x2) / 2;

    return { x1, x2, center };
  };

  const positions = {
    pemilik: createPositionObject(15),
    sa: createPositionObject(45),
    fi: createPositionObject(75),
  };

  doc.text(`Disiapkan Oleh,`, positions.pemilik.center, startYFooter2 + 20, {
    align: "center",
  });
  doc.text(`Pemilik/Pembawa`, positions.sa.center, startYFooter2 + 20, {
    align: "center",
  });
  doc.text(`Hormat Kami`, positions.fi.center, startYFooter2 + 20, {
    align: "center",
  });

  doc.text(
    "Created By: IKASAN017168",
    positions.pemilik.center,
    startYFooter2 + 37,
    {
      align: "center",
      maxWidth: width,
    },
  );
  doc.line(
    positions.pemilik.x1,
    startYFooter2 + 35,
    positions.pemilik.x2,
    startYFooter2 + 35,
    "FD",
  );
  doc.line(
    positions.pemilik.x1,
    startYFooter2 + 35.1,
    positions.pemilik.x2,
    startYFooter2 + 35,
    "FD",
  );

  doc.text(
    pkb.pemilik || pkb.pembawa,
    positions.sa.center,
    startYFooter2 + 34,
    {
      align: "center",
      maxWidth: width,
    },
  );
  doc.line(
    positions.sa.x1,
    startYFooter2 + 35,
    positions.sa.x2,
    startYFooter2 + 35,
  );
  doc.line(
    positions.sa.x1,
    startYFooter2 + 35.1,
    positions.sa.x2,
    startYFooter2 + 35,
  );

  doc.line(
    positions.fi.x1,
    startYFooter2 + 35,
    positions.fi.x2,
    startYFooter2 + 35,
  );
  doc.line(
    positions.fi.x1,
    startYFooter2 + 35.1,
    positions.fi.x2,
    startYFooter2 + 35,
  );

  const startYFooter3 = (doc as any).lastAutoTable.finalY + 5;
  // Garansi
  doc.setFontSize(6);
  autoTable(doc, {
    startY: startYFooter3 + 5,
    margin: { left: 10 },
    tableWidth: 190,
    theme: "plain",
    styles: {
      fontSize: 7,
      halign: "left",
      cellPadding: 1,
      minCellHeight: 1,
    },
    head: [["Garansi: ", "", ""]],
    body: [
      [
        "1. 500 Km / 1 minggu untuk service reguler",
        "3. 1.000 Km / 1 bulan untuk servis CBR 250 dan PCX 150",
        "5. Sparepart bekas adalah hak konsumen",
      ],
      [
        "2. 1.000 Km / 1 bulan untuk bongkar mesin reguler",
        "4. 1.500 Km / 45 hari untuk bongkar mesin CBR 250 dan PCX 150",
        "",
      ],
    ],
    foot: [["Saran Mekanik:", "", ""]],
  });

  doc.save(`invoice_${pkb.no_bayar}.pdf`);
};
