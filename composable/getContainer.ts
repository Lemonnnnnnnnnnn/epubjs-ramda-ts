import * as R from "ramda";
import {
  toLowerCase,
  readZipFile,
  getXmlParser,
} from "./common";
import AdmZip from "adm-zip";

export const getContainer = async (
  zip: AdmZip,
  names: string[],
) => {
  const containerFile = getContainerFile(names);
  if (!containerFile) {
    throw new Error("No container file in archive");
  }

  console.log("parsing container xml file ...");

  const containerData = readZipFile(zip, containerFile);

  const xmlParser = getXmlParser();

  return await xmlParser.parseStringPromise(containerData);
};

const getContainerFile = (names: string[]) => {
  return R.find(eqContainer)(names);
};

const eqContainer = (name: string) => {
  return R.pipe(
    toLowerCase,
    R.equals("meta-inf/container.xml"),
  )(name);
};
