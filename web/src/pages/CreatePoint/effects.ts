import api from "../../services/api";
import axios from "axios";
import { useEffect, useState } from "react";

export const usePoints = () => {
  interface Item {
    id: number;
    title: string;
    image_url: string;
  }

  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    api.get("items").then((response) => {
      setItems(response.data);
    });
  }, []);

  return items;
};

export const useUfs = () => {
  interface IBGEUFReponse {
    sigla: string;
  }

  const [ufs, setUfs] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get<IBGEUFReponse[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      )
      .then((response) => {
        const ufInitials = response.data.map((uf) => uf.sigla);
        setUfs(ufInitials);
      });
  }, []);

  return ufs;
};

export const useCities = (uf: string) => {
  interface IBGECityReponse {
    nome: string;
  }

  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    if (uf === "0") return;
    axios
      .get<IBGECityReponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
      )
      .then((response) => {
        const cityNames = response.data.map((city) => city.nome);

        setCities(cityNames);
      });
  }, [uf]);

  return cities;
};

export const useActualLocation = () => {
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { longitude, latitude } = position.coords;
      setInitialPosition([latitude, longitude]);
    });
  }, []);

  return initialPosition;
};
