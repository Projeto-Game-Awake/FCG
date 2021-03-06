sideMethod = {
  0: getLightCardTypes,
  1: getShadowCardTypes,
  2: getMagicCardTypes,
};

tintSide = {
  0: 0xff0000,
  1: 0x0000ff,
};

function getCardStatsByTypeAndSide(type, side) {
  return sideMethod[side](type);
}

function getTintBySide(side) {
  return tintSide[side];
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

function getMagicCardTypes(type) {
  let cards = [
    {
      name: "retornar",
    },
    {
      name: "vibração+",
    },
    {
      name: "energia+",
    },
  ];
  return cards[type];
}