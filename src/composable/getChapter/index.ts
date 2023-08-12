import {
  ManifestItem,
  ParsedManifest,
} from "@/types/rootFile";
import AdmZip from "adm-zip";
import * as R from "ramda";
import {
  readZipFileRaw as _readZipFileRaw,
  readZipFile as _readZipFile,
} from "../common";

type ParsedManifestItem = ManifestItem["@"];

export const getChapter = (
  id: string,
  zip: AdmZip,
  manifest?: ParsedManifest,
) => {
  if (!manifest) return undefined;
  const chapters = getChapters(manifest);

  const addonZip = R.partial(_readZipFile, [zip]);
  const readZipFileRaw = (item: ParsedManifestItem) =>
    addonZip(item.href);

  const getBody = (chapters : ParsedManifest) => {
    return R.pipe(
        R.prop<ParsedManifestItem>(id),
        readZipFileRaw,
        parseBody
    )(chapters)
  }

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
