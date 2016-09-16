title:  "设计模式学习笔记工厂方法模式"
date:  2013-02-20 10:09
tags: [IT,设计模式,Java]
---
首先，看一下比较实用的工厂模式的通用源码。
### 工厂方法模式通用类图
![工厂模式类图](http://cnhalo.qiniudn.com/designpatterns/factory_class.jpg)
### 抽象产品类
<!--more-->

```java
public abstract class Product {
	// 产品类的公共方法
	public void method1(){
		// 业务逻辑处理
	}
	
	// 抽象方法
	public abstract void method2();
}
```

### 具体产品类

```java
public class ConcreteProduct1 extends Product {
	public void method2() {
		// 业务逻辑处理
	}
}

public class ConcreteProduct2 extends Product {
	public void method2() {
		// 业务逻辑处理
	}
}
```

### 抽象工厂类

```java
public abstract class Creator {
	/*
 	* 创建一个产品对象，其输入参数类型可以自行设置
 	* 通过为String、Enum、Class等，当然也可以为空
 	*/
	public abstract <T extends Product> T createProduct(Class<T> c);
}
```

### 具体工厂类

```java
public class ConcreteCreator extends Creator {
	public <T extends Product> T createProduct(Class<T> c) {
		Product product = null;
		try {
			product = (Product) Class.forName(c.getName()).newInstance();
		} catch (Exception e) {
			// 异常处理
		}
		return (T) product;
	}
}
```

### 场景类

```java
public class Client {
	public static void main(String[] args) {
		Creator creator = new ConcreteCreator();
		Product product1 = creator.createProduct(ConcreteProduct1.class);
		Product product2 = creator.createProduct(ConcreteProduct2.class);
		
		/*
	 	* 继续业务处理
	 	*/	
	}
}
```