export interface PropertyDescriptionInterface {
  overall: string;
  features: { title: string; images: string[]; description: string }[];
  location: {
    title: string;
    country: string;
    city: string;
    // in GeoJSON format
    location: {
      type: string;
      coordinates: number[];
    };
    description: string;
  };

  videoTour: string;

  contacts: {
    description: string;
    contacts: { initials: string; phones: string[] }[];
  };

  priceAndTaskHistory: {
    price: string;
    history: string;
  };

  floorPlans: { title: string; images: string[]; description: string }[];
}
