import type { ActionType } from '@ant-design/pro-components';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Modal, message } from 'antd';
import { createAdmin } from '@/services/admins/api';

interface CardFormProps {
  visible: boolean;
  onCancel: () => void;
  actionRef?: React.RefObject<ActionType | null>;
}

const CardForm: React.FC<CardFormProps> = ({
  visible,
  onCancel,
  actionRef,
}) => {
  const handleFinish = async (values: API.CreateAdminParams) => {
    try {
      const res = await createAdmin(values, { skipErrorHandler: true });
      if (res.success) {
        message.success('创建管理员成功');
        onCancel();
        actionRef?.current?.reload();
      } else {
        message.error(res.message || '创建管理员失败，请重试');
      }
    } catch (e: any) {
      const msg = e.response.data.message || '创建管理员失败，请重试';
      message.error(msg);
    }
  };

  return (
    <Modal
      title="新建管理员"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={600}
    >
      <ProForm
        preserve={false}
        onFinish={handleFinish}
        submitter={{
          searchConfig: {
            submitText: '创建',
            resetText: '取消',
          },
          resetButtonProps: {
            onClick: onCancel,
          },
        }}
      >
        <ProFormText
          name="username"
          label="管理员名"
          placeholder="请输入管理员名"
          rules={[
            {
              required: true,
              message: '请输入管理员名',
            },
          ]}
          fieldProps={{
            id: 'admin-form-username',
            maxLength: 50,
          }}
        />
        <ProFormText.Password
          name="password"
          label="密码"
          placeholder="请输入密码"
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
          ]}
          fieldProps={{
            id: 'admin-form-password',
            maxLength: 100,
          }}
        />
      </ProForm>
    </Modal>
  );
};

export default CardForm;
