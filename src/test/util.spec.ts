import { Dict } from '../types/general';
import { transformCamel, transformSnake } from '../utils/transform';

const snakeObj1: Dict = {
  user_id: 2,
  charge_capacity: 15,
  charge_rule: 0,
};

const camelObj1: Dict = {
  userId: 2,
  chargeCapacity: 15,
  chargeRule: 0,
};

const snakeObj2: Dict = [
  {
    user_id: 2,
    charge_capacity: 15,
    charge_rule: 0,
  },
  {
    user_id: 2,
    charge_capacity: 15,
    charge_rule: 0,
  },
];

const camelObj2: Dict = [
  {
    userId: 2,
    chargeCapacity: 15,
    chargeRule: 0,
  },
  {
    userId: 2,
    chargeCapacity: 15,
    chargeRule: 0,
  },
];

test('test transform to Camel', () => {
  expect(transformCamel(snakeObj1)).toEqual(camelObj1);
  expect(transformCamel(snakeObj2)).toEqual(camelObj2);
});

test('test transform to snake', () => {
  expect(transformSnake(camelObj1)).toEqual(snakeObj1);
  expect(transformCamel(snakeObj2)).toEqual(camelObj2);
});
