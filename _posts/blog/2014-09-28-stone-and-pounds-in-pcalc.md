---
title: "Stone and Pounds in PCalc"
layout: post
---

Since updating to iOS 8, I've been using the Health app for tracking things such as steps walked and weight.

The problem is, since my iPhone is set to UK English, the Health app takes that to mean that I want to use metric measurements. This means that it tracks weight in kilograms, when really I want to use stone and pounds.

I looked for a setting to change Health to imperial units, but the app doesn't actually have a single setting to its name.

I decided the way to get around this was to set up a function in [PCalc][1] to convert from stone and pounds to kilograms. This isn't exactly friendly since it adds another step, but without a set of [very expensive scales][2], weight tracking in Health is a manual process anyway. <!-- more -->

Using the function in PCalc is fairly simple. You type in the imperial measurement in the form stone.pounds as a fake decimal:

![12.11 entered into PCalc][img1]

and activate the function to have it converted to kilograms.

![12st 11lbs converted to 81.2kg in PCalc][img2]

The downside to using a fake decimal like this is that if the pounds value is less than ten, you would have to write something like 12.06, which, while still obvious, is easy to forget.

Here is how the function is set up:

![Steps in PCalc to build the stone to kilogram function][img3]

It tries to be clever, and if you forget the leading zero, it will assume you meant 12.06 rather than 12st 60lbs. That is, unless you're entering 12st 1lb, which must be typed as 12.01, because 12.1 means 12st 10lbs.

I know it'd be less complicated to enter a number of pounds, but that would then involve multiplying the stone value by 14 first. I prefer this method.

Of course it would be much nicer to just be able to enter data into Health in imperial units, but this works fine until then. You can download the function [here][3].

***

**Update, 14th March 2015**

With iOS 8.2, the Health app now allows you to select which units to use for each type of measurement.

To change this, open the single-measurement view by tapping on its graph, then at the bottom will be an entry called `Units`. That option will allow you to choose what unit you'd like to use.

This mostly solves my issue with entering weight, because I can now choose between kilograms, stone, and pounds. However, I'm not *completely* happy, because there's still no option for stone and pounds combined; either you can enter a number of pounds, or a decimal number of stone. I'm content using pounds for now, though.

[1]: https://itunes.apple.com/gb/app/pcalc-the-best-calculator/id284666222?mt=8&uo=4&at=10l7rn
[2]: http://www.amazon.co.uk/gp/product/B00BKRQ4E8/ref=as_li_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=B00BKRQ4E8&linkCode=as2&tag=josh-asch-21&linkId=WEH5SNS47LCK6KEO
[3]: /downloads/stone-to-kg.pcalcfunctions

[img1]: /images/2014/09/28/pcalc-stone-before.png =320x568
[img2]: /images/2014/09/28/pcalc-stone-after.png =320x568
[img3]: /images/2014/09/28/pcalc-stone-function.png =320x400
