---
title: algorithm-1901
date: 2019-01-08 22:48:24
tags: 算法
---

## Two sum
Given an array of integers, return indices of the two numbers such that they add up to a specific target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:

Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].

```javascript
// @see https://leetcode.com/submissions/detail/199898978/
var twoSum = function(nums, target) {
    const indexMap = {};
    const wantMap = {};
    
    let i = 0;
    let current;
    while(i<nums.length){
        current = nums[i];
        if(current in wantMap){
            return [indexMap[wantMap[current]][0], i];
        }        
        const want = target - current;
        wantMap[want] = current;
        (indexMap[current] = indexMap[current] || []).push(i++);        
    }
}
```

## 找出整数数组中连续且和最大的子数组

一个整数数组中的元素有正有负，在该数组中找出一个连续子数组，要求该连续子数组中各元素的和最大，这个连续子数组便被称作最大连续子数组。比如数组{2,4,-7,5,2,-1,2,-4,3}的最大连续子数组为{5,2,-1,2}，最大连续子数组的和为5+2-1+2=8。

```javascript
// 线性时间算法
// @see https://blog.csdn.net/ns_code/article/details/20942045
function MaxSubSum3(arr){
	let i;
	let MaxSum = 0;
	let CurSum = 0;
	let startIndex = 0;
	let endIndex = 0;
	for(i=0;i<arr.length;i++)
	{
		CurSum += arr[i];
		if(CurSum > MaxSum){
			MaxSum = CurSum;
			endIndex = i;
		}
		//如果累加和出现小于0的情况，
		//则和最大的子序列肯定不可能包含前面的元素，
		//这时将累加和置0，从下个元素重新开始累加
		if(CurSum < 0){
			CurSum = 0;
			startIndex = endIndex = i + 1;
		}
	}
	return [startIndex, endIndex];
}

```
> 显然，该算法的时间复杂度O（n）。该算法理解起来应该不难，但是要想出来可就不容易了。另外，该算法的一个附带的有点是：它只对数据进行一次扫描，一旦元素被读入并被处理，它就不再需要被记忆。因此，如果数组在磁盘或磁带上，他就可以被顺序读入，在主存中不必存储数组的任何部分。不仅如此，在任意时刻，该算法都能对它已经读入的数据给出最大子数组（另外两种算法不具有这种特性）。具有这种特性的算法叫做联机算法。

