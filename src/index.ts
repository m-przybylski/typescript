import { ServiceType, ServiceYear } from './models'
import { serviceUtils } from './service-utils';

const { canAddService, deselectService, applyDiscount, calculateBasePrice } = serviceUtils

export const updateSelectedServices = (
  previouslySelectedServices: ServiceType[],
  action: { type: "Select" | "Deselect"; service: ServiceType }
) => {
  switch (action.type) {
    case "Select":
      return !canAddService(previouslySelectedServices, action.service)
        ? previouslySelectedServices
        : previouslySelectedServices.concat(action.service);
    case "Deselect":
      return deselectService(previouslySelectedServices, action.service);
  }
};

export const calculatePrice = (
  selectedServices: ServiceType[],
  selectedYear: ServiceYear
) => {
  if (selectedServices.length === 0) {
    return { basePrice: 0, finalPrice: 0 };
  }
  const basePrice = calculateBasePrice(selectedServices, selectedYear);
  const finalPrice = applyDiscount(selectedServices, selectedYear, basePrice);
  return { basePrice, finalPrice };
};

export {ServiceYear, ServiceType}