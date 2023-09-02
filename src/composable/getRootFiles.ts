import { readZipFile } from "./common";
import * as R from "ramda";
import AdmZip from "adm-zip";
import { Parser } from "xml2js";
import {
  ParserResult,
  Entity,
  EntityPkg,
} from "@/types/container";

//
export const getRootFile = async (
  zip: AdmZip,
  xmlParser: Parser,
  container: ParserResult,
) => {
  // 从 container 中查找 rootFile 的信息
  const rootFilePkg = getRootFilePkg(container);

  if (!rootFilePkg) {
    throw new Error("No rootfile in container file");
  }

  // 解析 container 中 rootFile 的信息
  const rootFileName = R.pipe(
    getRootFileMsg,
    getRootFileName,
  )(rootFilePkg);

  // 从 epub 包中获取 rootFile 的数据
  const rootFileData = await getRootFileEntity(
    zip,
    xmlParser,
    rootFileName,
  );
  return {
    rootFileData,
    rootFileName,
  };
};

const getRootFilePkg = (result: ParserResult) => {
  return R.path<EntityPkg>(["rootfiles", "rootfile"])(
    result,
  );
};

const getRootFileMsg = (
  rootfilePkg: EntityPkg | Entity,
): Entity => {
  const rootfile = R.ifElse(
    Array.isArray,
    R.find(R.allPass([mediaTypeEqXML, hasFullPath])),
    R.identity,
    // @ts-expect-error
  )(rootfilePkg);

  if (!rootfile) {
    throw new Error("No rootfile in container file");
  }

  return rootfile as Entity;
};

const getRootFileName = (rootfilePkg: Entity) => {
  const fullPath = R.path<string>(["@", "full-path"])(
    rootfilePkg,
  );
  if (!fullPath) {
    throw new Error("full-path file is missing");
  }

  return R.trim(fullPath);
};

const getRootFileEntity = async (
  zip: AdmZip,
  xmlParser: Parser,
  rootFileName: string,
) => {
  const data = await readZipFile(zip, rootFileName);
  return await xmlParser.parseStringPromise(data);
};

const mediaTypeEqXML = (entity: Entity) => {
  return R.pipe(
    R.prop("media-type"),
    R.equals("application/oebps-package+xml"),
  )(entity);
};

const hasFullPath = (entity: Entity) => {
  return R.pipe(R.prop("@"), R.has("full-path"))(entity);
};
