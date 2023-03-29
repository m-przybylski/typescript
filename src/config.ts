import { PriceList, ServicesTree } from "./models";

export const prices: PriceList = {
  2020: {
    Photography: 1700,
    VideoRecording: 1700,
    WeddingSession: 600,
    BlurayPackage: 300,
    TwoDayEvent: 400,
    discounts: [
      { services: ["Photography", "VideoRecording"], discount: 1200 },
      { services: ["Photography", "WeddingSession"], discount: 300 },
      { services: ["WeddingSession", "VideoRecording"], discount: 300 },
      {
        services: ["WeddingSession", "VideoRecording", "Photography"],
        discount: 1500,
      },
    ],
  },
  2021: {
    Photography: 1800,
    VideoRecording: 1800,
    WeddingSession: 600,
    BlurayPackage: 300,
    TwoDayEvent: 400,
    discounts: [
      { services: ["Photography", "VideoRecording"], discount: 1300 },
      { services: ["Photography", "WeddingSession"], discount: 300 },
      { services: ["WeddingSession", "VideoRecording"], discount: 300 },
      {
        services: ["WeddingSession", "VideoRecording", "Photography"],
        discount: 1600,
      },
    ],
  },
  2022: {
    Photography: 1900,
    VideoRecording: 1900,
    WeddingSession: 600,
    BlurayPackage: 300,
    TwoDayEvent: 400,
    discounts: [
      { services: ["Photography", "VideoRecording"], discount: 1300 },
      { services: ["Photography", "WeddingSession"], discount: 600 },
      { services: ["WeddingSession", "VideoRecording"], discount: 300 },
      {
        services: ["WeddingSession", "VideoRecording", "Photography"],
        discount: 1900,
      },
    ],
  },
};

export const dependencyTree: ServicesTree = {
  VideoRecording: ["BlurayPackage", "TwoDayEvent"],
  BlurayPackage: [],
  TwoDayEvent: [],
  Photography: ["TwoDayEvent"],
  WeddingSession: [],
};
