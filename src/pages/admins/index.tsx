import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { getIntl, useIntl } from '@umijs/max';
import { Button } from 'antd';
import { useMemo, useRef, useState } from 'react';
import { getAdmins } from '@/services/admins/api';
import CardForm from './cardForm';

const getColumns = (): ProColumns<API.Admin>[] => {
  const intl = getIntl();
  return [
    {
      title: intl.formatMessage({ id: 'pages.admins.columns.id' }),
      dataIndex: 'id',
      hideInSearch: true,
      editable: false,
    },
    {
      title: intl.formatMessage({ id: 'pages.admins.columns.username' }),
      dataIndex: 'username',
      copyable: true,
      ellipsis: true,
      editable: false,
    },
    {
      title: intl.formatMessage({ id: 'pages.admins.columns.createdAt' }),
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
      title: intl.formatMessage({ id: 'pages.admins.columns.updatedAt' }),
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
      title: intl.formatMessage({ id: 'pages.admins.columns.option' }),
      valueType: 'option',
      key: 'option',
      render: (_text, record, _index, action) => {
        const intl = getIntl();
        return [
          <a
            key="editable"
            onClick={() => {
              action?.startEditable?.(record.id);
            }}
          >
            {intl.formatMessage({ id: 'pages.admins.columns.edit' })}
          </a>,
        ];
      },
    },
  ];
};

const Admins = () => {
  const actionRef = useRef<ActionType>(null);
  const [formVisible, setFormVisible] = useState(false);
  const intl = useIntl();

  // 使用 useMemo 缓存 columns，依赖语言代码而不是整个 intl 对象
  const columns = useMemo(() => getColumns(), [intl.locale]);

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
        headerTitle={intl.formatMessage({ id: 'pages.admins.title' })}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              setFormVisible(true);
            }}
            type="primary"
          >
            {intl.formatMessage({ id: 'pages.admins.create' })}
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
