const PREFIX = "@@weather-forecast";

export const queryKeys = {
  all: [{ feature: PREFIX }],
  list: () => [
    {
      ...queryKeys.all[0],
      component: "list",
    },
  ],
};
