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
jenkins/job/tiger/4/console
```



mysql_secure_installation
回车，根据提示输入Y
输入2次密码，回车
根据提示一路输入Y
最后出现：Thanks for using MySQL!

MySql密码设置完成，重新启动 MySQL：
```
/etc/init.d/mysqld restart #重启
/etc/init.d/mysqld stop #停止
/etc/init.d/mysqld start #启动

Mysqladmin -u root -p password 123456
 GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '123456' WITH GRANT OPTION;
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

###编译升级python

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
```


### 安装开发工具

```
	yum install git
	$ ssh-keygen -C 'Email地址' -t rsa
		//一路默认，然后copy .ssh下的pub进入github
	
```
### gralde 2.4
```
wget http://services.gradle.org/distributions/gradle-2.4-all.zip
sudo unzip -foq gradle-2.4-all.zip -d /opt/gradle
sudo ln -sfn gradle-${gradle_version} /opt/gradle/latest
sudo printf "export GRADLE_HOME=/opt/gradle/latest\nexport PATH=\$PATH:\$GRADLE_HOME/bin" > /etc/profile.d/gradle.sh
. /etc/profile.d/gradle.sh

```


### tomcat
####1. check java
####2. download tomcat 7
 go to http://tomcat.apache.org/ and find tomcat
```
wget http://mirrors.cnnic.cn/apache/tomcat/tomcat-7/v7.0.64/bin/apache-tomcat-7.0.64.tar.gz
tar xvzf apache-tomcat-7.0.64.tar.gz
mv apache-tomcat-7.0.64.tar.gz /opt/tomcat
```
####3. set up tomcat
first go to /opt/tomcat
1. user account set
```
vim conf/tomcat-users.xml
<role rolename="manager-gui" /> 
<role rolename="manager-script" /> 
<user username="admin" password="admin" roles="manager-gui, manager-script" /> 

```
2. edit server-context to use port 8888
```
vim conf/server.xml
# find and change 8080 to 8888
<Connector port="8888" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />

```
3. run tomcat
```
bin/start.sh
```
####4. configure tomcat as a service
```
important: java_home and tomcat_home
vim /etc/init.d/tomcat 
#!/bin/bash
# This is the init script for starting up the
#  Tomcat server
#
# chkconfig: 345 91 10
# description: Starts and stops the Tomcat daemon.
#

# Source function library.
. /etc/rc.d/init.d/functions

# Get config.
. /etc/sysconfig/network

# Check that networking is up.
[ "${NETWORKING}" = "no" ] && exit 0

export JAVA_HOME=/usr
tomcat_home=/opt/tomcat
startup=$tomcat_home/bin/startup.sh
shutdown=$tomcat_home/bin/shutdown.sh

start(){
   echo -n "Starting Tomcat service:"
   cd $tomcat_home
   $startup
   echo "done"
}

stop(){
   echo -n "Shutting down tomcat: "
   cd $tomcat_home
   $shutdown
   echo "done."
}

status(){
    numproc=`ps -ef | grep catalina | grep -v "grep catalina" | wc -l`
    if [ $numproc -gt 0 ]; then
       echo "Tomcat is running..."
    else
       echo "Tomcat is stopped..."
    fi
}

restart(){
   stop
   start
}

# See how we were called.
case "$1" in
start)
   start
   ;;
stop)
   stop
   ;;
status)
   status
   ;;
restart)
   restart
   ;;
*)
   echo $"Usage: $0 {start|stop|status|restart}"
   exit 1
esac

# save file
chmod a+x /etc/init.d/tomcat 
sudo service tomcat start
sudo service tomcat stop

# set tomcat auto-run on startup
chkconfig tomcat on
```
###git 1.9.4
####Install Required Packages 
```
yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel gcc perl-ExtUtils-MakeMaker
```
####Download and Compile Git Source 
```
wget https://www.kernel.org/pub/software/scm/git/git-1.9.4.tar.gz
tar xzf git-1.9.4.tar.gz

cd git-1.9.4
make prefix=/opt/git all
make prefix=/opt/git install
echo "export PATH=$PATH:/opt/git/bin" >> /etc/bashrc
source /etc/bashrc
```
####Check Git Version 
```
# git --version
```

### 第一个 flask 应用

我们使用一个 flask



