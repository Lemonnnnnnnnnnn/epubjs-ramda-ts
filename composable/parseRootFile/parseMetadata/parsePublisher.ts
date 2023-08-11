import { DcPublisher } from "../../../type/rootFile";
import * as R from "ramda";
import { addPlaceholder , hasSymbol } from "../../common";


export const getPublisher = (entity: DcPublisher) => {
    return R.ifElse(
      Array.isArray,
      R.pipe(R.head, parsePublisher, addPlaceholder, R.trim),
      R.pipe(parsePublisher, addPlaceholder, R.trim),
    )(entity);
  };
  
  const parsePublisher = (
    dcpublisher: DcPublisher | string,
  ) => {
    return R.ifElse(
      hasSymbol,
      R.prop("#"),
      R.identity,
    )(dcpublisher) as string | undefined;
  };
  
