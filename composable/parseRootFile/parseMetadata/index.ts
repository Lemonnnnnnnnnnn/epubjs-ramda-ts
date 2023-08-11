import { Metadata , DcPublisher } from "../../../type/rootFile";
import * as R from 'ramda'
import { getPublisher } from "./parsePublisher";


export const parseMetaData = (metaData: Metadata) => {
  R.forEachObjIndexed(
    (val, key) => {
        if(key === 'dc:publisher'){
            const publisher = getPublisher(val as DcPublisher)
            console.log(publisher);
        }
    },
    metaData,
  );
};
