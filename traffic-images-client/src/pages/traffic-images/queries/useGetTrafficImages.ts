import { useQuery } from "react-query";
import { TrafficImagesHttpService } from "../services";
import { queryKeys } from "./queryKeys";

export const useGetTrafficImages = () => {
  const httpService = new TrafficImagesHttpService();

  return useQuery(queryKeys.list(), () => httpService.getTrafficImages());
};
