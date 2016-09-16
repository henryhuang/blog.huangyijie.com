title:  "新手VMware网络配置"
date:  2013-02-20 22:24
tags: [IT,VMware,虚拟机]
---
这个问题以前一直没专门去想过，只是网络不通了我才去折腾，实在不行就问别人，今天总算好好的去理解了一下。这篇文章能写出来，最需要感谢的是华叔。

### __首先，是对三种模式的理解：__

#### __1.Bridged（桥接模式）:__

>主机<-->主机所在网段<-->虚拟机

>比如：主机的IP为__192.168.40.230__，也就是__40网段__，那么虚拟机配__192.168.40.26__就可以和主机所在的网段通信，桥接的意思可以理解为主机的网卡直接插在虚拟机上。

#### __2.Host-only:__

>主机和虚拟机之间建立自己的通信，需配置成网络在同一网段,两个虚拟机之间配置成Host-only也可以互相通信。
<!--more-->

#### __3.NAT:__

>Used to share the host'Ip address，主机就像是路由器，主机和虚拟机可配置在一个网段，此网段可以不和外网一个网段，只要主机和虚拟机通信上，这样虚拟机就可以访问外网，但是外网无法访问虚拟机。

### __下来是VMware的Virtual Network Editor配置__

#### __1.三种类型的大概描述:__

![Virtual Network Editor](http://cnhalo.qiniudn.com/20121126/virtual_network_editor.jpg)

其中__Bridged__和__NAT__必须有，而且只能是一个。


这三种可以理解为集线器，当虚拟机里的网卡配置成相应的模式之后，就类似于将虚拟机的网卡插在集线器上了。

<br>

#### __2.Bridged__

__Bridged__的__Bridged to__最好不要设置成自动:

![Bridged_to](http://cnhalo.qiniudn.com/20121126/bridged_information.jpg)

<br>

#### __3.NAT和Host-only__

__NAT__模式下，需要将虚拟机里的网关设置成__NAT Setting__里的__GatewayIP__：

![Nat_settings](http://cnhalo.qiniudn.com/20121126/nat_settings.jpg)

__NAT__和__Host-only__选择后，下面的勾选框就成可编辑状态:

![Nat_HostOnly](http://cnhalo.qiniudn.com/20121126/nat_host_only_information.jpg)

__Subnet IP__配成某个网段后，虚拟机和主机只要在这个网段，在对应的模式下就可以通信了。

勾选__Connect a host_virtual adapter to this network__后，主机就会出来虚拟网卡:

![virtual_interface](http://cnhalo.qiniudn.com/20121126/virtual_interface.jpg)