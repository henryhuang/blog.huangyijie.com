title:  "JAVA对象equals的技巧"
date:  2013-12-06 21:40
tags: [java,equals,object]
---

###1.	测试

又一次在写代码，突然想到这么个问题：java里的equals比较对象的顺序不同会有什么不同的效果？于是乎写了以下测试代码：

```java

/**
 * cnhalo.mrhuang.equalstest.Main <TODO>
 *
 * @author	huangyijie
 * @date	2013年12月6日 下午9:33:33
 * 
 */
public class Main {

	public static void main(String[] args) {
		
		TestObject a1 = null;
		TestObject a2 = new TestObject();
		
		test1(a1, a2);
		test2(a1, a2);
	
	}
	
	public static void test1(TestObject a1, TestObject a2) {
		
		try {
			System.out.println("test1:" + a1.equals(a2));
		} catch (Exception e) {
			e.printStackTrace();
		}
	
	}

	public static void test2(TestObject a1, TestObject a2) {

		try {
			System.out.println("test2:" + a2.equals(a1));
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

}

class TestObject {
	
}

```

###2.	分析
在test1中抛出java.lang.NullPointerException异常，而test2打印出false，对于test2的情况，查看源码的注释可以知道：

	For any non-null reference value x, x.equals(null) should return false.

而对于空指针异常：

引发空指针异常，往往是在获取对象实例地址的时候，由于获取的对象实例并不存在，因此返回的地址为null，而又没进行判断，直接使用了该对象实例（地址）引发的。

###3.	总结

因此，这是一个技巧了，为了避免空指针异常，我们在对对象进行比较的时候，得把常量或者我们认为不会有null的值放在前面： "constant".equals("object");
