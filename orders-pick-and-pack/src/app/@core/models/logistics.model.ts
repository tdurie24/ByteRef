import {OrderModel} from "./order.model";
import {LogisticsStatus} from "./logistics.status";
import {DistributionCompanyModel} from "./distribution.company.model";

export interface LogisticsModel {
    id?: string,
    updateBy?: string,
    createdDate?: string,
    updateDate?: Date,
    logisticsStatusId?: string,
    distributionId?: string,
    collectionId?: string,
    orderId?: string,
    orderNumber?: any,
    logisticStatus?: LogisticsStatus|null,
    orderDistribution?: any,
    orderCollection?: OrderModel[],
}

export interface LogisticsListingDTO {
    Id?: string,
    UpdateBy?: string,
    CreatedDate?: any,
    UpdateDate?: any,
    LogisticsStatus?: string,
    DistributionCompany?: string,
    CollectionId?: string,
    OrderNumber?: string,
    TotalItems?: number,
}
