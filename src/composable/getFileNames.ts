import AdmZip from "adm-zip";
import * as R from "ramda";

/**
 * epub file is actually a zip file , so we parseZip it and get all file's path
 */

export const getFileNames = (zip: AdmZip) => {
  const entries = zip.getEntries();
  return R.map(getEntryName)(entries);
};

const getEntryName = (entry: AdmZip.IZipEntry) => {
  return R.prop("entryName")(entry);
};
