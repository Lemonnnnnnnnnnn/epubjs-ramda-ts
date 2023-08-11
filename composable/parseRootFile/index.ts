import {
  RootFile,
  Metadata,
  Manifest,
  Guide,
  Spine,
  GeneratedType,
} from "../../type/rootFile";
import { parseMetaData } from "./parseMetadata";
import * as R from "ramda";


export const parseRootFile = (rootFile: RootFile) => {
  R.forEachObjIndexed((val, key) => {
    switch (key) {
      case "metadata":
        parseMetaData(val as Metadata);
    }
  }, rootFile);
};
