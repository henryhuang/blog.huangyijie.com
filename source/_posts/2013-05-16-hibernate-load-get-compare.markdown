title:  "Hibernate的load和get比较"
date:  2012-10-23 09:25
tags: [IT,JAVA]
---
<div><strong>get和load的实现</strong></div>
<div>
<div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;load event(产生) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;onLoad Event</div>
<div>&nbsp; &nbsp; &nbsp;&nbsp;Hibernate&nbsp;--------------------&gt;LoadEventListener---------------&gt;event<strong>①</strong>------&gt;return event-----&gt;getResult()</div>
<div>&nbsp; &nbsp;<strong>&nbsp;其中：①</strong>:------&gt;setResult(event.session(查找))</div>
</div>
<p><span style="background-color: #ffffff;"><strong>未使用二级缓存</strong> <strong></strong>&nbsp;</span> &nbsp;&nbsp;</p>
<p>load 先从缓存（一级）中查找，如果没有查询结果，就到数据库中查找，不管查询结果如何，都返回XX_$$_javassist_0对象（代理类实例）。</p>
<p><!--more--></p>
<p>当在数据库中查询结果为空时，&nbsp;生成代理类实例&nbsp;的ID为load的ID（既session.load(XX.class,id)，这个id）,其他属性为空。获取load的对象的属性，会抛出异常org.hibernate.ObjectNotFoundException: No row with the given identifier exists...获取ID则会返回查询的ID。</p>
<p>load是延迟加载，返回持久化对象或者代理实例，首先返回的是代理实例，在真正使用到对象（比如Person.getName()）的时候才会到数据库里去查询，这样提高效率。</p>
<p>get 先从缓存（二级）中查找，如果没有查询结果，就到数据库中查找，返回XX对象，如果为空就返回null。 get是直接去查询对象，返回持久化对象或者null。</p>
<p><strong>使用二级缓存</strong></p>
<div>首先知道一级，二级缓存的生命周期。一级缓存存活于同一个session中，而二级缓存存活于整个应用中。&nbsp; &nbsp;</div>
<div>二级缓存需要手动配置的。</div>
<div>
<div>load和get都是先从一级缓存中查找，如果没有查询结果，就到二级缓存中查找。</div>
<div>测试时先将第一个session.close()，然后再开一个session(sessionFactory.operSession())。</div>
&nbsp;
<div>测试代码：</div>
</div>

```java
public class Test {

    session = sessionFactory.openSession();

    Person person = new Person();
    session.beginTransaction();
    person = (Person) session.load(Person.class, id);
    System.out.println(person.getName());

    session.getTransaction().commit();
    session.close();
    session = sessionFactory.openSession();
    person = null;
    person = (Person) session.load(Person.class, id);
    System.out.println(person.getName()); 
}
```