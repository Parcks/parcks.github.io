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
The first step in processing the installation file is loading the `JSON` and creating a `SoftwareCatalog` object. This is done in the [`InstallationFileParser`](https://github.com/Parcks/core/blob/master/src/domain/parse/installation_file_parser.py#L27).
Subsequently, the JSON-array `install` is parsed by the [`PackageParser`](https://github.com/Parcks/core/blob/master/src/domain/parse/package_parser.py#L26).

#### PackageParser
The `PackageParser` is responsible for parsing all the software packages that need to be installed. The `parse` method processes the JSON object that contains the package information. The general structure is:
{% highlight json %}
{
    "package": name-of-the-package-to-install,
    "post-installation": Things-to-do-after-installing-the-package
}
{% endhighlight %}

#### PostInstallationParser
During the creation of the `Package`, the `PostInstallationParser` is called. This class is responsible for creating the `Plugin` or `Shell` object that needs to be executed when the `Package` is installed.
The `PostInstallationParser` only receives the `post-installation` JSON-array from the installation file.
While looping through this array, the parser detects if it should parse a `Shell` object or a `Plugin` object. This is determined by the `type` field.

##### ShellParser
If a `Shell` object is detected the `parse` method of the [`ShellParser`](https://github.com/Parcks/core/blob/master/src/domain/parse/shell_parser.py#L36) is fired. This method creates the `Shell` object that contains the `ShellCommands`.

##### PluginParser
Another possibility is the detection of a `Plugin`. A `Plugin` is parsed by - surprisingly - the [`PluginParser`](https://github.com/Parcks/core/blob/master/src/domain/parse/plugin_parser.py#L28). If the `Plugin` definition contains commands, then the `ShellParser` is used to create a `Shell` object and this object is afterwards linked to the `Plugin`.

However, if there are no commands specified but an url is available, then the `Plugin` is still considered as valid. The `PluginParser` will simply create the `Plugin` object, but the url will be probed when installing the `Package`. 
Thereby a `Plugin` definition without an url an without commands is considered as invalid and an exception will be thrown.

### Wrapping up
When all the parsing ran successfully, the following structure is created:
![Image](https://github.com/Parcks/parcks.github.io/raw/master/assets/sve6ttf4qq1x54t689ql.png)

### Class diagram of the parsable objects
![Image](https://github.com/Parcks/parcks.github.io/raw/master/assets/suxx85thkpth1d7haai7.png)
