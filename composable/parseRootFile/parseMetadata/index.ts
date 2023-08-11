import {
  Metadata,
  DcMetaGeneratedType,
  DcCreator,
} from "../../../type/rootFile";
import * as R from "ramda";
import { getGeneratedProp } from "./parseGeneratedProp";
import { getCreatorProp } from "./parseCreator";

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

  R.forEachObjIndexed((val, key) => {
    if (GENERATED_PROPERTYS.includes(key)) {
      const name = getPropertyName(key);
      const addProp = R.partial(_addProp, [res, name]);

      R.pipe(
        getGeneratedProp,
        addProp,
      )(val as DcMetaGeneratedType);
    } else if (key === "dc:creator") {
      const addProp = (
        o: ReturnType<typeof getCreatorProp>,
      ) => {
        return R.forEachObjIndexed((val, name) => {
          const addProp = R.partial(_addProp, [res, name]);
          addProp(val);
        })(o);
      };

      R.pipe(getCreatorProp, addProp)(val as DcCreator);
    } else if (key === "dc:identifier") {
    }
  }, metaData);

  return res;
};

const getPropertyName = (rawName: string) => {
  return R.split(":", rawName)[1];
};

const _addProp = (
  o: Record<keyof any, any>,
  name: string,
  data: any,
) => Object.assign(o, { [name]: data });
