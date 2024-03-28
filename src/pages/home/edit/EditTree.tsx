import { CloseOutlined, PlusOutlined } from '@ant-design/icons'
import { Input, Popconfirm, Tree } from 'antd'
import { useState } from 'react'

const { TreeNode } = Tree
let tempKey = '1000'

export default (props) => {
  const { onHandleCancel = () => {}, onHandleOk = () => {}, data = {} } = props

  const treeDataTemp = [
    {
      title: '0-0',
      key: '0-0',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            {
              title: '0-0-0-0',
              key: '0-0-0-0'
            },
            {
              title: '0-0-0-1',
              key: '0-0-0-1'
            }
          ]
        },
        {
          title: '0-0-2',
          key: '0-0-2'
        }
      ]
    },
    {
      title: '0-2',
      key: '0-2'
    }
  ]
  const [treeData, setTreeData] = useState(treeDataTemp)

  const onDragEnter = (info) => {
    console.log(info)
  }

  function Ninja() {}
  Ninja.prototype.swingSword = function () {
    return true
  }
  const ninja1 = Ninja()
  console.log(ninja1)

  const ninja2 = new Ninja()
  console.log(ninja2);
  
  console.log(ninja2 && ninja2.swingSword && ninja2.swingSword())

  const onAdd = (key) => {
    console.log('onAdd', key)
    const treeDataOld = JSON.parse(JSON.stringify(treeData))
    const treeDataNew = addNode(key, treeDataOld)
    setTreeData(treeDataNew)

    tempKey++
    function addNode(key, data) {
      data.forEach((item) => {
        if (item.key === key) {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          item.children
            ? item.children.push({
                title: `默认值${tempKey}`,
                key: `${tempKey}`
              })
            : (item.children = [
                {
                  title: `默认值${tempKey}`,
                  key: `${tempKey}`
                }
              ])
        } else {
          if (item.children) {
            addNode(key, item.children)
          }
        }
      })
      return data
    }
  }

  const onDelete = (key) => {
    console.log('onAdd', key)
    const treeDataOld = JSON.parse(JSON.stringify(treeData))
    const treeDataNew = deleteNode(key, treeDataOld)
    setTreeData(treeDataNew)

    function deleteNode(key, arr) {
      arr.map((item, index) => {
        if (item.key == key) {
          arr.splice(index, 1)
        }
        if (item.children) {
          deleteNode(key, item.children)
        }
      })
      return arr
    }
  }

  const onChange = (e, key) => {
    console.log('onChange', e, key)
    const treeDataOld = JSON.parse(JSON.stringify(treeData))
    const treeDataNew = editNode(key, treeDataOld, e.target.value)
    setTreeData(treeDataNew)

    function editNode(key, data, val) {
      data.forEach((item) => {
        if (item.key === key) {
          item.title = val
        } else {
          if (item.children) {
            editNode(key, item.children, val)
          }
        }
      })
      return data
    }
  }

  const renderTreeNodes = (data) => {
    console.log('renderTreeNodes', data)
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode {...item}></TreeNode>
    })
  }

  const onTitleRender = (item) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Input value={item.title} defaultValue={item.title} onChange={(e) => onChange(e, item.key)} />
        <span style={{ display: 'flex' }}>
          <PlusOutlined style={{ marginLeft: 10 }} onClick={() => onAdd(item.key)} />
          <Popconfirm
            title='确定要删除吗?'
            okText='确定'
            cancelText='取消'
            onConfirm={() => {
              onDelete(item.key)
            }}
          >
            <CloseOutlined style={{ marginLeft: 10 }} />
          </Popconfirm>
        </span>
      </div>
    )
  }
  return (
    <>
      <Tree className='draggable-tree' defaultExpandAll={true} onDragEnter={onDragEnter} titleRender={onTitleRender}>
        {treeData?.length && renderTreeNodes(treeData)}
      </Tree>
    </>
  )
}
