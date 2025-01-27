import { baseApi } from "../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: ({ searchTerm, selectedBrand, selectedCategory, priceRange }) => ({
        url: "/cars",
        method: "GET",
        params: {
          searchTerm,
          selectedBrand,
          selectedCategory,
          priceRange: priceRange?.join(","),
        },
      }),
    }),
    getFeaturndCars: builder.query({
      query: () => ({
        url: "/cars",
        method: "GET",
      }),
    }),
    getSingleCar: builder.query({
      query: (id) => ({
        url: `/cars/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllCarsQuery,
  useGetSingleCarQuery,
  useGetFeaturndCarsQuery,
} = productApi;
