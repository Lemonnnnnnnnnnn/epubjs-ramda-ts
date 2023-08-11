import {
  DcMetaGeneratedType,
  MetaGeneratedType,
} from "@/types/rootFile";
import * as R from "ramda";
import { addPlaceholder, hasSymbol } from "../../common";

export const getIdentifier = (
  entity: DcMetaGeneratedType,
) => {
  const ISBN = R.ifElse(
    Array.isArray,
    R.pipe(
      findItem,
      getISBN,
    ),
    getISBN
  )(entity)

  const UUID = R.ifElse(
    Array.isArray,
    R.pipe(
      findItem,
      getUUID
    ),
    getUUID
  )(entity)

  return {ISBN , UUID}
};

const findItem = (entity: MetaGeneratedType[]) => {
  return R.find<MetaGeneratedType>(R.has("@"))(entity);
};


const getISBN = (property?: MetaGeneratedType) => {
  if(R.isNil(property)) return undefined
  
  return R.ifElse(
    hasISBN,
    R.pipe(R.prop("#"), R.trim),
    R.always(undefined),
  )(property);
};

const hasISBN = (property: MetaGeneratedType) => {
  return R.hasPath(["@", "opf:scheme"])(property);
};

const getUUID = (property?: MetaGeneratedType) => {
  if(R.isNil(property)) return undefined
  return R.ifElse(
    hasUUID,
    parseUUID,
    R.always(undefined),
  )(property);
};

const hasUUID = (property: MetaGeneratedType) => {
  return R.pipe(
    R.path(["@", "id"]),
    addPlaceholder,
    matchUUID,
  )(property);
};

const matchUUID = (str: string) =>
  R.partial(R.test, [/uuid/i])(str);

const parseUUID = (property: MetaGeneratedType) => {
  const strip = (uuidRaw: string) => {
    return R.partial(R.replace, ["urn:uuiid", ""])(uuidRaw);
  };

  return R.pipe(
    R.prop("#"),
    addPlaceholder,
    strip,
    R.toUpper,
    R.trim,
  )(property);
};
