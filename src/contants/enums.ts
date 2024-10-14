export enum Status {
    Sold = "sold",
    Active = "active",
    Inactive = "inactive",
    Esign = "esign",
}

export enum Role {
    Customer = "customer",
    Manager = "manager",
    Staff = "staff",
}

export enum Type {
    ImportedPurebred = "Thuần chủng nhập khẩu",
    HybridF1 = "Lai F1",
    PureVietnamese = "Thuần Việt",
}

export enum PoolType {
    General = "general",
    Specific = "specific",
}

export enum PoolStatus {
    Pending = "pending",
    Available = "available",
    Inactive = "inactive",
}

export enum EsignStatus {
    Done = "paid",
    Pending = "pending",
}

export enum FishStatus {
    Healthy = "healthy",
    Sick = "sick"
}

export enum OrderEsignDetailStatus {
    Sold = 'sold',
    Processing = 'processing',
    Shipping = 'shipping',
    Pending = 'pending',
}

export enum FishOrderStatus {
    Shipping = 'shipping',
    Completed = 'completed',
    Processing = 'processing',
    Accident = 'accident',
}

export enum OrderStatus {
    Completed = 'completed',
    Processing = 'processing'
}