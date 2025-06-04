import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export const deliveryOption = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },

  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },

  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export function deliveryOptionCost(deliveryOptionId) {
  let options;
  deliveryOption.forEach((deliveryItem) => {
    if (deliveryItem.id === deliveryOptionId) {
      options = deliveryItem;
    }
  });
  return options;
}

function isWeekend(getDate) {
  let now = getDate.format("dddd");
  return now === "Saturday" || now === "Sunday";
}

export function getDeliveryDays(deliveryOption) {
  let todayDate = dayjs();
  let deliveryDate = deliveryOption.deliveryDays;

  while (deliveryDate > 0) {
    todayDate = todayDate.add(1, "days");

    if (!isWeekend(todayDate)) {
      deliveryDate--;
    }
  }

  let deliveryFormat = todayDate.format("dddd, MMMM D");
  return deliveryFormat;
}
