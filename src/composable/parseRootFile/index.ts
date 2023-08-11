import {
  RootFile,
  Metadata,
  Manifest,
  Guide,
  Spine,
  GeneratedType,
} from "@/types/rootFile";
import { parseMetaData } from "./parseMetadata";
import * as R from "ramda";
import { addProp } from "../common";
import { parseManifest } from "./parseManifest";
import path from "path";

export const parseRootFile = (
  rootFileData: RootFile,
) => {
  const res = {};

  R.forEachObjIndexed((val, key) => {
    switch (key) {
      case "metadata":
        const metadata = parseMetaData(val as Metadata);
        addProp(res, "metadata", metadata);
        break;
      case "manifest":
        const manifest = parseManifest(
          val as Manifest,
        );
        addProp(res, "manifest", manifest);
        break;
    }
  }, rootFileData);

  return res;
};
