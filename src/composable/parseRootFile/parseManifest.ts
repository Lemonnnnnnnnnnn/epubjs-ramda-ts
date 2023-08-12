import { addProp as _addProp } from "@/composable";
import { Manifest, ManifestItem } from "@/types/rootFile";
import * as R from "ramda";

/**
 *  Parses "manifest" block (all items included, html files, images, styles)
 **/
export const parseManifest = (manifest: Manifest) => {
  return R.ifElse(
    R.has("item"),
    getItems,
    R.always(undefined),
  )(manifest);
};

const getItems = (manifest: Manifest) => {
  const data = R.pipe(
    R.prop("item"),
    getItemHasAt,
    R.map(R.prop("@")),
  )(manifest);

  const res = {};

  const addProp = (item: ManifestItem["@"]) => {
    _addProp(res, item.id, item);
  };

  R.forEach(addProp, data);

  return res
};

const hasAt = (entity: unknown) => R.has("@")(entity);
const getItemHasAt = (manifest: Manifest["item"]) => {
  if (!manifest) return [];
  return R.filter(hasAt, manifest);
};
