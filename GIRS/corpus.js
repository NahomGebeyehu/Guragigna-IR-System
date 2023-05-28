
import indexTerms from './indexer.js'
import weigh_terms from './term_weighter.js'
import { readdir, realpath } from'fs';
import  { extname, join} from 'path';



function generate_index()
{
  const directoryPath = './GIRS/documents';
  let docxFiles = [];
  readdir(directoryPath, (err, files) => {
    if (err) {
        console.log('Error reading directory:', err);
    } else {
        realpath(directoryPath, (err, resolvedPath) => {
            if (err) {
                console.log('Error resolving path:', err);
            } else {
                docxFiles = files.filter(file => extname(file) === '.txt')
                                 .map(file => join(resolvedPath, file));
                                 indexTerms(docxFiles,"./GIRS/documents",'doc')
                                weigh_terms('./GIRS/documents/docIndexFile.json','./GIRS/documents','doc')
                //console.log(docxFiles);
            }
        });
    }
});
}

generate_index()


