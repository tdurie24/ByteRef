import {OrderItem} from "./order.item";

export interface OrderResponse {
    id?: string
    order?: OrderDetails
    updatedBy?: any
    updatedDate?: string
    orderCreated?: string
    orderCollection?: any
    orderDistribution?: any
}

export interface OrderDetails {
    id?: any
    orderNumber?: string
    total?: number
    orderDate?: string
    paymentGateway?: any
    fulfilmentStatus?: any
    deliveryOption?: string
    dateCreated?: string
    dateModified?: any
    financialStatus?: any
    orderStatus?: OrderStatus
    deliveryLocation?: DeliveryLocation
    fulfillmentLocation?: any
    customer?: any
    subTotal?: number
    taxTotal?: number
    shippingTotal?: number
    deliveryTotal?: number
    oneId?: any
    orderItems?: OrderItem[]
}

export interface OrderStatus {
    id?: string
    statusId?: number
    name?: string
    description?: string
}

export interface DeliveryLocation {
    name?: string
    address1?: string
    phone?: string
    city?: string
    zip?: string
    province?: string
    country?: string
    lastName?: string
    address2?: any
    company?: any
    latitude?: any
    longitude?: any
    countryCode?: string
    provinceCode?: string
    dateModified?: string
}

