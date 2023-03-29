# Typescript

Simple price calculator. 

### Configuration
To add new service called `NEW_SERVICE` edit models file:
```
export type ServiceType =
  | "Photography"
  | "VideoRecording"
  | "BlurayPackage"
  | "TwoDayEvent"
  | "WeddingSession"
  | "NEW_SERVICE"
```
To add new dependency between services, for example `BlurayPackage` cannot be added without `VideoRecording` configure `dependency tree`:
```
export const dependencyTree: ServicesTree = {
  VideoRecording: ["BlurayPackage"],
  ...
};
```

To add new price list configure `prices` object. For Example to add price for NEW_SERVICE

```
export const prices: PriceList = {
  2023: {
    NEW_SERVICE: 650,
    ...
  }
};
```

Discounts can bee added to the same object as before:
```
export const prices: PriceList = {
  2023: {
    NEW_SERVICE: 650,
    ...
    discounts: [
        { services: ["NEW_SERVICE", "WeddingSession"], discount: 150 }
        ...
    ]
  }
};
```