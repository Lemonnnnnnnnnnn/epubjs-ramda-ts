import { addProp as _addProp } from "@/composable";
import {
  Manifest,
  ManifestItem,
  Spine,
} from "@/types/rootFile";
import * as R from "ramda";

/**
 *  Parses "spine" block (all html elements that are shown to the reader)
 **/
export const parseSpine = (spine: Spine) => {
  const toc = getToc(spine);
  const content = getContent(spine);

  return {
    toc,
    content,
  };
};

const getToc = (spine: Spine) => {
  return R.pathOr(undefined, ["@", "toc"])(spine);
};

const getContent = (spine: Spine) => {
  const _container = R.prop("itemref")(spine);
  const container = R.ifElse(
    Array.isArray,
    R.identity,
    () => [R.identity],
  )(_container);

  return R.map(R.path(["@", "idref"]))(container);
};
