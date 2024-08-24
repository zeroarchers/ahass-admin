import { useCallback } from "react";

export function useLocationTransformer() {
  const transformLocations = useCallback(async (values: any) => {
    const transformedValues = { ...values };
    const apiEndpoint = "https://mozaldy.github.io/api-wilayah-indonesia/api";

    const fieldToApiMapping = {
      provinsi: "province",
      kabupaten: "regency",
      kecamatan: "district",
      kelurahan: "village",
    };

    for (const [field, apiPath] of Object.entries(fieldToApiMapping)) {
      if (values[field]) {
        const isCapitalized = /^[A-Z\s]+$/.test(values[field]);
        if (isCapitalized) {
          transformedValues[field] = values[field];
        } else {
          transformedValues[field] = await fetchPlaceName(
            `${apiEndpoint}/${apiPath}/${values[field]}.json`,
          );
        }
      }
    }

    return transformedValues;
  }, []);

  const fetchPlaceName = async (url: string): Promise<string> => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.name;
    } catch (error) {
      console.error("Error fetching place name:", error);
      return "";
    }
  };

  return { transformLocations };
}
