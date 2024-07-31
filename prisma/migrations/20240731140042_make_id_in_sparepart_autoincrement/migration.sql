-- AlterTable
CREATE SEQUENCE sparepart_id_seq;
ALTER TABLE "SparePart" ALTER COLUMN "id" SET DEFAULT nextval('sparepart_id_seq');
ALTER SEQUENCE sparepart_id_seq OWNED BY "SparePart"."id";
