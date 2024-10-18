import {FishCreationAttributes} from "../../models/fish.model";

interface EsignDataDetail extends FishCreationAttributes {
    isNeedEstimated?: boolean
}

export type OrderEsginRequestCreation = {
    buyerId: number,
    staffId?: number,
    receiveDate: Date,
    expireDate: Date
    fishes: EsignDataDetail[],
    packages: EsignDataDetail[],

}