// eslint-disable-next-line @typescript-eslint/no-var-requires
const data = require('./data.json')
interface itemNode {
  Id: string
  ParentId: string
  Type: number
  Title: string
  Children: itemNode[]
}
/**
 * Рекурсивный обход дерева
 * @param  {itemNode} data Структура данных.
 * @param  {number[]} typs Массив значений подсчитываемых типов.
 * @return {Object}   Расширяемый объект в зависимости от входного массива typs
 */
const calcType = (data: itemNode, typs?: number[]): Record<string, number> => {
  const res: Record<string, number> = { count_object: 0 }
  const buildKeyName = (val: number): string => {
    return `count_type_${val}`
  }
  typs &&
    typs.forEach((el) => {
      res[buildKeyName(el) as keyof typeof res] = 0
    })
  const calcType = (value: number): void => {
    if (Object.keys(res).includes(buildKeyName(value))) {
      res[buildKeyName(value) as keyof typeof res] = res[buildKeyName(value) as keyof typeof res] + 1
    }
  }
  const recTravObj = (data: itemNode): void => {
    res.count_object = res.count_object + 1
    const entries = Object.entries(data)
    for (let i = 0; i < entries.length; i += 1) {
      const [keyObj, valObj] = entries[i]
      if (keyObj === 'Type') {
        calcType(valObj)
      } else if (keyObj === 'Children' && Array.isArray(valObj) && valObj.length != 0) {
        valObj.forEach((el) => {
          recTravObj(el)
        })
      }
    }
  }
  recTravObj(data)
  return res
}

const test = calcType(data, [1, 2])
console.log(test)
