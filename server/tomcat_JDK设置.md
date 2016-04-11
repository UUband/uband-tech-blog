#tomcat 配置不同于系统的jdk
*注意，该方法仅对从zip包解压安装的tomcat起效*

1. 假设你的tomcat目录默认为CATALINA_BASE
2. 创建CATALINA_BASE\bin\setenv.sh 文件，并添加如下内容
```
JRE_HOME=/usr/java/jdk1.7.0_03/jre<改我，你的JRE_HOME>
CATALINA_PID="$CATALINA_BASE/tomcat.pid"
```
