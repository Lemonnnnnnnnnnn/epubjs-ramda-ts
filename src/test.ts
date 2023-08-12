import path from 'path'
import epub from './main';

const TEST_FILE = path.resolve("src/public/1.epub")
const TEST_FILE2 = path.resolve("src/public/2.epub")
const TEST_FILE3 = path.resolve("src/public/3.epub")

const test = async () => {
    const book = await epub(TEST_FILE3);
    const toc = await book.getChapter("id19")
    console.log(toc);
}

test()
