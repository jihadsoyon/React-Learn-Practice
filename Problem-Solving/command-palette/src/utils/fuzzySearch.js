/**
 * Fuzzy search: returns score + highlighted segments
 * Higher score = better match
 */
export function fuzzySearch(text, query) {
  if (!query) return { match: true, score: 0, segments: [{ text, highlight: false }] };

  const textLower = text.toLowerCase();
  const queryLower = query.toLowerCase();

  // Exact substring match — highest priority
  const exactIdx = textLower.indexOf(queryLower);
  if (exactIdx !== -1) {
    const segments = [];
    if (exactIdx > 0) segments.push({ text: text.slice(0, exactIdx), highlight: false });
    segments.push({ text: text.slice(exactIdx, exactIdx + query.length), highlight: true });
    if (exactIdx + query.length < text.length) segments.push({ text: text.slice(exactIdx + query.length), highlight: false });
    return { match: true, score: 100 + (50 - exactIdx), segments };
  }

  // Fuzzy character-by-character match
  let qi = 0;
  const matchedIndices = [];

  for (let i = 0; i < text.length && qi < queryLower.length; i++) {
    if (textLower[i] === queryLower[qi]) {
      matchedIndices.push(i);
      qi++;
    }
  }

  if (qi < queryLower.length) return { match: false, score: -1, segments: [] };

  // Build highlighted segments
  const segments = [];
  let last = 0;
  for (const idx of matchedIndices) {
    if (idx > last) segments.push({ text: text.slice(last, idx), highlight: false });
    segments.push({ text: text[idx], highlight: true });
    last = idx + 1;
  }
  if (last < text.length) segments.push({ text: text.slice(last), highlight: false });

  // Score: prefer matches at start, consecutive chars
  const consecutiveBonus = matchedIndices.reduce((acc, idx, i) =>
    i > 0 && idx === matchedIndices[i - 1] + 1 ? acc + 5 : acc, 0);
  const startBonus = matchedIndices[0] === 0 ? 20 : 0;
  const score = 50 + consecutiveBonus + startBonus - matchedIndices[0];

  return { match: true, score, segments };
}

export function searchCommands(commands, query) {
  if (!query.trim()) return commands;

  const results = [];

  for (const cmd of commands) {
    const labelResult = fuzzySearch(cmd.label, query);
    const descResult = fuzzySearch(cmd.description, query);
    const categoryResult = fuzzySearch(cmd.category, query);

    const bestScore = Math.max(
      labelResult.match ? labelResult.score : -1,
      descResult.match ? descResult.score * 0.6 : -1,
      categoryResult.match ? categoryResult.score * 0.4 : -1,
    );

    if (bestScore > -1) {
      results.push({
        ...cmd,
        _score: bestScore,
        _labelSegments: labelResult.match ? labelResult.segments : [{ text: cmd.label, highlight: false }],
      });
    }
  }

  return results.sort((a, b) => b._score - a._score);
}