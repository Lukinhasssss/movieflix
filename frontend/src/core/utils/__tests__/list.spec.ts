import { generateList } from '../list'

test('should generate a list', () => {
  const amount = 5

  const result = generateList(amount)

  expect(result).toEqual([0, 1, 2, 3, 4])
})

test('should generate an empty list when amount is zero', () => {
  const result = generateList(0)

  expect(result).toEqual([])
})