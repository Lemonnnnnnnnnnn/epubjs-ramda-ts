import AdmZip from "adm-zip";
import { ReportError } from "./emit";
import * as R from "ramda";
import xml2js from 'xml2js'

export const toLowerCase = (str: string) =>
  str.toLowerCase();

export const toUTF8 = (str: Buffer) =>
  str.toString("utf-8");

export const readFile = (zip: AdmZip, name: string) => {
  let buffer;
  try {
    buffer = zip.readFile(name);
  } catch (e) {
    return ReportError("Reading archive failed");
  }

  return R.pipe(toUTF8, toLowerCase, trim)(buffer!);
};


export const getXmlParser = () => {
    return new xml2js.Parser(xml2jsOptions)
}


const xml2jsOptions = xml2js.defaults['0.1']
const trim = (str: string) => str.trim();
