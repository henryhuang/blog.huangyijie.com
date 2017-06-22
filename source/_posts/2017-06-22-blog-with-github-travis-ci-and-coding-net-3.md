title: 使用Github、Travis-CI和Coding.net自动部署博客［三］
date: 2017-06-22 22:32:47
tags: ["github", "travis", "coding.net"]
---
迟迟到来的第三篇，也就是最后一篇。

``` yml
deploy:
  provider: script
  script: sh .travis/deploy.sh
  skip_cleanup: true
  on:
    branch: master
```

这是 Travis CI 的部署步骤的配置，“部署” 是整个工作流的最后一步，这里只注意 **branch: master**，道理和上一个说明一样，其他照抄；

### 编写部署脚本

**Travis CI** 的工作流最后一步是**部署**的功能，我们利用它本身的配置需求进行配置，并且编写相关脚本，这样就可以达到部署博客的需求了。

在博客根目录下添加 **.travis** 文件夹，文件目录结构为：

```
blogroot // 博客根目录
└── .travis
    ├── deploy.sh
    ├── private_key.enc
    └── ssh_config
```

- deploy.sh 是执行脚本

``` shell
#!/bin/bash
# Decrypt the private key
openssl aes-256-cbc -K $encrypted_adc0b7f2dba9_key -iv $encrypted_adc0b7f2dba9_iv -in .travis/private_key.enc -out ~/.ssh/id_rsa -d
# Set the permission of the key
chmod 600 ~/.ssh/id_rsa

# Start SSH agent
eval $(ssh-agent)
# Add the private key to the system
ssh-add ~/.ssh/id_rsa
# Copy SSH config
cp .travis/ssh_config ~/.ssh/config
# Set Git config
git config --global user.name "henryhuang"
git config --global user.email h1886@outlook.com

# Deploy to GitHub
hexo deploy
```

这个脚本的功能就是执行 **hexo deploy**，有人说那直接执行不就完了吗？

非也！我们要部署代码，就是要执行 **git push** 的操作，而这一步是需要 **ssh key** 的，否则你是没有权限给一个 git repository push 代码的，而这个脚本除了最后一步，其他所有的代码都是在构建这个带 ssh key 的上下文环境。

什么都不用管，照抄就行，只用管以下两个配置。

``` shell
# Decrypt the private key
openssl aes-256-cbc -K $encrypted_adc0b7f2dba9_key -iv $encrypted_adc0b7f2dba9_iv -in .travis/private_key.enc -out 
```

这行代码的作用就是获取你的key，毕竟私钥是不能放到代码里了，要是被别人看到了怎么办？所以Travis让你在本地用Travis知道的key对你的私钥进行加密，得到这个 **private_key.enc**，而这个key是由你自己配置到Travis上的，而这个key的名字是什么呢？就是上面的 $encrypted_adc0b7f2dba9_key 和 $encrypted_adc0b7f2dba9_iv，具体怎么配置，可以查看官网的说明 [https://docs.travis-ci.com/user/encrypting-files/#Automated-Encryption](https://docs.travis-ci.com/user/encrypting-files/#Automated-Encryption).

最后编写完成脚本后，上传代码到GitHub就可以了。
