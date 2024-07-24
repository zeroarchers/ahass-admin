import { PrismaClient } from "@prisma/client";
import { data } from "./pembayaran";

const prisma = new PrismaClient();

async function main() {
  for (const pkb of data) {
    await prisma.pkb.create({
      data: {
        pkbID: pkb.pkbID,
        soID: pkb.soID,
        status: pkb.status,
        soNo: pkb.soNo,
        noPKB: pkb.noPKB,
        noPolisi: pkb.noPolisi,
        totalFaktur: pkb.totalFaktur,
        tipePembayran: pkb.tipePembayran,
        tanggal: new Date(pkb.tanggal),
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
