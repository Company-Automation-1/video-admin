import { UploadOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, message, Upload } from 'antd';
import React from 'react';
import useStyles from './index.style';

const BaseView: React.FC = () => {
  const { styles } = useStyles();
  // 头像组件 方便以后独立，增加裁剪之类的功能
  const AvatarView = ({ avatar }: { avatar: string }) => (
    <>
      <div className={styles.avatar_title}>头像</div>
      <div className={styles.avatar}>
        <img src={avatar} alt="avatar" />
      </div>
      <Upload showUploadList={false} beforeUpload={beforeUpload}>
        <div className={styles.button_view}>
          <Button>
            <UploadOutlined />
            更换头像
          </Button>
        </div>
      </Upload>
    </>
  );
  const { data: currentUser, loading } = useRequest(() => {
    message.info('当前用户信息暂未实现');
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

    message.info('提交功能暂未实现');
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
                  submitText: '更新基本信息',
                },
                render: (_, dom) => dom[1],
              }}
              hideRequiredMark
            >
              <ProFormText
                width="md"
                name="email"
                label="邮箱"
                rules={[
                  {
                    required: true,
                    message: '请输入您的邮箱!',
                  },
                ]}
              />
              <ProFormText
                width="md"
                name="name"
                label="昵称"
                rules={[
                  {
                    required: true,
                    message: '请输入您的昵称!',
                  },
                ]}
              />
              <ProFormTextArea
                name="profile"
                label="个人简介"
                placeholder="个人简介"
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
