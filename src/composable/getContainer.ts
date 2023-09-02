import * as R from "ramda";
import {
  readZipFile,
  getXmlParser,
} from "./common";
import AdmZip from "adm-zip";

// 查找名字为 meta-inf/container.xml 的文件
export const getContainer = async (
  zip: AdmZip,
  names: string[],
) => {
  // 从 epub 包中获取 meta-inf/container.xml 文件
  const containerFile = getContainerFile(names);
  if (!containerFile) {
    throw new Error("No container file in archive");
  }

  console.log("parsing container xml file ...");

  // 解析 container.xml 文件
  const containerData = await readZipFile(zip, containerFile);

  const xmlParser = getXmlParser();

  return await xmlParser.parseStringPromise(containerData);
};

const getContainerFile = (names: string[]) => {
  return R.find(eqContainer)(names);
};

const eqContainer = (name: string) => {
  return R.pipe(
    R.toLower,
    R.equals("meta-inf/container.xml"),
  )(name);
};
