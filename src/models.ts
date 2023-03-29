export type ServiceYear = 2020 | 2021 | 2022;
export type ServiceType =
  | "Photography"
  | "VideoRecording"
  | "BlurayPackage"
  | "TwoDayEvent"
  | "WeddingSession";

/**
 * Helper lookup table for faster add/remove operations
 */
export type ServiceTypeDependency = {
  [K in ServiceType]: {
    parents: ServiceType[];
    children: ServiceType[];
  };
};

/**
 * Service dependency tree. Each service can have multiple
 * children and each service can be places as a child in 
 * multiple parents
 */
export type ServicesTree = {
  [K in ServiceType]: Exclude<ServiceType, K>[]
}

/**
 * Discount definition. Each discount can be applied for multiple services.
 * At least 2 services are required to apply discount.
 */
export type Discount = { services: [ServiceType, ServiceType, ...ServiceType[]]; discount: number };

/**
 * Price configuration. Object contains list of years. For each year
 * system allows to put price for all services with discounts.
 */
export type PriceList = {
  [PriceKey in ServiceYear]: {
    [ServiceKey in ServiceType]: number;
  } & {
    discounts: Discount[];
  };
};