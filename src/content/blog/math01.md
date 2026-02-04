---
title: '由C语言实验报告引申的有趣极限题'
description: '关于斐波那契数列相邻项商的正负交替求和的极限问题的探讨与证明。'
pubDate: 2024-11-07
---

# 关于斐波那契数列相邻项商的正负交替求和的极限

## 题目描述

斐波那契数列定义如下：

$F_1=0,F_2=1,F_n=F_{n-1}+F_{n-2}(n\geqslant 3)$

定义数列

$a_n=\dfrac{F_{n+2}}{F_{n+1}}$

要求考察数列和$s_n$在n趋于无穷时的情况：

$s_n=\sum_{i=1}^{n}{(-1)^{n+1}a_i}= \sum_{i=1}^{n}{(-1)^{n+1} \dfrac{F_{n+2}}{F_{n+1}}}$

例如：

$s_1=\dfrac{F_{3}}{F_{2}}=\dfrac{2}{1}=2$

$s_2=\dfrac{F_{3}}{F_{2}}-\dfrac{F_{4}}{F_{3}}=\dfrac{2}{1}- \dfrac{3}{2}=\dfrac{1}{2}$

$s_3=\dfrac{F_{3}}{F_{2}}-\dfrac{F_{4}}{F_{3}}+\dfrac{F_{5}}{F_{4}}=\dfrac{2}{1}- \dfrac{3}{2}+\dfrac{5}{3}=\dfrac{11}{6}$

$\cdots$

$s_n=\dfrac{F_{3}}{F_{2}}-\dfrac{F_{4}}{F_{3}}+\dfrac{F_{5}}{F_{4}}-\dfrac{F_{6}}{F_{5}}+\cdots+(-1)^{n+1} \dfrac{F_{n+2}}{F_{n+1}}$

## 解答思路

### 1.由于正负摆动，所以想先将正负相邻两项合并消除摆动

不妨找找规律

$a_1-a_2=\dfrac{F_{3}}{F_{2}}-\dfrac{F_{4}}{F_{3}}=\dfrac{2}{1} - \dfrac{3}{2}=\dfrac{1}{1\times2}$

$a_3-a_4=\dfrac{F_{5}}{F_{4}}-\dfrac{F_{6}}{F_{5}}=\dfrac{5}{3}- \dfrac{8}{5}=\dfrac{1}{3\times5}$

$a_5-a_6=\dfrac{F_{7}}{F_{6}}-\dfrac{F_{8}}{F_{7}}=\dfrac{13}{8}- \dfrac{21}{13}=\dfrac{1}{8\times13}$

$\cdots$

不妨猜想：

$a_{2i-1}-a_{2i}=\dfrac{F_{2i+1}}{F_{2i}}-\dfrac{F_{2i+2}}{F_{2i+1}}=\dfrac{1}{F_{2i}\times F_{2i+1}}$

也就是要证明：

$F_{2i+1}\times F_{2i+1}-F_{2i}\times F_{2i+2}=1$

而

$\begin{align*}F_{2i+1}\times F_{2i+1}-F_{2i}\times F_{2i+2} &= F_{2i+1}\times F_{2i+1}-F_{2i}\times (F_{2i+1}+F_{2i}) \\\&= F_{2i+1}\times (F_{2i+1}-F_{2i})- F_{2i}\times F_{2i} \\\&= F_{2i+1}\times F_{2i-1}-F_{2i}\times F_{2i} \end{align*}$

即

$F_{2i+1}\times F_{2i+1}-F_{2i}\times F_{2i+2}=F_{2i+1}\times F_{2i-1}-F_{2i}\times F_{2i}$

从而有

$F_{2i+1}\times F_{2i+1}-F_{2i}\times F_{2i+2}=F_{2i-1}\times F_{2i-1}-F_{2i-2}\times F_{2i}$

从而有

$F_{2i+1}\times F_{2i+1}-F_{2i}\times F_{2i+2}=F_{3}\times F_{3}-F_{2}\times F_{4}=2\times 2-1\times 3=1$

因此猜想成立，所以

