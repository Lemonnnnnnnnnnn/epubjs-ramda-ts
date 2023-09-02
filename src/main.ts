import * as R from "ramda";
import AdmZip from "adm-zip";
import {
  getFileNames,
  checkMimeType,
  getRootFile,
  getContainer,
  parseRootFile,
  getImage as _getImage,
  getImages as _getImages,
  getChapter as _getChapter,
  getChapters as _getChapters,
  getCover as _getCover,
  getTOC as _getTOC,
  getXmlParser,
} from "./composable";

const epub = async (path: string) => {
  const zip = new AdmZip(path);
  const { spine, metadata, manifest } = await prepare(zip);

  const getCover = R.partial(_getCover, [zip, manifest]);
  const getImage = R.partial(_getImage, [zip, manifest]);
  const getImages = () => R.curry(_getImages)(manifest);
  const getChapter = R.partialRight(_getChapter, [
    zip,
    manifest,
  ]);
  const getChapters = () => R.curry(_getChapters)(manifest);
  const getTOC = () =>
    R.curry(_getTOC)(zip, manifest, spine);
  const getMetadata = R.always(metadata);

  return {
    getCover,
    getImage,
    getImages,
    getChapter,
    getChapters,
    getTOC,
    getMetadata,
  };
};

const prepare = async (zip: AdmZip) => {
  const xmlparser = getXmlParser();
  const filesName = getFileNames(zip);
  console.log("check mime type ...");
  await checkMimeType(zip, filesName);

  console.log("get container xml file ...");
  const container = await getContainer(zip, filesName);

  console.log("get root files ...");
  const { rootFileData } = await getRootFile(
    zip,
    xmlparser,
    container,
  );

  console.log("parse root file ...");
  return parseRootFile(rootFileData);
};

export default epub;
export { epub };
