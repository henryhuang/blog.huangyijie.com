title:  "Wicket使用Link加JS的Confirm"
date:  2013-06-21 22:42
tags: [Java,Wicket]
---

```java
Link logoutLink = new Link(LOGOUT_ID) {
    private static final long serialVersionUID = 1L;
    public void onClick() {
        getUbSession().setLogin(false);
    }
};
SimpleAttributeModifier sam = new SimpleAttributeModifier(
    "onclick","if(!confirm('确定退出？')) return false;");

logoutLink.add(sam);
add(logoutLink);
```