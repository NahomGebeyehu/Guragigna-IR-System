import { stringify } from 'querystring';
import indexTerms from './indexer.js'
import weigh_terms from './term_weighter.js'
import {cosineSimilarity} from './VetorSpaceModel.js';
import fs from "fs";
function search(query){
  let index_weighted = fs.readFileSync('./GIRS/documents/docWeightedTermsFile.json');
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
    indexTerms(query,"./GIRS/documents",'query')
    weigh_terms('./GIRS/documents/queryIndexFile.json','./stemmer_page/documents','query');
    let query_weighted = fs.readFileSync('./GIRS/documents/queryWeightedTermsFile.json');
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

   
  //console.log(index_w)
  
   /*for (let i = 0; i < word_with_weight.length; i++) {
      similarities.push(cosineSimilarity(Object.values(qw),index_w[i]));
  }*/
  
  var vector_spc=[]
  var vovo, stringi=[], idifi=[]
  
  
    for (let i = 0; i < found_words.length; i++){
      for (let j = 0; j < Object.keys(found_words).length; j++){
        
        vovo=iw[found_words[i]][j]
        //vovo= vovo?? {};
        vovo = Object.fromEntries(
          Object.entries(vovo).filter(([key, value]) => value !== '{}'))
      // console.log(iw[found_words[i]][j])
      if(Object.values(vovo).length!=0)
      {
          stringi.push(Object.keys(vovo)[0])
        idifi.push(Object.values(vovo)[0])
      }
        
      }
      
    }
    function groupDuplicates(arr) {
      const duplicates = {};
      arr.forEach((element, index) => {
        if (duplicates[element] === undefined) {
          duplicates[element] = [index];
        } else {
          duplicates[element].push(index);
        }
      });
      return Object.values(duplicates);
    }
    
    const vext= groupDuplicates(stringi)
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
  
  if(stringi==null||found_words.length==0)
  console.log("No Matches Found")
  else{
    console.log("FOUND PAGES:")
    for(let i=0;i<indexes.length;i++)
    {
      stringi = [...new Set(stringi)];
      console.log(stringi[indexes[i]])
  
    }
  }
  //console.log(stringi)
    

    //console.log(similarities); // [0.04499711544008894, 0.04499711544008894, 0.08999423088017788, 

//console.log(myValues.map(obj => Object.values(obj)))
    

  }

  import readline from 'readline';
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter Your Query Here: ', query => {
    search(query)
    rl.close();
  });
//search('ምር ሥር ኔህ ብንደ')