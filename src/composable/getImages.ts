import {
  ParsedManifest,
  ManifestItem,
} from "@/types/rootFile";
import * as R from "ramda";
import { readZipFileRaw } from "./common";
import AdmZip from "adm-zip";

type ParsedManifestItem = ManifestItem["@"];

export const getImages = (manifest?: ParsedManifest) => {
  if (!manifest) return {};
  return R.filter(mediaTypeEqImage, manifest);
};

const mediaTypeEqImage = (
  manifestItem: ParsedManifestItem,
) => {
  return R.test(/.*image*./, manifestItem["media-type"]);
};

export const getImage = async (
  zip: AdmZip,
  manifest: ParsedManifest,
  id: string,
) => {
  if (!manifest[id]) return undefined;

  const item = manifest[id];
  return await readZipFileRaw(zip, item.href);
};

export const getCover = (
  zip: AdmZip,
  manifest: ParsedManifest,
  id: string = "cover",
) => getImage(zip, manifest, id);
