title: 错误排查：非ROOT用户使用密钥进行ssh登录提示输入密码
date: 2017-07-07 22:36:06
tags: ["ssh", "linux", "git", "gogs"]
---

由于个人的需要，需要搭建一个私有的git服务器，当然还需要有完善的操作界面，综合下来，我选择了**Gogs**。

```
问：为什么不用GitHub呢？
答：我们不想让别人看到我们的代码。
问：GitHub有private的呀！
答：那要钱，我们没钱。。。
```

很顺序按照官网的步骤一步一步搭建完成了（其实早就用过了，这是第N次的搭建），然后另一个人上传了代码（注意这是通过http的方式的），于是我去下载。

我不喜欢用http的方式，因为要输入密码，而且也不安全，所以一直保持着使用ssh的方式。首先我配置了个人的公钥，但是执行**git clone**以后一直都提示我输入密码！

于是我就开始了一步一步排查！

### 客户端私钥配置

一般情况下，ssh 会拿 **~/.ssh/id_rsa** 去连接，但是如果多个密钥对连接不同的域名的话，就需要在 **~/.ssh/config** 里进行指定域名的配置：

```
host {{domain}}
user git
hostname {{domian}}
port 22
identityfile ~/.ssh/id_rsa_2
```

这里的 **~/.ssh/id\_rsa\_2** 就是我配置在 Gogs 的公钥所对应的私钥，这样我进行 **git clone git@domian:username/repo.git** 的时候就会去拿 **~/.ssh/id\_rsa\_2** 了。

### 文件权限问题

首先确认了一下，以下文件和文件夹都是属于 Gogs 的运行用户和用户组（git:git）的：

```
/home/git/.ssh
/home/git/.ssh/authorized_keys
```

我们使用 ssh 的方式 clone repository, 其实所使用的 ssh 用户 是 git，git用户相对于系统的root用户就是个非root用户了。

ssh对于非root用户的密钥限制是非常严格的，它不允许以上的文件夹和文件有太大的权限，.ssh只需要700，而authorized_keys只需要600。执行以下命令确认权限问题：

```bash
chmod 700 /home/git/.ssh
chmod 600 /home/git/.ssh/authorized_keys
```

可是，再运行 git clone 还是提示需要密码！

### sshd_config配置问题

首先打开日志进行错误跟踪：

> 注意先把 **/etc/ssh/sshd_config** 的 **LogLevel** 改成 **DEBUG**，不然看不到debug级别的日志。

```bash
tail -f /var/log/auth.log
```

然后在客户端执行 git clone 命令，看到了 /var/log/auth.log里：

```
Jul  7 22:57:24 localhost sshd[13061]: debug1: temporarily_use_uid: 1003/1003 (e=0/0)
Jul  7 22:57:24 localhost sshd[13061]: debug1: trying public key file /root/.ssh/authorized_keys
Jul  7 22:57:24 localhost sshd[13061]: debug1: Could not open authorized keys '/root/.ssh/authorized_keys': Permission denied
Jul  7 22:57:24 localhost sshd[13061]: debug1: restore_uid: 0/0
Jul  7 22:57:24 localhost sshd[13061]: Failed publickey for git from 180.158.160.234 port 50987 ssh2: RSA ......
```

上面的这一条引起了注意：

```
Jul  7 22:57:24 localhost sshd[13061]: debug1: Could not open authorized keys '/root/.ssh/authorized_keys': Permission denied
```

很奇怪ssh为什么去读root用户的authorized_keys，而不是git用户的。

于是打开 **/etc/ssh/sshd_config**，找到：

```
AuthorizedKeysFile      ~/.ssh/authorized_keys
```
这里错了，应该是 **.ssh/authorized_keys**！改完以后是：

```
AuthorizedKeysFile      .ssh/authorized_keys
```

如果是 **~/.ssh/authorized_keys** ，那么ssh就去拿了 **/root/.ssh/authorized_keys**，而不是所请求的用户（git）的 **~/.ssh/authorized_keys** 了，为什么呢？这是我自己的理解：首先ssh在获取到了请求用户的用户名后（使用git clone的话一般是git用户），然后ssh就会设置当前目录在git用户的home目录下，如果配置 **.ssh/authorized_keys** ，就能拿到 git 用户所需要的 **authorized_keys** 了，但是如果配置 **~/.ssh/authorized_keys**，则去拿了ssh service的执行者root用户的home下面的 **.ssh/authorized_keys** 了。

### 总结

一般出现使用 ssh 的方式进行 git 远程操作（比如 git clone），出现需要密码的情况，或者配置了密钥进行 ssh 登录，但是还是需要密码的情况，可以先从以下三点进行错误排查：

- 客户端私钥是否指定正确
- 非root用户的文件权限是否有问题
- sshd_config配置是否有问题