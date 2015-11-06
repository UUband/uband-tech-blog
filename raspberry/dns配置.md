##编辑/etc/resolvconf.conf
```
name_servers=192.168.1.1
name_servers_append=8.8.8.8
```
##resolvconf 生成 /etc/resolv.conf 的更新
```
resolvconf -u
```
##/etc/resolv.conf 中确认
```
cat /etc/resolv.conf
```
结果如下
```
nameserver 192.168.1.1
nameserver 8.8.8.8
```

收工
