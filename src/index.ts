import _ from "lodash";
import { mainServicesRequired, servicePricing, bundles } from "./serviceConfig";

export const updateSelectedServices = (
    previouslySelectedServices: ServiceType[],
    action: { type: "Select" | "Deselect"; service: ServiceType }
): ServiceType[] => {
    switch (action.type) {
        case "Select": {
            if (_.includes(previouslySelectedServices, action.service)) {
                return previouslySelectedServices;
            }

            const mainServices = mainServicesRequired[action.service];
            if (mainServices.length >= 1 && !isAnyServiceAlreadySelected(previouslySelectedServices, mainServices)) {
                return previouslySelectedServices;
            }

            return [...previouslySelectedServices, action.service];
        }
        case "Deselect": {
            const selectedServices = [...previouslySelectedServices];

            removeDependentServices(selectedServices, action.service);

            return _.filter(selectedServices, (service: ServiceType) => service !== action.service);
        }
        default: {
            return previouslySelectedServices;
        }
    }
};

export const calculatePrice = (
    selectedServices: ServiceType[],
    selectedYear: ServiceYear
): { basePrice: number; finalPrice: number } => {
    if (selectedServices.length === 0) {
        return { basePrice: 0, finalPrice: 0 };
    }

    const basePrice = _.sumBy(selectedServices, (service: ServiceType) => servicePricing[selectedYear][service]);
    const discountAmount = getTotalDiscountAmount(selectedServices, selectedYear);

    return { basePrice: basePrice, finalPrice: basePrice - discountAmount };
};

const isAnyServiceAlreadySelected = (selectedServices: ServiceType[], services: ServiceType[]): boolean => {
    return _.some(selectedServices, (selectedService: ServiceType) => services.includes(selectedService));
};

const removeDependentServices = (selectedServices: ServiceType[], serviceToRemove: ServiceType): void => {
    const dependentServices: ServiceType[] = getDependentServices(serviceToRemove);
    const selectedDependentServices = _.intersection(selectedServices, dependentServices);

    selectedDependentServices.forEach((selectedDependentService: ServiceType) => {
        const otherMainServices = mainServicesRequired[selectedDependentService].filter(
            (mainService: ServiceType) => mainService !== serviceToRemove
        );

        if (otherMainServices.length === 0 || !isAnyServiceAlreadySelected(selectedServices, otherMainServices)) {
            _.remove(selectedServices, (selectedService: ServiceType) => selectedService === selectedDependentService);
        }
    });
};

const getDependentServices = (service: ServiceType): ServiceType[] => {
    return _(mainServicesRequired)
        .pickBy((mainServices: ServiceType[]) => mainServices.includes(service))
        .keys()
        .value() as ServiceType[];
};

const getTotalDiscountAmount = (selectedServices: ServiceType[], year: ServiceYear): number => {
    const allDiscounts = getPossibleDiscounts(selectedServices, year);

    return _(allDiscounts)
        .groupBy(({ bundle }: BundleWithDiscount) => bundle.group)
        .map((bundles: BundleWithDiscount[]) => _.maxBy(bundles, ({ discount }: BundleWithDiscount) => discount))
        .sumBy(({ discount }: BundleWithDiscount) => discount);
};

const getPossibleDiscounts = (selectedServices: ServiceType[], year: ServiceYear): BundleWithDiscount[] => {
    const dealsThisYear = bundles[year];

    const applicableDeals = dealsThisYear.filter((bundle: Bundle) =>
        bundle.requiredServices.every((requiredService: ServiceType) => selectedServices.includes(requiredService))
    );

    const discountList = applicableDeals.map((bundle: Bundle) => {
        const discount =
            _.sumBy(bundle.requiredServices, (service: ServiceType) => servicePricing[year][service]) -
            bundle.totalPrice;
        return { bundle, discount };
    });

    return discountList;
};
