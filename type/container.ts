export interface Entity {
    "@": {
      "media-type"?: string;
      "full-path"?: string;
    };
  }
  
  export type EntityPkg = Entity[];
  
  export interface ParserResult {
    rootfiles: {
      rootfile: EntityPkg;
    };
  }
  