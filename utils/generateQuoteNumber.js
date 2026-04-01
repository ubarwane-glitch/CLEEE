function generateQuoteNumber() {
  const now = new Date();
  const year = now.getFullYear();

  const timestamp = now.getTime();
  const randomPart = Math.floor(Math.random() * 10000);
  const sequenceNumber = ((timestamp % 100000) + randomPart) % 100000;

  const paddedSequence = String(sequenceNumber).padStart(5, '0');

  return `D${year}-${paddedSequence}`;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateQuoteNumber };
}
