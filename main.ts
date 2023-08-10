import * as R from "ramda";
import AdmZip from "adm-zip";
import {
  getFilesName,
  checkMimeType,
  getRootFile,
} from "./composable";

const TEST_FILE = "1.epub";

const main = async () => {
  try {
    console.log("parse epub file ...");
    const zip = new AdmZip(TEST_FILE);
    const filesName = getFilesName(zip);

    console.log("check mime type ...");
    checkMimeType(zip, filesName);

    console.log("get root files ...");
    await getRootFile(zip, filesName);
  } catch (e) {
    console.log("error!!!");

    console.log(e);
  }
};

main();
