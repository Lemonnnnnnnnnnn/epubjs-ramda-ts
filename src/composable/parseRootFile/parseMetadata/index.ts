import {
  Metadata,
  DcMetaGeneratedType,
  DcCreator,
} from "@/types/rootFile";
import * as R from "ramda";
import { getGeneratedProp } from "./parseGeneratedProp";
import { getCreatorProp } from "./parseCreator";
import { addProp as _addProp } from "@/composable";

const GENERATED_PROPERTYS = [
  "dc:language",
  "dc:description",
  "dc:title",
  "dc:subject",
  "dc:date",
  "dc:publisher",
];

export const parseMetaData = (metaData: Metadata) => {
  const res = {};
  const addPropBatch = R.partial(_addPropBatch, [res]);

  R.forEachObjIndexed((val, key) => {
    if (GENERATED_PROPERTYS.includes(key)) {
      const name = getPropertyName(key);
      const addProp = R.partial(_addProp, [res, name]);

      R.pipe(
        getGeneratedProp,
        addProp,
      )(val as DcMetaGeneratedType);
    } else if (key === "dc:creator") {
      R.pipe(getCreatorProp, addPropBatch)(val as DcCreator);
    } 
  }, metaData);

  return res;
};

const getPropertyName = (rawName: string) => {
  return R.split(":", rawName)[1];
};

const _addPropBatch = (
  originObject : Record<string , any>,
  newProp: Record<string , any>,
) => {
  return R.forEachObjIndexed((val, name) => {
    const addProp = R.partial(_addProp, [originObject, name]);
    addProp(val);
  })(newProp);
};