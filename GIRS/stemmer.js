import transliterate from "./transliterator.js";
import {suffix_list,prefix_list} from "./affix_dictionary.js";
import {prefix_exception} from "./exceptionPrefix.js"
import {suffix_exception} from "./exceptionSuffix.js"

const sfx_arr = [];
const pfx_arr = [];

function checkStringInArray(arr, str) {
  return arr.includes(str);
}

function stem(word) {
  let cv_string = transliterate.felig_transliterate(word, "am"); // consonant-vowel string

  // Prepare suffix array
  const sarr = suffix_list.split("|");
  sarr.forEach((suffix) => {
    sfx_arr.push(transliterate.felig_transliterate(suffix, "am"));
  });

  sfx_arr.push("Wa"); // Special case for ሯ

  // Prepare prefix array
  const parr = prefix_list.split("|");
  parr.forEach((prefix) => {
    pfx_arr.push(transliterate.felig_transliterate(prefix, "am"));
  });

  // Remove suffixes
  if(checkStringInArray(prefix_exception,word)!=true)
  sfx_arr.every(function (sfx, index) {
    if (cv_string.endsWith(sfx)) {
      let regex = new RegExp(`${sfx}$`, `i`);
      cv_string = cv_string.replace(regex, "");
      return false;
    } else return true;
  });
    else
    return word
  // Remove prefixes
  
  if(checkStringInArray(suffix_exception,word)!=true)
  pfx_arr.every(function (pfx, index) {
    if (cv_string.startsWith(pfx)) {
      let regex = new RegExp(`^${pfx}`);
      cv_string = cv_string.replace(regex, "");
      return false;
    } else return true;
  });
  else
    return word;

  if(word.length>3)
  return transliterate.felig_transliterate(cv_string, "en");
  else 
  return word
}
export default stem;
