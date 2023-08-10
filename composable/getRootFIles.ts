import {
  toLowerCase,
  readZipFile,
  getXmlParser,
  isArray,
} from "./common";
import * as R from "ramda";
import AdmZip from "adm-zip";

/**
 * Looks for a "meta-inf/container.xml" file and searches for a
 * rootfile element with mime type "application/oebps-package+xml"
 */

const getContainerFile = (names: string[]) => {
  return R.find(eqContainer)(names);
};

const eqContainer = (name: string) => {
  return R.pipe(
    toLowerCase,
    R.equals("meta-inf/container.xml"),
  )(name);
};

const hasRootFiles = (result: ParserResult) => {
  const hasRootfiles = R.has("rootfiles");
  const hasRootfile = R.pipe(
    R.prop("rootfiles"),
    R.has("rootfile"),
  );

  return R.allPass([hasRootfiles, hasRootfile])(result);
};

interface RootFile {
  "@": {
    "media-type"?: string;
    "full-path"?: string;
  };
}

type RootFilePkg = RootFile[];

interface ParserResult {
  rootfiles: {
    rootfile: RootFilePkg;
  };
}

const getRootFilePkg = (result: ParserResult) => {
  return R.path<RootFilePkg>(["rootfiles", "rootfile"])(
    result,
  );
};

const mediaTypeEqXML = (entity: RootFile) => {
  return R.pipe(
    R.prop("media-type"),
    R.equals("application/oebps-package+xml"),
  )(entity);
};

const hasFullPath = (entity: RootFile) => {
  return R.pipe(R.prop("@"), R.has("full-path"))(entity);
};

const getFullPathFilesName = (rootfilePkg: RootFile) => {
  const fullPath = R.path<string>(["@", "full-path"])(
    rootfilePkg,
  );
  if (!fullPath) {
    throw new Error("full-path file is missing");
  }
  return R.pipe(toLowerCase, R.trim)(fullPath);
};

const getRootFileEntity = (rootfilePkg: RootFilePkg | RootFile) : RootFile => {

  const rootfile = R.ifElse(
    Array.isArray,
    R.find(
      R.allPass([mediaTypeEqXML, hasFullPath]),
    ),
    ()=> rootfilePkg
    // @ts-expect-error
  )(rootfilePkg)

  if(!rootfile) {
    throw new Error("No rootfile in container file");
  }

  return rootfile as RootFile
}

export const getRootFile = async (
  zip: AdmZip,
  names: string[],
) => {
  const containerFile = getContainerFile(names);
  if (!containerFile) {
    throw new Error("No container file in archive");
  }

  const xmlData = readZipFile(zip, containerFile);

  const xmlParser = getXmlParser();

  const result = await xmlParser.parseStringPromise(
    xmlData,
  );

  const rootFilePkg = getRootFilePkg(result);

  if (!rootFilePkg) {
    throw new Error("No rootfile in container file");
  }


  const rootFileName = R.pipe(
    getRootFileEntity,
    getFullPathFilesName
  )(rootFilePkg)

  console.log(rootFileName);
  
  return rootFileName;
};
