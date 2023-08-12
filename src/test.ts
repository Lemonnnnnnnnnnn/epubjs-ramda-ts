import path from 'path'
import epub from './main';

const TEST_FILE = path.join(
  process.cwd(),
  "./src/public/1.epub",
);
const TEST_FILE2 = path.join(
  process.cwd(),
  "./src/public/2.epub",
);


const test = async () => {
    const book = await epub(TEST_FILE);
    const toc = book.getTOC()
    console.log(toc);
    
}

test()
