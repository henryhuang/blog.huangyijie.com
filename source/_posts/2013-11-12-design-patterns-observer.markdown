title:  "设计模式学习笔记观察者模式"
date:  2013-11-12 22:41
tags: [设计模式,观察者,observer]
---

###1. 模式定义
观察者模式（Observer Pattern）也叫做发布订阅模式（Publish/subscribe），它使一个在项目中经常使用的模式。

###2. 模式各角色

**Subject被观察者**：定义被观察者必须实现的职责，它必须能够动态地增加、取消观察者。它一般是抽象类或者是实现类，仅仅完成作为被观察者必须实现的职责：管理观察者并通知观察者。

**Observer观察者**：观察者接收到消息后，即进行update（更新方法）操作，对接收到的信息进行处理。

**ConcreteSubject具体的被观察者**：定义被观察者自己的业务逻辑，同时定义对哪些事件进行通知。

**ConcreteObserver具体的观察者**：每个观察在接收到消息后的处理反应是不同，各个观察者有自己的处理逻辑。

###3. 模式类图
![观察者模式类图](http://githubimg.wxio.club/designpatterns/patterns_observer.png)
<!-- more -->

###4. 通用代码

**被观察者**

```java
public abstract class Subject {

	// 定义一个观察者数组
	public Vector<Observer> obsVector = new Vector<Observer>();
	
	public void addObserver(Observer observer) {
		this.obsVector.add(observer);
	}
	
	// 删除一个观察者
	public void delObserver(Observer observer) {
		this.obsVector.remove(observer);
	}
	
	// 通知所有观察者
	public void notifyObservers() {
		for(Observer observer : this.obsVector)
			observer.update();
	
	}
	
}

```

**具体被观察者**

```java
public class ConcreteSubject extends Subject {

	// 具体的业务
	public void doSomething() {
		
		System.out.println("被观察者做点啥");
		
	}
	
}
```

**观察者**

```java
public interface Observer {

	// 更新方法
	public void update();
	
}
```

**具体观察者**

```java
public class ConcreteObserver implements Observer {

	// 实现更新方法
	public void update() {
		System.out.println("接收到信息，并进行处理！");
	}

}
```

**场景类**

```java
public class Client {

	public static void main(String[] args) {
		
		// 创建一个被观察者
		ConcreteSubject subject = new ConcreteSubject();
		
		// 定义一个观察者
		Observer observer = new ConcreteObserver();
		
		// 观察者观察被观察者
		subject.addObserver(observer);
		
		// 观察者开始活动
		subject.doSomething();
		
	}
}
```
