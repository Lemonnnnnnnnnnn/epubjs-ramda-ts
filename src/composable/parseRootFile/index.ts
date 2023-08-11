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

export const parseRootFile = (rootFile: RootFile) => {
  R.forEachObjIndexed((val, key) => {
    switch (key) {
      case "metadata":
        const metadata = parseMetaData(val as Metadata);
        console.log(metadata);
    }
  }, rootFile);
};
