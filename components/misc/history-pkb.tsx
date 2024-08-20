"use client";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { PKBWithRelations } from "@/types";

export const generateHistoryPDF = (pkb: PKBWithRelations[]) => {
  const doc = new jsPDF();
  console.log(pkb);
  doc.setFont("helvetica");
  doc.setFontSize(13);
  doc.text("RAHARDJO MOTOR 17168", 10, 10);
  doc.setFontSize(10);
  doc.text("JL ADI SUMARMO 235 RT 002 RW 002 KEL BANYUANYAR", 10, 15);
  doc.text("0271727954 / 087847677781", 10, 20);
  doc.text("HISTORY KENDARAAN", 105, 35, {
    align: "center",
  });

  const pkbPertama = pkb[0];
  const no_polisi = pkbPertama.no_polisi;
  const pemilik = pkbPertama.pemilik;
  const no_hp = pkbPertama.no_hp;

  autoTable(doc, {
    startY: 40,
    margin: { left: 10 },
    tableWidth: 190,
    styles: {
      textColor: "#000000",
      lineColor: "#000000",
      fillColor: "#FFFFFF",
      lineWidth: 0.1,
      fontSize: 10,
      cellPadding: 1,
      minCellHeight: 1,
      halign: "center",
      valign: "middle",
    },
    body: [
      [
        `No Polisi: ${no_polisi}`,
        `Pemilik: ${pemilik}`,
        `No HP Pemilik: ${no_hp}`,
      ],
    ],
  });

  let startY = (doc as any).lastAutoTable.finalY + 10;
  pkb.forEach((pkbItem, index) => {
    const tanggal_pkb = new Date(pkbItem.tanggal);
    const no_service = pkbItem.no_bayar;
    const no_pkb = pkbItem.no_pkb;
    const keluhan = pkbItem.keluhan;
    const km = pkbItem.km_sekarang;
    const km_next = pkbItem.km_berikutnya;

    autoTable(doc, {
      startY: startY,
      margin: { left: 10 },
      tableWidth: 190,
      styles: {
        textColor: "#000000",
        lineWidth: 0,
        fontSize: 10,
        cellPadding: 1,
        minCellHeight: 1,
        halign: "center",
        valign: "middle",
      },
      theme: "plain",
      head: [["Tanggal", "No. Service", "No. PKB", "Keluhan", "KM", "KM Next"]],
      body: [
        [
          tanggal_pkb.toLocaleDateString(),
          no_service,
          no_pkb,
          keluhan,
          km.toString(),
          km_next.toString(),
        ],
      ],
    });

    startY = (doc as any).lastAutoTable.finalY + 1;

    const jasaBody = pkbItem.jasaPKB.map((jasa, index) => [
      index + 1,
      jasa.kode_jasa,
      jasa.nama_jasa,
      1,
      "Job",
    ]);

    autoTable(doc, {
      startY: startY,
      margin: { left: 15 },
      tableWidth: 190,
      theme: "plain",
      columns: ["No.", "Kode Jasa", "Nama Jasa", "Qty", "Satuan"],
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 50 },
        2: { cellWidth: 50 },
        3: { cellWidth: 50 },
        4: { cellWidth: 50 },
      },
      body: jasaBody,
    });

    startY = (doc as any).lastAutoTable.finalY + 1;

    const sparepartBody = pkbItem.sparepartPKB.map((sparepart, index) => [
      index + 1,
      sparepart.kode_sparepart,
      sparepart.nama_sparepart,
      sparepart.quantity,
      "Pcs",
    ]);

    autoTable(doc, {
      startY: startY,
      margin: { left: 15 },
      tableWidth: 190,
      theme: "plain",
      columns: ["No.", "Kode Part", "Nama Part", "Qty", "Satuan"],
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 50 },
        2: { cellWidth: 50 },
        3: { cellWidth: 50 },
        4: { cellWidth: 50 },
      },
      body: sparepartBody,
    });

    startY = (doc as any).lastAutoTable.finalY + 5;

    doc.line(10, startY, 200, startY);
    doc.line(10, startY + 0.1, 200, startY + 0.1);
    autoTable(doc, {
      startY: startY,
      margin: { left: 15 },
      tableWidth: 190,
      theme: "plain",
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 50 },
      },
      body: [
        ["Mekanik", `: ${pkbItem.mekanik}`],
        ["Saran", `: ${pkbItem.gejala}`],
      ],
    });
    startY = (doc as any).lastAutoTable.finalY + 5;
    doc.line(10, startY - 5, 200, startY - 5);
    doc.line(10, startY - 5.1, 200, startY - 5.1);
    // Add a page break if there's not enough space for the next PKB
    if (index < pkb.length - 1 && startY > doc.internal.pageSize.height - 50) {
      doc.addPage();
      startY = 10;
    }
  });

  doc.text(
    `Jumlah servis No. Polisi ${no_polisi} adalah ${pkb.length}`,
    10,
    startY + 5,
  );
  doc.save(`history.pdf`);
};
