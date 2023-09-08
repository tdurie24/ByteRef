export interface LogisticsModel {
  Id: string,
  UpdateBy: string,
  CreatedDate: Date,
  UpdateDate: Date,
  LogisticsStatusId: string,
  DistributionId: string,
  CollectionId: string,
  Order: OrderDto,
  TotalItems: number,
}
