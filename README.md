## Usage

```js
import epub from '@lemon/epub-parser'

const fn = async () => {
    const book = await epub("1.epub");
    const toc = book.getTOC()
    console.log(toc);
}

fn()
```

