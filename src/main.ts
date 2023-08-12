import * as R from "ramda";
import AdmZip from "adm-zip";
import {
  getFilesName,
  checkMimeType,
  getRootFile as _getRootFile,
  getContainer as _getContainer,
  parseRootFile,
  readZipFile,
  readZipFileRaw,
} from "./composable";
import { getXmlParser } from "./composable";
import fs from "fs";
import path from "path";
import { getImages } from "./composable/getImages";

const TEST_FILE = path.join(
  process.cwd(),
  "./src/public/1.epub",
);
const TEST_FILE2 = path.join(
  process.cwd(),
  "./src/public/2.epub",
);

const main = async () => {
  try {
    // fs.readFileSync()
    console.log("parse epub file ...");
    const zip = new AdmZip(TEST_FILE);
    const xmlparser = getXmlParser();
    const filesName = getFilesName(zip);

    console.log("check mime type ...");
    checkMimeType(zip, filesName);

    console.log("get container xml file ...");
    const getContainer = R.curry(_getContainer)(zip);
    const container = await getContainer(filesName);

    console.log("get root files ...");
    const getRootFile = R.partial(_getRootFile, [
      zip,
      xmlparser,
    ]);
    const { rootFileData } = await getRootFile(container);

    console.log("parse root file ...");
    const { manifest, metadata } =
      parseRootFile(rootFileData);

    // const images = getImages(manifest);

    // const image = readZipFileRaw(zip, images["cover"].href);
    // if (image) {
    //   fs.writeFileSync("cover.jpeg", image);
    // }
  } catch (e) {
    console.log("error!!!");

    console.log(e);
  }
};

main();
