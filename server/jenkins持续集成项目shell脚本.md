```
scp labcloud_v2/build/libs/labcloud_v2-2.1.war nevermore:~/servers/nevermore/webapps/ROOT.war

BUILD_ID=dontKillMe ssh nevermore 'rm -rf ~/servers/nevermore/webapps/ROOT
PID=$(lsof -i:8082 | tail -1 | awk '{print$2}')
if [[ -n $PID ]] ; then
  ~/servers/nevermore/bin/shutdown.sh
fi
~/servers/nevermore/bin/startup.sh'





scp tiger-web-api/build/libs/tiger-0.1.0.war tiger:/opt/servers/tomcat8-01/webapps/ROOT.war

BUILD_ID=dontKillMe ssh tiger 'rm -rf /opt/servers/tomcat8-01/webapps/ROOT
PID=$(lsof -i:8080 | tail -1 | awk '{print$2}')
if [[ -n $PID ]] ; then
  /opt/servers/tomcat8-01/bin/shutdown.sh
fi
BUILD_ID=dontKillMe /opt/servers/tomcat8-01/bin/startup.sh'
```
