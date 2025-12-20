import type { ActionType } from '@ant-design/pro-components';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
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
  const intl = useIntl();

  const handleFinish = async (values: API.CreateAdminParams) => {
    try {
      const res = await createAdmin(values, { skipErrorHandler: true });
      if (res.success) {
        message.success(
          intl.formatMessage({ id: 'pages.admins.create.success' }),
        );
        onCancel();
        actionRef?.current?.reload();
      } else {
        message.error(
          res.message ||
            intl.formatMessage({ id: 'pages.admins.create.failure' }),
        );
      }
    } catch (e: any) {
      const msg =
        e.response?.data?.message ||
        intl.formatMessage({ id: 'pages.admins.create.failure' });
      message.error(msg);
    }
  };

  return (
    <Modal
      title={intl.formatMessage({ id: 'pages.admins.createForm.title' })}
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
            submitText: intl.formatMessage({
              id: 'pages.admins.createForm.submit',
            }),
            resetText: intl.formatMessage({
              id: 'pages.admins.createForm.cancel',
            }),
          },
          resetButtonProps: {
            onClick: onCancel,
          },
        }}
      >
        <ProFormText
          name="username"
          label={intl.formatMessage({
            id: 'pages.admins.createForm.username.label',
          })}
          placeholder={intl.formatMessage({
            id: 'pages.admins.createForm.username.placeholder',
          })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.admins.createForm.username.required',
              }),
            },
          ]}
          fieldProps={{
            id: 'admin-form-username',
            maxLength: 50,
          }}
        />
        <ProFormText.Password
          name="password"
          label={intl.formatMessage({
            id: 'pages.admins.createForm.password.label',
          })}
          placeholder={intl.formatMessage({
            id: 'pages.admins.createForm.password.placeholder',
          })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.admins.createForm.password.required',
              }),
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
