export function generateNoPkb(currentPkbCount: number, kodeChars: string) {
  const year = new Date().getFullYear().toString().slice(-2);
  const prefixPkb = `17168-${kodeChars}`;
  const sequenceNumber = currentPkbCount.toString().padStart(6, "0");
  const noPkb = `${prefixPkb}-${year}${sequenceNumber}`;
  return noPkb;
}
