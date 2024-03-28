import { Button, Tree } from 'antd'
import { history } from 'umi'

const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0'
          },
          {
            title: 'leaf',
            key: '0-0-0-1'
          },
          {
            title: 'leaf',
            key: '0-0-0-2'
          }
        ]
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: 'leaf',
            key: '0-0-1-0'
          }
        ]
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        children: [
          {
            title: 'leaf',
            key: '0-0-2-0'
          },
          {
            title: 'leaf',
            key: '0-0-2-1'
          }
        ]
      }
    ]
  }
]

export default () => {
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info)
  }
  const goEdit = () => {
    history.push('/home/edit')
  }
  return (
    <div className='container'>
      <div>目录</div>
      <Tree defaultExpandedKeys={['0-0-0']} onSelect={onSelect} treeData={treeData} />
      <Button onClick={goEdit}>编辑目录</Button>
    </div>
  )
}
