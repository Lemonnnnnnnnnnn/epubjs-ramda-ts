import { DcMetaGeneratedType } from "@/types/rootFile";
import * as R from "ramda";
import { addPlaceholder, hasSymbol } from "../../common";

export const getGeneratedProp = (
  entity: DcMetaGeneratedType,
) => {
  return R.ifElse(
    Array.isArray,
    R.pipe(
      R.head,
      parseGeneratedProp,
      addPlaceholder,
      R.trim,
    ),
    R.pipe(
      parseGeneratedProp,
      addPlaceholder,
      R.trim,
    ),
  )(entity);
};

const parseGeneratedProp = (
  property: DcMetaGeneratedType,
) => {
  return R.ifElse(
    hasSymbol,
    R.prop("#"),
    R.identity,
  )(property) as string | undefined;
};
