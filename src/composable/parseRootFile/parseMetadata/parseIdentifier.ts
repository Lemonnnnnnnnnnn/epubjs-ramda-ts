import { DcMetaGeneratedType, MetaGeneratedType } from "@/type/rootFile";
import * as R from "ramda";
import { addPlaceholder, hasSymbol } from "../../common";

export const getIdentifier = (
  entity: DcMetaGeneratedType,
) => {
  return R.ifElse(
    Array.isArray,
    R.pipe(
      R.head,
      parseIdentifier,
      addPlaceholder,
      R.trim,
    ),
    R.pipe(
      parseIdentifier,
      addPlaceholder,
      R.trim,
    ),
  )(entity);
};

const parseIdentifier = (
  property: DcMetaGeneratedType,
) => {
  return R.ifElse(
    hasSymbol,
    R.prop("#"),
    R.identity,
  )(property) as string | undefined;
};


const parseCreatorFileAs = (property: MetaGeneratedType) => {
    return R.pathOr(
      undefined,
      ["@", "opf:file-as"],
      property,
    );
  };
  
  