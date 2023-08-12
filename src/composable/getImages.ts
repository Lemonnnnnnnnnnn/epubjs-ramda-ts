import { ParsedManifest , ManifestItem } from "@/types/rootFile";
import * as R from "ramda";
import { readZipFileRaw as _readZipFileRaw } from "./common";
import AdmZip from "adm-zip";

type ParsedManifestItem = ManifestItem['@']

export const getImages = (manifest?: ParsedManifest) => {
    if(!manifest) return {}
    return R.filter(mediaTypeEqImage , manifest)
};

const mediaTypeEqImage = (manifestItem: ParsedManifestItem) => {
  return R.test(/.*image*./, manifestItem["media-type"]);
};

export const getImage = (zip : AdmZip , images : ParsedManifest , id : string) => {
    const addonZip = R.partial(_readZipFileRaw , [zip]);
    const readZipFileRaw = (item : ParsedManifestItem) => addonZip(item.href)

    return R.ifElse(
        R.has(id),
        R.pipe(
            R.prop<ParsedManifestItem>(id),
            readZipFileRaw
        ),
        R.always(undefined)
    )(images)
}

