---
Title: "Exceptions When Validating Forms in web2py"
layout: post
---

I don't normally write about technical development topics, but today I'm making an exception, because finding the source of my problem was incredibly difficult. I'm hoping that this post will serve me in the future when I inevitably come across this problem again. <!-- more -->

For the university assessment I'm working on at the moment, I have to use the [web2py][web2py] Python framework to create a web application. Part of the framework allows you to create and process HTML forms, including performing validation on the user's input.

The problem I had today was that I was using a form, and specifically, using the `IS_NOT_IN_DB()` validation function. The issue arose when calling the `process()` method on the form – if the validation failed, then an exception was being thrown:

{% highlight python %}
<type 'exceptions.Exception'> Validation error, field:box-name <validators.IS_NOT_IN_DB object at 0x1125e4990>
{% endhighlight %}

Now, I don't know about you, but having an exception which uses the base `Exception` type, and simply dumps a (useless) `__repr__()` string as the message, isn't that useful. In fact, I believed that this was how the validation was meant to work – if it failed, this exception would be thrown.

That's all great, except after testing my form for a while, I noticed a bug where, if the validation failed, the next submission of the form would simply reload the page and not do anything. Uh oh.

After a lot of debugging using the in-browser web2py debugger (I don't recommend this), I came across the following code, in `gluon/html.py`:

{% highlight python %}
for k, validator in enumerate(requires):
	try:
    	(value, errors) = validator(value)
    except:
    	msg = "Validation error, field:%s %s" % (name,validator)
        raise Exception(msg)
{% endhighlight %}

I didn't realise it at first, but this code is actually _masking any exceptions thrown lower down in the framework during the validation process_!

As all good framework debugging should require, I commented out the `try`/`except` statement to gain access to the actual exception being thrown, and – lo and behold – the validator was throwing an exception:

{% highlight python %}
<type 'exceptions.TypeError'> 'Rows' object is not callable
{% endhighlight %}

The validator was complaining because I had passed it a set of DAL `Row` objects, rather than a set of database fields.[^1] Modifying the call to `IS_NOT_IN_DB()` and passing it the correct argument worked straight away, and no new exceptions were thrown.

Maybe the web2py team thought they were helping by masking the exception being thrown[^2], but I don't think they were, particularly. If they hadn't done that, I wouldn't have spent over an hour trying to fix this problem.


[web2py]: http://web2py.com/

[^1]: I won't go into the details now, but my mistake was another failing of web2py's – this time in the documentation.
[^2]: Maybe from an end-user perspective, an error about validation is nicer than an error about objects not being callable. But I'd argue that no error would be nicer.
