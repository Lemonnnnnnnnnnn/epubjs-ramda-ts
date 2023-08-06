import AdmZip from "adm-zip";
import { ReportError } from "./emit";
import * as R from "ramda";
import {
  toLowerCase,
  readFile,
} from "./common";
/**
 * checks if there's a file called "mimetype" and that contents are "application/epub+zip"
 */
export const checkMimeType = (
  zip: AdmZip,
  zipNames: string[],
) => {
  return R.pipe(
    getMimetypeFile,
    doCheck(zip),
  )(zipNames);
};

const getMimetypeFile = (
  zipNames: string[],
) => {
  const mimeTypeFileName =
    R.find(eqMimetype)(zipNames);
  if (!mimeTypeFileName)
    return ReportError(
      "No mimetype file in archive",
    );
  return mimeTypeFileName;
};

const eqMimetype = (name: string) =>
  R.pipe(
    toLowerCase,
    R.equals("mimetype"),
  )(name);

  
// check file mime type
const doCheck = (zip: AdmZip) => {
  return R.curry(_doCheck)(zip);
};

const _doCheck = (
  zip: AdmZip,
  fileName: string,
) => {
  const data = readFile(zip, fileName);
  const isSupportedType = R.equals(
    "application/epub+zip",
  )(data);

  if (!isSupportedType)
    return ReportError(
      "Unsupported mime type",
    );

  return true;
};
