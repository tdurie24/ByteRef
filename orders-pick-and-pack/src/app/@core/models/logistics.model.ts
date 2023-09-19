import {OrderModel} from "./order.model";

export interface LogisticsModel {
  Id?: string,
  UpdateBy?: string,
  CreatedDate?: Date,
  UpdateDate?: Date,
  LogisticsStatusId?: string,
  DistributionId?: string,
  CollectionId?: string,
  Order?: OrderModel,
  TotalItems?: number,
}
