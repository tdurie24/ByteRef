import {OrderModel} from "./order.model";
import {LogisticsStatus} from "./logistics.status";
import {DistributionCompanyModel} from "./distribution.company.model";
import {OrderCollectionDto} from "./order.collection.dto";

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
    orderStatus?: LogisticsStatus,
    orderDistribution?: DistributionCompanyModel,
    orderCollection?: OrderCollectionDto,
    totalItems:number,
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
