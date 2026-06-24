export function getStableRatingData(productId, productName) {
  const seedStr = String(productId || productName || 'default');
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = seedStr.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);

  // Rating between 4.6 and 4.9 (so it's 4.5+ but not flat 4.50, and looks legit like 4.7, 4.8)
  const ratingVariations = [4.6, 4.7, 4.8, 4.9];
  const rating = ratingVariations[hash % ratingVariations.length];

  // Reviews between 45 and 350
  const reviewCount = 45 + (hash % 305);

  return { rating, reviewCount };
}
