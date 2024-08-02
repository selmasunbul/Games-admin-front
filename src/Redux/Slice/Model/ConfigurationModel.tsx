export type  BuildingType ={
  oId: string;
  name: string;
}

export type  Configuration= {
  oId: string;
  buildingType: string;
  buildingCost: number;
  constructionTime: number;
}

export type  JoinedResult ={
  buildingType: BuildingType;
  configuration: Configuration;
}