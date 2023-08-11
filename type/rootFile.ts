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
  "@": GeneratedType2;
  "dc:language": string;
  "dc:title": string;
  meta: Meum[];
  "dc:publisher": DcPublisher;
  "dc:identifier": DcIdentifier[];
  "dc:contributor": DcContributor;
  "dc:creator": DcCreator;
  "dc:date": string;
}

export type DcPublisher = string | Publisher | Publisher[]

export interface GeneratedType2 {
  "xmlns:calibre": string;
  "xmlns:dc": string;
  "xmlns:dcterms": string;
  "xmlns:opf": string;
  "xmlns:xsi": string;
}

export interface Meum {
  "@": GeneratedType3;
}

export interface GeneratedType3 {
  name: string;
  content: string;
}

export interface Publisher {
  "#" : string
}

export interface DcIdentifier {
  "#": string;
  "@": GeneratedType4;
}

export interface GeneratedType4 {
  "opf:scheme": string;
  id?: string;
}

export interface DcContributor {
  "#": string;
  "@": GeneratedType5;
}

export interface GeneratedType5 {
  "opf:role": string;
}

export interface DcCreator {
  "#": string;
  "@": GeneratedType6;
}

export interface GeneratedType6 {
  "opf:file-as": string;
  "opf:role": string;
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
