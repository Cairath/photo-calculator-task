type ServiceYear = 2020 | 2021 | 2022;
type ServiceType = "Photography" | "VideoRecording" | "BlurayPackage" | "TwoDayEvent" | "WeddingSession";

interface Bundle {
    requiredServices: ServiceType[];
    totalPrice: number;
    group: number;
}

interface BundleWithDiscount {
    bundle: Bundle;
    discount: number;
}
