import { useState, useEffect } from "react";

interface Wilayah {
  id: string;
  name: string;
}

export function useLocationSelector(form: any) {
  const [provinces, setProvinces] = useState<Wilayah[]>([]);
  const [regencies, setRegencies] = useState<Wilayah[]>([]);
  const [districts, setDistricts] = useState<Wilayah[]>([]);
  const [villages, setVillages] = useState<Wilayah[]>([]);

  const selectedProvince = form.watch("provinsi");
  const selectedRegency = form.watch("kabupaten");
  const selectedDistrict = form.watch("kecamatan");
  const apiEndpoint = "https://mozaldy.github.io/api-wilayah-indonesia/api";

  useEffect(() => {
    if (!selectedProvince) {
      fetch(`${apiEndpoint}/provinces.json`)
        .then((response) => response.json())
        .then((data: Wilayah[]) => setProvinces(data))
        .catch((error) => console.error("Error fetching provinces:", error));
    }
  }, [selectedProvince, form]);

  useEffect(() => {
    if (selectedProvince) {
      fetch(`${apiEndpoint}/regencies/${selectedProvince}.json`)
        .then((response) => response.json())
        .then((data: Wilayah[]) => setRegencies(data))
        .catch((error) => console.error("Error fetching regencies:", error));
    }
  }, [selectedProvince, selectedRegency]);

  useEffect(() => {
    if (selectedRegency) {
      fetch(`${apiEndpoint}/districts/${selectedRegency}.json`)
        .then((response) => response.json())
        .then((data: Wilayah[]) => setDistricts(data))
        .catch((error) => console.error("Error fetching districts:", error));
    }
  }, [selectedRegency, selectedDistrict]);

  useEffect(() => {
    if (selectedDistrict) {
      fetch(`${apiEndpoint}/villages/${selectedDistrict}.json`)
        .then((response) => response.json())
        .then((data: Wilayah[]) => setVillages(data))
        .catch((error) => console.error("Error fetching villages:", error));
    }
  }, [selectedDistrict]);

  return { provinces, regencies, districts, villages };
}
