import AdmZip from "adm-zip";
import * as R from "ramda";
import { toLowerCase, readZipFile } from "./common";

/**
 * checks if there's a file called "mimetype" and that contents are "application/epub+zip"
 */
export const checkMimeType = (
  zip: AdmZip,
  filesName: string[],
) => {
  return R.pipe(getMimetypeFile, doCheck(zip))(filesName);
};

const getMimetypeFile = (filesName: string[]) => {
  const mimeTypeFileName = R.find(eqMimetype)(filesName);
  if (!mimeTypeFileName) {
    throw new Error("No mimetype file in archive");
  }
  return mimeTypeFileName;
};

const eqMimetype = (name: string) =>
  R.pipe(toLowerCase, R.equals("mimetype"))(name);

// check file mime type
const doCheck = (zip: AdmZip) => {
  return R.curry(_doCheck)(zip);
};

const _doCheck = (zip: AdmZip, fileName: string) => {
  const data = readZipFile(zip, fileName);
  
  return R.ifElse(
    R.equals("application/epub+zip"),
    () => true,
    () => {
      throw new Error("Unsupported mime type");
    },
  )(data);
};
