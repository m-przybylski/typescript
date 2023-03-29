import {
  PriceList,
  ServicesTree,
  ServiceType,
  ServiceTypeDependency,
  ServiceYear,
} from "./models";
import { prices, dependencyTree } from "./config";

export const serviceUtils = ((
  prices: PriceList,
  dependencyTree: ServicesTree
) => {
  const dependencyArray = buildServiceTypeDependency(dependencyTree);
  /**
   * Converts simple dependency array into a configuration tree
   * @param serviceDependency dependency configuration for services
   * @returns predefined dependency tree
   */
  function buildServiceTypeDependency(serviceDependency: {
    [key in ServiceType]: ServiceType[];
  }): ServiceTypeDependency {
    return Object.entries(serviceDependency).reduce(
      (
        serviceTypeDependency,
        [parentServiceType, childServiceType]: [ServiceType, ServiceType[]]
      ) => {
        serviceTypeDependency[parentServiceType] = serviceTypeDependency[
          parentServiceType
        ] ?? {
          parents: [],
          children: [],
        };

        serviceTypeDependency[parentServiceType].children.push(
          ...childServiceType
        );
        childServiceType.forEach((dep) => {
          serviceTypeDependency[dep] = serviceTypeDependency[dep] ?? {
            parents: [],
            children: [],
          };

          serviceTypeDependency[dep].parents.push(parentServiceType);
        });

        return serviceTypeDependency;
      },
      {} as ServiceTypeDependency
    );
  }

  /**
   * Function returns information if service is already selected
   * @param previouslySelectedServices list of already selected services
   * @param serviceType service type to check
   * @returns weather service is selected
   */
  function isAlreadySelected(
    previouslySelectedServices: ServiceType[],
    serviceType: ServiceType
  ) {
    return previouslySelectedServices.includes(serviceType);
  }

  /**
   * Function returns if parent service for service to select is selected.
   * If selected service does not have parent function returns `true`.
   * @param previouslySelectedServices list of already selected services
   * @param serviceType service type to check dependency
   * @returns weather parent service is selected
   */
  function hasParentRequiredServiceSelected(
    previouslySelectedServices: ServiceType[],
    serviceType: ServiceType
  ) {
    const parentServices = dependencyArray[serviceType].parents;
    if (!parentServices.length) return true;
    return parentServices.some((parentService) =>
      previouslySelectedServices.includes(parentService)
    );
  }

  /**
   * Function returns if service can be added to the list
   * @param previouslySelectedServices list of already selected services
   * @param serviceToSelect service type to check dependency
   * @returns weather service can be added
   */
  function canAddService(
    previouslySelectedServices: ServiceType[],
    serviceToSelect: ServiceType
  ) {
    return (
      hasParentRequiredServiceSelected(
        previouslySelectedServices,
        serviceToSelect
      ) && !isAlreadySelected(previouslySelectedServices, serviceToSelect)
    );
  }

  /**
   * Deselect service type. Function return new array
   * @param previouslySelectedServices list of already selected services
   * @param serviceToDeselect service type to be deselected
   * @returns
   */
  function deselectService(
    previouslySelectedServices: ServiceType[],
    serviceToDeselect: ServiceType
  ) {
    const previouslySelectedServicesClone = previouslySelectedServices.filter(
      (serviceType) => serviceType !== serviceToDeselect
    );
    const children = dependencyArray[serviceToDeselect].children;
    children.forEach((child) => {
      if (
        previouslySelectedServicesClone.some((selectedService) =>
          dependencyArray[child].parents.includes(selectedService)
        )
      ) {
        return;
      }

      if (previouslySelectedServicesClone.includes(child)) {
        previouslySelectedServicesClone.splice(
          previouslySelectedServicesClone.indexOf(child),
          1
        );
      }
    });
    return previouslySelectedServicesClone;
  }

  /**
   * Calculate base price for provided services and year
   * @param selectedServices list of services selected to calculate price
   * @param selectedYear year of selected services
   * @returns base price for selected services
   */
  function calculateBasePrice(
    selectedServices: ServiceType[],
    selectedYear: ServiceYear
  ) {
    return selectedServices
      .map((selectedService) => {
        return prices[selectedYear][selectedService];
      })
      .reduce((priceSum, priceForService) => priceSum + priceForService);
  }

  /**
   * Calculates total with discounts price for all selected services
   * @param selectedServices selected services
   * @param selectedYear year of services
   * @param price base price
   * @returns price with discount for selected services
   */
  function applyDiscount(
    selectedServices: ServiceType[],
    selectedYear: ServiceYear,
    price: number
  ) {
    const discountsToApply = [];
    const discounts = prices[selectedYear].discounts;
    discounts.forEach((discount) => {
      if (
        discount.services.every((service) => selectedServices.includes(service))
      ) {
        discountsToApply.push(discount.discount);
      }
    });

    const maxDiscount = discountsToApply.reduce((maxDiscount, currentDiscount) => {
      return maxDiscount > currentDiscount ? maxDiscount : currentDiscount;
    }, 0);

    return price - maxDiscount;
  }

  return {
    canAddService,
    deselectService,
    applyDiscount,
    calculateBasePrice,
    prices,
    serviceTypeDependency: buildServiceTypeDependency(dependencyTree),
  };
})(prices, dependencyTree);
