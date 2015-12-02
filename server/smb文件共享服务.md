CentOS 6.3下Samba服务器的安装与配置(http://www.cnblogs.com/mchina/archive/2012/12/18/2816717.html)
#1. 安装Samba
yum -y install samba samba-client

#2. 开启smb服务，关闭SElinux
直接使用service smb start 启动Samba服务。
getenforce命令可以查看SElinux的状态
setenforce 0可以暂时关闭SElinux
在/etc/selinux/config中把SELINUX= enforcing更改为SELINUX=disable可以永久关闭SELinux

#3. 配置Samba
配置文件
[global]
 workgroup=TIGERGROUP
 netbios name=TIGERSERVER
 server string=Samba Server
 security=user
 map to guest = Bad User
[TIGERDOCS]
 path=/home/tiger/documents/samba
 public = no
 writable = yes
 write list = @tiger_samba
 valid users = @tiger_samba

#4. 配置用户和用户组，并添加至smb服务中
使用useradd命令新建系统账户，然后再使用smbpasswd –a建立SMB账户
使用usermod -a -G apache cnzhx将cnzhx用户添加至apache用户组中
