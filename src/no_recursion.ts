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
const travObj = (data: itemNode) => {
  let cur_ref // текущая ссылка
  const memory = [data] // память (стек)
  const response: respConunt = { count_type_1: 0, count_type_2: 0 }
  while ((cur_ref = memory.pop())) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (cur_ref.Type === 1) {
        response.count_type_1++
      } else if (cur_ref.Type === 2) {
        response.count_type_2++
      }
      if (!cur_ref.Children || cur_ref.Children.length === 0) break
      // помещаем ветви, ведущие налево, в память (стек)
      for (let i = 0; i < cur_ref.Children.length - 1; i++) {
        memory.push(cur_ref.Children[i])
      }
      // переходим по ветви, ведущей направо
      cur_ref = cur_ref.Children[cur_ref.Children.length - 1]
    }
  }
  return response
}
const test = async () => {
  const data: itemNode = await getData()
  const start = performance.now()
  const response = travObj(data)
  const end = performance.now()
  const time = end - start

  console.log('Рузультат:', response)
  console.log('Время выполнения, без рекурсии:', time)
}
test()
