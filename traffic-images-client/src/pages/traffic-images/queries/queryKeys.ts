const PREFIX = "@@traffic-images";

export const queryKeys = {
  all: [{ feature: PREFIX }],
  list: () => [
    {
      ...queryKeys.all[0],
      component: "list",
    },
  ],
};