$s_{2n-1}= \sum_{i=1}^{n}{\dfrac{1}{F_{2i}\times F_{2i+1}}}$

### 2.写出通项公式

因此，$s_{2n-1}$的通项公式为：

$s_{2n-1}= \sum_{i=1}^{n}{\dfrac{1}{F_{2i}\times F_{2i+1}}}=\dfrac{1}{F_2\times F_3}+\dfrac{1}{F_4\times F_5}+\dfrac{1}{F_6\times F_7}+\cdots+\dfrac{1}{F_{2n}\times F_{2n+1}}$

$s_{2n}= s_{2n-1}-\dfrac{F_{2n+2}}{F_{2n+1}}= \sum_{i=1}^{n}{\dfrac{1}{F_{2i}\times F_{2i+1}}}-\dfrac{F_{2n+3}}{F_{2n+2}}$

现在我们已经消除了正负号，现在我们只需证明$s_{2n-1}$的当n趋于无穷时收敛于一个定值a，即：

$\lim_{n\to\infty}{s_{2n-1}}=\lim_{n\to\infty}{\dfrac{1}{F_2\times F_3}+\dfrac{1}{F_4\times F_5}+\dfrac{1}{F_6\times F_7}+\cdots+\dfrac{1}{F_{2n}\times F_{2n+1}}}=a$

而此时自然的，由于斐波那契数列相邻两项商的极限为$\varphi=\dfrac{1+\sqrt{5}}{2}\approx1.618034$，因此

$\lim_{n\to\infty}{s_{2n}}=\lim_{n\to\infty}{s_{2n-1}}-\lim_{n\to\infty}{\dfrac{F_{2n+3}}{F_{2n+2}}}=\lim_{n\to\infty}{s_{2n-1}}-\varphi=a-\varphi$

而结合编程已经计算出极限的近似值：  
奇数项和$s_{2n-1}\approx2.19596$  
偶数项和$s_{2n}\approx0.577922$  
验证：

$2.19596-1.618034\approx0.577922$

十分符合刚刚的论述！

### 3.证明

下面利用  
由Binet公式：

$F_n=\dfrac{\varphi^n-\psi^n}{\sqrt{5}}$

其中 $\varphi=\dfrac{1+\sqrt{5}}{2}$,  
$\psi=\dfrac{1-\sqrt{5}}{2}$  
又：$\varphi>1>0>\psi>-1$  
因此当n趋于无穷时$\psi^n$趋于0，而$\varphi^n$趋于无穷  
因此

$\lim_{n\to\infty}{F_n}=\lim_{n\to\infty}{\dfrac{\varphi^n-\psi^n}{\sqrt{5}}}=\lim_{n\to\infty}{\dfrac{\varphi^n}{\sqrt{5}}}$

因此

$\lim_{n\to\infty}{\dfrac{1}{F_{2i}\times F_{2i+1}}}=\lim_{n\to\infty}{\dfrac{\sqrt{5}}{\varphi^{2i}}\times\dfrac{\sqrt{5}}{\varphi^{2i+1}}}=\lim_{n\to\infty}{\dfrac{5}{\varphi^{4i+1}}}$

因此：存在N，当n>N时，使得：

$\begin{align*}\lim_{n\to\infty}{s_{2n-1}}&=\lim_{n\to\infty}{\dfrac{1}{F_2\times F_3}+\dfrac{1}{F_4\times F_5}+\dfrac{1}{F_6\times F_7}+\cdots+\dfrac{1}{F_{2n}\times F_{2n+1}}} \\\&=\lim_{n\to\infty}{\sum_{i=1}^{n}{\dfrac{5}{\varphi^{4i+1}}}} \\\\\end{align*}$

因为其首项为$\dfrac{5}{\varphi^5}>0$，公比为$0<\dfrac{1}{\varphi^4}<1$，求和收敛性显然成立。  
又N为有限数，而当n>N时，$\lim_{n\to\infty}{\sum_{i=1}^{n}{\dfrac{5}{\varphi^{4i+1}}}}$收敛  
因此$\lim_{n\to\infty}{s_{2n-1}}$收敛
