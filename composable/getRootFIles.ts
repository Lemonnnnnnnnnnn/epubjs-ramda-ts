import {
  toLowerCase,
  readFile,
  getXmlParser,
} from "./common";
import * as R from "ramda";
import { ReportError } from "./emit";
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

const parseContainerFile = async (
  zip: AdmZip,
  names: string[],
) => {
  const containerFile = getContainerFile(names);
  if (!containerFile) {
    return ReportError("No container file in archive");
  }

  const xmlData = readFile(zip, containerFile);

  const xmlParser = getXmlParser();

  try {
    const result = await xmlParser.parseStringPromise(
      xmlData,
    );
    if (!hasRootFiles(result)) {
      return ReportError("No rootfile in container file");
    }


    
  } catch (e) {
    return ReportError(
      "Parsing container XML failed in getRootFiles",
    );
  }
};

const hasRootFiles = (result: any) => {
  if (!R.has("rootfiles")(result)) return false;
  if (
    !R.pipe(R.prop("rootfiles"), R.has("rootfile"))(result)
  )
    return false;
  return true;
};

const getRootFile = () => {};
