import Mock from 'mockjs'
// 接口配置
const mocks = [
  {
    url: "/api/getText",
    type: "get",
    response: {
      "status": 200,
      "data": 'form server',
      "msg":"sucess"
    }
  }
]

export default function () {

  mocks.forEach(item => Mock.mock(item.url,item.type, ()=>{
    return item.response
  }))

  Mock.setup({
    timeout: 400
  })
}