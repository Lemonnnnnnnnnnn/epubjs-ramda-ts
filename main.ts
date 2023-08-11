import * as R from "ramda";
import AdmZip from "adm-zip";
import {
  getFilesName,
  checkMimeType,
  getRootFile as _getRootFile,
  getContainer as _getContainer,
  parseRootFile,
} from "./composable";
import { getXmlParser } from "./composable";

const TEST_FILE = "1.epub";

const main = async () => {
  try {
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
    const rootFile = await getRootFile(container);

    console.log("parse root file ...");
    parseRootFile(rootFile)
    

  } catch (e) {
    console.log("error!!!");

    console.log(e);
  }
};

main();
