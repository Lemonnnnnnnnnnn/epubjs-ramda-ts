import { Creator, DcCreator } from "@/types/rootFile";
import * as R from "ramda";
import { addPlaceholder, hasSymbol } from "../../common";

export const getCreatorProp = (entity: DcCreator) => {

  const creator = R.ifElse(
    Array.isArray,
    R.pipe(
      R.head,
      parseCreatorProp,
      addPlaceholder,
      R.trim,
    ),
    R.pipe(parseCreatorProp, addPlaceholder, R.trim),
  )(entity);

  const addCreatorFileAsPlaceholder = R.partialRight(
    addPlaceholder,
    [creator],
  );
  
  const creatorFileAs = R.ifElse(
    Array.isArray,
    R.pipe(
      R.head,
      parseCreatorFileAs,
      addCreatorFileAsPlaceholder,
      R.trim,
    ),
    R.pipe(
      parseCreatorFileAs,
      addCreatorFileAsPlaceholder,
      R.trim,
    ),
  )(entity);

  return { creator, creatorFileAs };
};

const parseCreatorProp = (property: DcCreator) => {
  return R.ifElse(
    hasSymbol,
    R.prop("#"),
    R.identity,
  )(property) as string | undefined;
};

const parseCreatorFileAs = (property: Creator) => {
  return R.pathOr(
    undefined,
    ["@", "opf:file-as"],
    property,
  );
};

