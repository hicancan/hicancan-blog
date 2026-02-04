---
title: '洛谷9_4求第k小数'
description: '洛谷P1923【深基9.例4】求第 k 小的数题解。介绍基于快速排序思想的快速选择算法以及`nth_element`的使用。'
pubDate: 2024-11-30
---

# 【深基9.例4】求第 k 小的数

## 题目描述

输入 $n$（$1 \le n < 5000000$ 且 $n$ 为奇数）个数字 $a_i$（$1 \le a_i < {10}^9$），输出这些数字的第 $k$ 小的数。最小的数是第 $0$ 小。

请尽量不要使用 `nth_element` 来写本题，因为本题的重点在于练习分治算法。

## 输入格式

## 输出格式

## 样例 #1

### 样例输入 #1
    
    
    5 1
    4 3 2 1 5

### 样例输出 #1
    
    
    2

## 题解

### 思路一：部分快速排序

#### 分析思路

虽然我们可以利用快速排序将整个数组排序一遍之后再输出第 $k$ 小的数，但是这样的时间复杂度为 $O(n\log n)$，因为我们只需要输出第 $k$ 小的数，所以我们可以利用快速排序的思想，每次选取一个数作为基准，将数组分成两部分，左边的比基准小，右边的比基准大，然后我们可以判断基准的位置，如果基准的位置正好是 $k$，那么我们就可以直接输出基准，否则我们可以递归地在左边或者右边进行查找。

#### 代码实现与详细注释
    
```cpp
#include <iostream>
using namespace std;
int ans = 0,k;
void findkth (int a[], int l, int r){
    int i = l, j = r, flag = a[(l+r)/2], temp;
    do
    {
        while (a[i]<flag) i++;
        while (a[j]>flag) j--;
        if (i<=j)
        {
            temp = a[i];
            a[i] = a[j];
            a[j] = temp;
            i++;
            j--;
        }
    }
    while (i<=j);
    if (k<=j) findkth(a,l,j);    //如果 k 在左边，那么递归地在左边查找
    else if (i<=k) findkth(a,i,r);    //如果 k 在右边，那么递归地在右边查找
    else//否则就是基准的位置正好是 k，此时直接返回即为递归的终止条件
    {
        ans = flag;
        return;
    }
}
int main(){
    int n;
    scanf("%d%d",&n,&k);
    int a[n];
    for (int i = 0; i<n; i++)
    {
        scanf("%d",&a[i]);
    }
    findkth(a,0,n-1);
    printf("%d",ans);
    return 0;
}
```

#### 测试点结果

![202411301717901.png](https://gcore.jsdelivr.net/gh/hicancan/piclist/202411301717901.png)  
不出意料的 AC 了。

#### 算法分析

  * 虽然和快速排序的模版略有区别，但是核心的思想是一样的，仍然是分治思想、二分的思想。
  * 复杂度：
    * 第一次处理 $n$ 个数，第二次处理 $n/2$ 个数，第三次处理 $n/4$ 个数，以此类推，直到处理 $1$ 个数，所以时间复杂度为 $n+n/2+n/4+\cdots+1=2n-1=O(n)$。
    * 空间复杂度为 $O(n)$，因为我们需要一个数组来存储 $n$ 个数。
    * 本题的时间复杂度为 $O(n)$，空间复杂度为 $O(n)$。

### 思路二：C++ STL：`nth_element`

#### 分析思路

  * 虽然题目要求不要使用 `nth_element`，但是我们可以拓展一下，`nth_element` 的时间复杂度为 $O(n)$。
  * 介绍一下 `nth_element` 函数，`nth_element` 函数是 C++ STL 中的一个函数，它的作用是将数组中的第 $k$ 大的元素放到第 $k$ 个位置上，左边的元素都比第 $k$ 大的元素小，右边的元素都比第 $k$ 大的元素大。
  * 用法：`nth_element(a,a+k,a+n)`，其中 `a` 是数组的首地址，`a+k` 是数组的第 $k$ 个元素的地址，`a+n` 是数组的最后一个元素的地址。
  * 利用 `nth_element` 函数将数组中的第 $k$ 大的元素放到第 $k$ 个位置上，然后输出第 $k$ 个位置上的元素即可。

#### 代码实现与详细注释
    
```cpp
#include <iostream>
#include <algorithm>
using namespace std;
int main(){
    int n,k;
    scanf("%d%d",&n,&k);
    int a[n];
    for (int i = 0; i<n; i++)
    {
        scanf("%d",&a[i]);
    }
    nth_element(a,a+k,a+n);
    //将数组中的第 k 大的元素放到第 k 个位置上
    printf("%d",a[k]);
    return 0;
}
```

#### 测试点结果

![202411301734075.png](https://gcore.jsdelivr.net/gh/hicancan/piclist/202411301734075.png)  
不出所料的 AC 了。

#### 算法分析

  * `nth_element` 函数的时间复杂度为 $O(n)$，空间复杂度为 $O(n)$。
  * 诶诶没啥好说的了，不得不感叹 C++ STL 的强大。

## 总结

  * 本题是一个典型的分治算法的应用，通过本题我们可以更加深入地理解分治算法的思想。
  * 本题也是一个经典的快速排序的应用，通过本题我们可以更加深入地理解快速排序的思想。
  * 本题也是一个经典的 `nth_element` 函数的应用，通过本题我们可以更加深入地理解 `nth_element` 函数的使用方法。~~呜呜呜，我好想用`nth_element` 啊~~
