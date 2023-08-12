import AdmZip from "adm-zip";
import * as R from "ramda";
import { readZipFile } from "./common";

/**
 * checks if there's a file called "mimetype" and that contents are "application/epub+zip"
 */
export const checkMimeType = async (
  zip: AdmZip,
  filesName: string[],
) => {
  const mimetype = getMimetypeFile(filesName);
  return await doCheck(zip, mimetype);
};

const getMimetypeFile = (filesName: string[]) => {
  const mimeTypeFileName = R.find(eqMimetype)(filesName);
  if (!mimeTypeFileName) {
    throw new Error("No mimetype file in archive");
  }
  return mimeTypeFileName;
};

const eqMimetype = (name: string) =>
  R.pipe(R.toLower, R.equals("mimetype"))(name);

// check file mime type

const doCheck = async (zip: AdmZip, fileName: string) => {
  const data = await readZipFile(zip, fileName);

  return R.ifElse(
    R.equals("application/epub+zip"),
    R.T,
    () => {
      throw new Error("Unsupported mime type");
    },
  )(data);
};
