import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef, useState } from 'react';
import { getAdmins } from '@/services/admins/api';
import CardForm from './cardForm';

const columns: ProColumns<API.Admin>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    hideInSearch: true,
    editable: false,
  },
  {
    title: '管理员名',
    dataIndex: 'username',
    copyable: true,
    ellipsis: true,
    editable: false,
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: 'dateTime',
    sorter: true,
    hideInSearch: true,
    render: (_, record) => {
      return record.created_at
        ? new Date(record.created_at * 1000).toLocaleString()
        : '-';
    },
    editable: false,
  },
  {
    title: '更新时间',
    dataIndex: 'updated_at',
    valueType: 'dateTime',
    sorter: true,
    hideInSearch: true,
    render: (_, record) => {
      return record.updated_at
        ? new Date(record.updated_at * 1000).toLocaleString()
        : '-';
    },
    editable: false,
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (_text, record, _index, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
    ],
  },
];

const Admins = () => {
  const actionRef = useRef<ActionType>(null);
  const [formVisible, setFormVisible] = useState(false);

  return (
    <>
      <ProTable<API.Admin>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort) => {
          const { current = 1, pageSize = 10, username } = params;

          // 构建查询参数
          const queryParams: API.GetUsersParams = {
            page: current,
            page_size: pageSize,
          };

          // 用户名搜索
          if (username) {
            queryParams.username_like = username;
          }

          // 排序处理
          if (sort && Object.keys(sort).length > 0) {
            const sortKey = Object.keys(sort)[0];
            const sortOrder = sort[sortKey];
            queryParams.order_by = sortKey;
            queryParams.order = sortOrder === 'ascend' ? 'asc' : 'desc';
          }

          const response = await getAdmins(queryParams);

          if (response.success && response.data) {
            return {
              data: response.data.list,
              success: true,
              total: response.data.pagination.total,
            };
          }

          return {
            data: [],
            success: false,
            total: 0,
          };
        }}
        editable={{
          type: 'multiple', // 多行编辑
        }}
        columnsState={{
          persistenceKey: 'pro-table-admins',
          persistenceType: 'localStorage',
          defaultValue: {
            option: { fixed: 'right', disable: true },
          },
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        dateFormatter="string"
        headerTitle="管理员列表"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              setFormVisible(true);
            }}
            type="primary"
          >
            新建
          </Button>,
        ]}
      />
      <CardForm
        visible={formVisible}
        onCancel={() => setFormVisible(false)}
        actionRef={actionRef}
      />
    </>
  );
};

export default Admins;
