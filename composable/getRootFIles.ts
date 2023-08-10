import {
  toLowerCase,
  readFile,
  getXmlParser,
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

const hasMediaType = (entity: RootFile) => {
  return R.has("media-type")(entity);
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

const getFileName = (rootfilePkg: RootFilePkg) => {
  const target = R.find(
    R.allPass([hasMediaType, mediaTypeEqXML, hasFullPath]),
  )(rootfilePkg);
  if (!target) {
    throw new Error("No full-path in rootfile");
  }

  const fullPath = R.path<string>(["@", "full-path"])(
    target,
  );

  if (!fullPath) {
    throw new Error("full-path file is missing");
  }

  return R.pipe(toLowerCase, R.trim)(fullPath);
};

const parseContainerFile = async (
  zip: AdmZip,
  names: string[],
) => {
  const containerFile = getContainerFile(names);
  if (!containerFile) {
    throw new Error("No container file in archive");
  }

  const xmlData = readFile(zip, containerFile);

  const xmlParser = getXmlParser();

  try {
    const result = await xmlParser.parseStringPromise(
      xmlData,
    );
    if (!hasRootFiles(result)) {
      throw new Error("No rootfile in container file");
    }

    const rootFilePkg = getRootFilePkg(result);
    const fileName = getFileName(rootFilePkg);
  } catch (e) {
    throw new Error(
      "Parsing container XML failed in getRootFiles",
    );
  }
};

