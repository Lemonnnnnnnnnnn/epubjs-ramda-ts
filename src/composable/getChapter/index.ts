import {
  ManifestItem,
  ParsedManifest,
} from "@/types/rootFile";
import AdmZip from "adm-zip";
import * as R from "ramda";
import { readZipFile } from "../common";

type ParsedManifestItem = ManifestItem["@"];

export const getChapter = async (
  id: string,
  zip: AdmZip,
  manifest?: ParsedManifest,
) => {
  if (!manifest) return undefined;
  const chapters = getChapters(manifest);

  const getBody = async (chapters: ParsedManifest) => {
    const item = chapters[id];
    const rawData = await readZipFile(zip, item.href);
    return parseBody(rawData);
  };

  return R.ifElse(
    R.has(id),
    getBody,
    R.always(undefined),
  )(chapters);
};

const parseBody = (raw: string) => {
  const getSecond = (arr?: string[]) => arr?.[1];

  return R.pipe(
    R.match(/<body.*>([\S\s]+)<\/body>/),
    getSecond,
  )(raw);
};

export const getChapters = (manifest?: ParsedManifest) => {
  if (!manifest) return {};
  return R.filter(mediaTypeEqXhtml, manifest);
};

const mediaTypeEqXhtml = (
  manifestItem: ParsedManifestItem,
) => {
  return R.test(/.*xhtml*./, manifestItem["media-type"]);
};
