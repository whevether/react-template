import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "utils/request";

export const HOME_DATA_QUERY_KEY = ["home", "data"];

export const useHomeData = () => {
  return useQuery({
    queryKey: HOME_DATA_QUERY_KEY,
    queryFn: () => axiosInstance.get("/220.202.208.249"),
    enabled: false,
  });
};
