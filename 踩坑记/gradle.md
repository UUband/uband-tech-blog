#2015-10-31
在部署tiger的时候遇到：
```
FAILURE: Build failed with an exception.

* What went wrong:
A problem occurred configuring project ':tiger-web-api'.
> Could not open buildscript class cache for build file '/root/.jenkins/jobs/tiger/workspace/tiger-web-api/build.gradle' (/root/.gradle/caches/2.4/scripts/build_8z420rzdhc8r2swqwn165q8n0/ProjectScript/buildscript).
   > Timeout waiting to lock buildscript class cache for build file '/root/.jenkins/jobs/tiger/workspace/tiger-web-api/build.gradle' (/root/.gradle/caches/2.4/scripts/build_8z420rzdhc8r2swqwn165q8n0/ProjectScript/buildscript). It is currently in use by another Gradle instance.
     Owner PID: unknown
     Our PID: 53548
     Owner Operation: unknown
     Our operation: Initialize cache
     Lock file: /root/.gradle/caches/2.4/scripts/build_8z420rzdhc8r2swqwn165q8n0/ProjectScript/buildscript/cache.properties.lock

* Try:
Run with --stacktrace option to get the stack trace. Run with --debug option to get more log output.

BUILD FAILED

```

解决方案：
在.bashrc中增加
```
export GRADLE_USER_HOME=$WORKSPACE/.gradle
```
然后重启jenkins，再次build成功

注：再次build的时候发现gradle把所有的依赖重新下载了一次，囧

#2015-10-31
##jenkins build script
```
PID=$(lsof -i:8088 | tail -1 | awk '{print$2}')
if [[ -n $PID ]] ; then 
  kill -9 $PID
fi
BUILD_ID=dontKillMe gradle bootRun &
```

更新为
###gralde任务
```
gradle flywayMigrate -i war -x test -x checkstyleMain -x checkstyleTest
```
###shell
```
BUILD_ID=dontKillMe sh /opt/servers/tomcat-tiger/bin/shutdown.sh
PID=$(lsof -i:8088 | tail -1 | awk '{print$2}')
if [[ -n $PID ]] ; then 
  kill -9 $PID
fi
rm -rf /opt/servers/tomcat-tiger/webapps/ROOT
rm -f /opt/servers/tomcat-tiger/webapps/ROOT.war
mv tiger-web-api/build/libs/tiger-0.1.0.war /opt/servers/tomcat-tiger/webapps/ROOT.war
BUILD_ID=dontKillMe sh /opt/servers/tomcat-tiger/bin/startup.sh
```

