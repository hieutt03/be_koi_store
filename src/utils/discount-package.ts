export const getDiscountPackages = (quantity: number) => {

    if (quantity < 10) {
        return 1;
    }

    if (quantity >= 10 && quantity < 20) {
        return 0.95;
    } else if (quantity >= 20 && quantity < 30) {
        return 0.9;
    } else if (quantity >= 30 && quantity < 50) {
        return 0.8;
    } else {
        return 0.75
    }
}