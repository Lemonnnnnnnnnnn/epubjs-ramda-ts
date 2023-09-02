## Usage

```
pnpm i @lemonnn/epub-parser
```

```js
import epub from '@lemonnn/epub-parser'

// the relative path with current workspace root path
const TEST_FILE = path.resolve("src/public/1.epub")

const fn = async () => {
    const book = await epub(TEST_FILE);
    const toc = book.getTOC()
    console.log(toc);
}

fn()
```

