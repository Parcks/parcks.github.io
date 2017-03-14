---
layout: post
title:  "Reading the installation file"
date:   2017-03-10 16:16:01
categories: internals reading
excerpt: Reading the installation file is the first thing Parcks does. This article explains how it works behind the scenes.
---
Reading the installation file is the first thing Parcks does. This article explains how it works behind the scenes.

* Do not remove this line (it will not be displayed)
{:toc}

### The installation file
Consider the following valid installation file:
{% highlight json %}
{
   "name":"PHP installer",
   "install":[
      {
         "package":"php",
         "post-installation":[
            {
               "type":"plugin",
               "name":"composer",
               "url":"http://www.example.com"
            },
            {
               "type":"shell",
               "cmds":[
                  {
                     "root":true,
                     "do":[
                        "whoami",
                        "ls -al"
                     ]
                  },
                  {
                     "root":false,
                     "do":[
                        "pwd"
                     ]
                  }
               ]
            }
         ]
      }
   ]
}
{% endhighlight %}
### The processing begins

