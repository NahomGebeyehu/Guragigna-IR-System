import { stringify } from 'querystring';
import indexTerms from './indexer.js'
import weigh_terms from './term_weighter.js'
import {cosineSimilarity} from './VetorSpaceModel.js';
import fs from "fs";
function search(query){
  let index_weighted = fs.readFileSync('./stemmer_page/documents/docWeightedTermsFile.json');
  let iw = JSON.parse(index_weighted);
  


const index_length= Object.values(iw).length
const similarities = [];
   
    var found_words= []
    const index_words = Object.keys(iw).map(key => key);
  const qi=Object.values(query.split(" "))
    for(let i=0 ; i<index_words.length;i++)
  {
      for(let j=0; j<qi.length; j++){
            if(index_words[i]===qi[j])
              found_words.push(qi[j])
      }
  }
   found_words = [...new Set(found_words)];
    indexTerms(query,"./stemmer_page/documents",'query')
    weigh_terms('./stemmer_page/documents/queryIndexFile.json','./stemmer_page/documents','query');
    let query_weighted = fs.readFileSync('./stemmer_page/documents/queryWeightedTermsFile.json');
    let qw = JSON.parse(query_weighted);
   
  
  var weighted_words=[]
  var word_with_weight=[]

  for (let j = 0; j < found_words.length; j++){
  var tf_idf= Object.values(Object.values(iw[found_words[j]]))
  for (let i = 0; i < tf_idf.length; i++) {

  //weighted_words[i]= Object.values(Object.values(iw[found_words[1]]))
    weighted_words.push(Array.from(Object.keys(Object.values(iw[found_words[j]])[i])))
    //console.log(weighted_words)
   // word_with_weight.push({[found_words[j]]: weighted_words.pop()})
   
  }
  

}

    const index_w = []
    for (let i = 0; i < word_with_weight.length; i++)
    {
      index_w.push(Object.values(word_with_weight[i]))
    }
  //console.log(index_w)
  
   /*for (let i = 0; i < word_with_weight.length; i++) {
      similarities.push(cosineSimilarity(Object.values(qw),index_w[i]));
  }*/
  var vector_spc=[]
  var vovo, stringi=[], idifi=[]
    for (let i = 0; i < found_words.length; i++){
      for (let j = 0; j < Object.keys(found_words).length; j++){
        vovo=iw[found_words[i]][j]
      //  console.log(iw[found_words[i]][j])
        stringi.push(Object.keys(vovo)[0])
        idifi.push(Object.values(vovo)[0])
      }
      
    }
    function findDuplicateIndexes(arr) {
      let duplicates = [];
      let uniqueArr = [...new Set(arr)];
      uniqueArr.forEach((value) => {
        let similarIndexes = arr.reduce((acc, cur, index) => {
          if (cur === value) {
            acc.push(index);
          }
          return acc;
        }, []);
        if (similarIndexes.length > 1) {
          duplicates.push(similarIndexes);
        }
      });
      return duplicates;
    }
    
    const vext= findDuplicateIndexes(stringi)
    for(let i=0; i<vext.length;i++)
    vector_spc[i]=[]
    for(let i=0; i<vext.length;i++)
    {
      for(let j=0; j<vext[i].length;j++) 
      vector_spc[i][j]=idifi[vext[i][j]]
      //console.log(idifi[vext[i][j]])
    }

    for (let i = 0; i < vext.length; i++) {
      similarities.push(cosineSimilarity(Object.values(qw),vector_spc[i]));
  }
  function sortWithIndex(arr) {
    const sorted = [...arr].sort((a, b) => a - b);
    const indices = arr.map((_, i) => i);
    indices.sort((a, b) => arr[a] - arr[b]);
    return indices;
  }
  var indexes=sortWithIndex(similarities)
  
  console.log(found_words)
  if(stringi==null||found_words.length==0)
  console.log("No Matches Found")
  else{
    for(let i=indexes.length-1;i>=0;i--)
    {
     
      console.log(stringi[vext[i][0]])
  
    }
  }
  
    

    //console.log(similarities); // [0.04499711544008894, 0.04499711544008894, 0.08999423088017788, 

//console.log(myValues.map(obj => Object.values(obj)))
    

  }

search('')