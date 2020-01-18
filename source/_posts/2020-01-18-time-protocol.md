---
title: 时间协议
cover: 'http://githubimg.wxio.club/sea_common_cover.jpg'
date: 2020-01-18 18:01:05
tags: ["小知识点", "网络"]
---

# 时间协议
前两天在看Netty的hello world的时候，里面举了个例子—创建时间协议服务器。通过学习，才知道这个协议很老的，甚至已经被网络时间替代了。但是这个协议很简单，所以学习一下也无碍。

## 什么是时间协议

时间协议（英语：TIME protocol）是一个在RFC 868内定义的网络传输协议。它用作提供机器可读的日期时间信息。

这是时间协议（Time Protocol）在[RFC868](https://tools.ietf.org/html/rfc868)上的定义（中文由我自己翻译的）：


```
                             Time Protocol
                                时间协议

This RFC specifies a standard for the ARPA Internet community.  Hosts on
the ARPA Internet that choose to implement a Time Protocol are expected
to adopt and implement this standard.
这个RFC的标准给ARPA（美国国防部国防高等研究计划署）英特网定义的。在ARPA英特网上，
要实现时间协议的主机，则希望采用并且实现这个标准。


This protocol provides a site-independent, machine readable date and
time.  The Time service sends back to the originating source the time in
seconds since midnight on January first 1900.
这个协议提供了一个独立的，机器可读的日期和时间。时间服务将回复给客户端一个从
格林威治时间1900年1月1日开始计算，到请求时刻的总秒数。

One motivation arises from the fact that not all systems have a
date/time clock, and all are subject to occasional human or machine
error.  The use of time-servers makes it possible to quickly confirm or
correct a system's idea of the time, by making a brief poll of several
independent sites on the network.
现实中，并不是所有的系统都有时间功能，而且偶尔会受到人为的或者机器错误的影响。
那么时间服务器就可以快速地提供正确的时间来让其他系统确认，或者用来纠正时间，
只需要在网络上简单地查询就可以。


This protocol may be used either above the Transmission Control Protocol
(TCP) or above the User Datagram Protocol (UDP).
这个协议可以用在TCP和UDP协议上。

When used via TCP the time service works as follows:
当通过TCP协议使用时，时间服务器将执行以下步骤：

   S: Listen on port 37 (45 octal).
   服务端：监听37端口

   U: Connect to port 37.
   客户端：连接到37端口

   S: Send the time as a 32 bit binary number.
   服务端：发送32位二进制的时间

   U: Receive the time.
   客户端：接收到时间

   U: Close the connection.
   客户端：断开连接

   S: Close the connection.
   服务端：断开连接

   The server listens for a connection on port 37.  When the connection
   is established, the server returns a 32-bit time value and closes the
   connection.  If the server is unable to determine the time at its
   site, it should either refuse the connection or close it without
   sending anything.
   服务器监听端口37的连接。当连接建立，服务器将返回32位的时间值，然后关闭连接。
   如果服务器无法确定时间，它需要拒绝连接，或者不发送任何信息，直接关闭连接。

When used via UDP the time service works as follows:
当通过UDP协议使用时，时间服务器将执行以下步骤：

   S: Listen on port 37 (45 octal).
   服务端：监听37端口

   U: Send an empty datagram to port 37.
   客户端：发送空数据报到37端口

   S: Receive the empty datagram.
   服务端：接受到空的数据报

   S: Send a datagram containing the time as a 32 bit binary number.
   服务端：发送32位二进制的时间的数据报

   U: Receive the time datagram.
   客户端：接收时间数据报

   The server listens for a datagram on port 37.  When a datagram
   arrives, the server returns a datagram containing the 32-bit time
   value.  If the server is unable to determine the time at its site, it
   should discard the arriving datagram and make no reply.
   服务器用37端口监听数据报。当接收到数据报，服务器就返回包含32位二进制的时间的数据报。
   如果服务器无法确定时间，则它应该丢弃接收到的数据报，不作回复。

The Time
时间

The time is the number of seconds since 00:00 (midnight) 1 January 1900
GMT, such that the time 1 is 12:00:01 am on 1 January 1900 GMT; this
base will serve until the year 2036.
这里的时间，时从格林威治时间1900年1月1日0点0分0秒开始计算，
比如1就表示时格林威治时间1900年1月1日上午12点0分1秒；但是，这种计算方式到2036年将不再适用。

For example:
示例：

   the time  2,208,988,800 corresponds to 00:00  1 Jan 1970 GMT,

             2,398,291,200 corresponds to 00:00  1 Jan 1976 GMT,

             2,524,521,600 corresponds to 00:00  1 Jan 1980 GMT,

             2,629,584,000 corresponds to 00:00  1 May 1983 GMT,

        and -1,297,728,000 corresponds to 00:00 17 Nov 1858 GMT.

```

## 时间协议服务器的Java实现

完整代码在[https://github.com/henryhuang/time-protocol-example](https://github.com/henryhuang/time-protocol-example)。

### Server

```java

public class TPServer {

    private static final int PORT = 37;
    private static final long OFF_SET = 2208988800L;

    public static void main(String[] args) {

        new TPServer().start();

    }

    public void start() {
        System.out.println("Server starting...");

        try (ServerSocket serverSocket = new ServerSocket(PORT)) {

            while (true) {
                Socket connection = serverSocket.accept();
                new TPHandlerThread(connection);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

    }


    private class TPHandlerThread implements Runnable {

        private Socket connection;

        private TPHandlerThread(Socket connection) {
            this.connection = connection;
            new Thread(this).start();
        }

        public void run() {

            System.out.println("Receive seek time request!");

            try (DataOutputStream os = new DataOutputStream(connection.getOutputStream())) {
                byte[] timeBytes = String.valueOf(getTime()).getBytes();
                os.writeInt(timeBytes.length);
                os.write(timeBytes);
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                if (connection != null) {
                    try {
                        connection.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }

    private static long getTime() {
        return System.currentTimeMillis() / 1000L + OFF_SET;
    }

}

```

### Client

```java

public class TPClient {

    private static final int PORT = 37;
    private static final long OFF_SET = 2208988800L;

    public static void main(String[] args) {
        Long time = new TPClient("localhost").seekTime();
        if (time != null) {
            System.out.println(new Date((time - OFF_SET) * 1000L));
        }
    }

    private String host;

    public TPClient(String host) {
        this.host = host;
    }

    public Long seekTime() {

        try (Socket socket = new Socket(this.host, PORT);
            DataInputStream is = new DataInputStream(socket.getInputStream())) {
            int length = is.readInt();
            byte[] bytes = new byte[length];
            is.readFully(bytes);
            return Long.valueOf(new String(bytes));
        } catch (UnknownHostException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;

    }


}

```
