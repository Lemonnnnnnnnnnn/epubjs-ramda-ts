import AdmZip from "adm-zip";
import * as R from "ramda";
import * as xml2js from "xml2js";
import { getZip } from "./composable/zip";

const getEpub = (url: string) => {
  getZip(url);
};

const checkMimeType = () => {};

const getContainerFile = () => {};

const getXml = () => {};

const getRootFile = () => {};

const parseXml = () => {};

const parseRootFile = () => {};

const parseMetaData = () => {};

const parseManifestData = () => {};

const parseTOC = () => {};

const getChapter = () => {};

const getChapterRaw = () => {};

const getImage = () => {};

const test = () => {
  getEpub("1.epub");
};

test();
