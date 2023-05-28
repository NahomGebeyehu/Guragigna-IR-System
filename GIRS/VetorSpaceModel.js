function cosineSimilarity(a, b) {
    var dotProduct = 0;
    var normA = 0;
    var normB = 0;
    var minLength = Math.min(a.length, b.length);
    for (var i = 0; i < minLength; i++) {
      dotProduct += a[i] * b[i];
     
      normA += a[i] * b[i];
      normB += b[i] * b[i];
    }

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }


export {cosineSimilarity};