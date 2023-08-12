import {
  ParsedManifest,
  parsedSpine,
} from "@/types/rootFile";
import * as R from "ramda";
import { readZipFile } from ".";
import AdmZip from "adm-zip";

export const getTOC = async (
  zip: AdmZip,
  manifest?: ParsedManifest,
  spine?: parsedSpine,
) => {
  if (!spine?.toc) return undefined;
  if (!manifest) return undefined;

  const tocEntity = R.pick([spine.toc], manifest);

  if (!tocEntity) throw new Error("TOC not found");

  const path = tocEntity[spine.toc].href;
  const raw = await readZipFile(zip, path);

  return parseBody(raw);
};

const parseBody = (raw: string) => {
  return R.pipe(getNavpoints, R.map(parseNavpoint))(raw);
};

const getNavpoints = (raw: string) => {
  return R.match(/<navpoint.*>[\S\s]+?<\/navpoint>/g)(raw);
};

const parseNavpoint = (navpointRaw: string) => {
  const id = R.match(/id="(.+?)"/)(navpointRaw)[1];
  const label = R.match(
    /<navlabel.*>[\S\s]+<text.*>([\S\s]+)<\/text>[\S\s]+<\/navlabel>/,
  )(navpointRaw)[1];
  const link = R.match(
    /<content.*src="(.+)".*\/>/,
  )(navpointRaw)[1];

  return { id, label, link };
};
