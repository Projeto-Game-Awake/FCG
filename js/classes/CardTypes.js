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
      hp: 1,
      speed: 2,
    },
    {
      name: "joana",
      attack: 1,
      hp: 1,
      speed: 2,
    },
    {
      name: "felipe",
      attack: 1,
      hp: 1,
      speed: 2,
    },
  ];

  return cards[type];
}

function getShadowCardTypes(type) {
  let cards = [
    {
      name: "duarte",
      attack: 1,
      hp: 1,
      speed: 2,
    },
    {
      name: "freitas",
      attack: 1,
      hp: 1,
      speed: 2,
    },
    {
      name: "silva",
      attack: 1,
      hp: 1,
      speed: 2,
    },
  ];

  return cards[type];
}
