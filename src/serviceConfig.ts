export const mainServicesRequired: Record<ServiceType, ServiceType[]> = {
    ["Photography"]: [],
    ["VideoRecording"]: [],
    ["BlurayPackage"]: ["VideoRecording"],
    ["TwoDayEvent"]: ["VideoRecording", "Photography"],
    ["WeddingSession"]: []
};

export const servicePricing: Record<ServiceYear, Record<ServiceType, number>> = {
    [2020]: {
        ["Photography"]: 1700,
        ["VideoRecording"]: 1700,
        ["BlurayPackage"]: 300,
        ["TwoDayEvent"]: 400,
        ["WeddingSession"]: 600
    },
    [2021]: {
        ["Photography"]: 1800,
        ["VideoRecording"]: 1800,
        ["BlurayPackage"]: 300,
        ["TwoDayEvent"]: 400,
        ["WeddingSession"]: 600
    },
    [2022]: {
        ["Photography"]: 1900,
        ["VideoRecording"]: 1900,
        ["BlurayPackage"]: 300,
        ["TwoDayEvent"]: 400,
        ["WeddingSession"]: 600
    }
};

export const bundles: Record<ServiceYear, Bundle[]> = {
    [2020]: [
        { requiredServices: ["Photography", "VideoRecording"], totalPrice: 2200, group: 1 },
        {
            requiredServices: ["Photography", "WeddingSession"],
            totalPrice: 300 + servicePricing[2020]["Photography"],
            group: 2
        },
        {
            requiredServices: ["VideoRecording", "WeddingSession"],
            totalPrice: 300 + servicePricing[2020]["VideoRecording"],
            group: 2
        }
    ],
    [2021]: [
        { requiredServices: ["Photography", "VideoRecording"], totalPrice: 2300, group: 1 },
        {
            requiredServices: ["Photography", "WeddingSession"],
            totalPrice: 300 + servicePricing[2021]["Photography"],
            group: 2
        },
        {
            requiredServices: ["VideoRecording", "WeddingSession"],
            totalPrice: 300 + servicePricing[2021]["VideoRecording"],
            group: 2
        }
    ],
    [2022]: [
        { requiredServices: ["Photography", "VideoRecording"], totalPrice: 2500, group: 1 },
        {
            requiredServices: ["Photography", "WeddingSession"],
            totalPrice: 0 + servicePricing[2022]["Photography"],
            group: 2
        },
        {
            requiredServices: ["VideoRecording", "WeddingSession"],
            totalPrice: 300 + servicePricing[2022]["VideoRecording"],
            group: 2
        }
    ]
};
