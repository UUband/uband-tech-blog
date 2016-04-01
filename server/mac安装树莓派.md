# [mac安装树莓派](!https://github.com/ccforward/cc/issues/25)
## [format as fat32](!http://michaelcrump.net/the-magical-command-to-get-sdcard-formatted-for-fat32/)
```
diskutil list

sudo diskutil eraseDisk FAT32 PI<改我， 设备名称> MBRFormat /dev/rdisk4<改我，设备文件>
```

## raspberry pi

1. download & unzip
2. run shell

```
diskutil list

diskutil unmountDisk /dev/disk4<改我，设备文件>

sudo dd bs=1m if=2016-03-18-raspbian-jessie.img<改我， 树莓派镜像> of=/dev/rdisk4<改我，设备文件>

sudo diskutil eject /dev/rdisk4
```

This will take a few minutes, depending on the image file size. 
You can check the progress by sending a SIGINFO signal (press Ctrl+T).

#[树莓派开机后的配置](http://blog.lxx1.com/1315)

1. 选择expand_rootfs
2. 配置键盘（键盘布局还是比较重要的，要不然你得到的可能不是你输入的内容哦）
3. 修改密码
4. 修改地区，时区以及字符集
5. 如果你想进入系统后看看Raspbian给你什么样的惊喜，请选择Desktop模式，否则就跟我一样快乐的使用text 模式吧，很省内存哦。

##VIM
```
sudo apt-get remove vim-common

sudo apt-get install vim
```


##给你的ROOT 用户来个密码吧
```
sudo passwd root

sudo passwd --unlock root
```

```
sudo ifdown wlan0

sudo ifup wlan0
```

##无线网卡静态ip，有线网络动态ip
参照[树莓派 Raspberry Pi 设置无线上网](!http://www.jianshu.com/p/b42e8d3df449)

```
vi /etc/network/interfaces
```
内容如下

```
# interfaces(5) file used by ifup(8) and ifdown(8)

# Please note that this file is written to be used with dhcpcd
# For static IP, consult /etc/dhcpcd.conf and 'man dhcpcd.conf'

# Include files from /etc/network/interfaces.d:
source-directory /etc/network/interfaces.d

auto lo
iface lo inet loopback

auto eth0
iface eth0 inet dhcp

auto wlan0
allow-hotplug wlan0
iface wlan0 inet static
wpa-conf /etc/wpa.conf
address 192.168.3.30
netmask 255.255.255.0
gateway 192.168.3.1
```

##[更新源地址](!http://blog.csdn.net/xukai871105/article/details/38614541)
###在[Raspbian Mirrors](!http://www.raspbian.org/RaspbianMirrors)找合适的源地址
比如我找的是 Tsinghua University 的源

```
sudo vi /etc/apt/sources.list
```
内容如下

```
deb http://mirrors.tuna.tsinghua.edu.cn/raspbian/raspbian/ jessie main contrib non-free rpi
#deb http://mirrordirector.raspbian.org/raspbian/ jessie main contrib non-free rpi
# Uncomment line below then 'apt-get update' to enable 'apt-get source'
#deb-src http://archive.raspbian.org/raspbian/ jessie main contrib non-free rpi
```


##[install node](!https://learn.adafruit.com/node-embedded-development/installing-node-dot-js)
```
curl -sLS https://apt.adafruit.com/add | sudo bash

sudo apt-get install node

node -v
```

#[备份及恢复](!https://www.raspberrypi.org/documentation/linux/filesystem/backup.md)
```
sudo dd bs=4M if=/dev/sdb | gzip > rasbian.img.gz

sudo gunzip --stdout rasbian.img.gz | dd bs=4m of=/dev/sdb
```