import AdmZip from "adm-zip";
import * as R from "ramda";
import xml2js from 'xml2js'

const xml2jsOptions = xml2js.defaults['0.1']


export const toLowerCase = (str: string) =>
  str.toLowerCase();

export const toUTF8 = (str: Buffer) =>
  str.toString("utf-8");

export const readZipFile = (zip: AdmZip, name: string) => {
  let buffer;
  try {
    buffer = zip.readFile(name);
  } catch (e) {
    throw new Error("Reading archive failed");
  }

  return R.pipe(toUTF8, toLowerCase, R.trim)(buffer!);
};


export const getXmlParser = () => {
    return new xml2js.Parser(xml2jsOptions)
}

export const isArray = (entity : unknown) => {
    return Array.isArray(entity)
}




export const hasSymbol = (entity: unknown) => {
  return R.has("#")(entity);
};

export   const addPlaceholder = (str: string | undefined) => {
  return R.ifElse(R.isNil, () => "", R.identity)(str);
};