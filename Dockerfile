# Build stage
FROM nginx:alpine

# 删除默认配置
RUN rm /etc/nginx/conf.d/default.conf

# 添加项目配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 复制前端构建产物
COPY dist /usr/share/nginx/html

# 权限设置
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html
