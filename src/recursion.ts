import data from './data.json'
interface itemNode {
  Id: string
  ParentId: string
  Type: number
  Title: string
  Children: itemNode[]
}
interface respConunt {
  count_type_1: number
  count_type_2: number
}
//#region ** Имитация работы с API */
/** Имитация запроса апи */
const stubRequest = async (stubData: unknown): Promise<unknown> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(stubData)
    }, 1000)
  })

const getData = async (): Promise<itemNode> => {
  const res = await stubRequest(data)
  return res as itemNode
}
//#endregion **Имитация работы с API */
const calcType = (data: itemNode) => {
  const response: respConunt = { count_type_1: 0, count_type_2: 0 }

  const calcType = (value: number): void => {
    if (value === 1) {
      response.count_type_1++
    } else if (value === 2) {
      response.count_type_2++
    }
  }
  const recTravObj = (r_data: itemNode) => {
    Object.keys(r_data).forEach((key) => {
      if (key === 'Type') {
        calcType(r_data[key])
      } else if (key === 'Children' && Array.isArray(r_data[key]) && r_data[key].length != 0) {
        r_data[key].forEach((el) => {
          recTravObj(el)
        })
      }
    })
  }
  recTravObj(data)
  return response
}
const test = async () => {
  const data: itemNode = await getData()
  const start = performance.now()
  const response = calcType(data)
  const end = performance.now()
  const time = end - start

  console.log('Рузультат:', response)
  console.log('Время выполнения рекурсия:', time)
}
test()
