# Centos从零开始上线环境搭建

这篇文章教你如何搭建一台用户配置 python 脚本的上线 centos 环境，机器是一台虚拟主机，版本是Linux 2.6.32-431.el6.x86_64.  Centos 6.5 版本。

## 1. 基础环境更新

### yum更新

yum 是 linux 的一个软件包管理工具，我们需要首先更新一下，确保我们使用的是最新的版本。

```
yum update  //更新

```

### 防火墙配置

默认的防火墙需要关闭

```
vi /etc/sysconfig/iptables
-A INPUT -m state --state NEW -m tcp -p tcp --dport 80 -j  ACCEPT #允许80端口通过防火墙
-A INPUT -m state --state NEW -m tcp -p tcp --dport 3306 -j  ACCEPT #允许3306端口通过防火墙


/etc/init.d/iptables restart  //重启防火墙

# cent7
systemctl stop firewalld
systemctl mask firewalld
Then, install the iptables-services package:

yum install iptables-services
Enable the service at boot-time:

systemctl enable iptables
Managing the service

systemctl [stop|start|restart] iptables
Saving your firewall rules can be done as follows:

service iptables save
or

/usr/libexec/iptables/iptables.init save
```

关闭 SELINUX
```
vi /etc/selinux/config
#SELINUX=enforcing #注释掉
#SELINUXTYPE=targeted #注释掉
SELINUX=disabled #增加
:wq #保存，关闭
shutdown -r now #重启系统


```

## 2. 常用软件

```
yum install vim //vim
yum install tmux //分屏软件
```

### 安装Apache + Mysql


```
yum install httpd //apache
yum -y install mysql mysql-server //mysql
/etc/init.d/mysqld start #启动MySQL
chkconfig mysqld on #设为开机启动

换成了mariadb
systemctl start mariadb.service
systemctl enable mariadb.service



```



mysql_secure_installation
回车，根据提示输入Y
输入2次密码，回车
根据提示一路输入Y
最后出现：Thanks for using MySQL!

MySql密码设置完成，重新启动 MySQL：
/etc/init.d/mysqld restart #重启
/etc/init.d/mysqld stop #停止
/etc/init.d/mysqld start #启动

Mysqladmin -u root -p password 123456
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION
Flush privileges

```

### 升级 python

安装编译需要的一些模块，因为不知道依赖，就把常用的都安装了

```
yum -y install rpm-build gcc-c++
And some dependencies
yum -y install readline-devel openssl-devel gmp-devel ncurses-devel
yum -y install gdbm-devel expat-devel libGL-devel libX11-devel tcl-devel tk-devel tix-devel sqlite-devel db4-devel zlib-devel bzip2-devel
```

编译升级python

```
which python //查看python 目录，我的是 /usr/bin/python
yum groupinstall "Development tools"
yum install wget

cd /opt
wget --no-check-certificate https://www.python.org/ftp/python/2.7.6/Python-2.7.6.tar.xz
tar xf Python-2.7.6.tar.xz
cd Python-2.7.6
./configure --prefix=/usr/local
make && make altinstall

#这里就编译成功了，然后就可以用新的 python 替换掉老版本的 python 了
ln -s /usr/local/bin/python2.7 /usr/local/bin/python

#安装 pip
wget https://bitbucket.org/pypa/setuptools/raw/bootstrap/ez_setup.py
python ez_setup.py
easy_install pip

```

安装 nginx

```
# wget http://nginx.org/packages/rhel/6/noarch/RPMS/nginx-release-rhel-6-0.el6.ngx.noarch.rpm
# rpm -ivh nginx-release-rhel-6-0.el6.ngx.noarch.rpm
# yum install nginx
# chkconfig nginx on
# service nginx start

sudo yum install epel-release
sudo yum install nginx
```


### 安装开发工具

```
yum install git
$ ssh-keygen -C 'Email地址' -t rsa
//一路默认，然后copy .ssh下的pub进入github

```
how-to-install-the-latest-git-version-on-centos(https://www.howtoforge.com/how-to-install-the-latest-git-version-on-centos)

### node 环境
```
yum install epel-release

sudo yum install nodejs

sudo yum install npm
```

### 安装 Redis

```
sudo yum install gcc-c++

wget http://download.redis.io/releases/redis-4.0.6.tar.gz

tar -zxvf redis-4.0.6.tar.gz

cd redis-4.0.6

make MALLOC=libc　

cd src && make install


```

### 安装nodejs

```


```
yum install nodejs

npm install -g cnpm --registry=https://registry.npm.taobao.org
```


---

## 安装mongodb

```
创建yum源文件：
vim /etc/yum.repos.d/mongodb-org-3.4.repo
添加以下内容：
[mongodb-org-3.4]  
name=MongoDB Repository  
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.4/x86_64/  
gpgcheck=1  
enabled=1  
gpgkey=https://www.mongodb.org/static/pgp/server-3.4.asc

安装命令：
yum -y install mongodb-org

安装完成后

查看mongo安装位置 whereis mongod

查看修改配置文件 ： vim /etc/mongod.conf

启动mongodb ：systemctl start mongod.service
停止mongodb ：systemctl stop mongod.service

查到mongodb的状态：systemctl status mongod.service

```