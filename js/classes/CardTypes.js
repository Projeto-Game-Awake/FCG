sideMethod = {
  0: getLightCardTypes,
  1: getShadowCardTypes,
};

function getCardStatsByTypeAndSide(type, side) {
  return sideMethod[side](type);
}

function getLightCardTypes(type) {
  let cards = [
    {
      name: "henrique",
      attack: 1,
      hp: 2,
      speed: 3,
    },
    {
      name: "joana",
      attack: 2,
      hp: 1,
      speed: 4,
    },
    {
      name: "felipe",
      attack: 1,
      hp: 1,
      speed: 5,
    },
  ];

  return cards[type];
}

function getShadowCardTypes(type) {
  let cards = [
    {
      name: "duarte",
      attack: 1,
      hp: 2,
      speed: 3,
    },
    {
      name: "freitas",
      attack: 2,
      hp: 1,
      speed: 4,
    },
    {
      name: "silva",
      attack: 1,
      hp: 1,
      speed: 5,
    },
  ];

  return cards[type];
}
