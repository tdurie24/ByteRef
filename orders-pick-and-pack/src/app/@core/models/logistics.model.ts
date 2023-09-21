import {OrderModel} from "./order.model";
import {LogisticsStatus} from "./logistics.status";
import {DistributionCompanyModel} from "./distribution.company.model";

export interface LogisticsModel {
    id?: string,
    updateBy?: string,
    createdDate?: any,
    updateDate?: Date,
    logisticsStatusId?: string,
    distributionId?: string,
    collectionId?: string,
    orderId?: string,
    orderNumber?: any,
    logisticStatus?: LogisticsStatus,
    orderDistribution?: DistributionCompanyModel,
    orderCollection?: OrderModel[],
}

export interface LogisticsListingDTO {
    Id?: string,
    UpdateBy?: string,
    CreatedDate?: Date,
    UpdateDate?: Date,
    LogisticsStatus?: string,
    DistributionCompany?: string,
    CollectionId?: string,
    OrderNumber?: string,
    TotalItems?: number,
}
