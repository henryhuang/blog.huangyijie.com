title:  "Java使用反射设置值"
date:  2013-11-25 17:37
tags: [java,reflect,Field]
---

今天敲代码，遇到个问题，需要实现一个方法：给一个类的成员变量设置值，数字类型的设置为0，布尔类型的设置为false，其他设置为null，变量不知道是什么类型的。

这里面有几个要点：

* 给变量设值
* 区分变量是什么类型（数字，布尔或其他）
* 基本类型的处理情况

<!-- more -->

### 1. 给变量设值

```java

	java.lang.reflect.Field.set(Object obj, Object value);

```

### 2. 区分变量是什么类型（数字，布尔或其他）

```java

	Class<?> clazz = field.getType();
	
	// 判断是否是数字的, 查看java源码可以知道基本类型里面除了char和boolean，其他的都是	// java.lang。Number 的子类
	if(Number.class.isAssignableFrom(type))
		field.set(cfg, 0);
	else if(Boolean.class.isAssignableFrom(type))
		field.set(cfg, false);
	else
		field.set(cfg, null);
	
```

Class.isAssignableFrom(Class<?> cls)查看源码，得知：

	判定此 Class 对象所表示的类或接口与指定的 Class 参数所表示的类或接口是否相同，或是否是其超类或超接口。如果是则返回 true；否则返回 false。如果该 Class 表示一个基本类型，且指定的 Class 参数正是该 Class 对象，则该方法返回 true；否则返回 false。 
	
	特别地，通过身份转换或扩展引用转换，此方法能测试指定 Class 参数所表示的类型能否转换为此 Class 对象所表示的类型。有关详细信息，请参阅 Java Language Specification 的第 5.1.1 和 5.1.4 节。 


	参数：
	cls - 要检查的 Class 对象 
	返回：
	表明 cls 类型的对象能否赋予此类对象的 boolean 值 
	抛出： 
	NullPointerException - 如果指定的 Class 参数为 null。

### 3. 基本类型的处理情况
	
使用 Class.isAssignableFrom，并不能处理基本类型的情况，找来找去，并没有发现相关的方法，所以就自己写了个方法，来转换基本类型和包装类：

```java

	private static Class<?> getWrapperClass(Class<?> primitiveClass) {
		if(!primitiveClass.isPrimitive())
			return primitiveClass;
		
		if(primitiveClass == Boolean.TYPE)
			return Boolean.class;
		else if(primitiveClass == Character.TYPE)
			return Character.class;
		else if(primitiveClass == Byte.TYPE)
			return Byte.class;
		else if(primitiveClass == Short.TYPE)
			return Short.class;
		else if(primitiveClass == Integer.TYPE)
			return Integer.class;
		else if(primitiveClass == Long.TYPE)
			return Long.class;
		else if(primitiveClass == Float.TYPE)
			return Float.class;
		else if(primitiveClass == Double.TYPE)
			return Double.class;
		else return Void.class;
		
	}
	
```

这样，在获取到Field的类型（Field.getType()）后，可以根据Class.isPrimitive()来判断是不是基本类型，然后再使用此方法进行转换

### 4. 完整示例

以上是关键点的代码，下面是具体的代码实现：

Config.class

```java

/**
 * cnhalo.mrhuang.field.Config <示例>
 *
 * @author	huangyijie
 * @date	2013年11月25日 下午3:35:57
 * 
 */
public class Config {

	public double doubleVar = 0.1;
	public Integer integerWrapperVar = 14;
	public String stringVar = "stringVar";
	public boolean booleanVar = true;
	
	private static Config instance = null;
	
	public static Config getInstance() {
		if(instance == null)
			instance = new Config();
		return instance;
	}
	
	/**
	 * Config. <说明>
	 *
	 */
	private Config() {
	}
	
	public String toString() {
		return doubleVar + ", " + integerWrapperVar + ", " + stringVar + ", " + booleanVar;
	}
	
}

```

Main.class

```java

/**
 * cnhalo.mrhuang.field.Main <示例>
 *
 * @author	huangyijie
 * @date	2013年11月25日 下午3:35:04
 * 
 */
public class Main {

	/**
	 * 
	 * main: 实现的功能： <br>
	 * 
	 * 给一个类的成员变量设置值，数字类型的设置为0，布尔类型的设置为false，其他设置为null，变量不知道是什么类型的 <br>
	 *
	 * @param args
	 * @throws SecurityException
	 * @throws NoSuchFieldException
	 * @throws IllegalArgumentException
	 * @throws IllegalAccessException
	 */
	public static void main(String[] args) throws SecurityException, NoSuchFieldException, IllegalArgumentException, IllegalAccessException {
		
		Config cfg = Config.getInstance();
		// 打印一下初始值
		System.out.println(cfg);
		
		Field[] fields = cfg.getClass().getFields();
		
		for(Field field : fields) {
			Class<?> clazz = field.getType();
			// 如果是基本类型
			if(clazz.isPrimitive())
				// 转换为包装类
				clazz = getWrapperClass(clazz);
			// 判断为数字类型
			if(Number.class.isAssignableFrom(clazz))
				field.set(cfg, 0);
			else if(Boolean.class.isAssignableFrom(clazz))
				field.set(cfg, false);
			else
				field.set(cfg, null);
		}
		
		// 打印一下修改后的值
		System.out.println(cfg);
	}
	
	/**
	 * 
	 * getWrapperClass: 将基本类型转换为包装类 <br>
	 * 
	 * 我暂时找不到java中相关的方法，如果有的话可以替换，现在先自己写一个 <br>
	 *
	 * @param primitiveClass
	 * @return
	 */
	private static Class<?> getWrapperClass(Class<?> primitiveClass) {
		if(!primitiveClass.isPrimitive())
			return primitiveClass;
		
		if(primitiveClass == Boolean.TYPE)
			return Boolean.class;
		else if(primitiveClass == Character.TYPE)
			return Character.class;
		else if(primitiveClass == Byte.TYPE)
			return Byte.class;
		else if(primitiveClass == Short.TYPE)
			return Short.class;
		else if(primitiveClass == Integer.TYPE)
			return Integer.class;
		else if(primitiveClass == Long.TYPE)
			return Long.class;
		else if(primitiveClass == Float.TYPE)
			return Float.class;
		else if(primitiveClass == Double.TYPE)
			return Double.class;
		else return Void.class;
		
	}
}

```

### 5. 相关扩展

#### 5.1 [转]Java中判断字符串是否为数字的三种方法

```java

// 用JAVA自带的函数
public static boolean isNumeric(String str){
  for (int i = str.length();--i>=0;){   
   if (!Character.isDigit(str.charAt(i))){
    return false;
   }
  }
  return true;
 }

// 用正则表达式
public static boolean isNumeric(String str){ 
    Pattern pattern = Pattern.compile("[0-9]*"); 
    return pattern.matcher(str).matches();    
 } 

// 用ascii码
public static boolean isNumeric(String str){
   for(int i=str.length();--i>=0;){
      int chr=str.charAt(i);
      if(chr<48 || chr>57)
         return false;
   }
   return true;
}

```