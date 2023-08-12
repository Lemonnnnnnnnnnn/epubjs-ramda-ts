import AdmZip from "adm-zip";
import * as R from "ramda";
import xml2js from "xml2js";

const xml2jsOptions = xml2js.defaults["0.1"];

export const toUTF8 = (str: Buffer) =>
  str.toString("utf-8");

export const readZipFile = (zip: AdmZip, name?: string) => {
  if (!name) throw new Error("read file need file name");

  let buffer;
  try {
    buffer = zip.readFile(name);
    return R.pipe(
      zip.readFile,
      R.defaultTo(Buffer.from("")),
      toUTF8,
      R.toLower,
      R.trim,
    )(name);
  } catch (e) {
    throw new Error("Reading archive failed");
  }

};

export const readZipFileRaw = (
  zip: AdmZip,
  name?: string,
) => {
  if (!name) throw new Error("read file need file name");

  try {
    return zip.readFile(name);
  } catch (e) {
    throw new Error("Reading archive failed");
  }
};

export const getXmlParser = () => {
  return new xml2js.Parser(xml2jsOptions);
};

export const isArray = (entity: unknown) => {
  return Array.isArray(entity);
};

export const hasSymbol = (entity: unknown) => {
  return R.has("#")(entity);
};

export const addPlaceholder = (
  str: string | undefined,
  placeholder: string = "",
) => {
  return R.ifElse(
    R.isNil,
    () => placeholder,
    R.identity,
  )(str);
};

export const addProp = (
  o: Record<keyof any, any>,
  name: string,
  data: any,
) => Object.assign(o, { [name]: data });
