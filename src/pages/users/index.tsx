import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { getIntl, useIntl } from '@umijs/max';
import { useMemo, useRef } from 'react';
import { getUsers } from '@/services/users/api';

const getColumns = (): ProColumns<API.User>[] => {
  const intl = getIntl();
  return [
    {
      title: intl.formatMessage({ id: 'pages.users.columns.id' }),
      dataIndex: 'id',
      hideInSearch: true,
      editable: false,
    },
    {
      title: intl.formatMessage({ id: 'pages.users.columns.username' }),
      dataIndex: 'username',
      copyable: true,
      ellipsis: true,
      editable: false,
    },
    {
      title: intl.formatMessage({ id: 'pages.users.columns.email' }),
      dataIndex: 'email',
      copyable: true,
      ellipsis: true,
      editable: false,
    },
    {
      title: intl.formatMessage({ id: 'pages.users.columns.points' }),
      dataIndex: 'points',
      sorter: true,
      valueType: 'digit',
    },
    {
      title: intl.formatMessage({ id: 'pages.users.columns.createdAt' }),
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
      title: intl.formatMessage({ id: 'pages.users.columns.updatedAt' }),
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
      title: intl.formatMessage({ id: 'pages.users.columns.option' }),
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
            {intl.formatMessage({ id: 'pages.users.columns.edit' })}
          </a>,
        ];
      },
    },
  ];
};

const Users = () => {
  const actionRef = useRef<ActionType>(null);
  const intl = useIntl();

  // 使用 useMemo 缓存 columns，依赖语言代码而不是整个 intl 对象
  console.log('intl.locale: ', intl.locale);
  const columns = useMemo(() => getColumns(), [intl.locale]);

  return (
    <ProTable<API.User>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort) => {
        const { current = 1, pageSize = 10, username, points } = params;

        // 构建查询参数
        const queryParams: API.GetUsersParams = {
          page: current,
          page_size: pageSize,
        };

        // 用户名搜索
        if (username) {
          queryParams.username_like = username;
        }

        // 积分最小值搜索
        if (points) {
          queryParams.points_min = +points;
        }

        // 排序处理
        if (sort && Object.keys(sort).length > 0) {
          const sortKey = Object.keys(sort)[0];
          const sortOrder = sort[sortKey];
          queryParams.order_by = sortKey;
          queryParams.order = sortOrder === 'ascend' ? 'asc' : 'desc';
        }

        const response = await getUsers(queryParams);

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
        type: 'single',
      }}
      columnsState={{
        persistenceKey: 'pro-table-users',
        persistenceType: 'localStorage',
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
      headerTitle={intl.formatMessage({ id: 'pages.users.title' })}
    />
  );
};

export default Users;
