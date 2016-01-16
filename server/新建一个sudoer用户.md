1. 创建用户
```
useradd tiger -U
```

2. 更改密码
```
passwd tiger
```

3. visudo
```
visudo

# User privilege specification
root        ALL=(ALL:ALL) ALL
newuser    ALL=(ALL:ALL) ALL
```

##参考
[add sudoers](https://www.digitalocean.com/community/tutorials/how-to-add-delete-and-grant-sudo-privileges-to-users-on-a-debian-vps)
