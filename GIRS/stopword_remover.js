// Removes stop words
const stop_word_list = [
  "ይኸሪ ኧኸሬ",
  "እና",
  "ህም",
  "ቲኸር",
  "ቢኸር",
  "እንም አአር",
  "ኸረ",
  "ኧኛአር",
  "ልክ",
  "ኧኛአር",
  "ቡቻ",
  "የኸ",
  "ኧማኢሞሁኖአ",
  "ወደ",
  "ኢያ",
  "ኢያይ",
  "ገግኛ",
  "ኢና",
  "ኢናይ",
  "ገግንራ",
  "አሻ",
  "አሁዋ",
  "ገጋኸ",
  "ገጋሁዋ",
  "ሁዳ",
  "ሁዳን",
  "ገግዋ",
  "ሂዳ",
  "ኧኺዳ",
  "ገግሻ",
  "ሁኖዋ",
  "ኧሁኖዋ",
  "ገግሁኖዋ",
  "ምራፈድን",
  "ኧተዳ",
  "ማተን",
  "ዋዳ",
  "ዋሁኖ",
  "ሀሁኖዋ",
  "ንሁ",
  "ን",
  "ትኖዋ",
  "ባነደ",
  "ባነውዋተ",
  "ህር",
  "ኧሁርት",
  "አነኒ",
  "አነነ",
  "ባነደ",
  "ኧቦርት",
  "ይና",
  "ኤፐን",
  "ኦነት",
  "ቢኸር",
  "ወይ",
  "ምክንያትሞሀ",
];

function removeStopwords(corpus) {
  stop_word_list.forEach((word) => {
    let regex = new RegExp(`${word}`);
    corpus = corpus.replace(regex, "");
  });

  return corpus;
}

export default removeStopwords;
