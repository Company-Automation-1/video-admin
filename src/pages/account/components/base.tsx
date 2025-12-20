import { UploadOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useIntl, useRequest } from '@umijs/max';
import { Button, message, Upload } from 'antd';
import React from 'react';
import useStyles from './index.style';

const BaseView: React.FC = () => {
  const { styles } = useStyles();
  const intl = useIntl();
  // 头像组件 方便以后独立，增加裁剪之类的功能
  const AvatarView = ({ avatar }: { avatar: string }) => (
    <>
      <div className={styles.avatar_title}>
        {intl.formatMessage({ id: 'pages.account.base.avatar' })}
      </div>
      <div className={styles.avatar}>
        <img src={avatar} alt="avatar" />
      </div>
      <Upload showUploadList={false} beforeUpload={beforeUpload}>
        <div className={styles.button_view}>
          <Button>
            <UploadOutlined />
            {intl.formatMessage({ id: 'pages.account.base.changeAvatar' })}
          </Button>
        </div>
      </Upload>
    </>
  );
  const { data: currentUser, loading } = useRequest(() => {
    message.info(
      intl.formatMessage({ id: 'pages.account.base.userInfoNotImplemented' }),
    );
    console.log('currentUser', currentUser);
  });
  const beforeUpload = (file: File) => {
    console.log('beforeUpload', file);
  };
  const getAvatarURL = () => {
    return 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
  };
  const handleFinish = async (v: any) => {
    // 剔除空值字段
    const values = Object.fromEntries(
      Object.entries(v).filter(([_, value]) => value != null && value !== ''),
    );
    console.log('handleFinish', values);

    message.info(
      intl.formatMessage({ id: 'pages.account.base.submitNotImplemented' }),
    );
  };
  return (
    <div className={styles.baseView}>
      {loading ? null : (
        <>
          <div className={styles.left}>
            <ProForm
              layout="vertical"
              onFinish={handleFinish}
              submitter={{
                searchConfig: {
                  submitText: intl.formatMessage({
                    id: 'pages.account.base.submit',
                  }),
                },
                render: (_, dom) => dom[1],
              }}
              hideRequiredMark
            >
              <ProFormText
                width="md"
                name="email"
                label={intl.formatMessage({
                  id: 'pages.account.base.email.label',
                })}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: 'pages.account.base.email.required',
                    }),
                  },
                ]}
              />
              <ProFormText
                width="md"
                name="name"
                label={intl.formatMessage({
                  id: 'pages.account.base.nickname.label',
                })}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: 'pages.account.base.nickname.required',
                    }),
                  },
                ]}
              />
              <ProFormTextArea
                name="profile"
                label={intl.formatMessage({
                  id: 'pages.account.base.profile.label',
                })}
                placeholder={intl.formatMessage({
                  id: 'pages.account.base.profile.placeholder',
                })}
              />
            </ProForm>
          </div>
          <div className={styles.right}>
            <AvatarView avatar={getAvatarURL()} />
          </div>
        </>
      )}
    </div>
  );
};
export default BaseView;
