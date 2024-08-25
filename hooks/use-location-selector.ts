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

  const selectedProvince = form.watch("provinsi").toUpperCase();
  const selectedRegency = form.watch("kabupaten").toUpperCase();
  const selectedDistrict = form.watch("kecamatan").toUpperCase();

  const apiEndpoint = "https://mozaldy.github.io/api-wilayah-indonesia/api";

  useEffect(() => {
    fetch(`${apiEndpoint}/provinces.json`)
      .then((response) => response.json())
      .then((data: Wilayah[]) => {
        setProvinces(data);
      })
      .catch((error) => console.error("Error fetching provinces:", error));
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const provinceId = provinces.find(
        (p) => p.id === selectedProvince || p.name === selectedProvince,
      )?.id;
      if (provinceId) {
        fetch(`${apiEndpoint}/regencies/${provinceId}.json`)
          .then((response) => response.json())
          .then((data: Wilayah[]) => {
            setRegencies(data);
          })
          .catch((error) => console.error("Error fetching regencies:", error));
      }
    }
  }, [selectedProvince, provinces]);

  useEffect(() => {
    if (selectedRegency) {
      const regencyId = regencies.find(
        (r) => r.id === selectedRegency || r.name === selectedRegency,
      )?.id;
      if (regencyId) {
        fetch(`${apiEndpoint}/districts/${regencyId}.json`)
          .then((response) => response.json())
          .then((data: Wilayah[]) => {
            setDistricts(data);
          })
          .catch((error) => console.error("Error fetching districts:", error));
      }
    }
  }, [selectedRegency, regencies]);

  useEffect(() => {
    if (selectedDistrict) {
      const districtId = districts.find(
        (d) => d.id === selectedDistrict || d.name === selectedDistrict,
      )?.id;
      if (districtId) {
        fetch(`${apiEndpoint}/villages/${districtId}.json`)
          .then((response) => response.json())
          .then((data: Wilayah[]) => {
            setVillages(data);
          })
          .catch((error) => console.error("Error fetching villages:", error));
      }
    }
  }, [selectedDistrict, districts]);

  return { provinces, regencies, districts, villages };
}
