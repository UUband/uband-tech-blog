
# 编码规范
这里将定义java，python，js的代码风格

> 说在前面的话：请首先设定文件编码为UTF-8

# Java
## 括号
1. `if`, `else`, `for`, `do` 及 `while` 语句后一定要用`{}`包起来
2. `{}`风格采用K & R style， 例子如下：
```
return () -> {
  while (condition()) {
    method();
  }
};

return new MyClass() {
  @Override
  public void method() {
    if (condition()) {
      try {
        something();
      } catch (ProblemException e) {
        recover();
      }
    } else if (otherCondition()) {
      somethingElse();
    } else {
      lastThing();
    }
  }
};
```

3. 空括号(除`if/else-if/else` 和 `try/catch/finally`外)可不换行，`{}`，即括号中不包含任何字符

## 缩进 和 空格
1. 缩进一律采用 +4 spaces
2. `if`, `for` 和 `catch` 与其后的`(`需有一个空格; `else` 和 `catch` 与其前的`}`需有一个空格

## 声明变量
1.每次变量声明仅定义一个变量，即
```
int a;
int b;
```

2. 需要时才定义
3. 数组定义采用`String[] args`方式
4. modifier按照`public protected private abstract default static final transient volatile synchronized native strictfp`的顺序出现

## 命名
1. 仅使用ASCII码中的字母和数字组合，尽量避免使用长度为1的变量名
2. 包名 采用全小写；比如`com.tiger.deepspace`, 注：spaace的首字母未大写
3. 类 采用首字母大写的驼峰命名法；
  1. 类名为名词或名词短语，比如`Character`或者`ImmutableList`
  2. 测试类以`Test`结尾，比如`HashTest`
4. 接口 采用首字母大写的驼峰命名法；
  1. 接口名可为名词、名词短语、形容词或形容词短语；比如`Readable`
5. 方法名 采用首字母小写的驼峰命名法，为动词或动宾短语，比如`sendMessage`和`stop`
6. 常量名 采用CONSTANT_CASE格式，即为大写字母和下划线`_`的组合，为名词或名词短语，比如`COMMA_JOINER`
7. 变量名 采用首字母小写的驼峰命名法，为名词或名词短语，比如`computedValues`和`index`
