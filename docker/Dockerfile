# 使用官方 MySQL 镜像作为基础镜像
FROM mysql:8.0

# Set the time zone
ENV TZ=Asia/Shanghai

# 设置环境变量
ENV MYSQL_ROOT_PASSWORD=123456
ENV MYSQL_DATABASE=nest_database
ENV MYSQL_USER=wwp
ENV MYSQL_PASSWORD=123456

# Copy custom MySQL configuration
COPY my.cnf /etc/mysql/conf.d/

# Expose MySQL default port
EXPOSE 3306

# 启动MySQL服务
CMD ["mysqld"]