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
  "dc:subject" : DcMetaGeneratedType;
  "dc:description" : DcMetaGeneratedType;
  "dc:identifier": DcMetaGeneratedType;
  
  meta: Meum[];
  "dc:creator": DcCreator;
}

export type DcMetaGeneratedType  = string | MetaGeneratedType | MetaGeneratedType[]

export interface MetaGeneratedType {
  "#": string;
  "@": GeneratedType;
}

export interface GeneratedType {
  "opf:scheme": string;
  id?: string;
}

export type DcCreator  = string | Creator | Creator[]

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
  item: Item[];
}

export interface Item {
  "@": GeneratedType7;
}

export interface GeneratedType7 {
  href: string;
  id: string;
  "media-type": string;
}

export interface Spine {
  "@": GeneratedType8;
  itemref: Itemref[];
}

export interface GeneratedType8 {
  toc: string;
}

export interface Itemref {
  "@": GeneratedType9;
}

export interface GeneratedType9 {
  idref: string;
}

export interface Guide {
  reference: Reference[];
}

export interface Reference {
  "@": GeneratedType10;
}

export interface GeneratedType10 {
  href: string;
  title: string;
  type: string;
}
