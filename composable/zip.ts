import AdmZip from "adm-zip";
import * as R from "ramda";
import { ReportError } from "./emit";

export const getZip = (url: string) => {
  try {
    const zip =  new AdmZip(url);
    
  } catch (e) {
    return ReportError("Invalid/missing file");
  }
};

const getZipNames = (zip: AdmZip) => {
  const entries = zip.getEntries();
  return R.map(getEntryName)(entries);
};

const getEntryName = (entry: AdmZip.IZipEntry) => {
  return R.prop("entryName")(entry);
};

const getZipFile = (zip: AdmZip, name: string) => {
  return zip.readFile(name);
};


// test
const test = () => {
  const zip = getZip("1.epub");
  if (!zip) return;
  const names = getZipNames(zip);

  if (!names || !names.length) return ReportError("No files in archive");

  // checkMimeType(names);
  // const file = getZipFile(zip, names[0]);
  // console.log(file);
};

test();
