export interface RootFile {
  "@": GeneratedType;
  metadata: Metadata;
  manifest: Manifest;
  spine: Spine;
  guide: Guide;
}

export interface GeneratedType {
  xmlns: string;
  "unique-identifier": string;
  version: string;
}

export interface Metadata {
  "@": At;
  "dc:title": DcMetaGeneratedType;
  "dc:publisher": DcMetaGeneratedType;
  "dc:language": DcMetaGeneratedType;
  "dc:date": DcMetaGeneratedType;
  "dc:subject": DcMetaGeneratedType;
  "dc:description": DcMetaGeneratedType;
  // "dc:identifier": DcMetaGeneratedType;

  meta: Meum[];
  "dc:creator": DcCreator;
}

export type DcMetaGeneratedType =
  | string
  | MetaGeneratedType
  | MetaGeneratedType[];

export interface MetaGeneratedType {
  "#": string;
  "@": GeneratedType;
}

export interface GeneratedType {
  "opf:scheme": string;
  id?: string;
}

export type DcCreator = string | Creator | Creator[];

export interface Creator {
  "#": string;
  "@": CreatorAt;
}

export interface CreatorAt {
  "opf:file-as": string;
  "opf:role": string;
}

export interface At {
  "xmlns:calibre": string;
  "xmlns:dc": string;
  "xmlns:dcterms": string;
  "xmlns:opf": string;
  "xmlns:xsi": string;
}

export interface Meum {
  "@": MeumAt;
}

export interface MeumAt {
  name: string;
  content: string;
}

export interface Manifest {
  item?: ManifestItem[];
}

export interface ManifestItem {
  "@": {
    href: string;
    id: string;
    "media-type": string;
  };
}

export type ParsedManifest = Record<
  string,
  ManifestItem["@"]
>;
export type ParsedMetadata = Record<
  | "language"
  | "title"
  | "publisher"
  | "creator"
  | "creatorFileAs"
  | "date"
  | "subject"
  | "description",
  string
>;

export type parsedSpine = {
  toc ?: string
  content : string[]
}

export interface ParsedRootFile {
  metadata?: ParsedMetadata;
  manifest?: ParsedManifest;
  spine?: parsedSpine;
}


export interface Spine {
  "@": SpineAt;
  itemref: Itemref[];
}

export interface SpineAt {
  toc: string;
}

export interface Itemref {
  "@": ItemRefAt;
}

export interface ItemRefAt {
  idref: string;
}

export interface Guide {
  reference: Reference[];
}

export interface Reference {
  "@": ReferenceAt;
}

export interface ReferenceAt {
  href: string;
  title: string;
  type: string;
}
