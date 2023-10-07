import {OrderModel} from "./order.model";
import {LogisticsStatus} from "./logistics.status";
import {DistributionCompanyModel} from "./distribution.company.model";
import {OrderCollectionDto} from "./order.collection.dto";
import {OrderStatus} from "./order.details.model";

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
    totalItems: number,
}

export interface LogisticsListingDTO {
    // Id?: string,
    // UpdateBy?: string,
    // CreatedDate?: any,
    // UpdateDate?: any,
    // LogisticsStatus?: string,
    // DistributionCompany?: string,
    // CollectionId?: string,
    // OrderNumber?: string,
    // TotalItems?: number,
    orderStatusName: string,
    id?: string,
    updateBy?: any,
    createdDate?: string
    updateDate?: string
    orderStatusId?: any
    distributionId?: any
    collectionId?: any
    orderId?: string
    orderNumber?: string
    orderDistribution?: any
    orderCollection?: any
    totalItems?: number
    orderStatus?: OrderStatus
}
