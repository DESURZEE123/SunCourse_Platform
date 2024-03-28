import { Radio } from 'antd'
import styled from 'styled-components'

export default (props) => {
  const { selectOption } = props
  const onChange1 = ({ target: { value } }) => {
    console.log('radio1 checked', value)
    // setValue1(value)
  }
  return (
    <>
      {selectOption.map((item) => {
        return (
          <div key={item.id}>
            <div>{item.id}.{item.title}</div>
            <Radio.Group options={item.option} onChange={onChange1} />
          </div>
        )
      })}
    </>
  )
}
