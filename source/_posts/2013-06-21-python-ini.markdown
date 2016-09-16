title:  "Python配置ini，大小写敏感"
date:  2013-06-21 22:56
tags: [Python,ini]
---

```python
import ConfigParser, string

class CaseSensConfigParser(ConfigParser.ConfigParser):
    '''
    override
    config option's key case sensitive
    '''
    def optionxform(self, optionstr):
        return optionstr

if __name__ == '__main__':
    kubini = CaseSensConfigParser()
    kubini.read('cfg.ini')
    kubini.set('SessionName', 'KeyName', 'KeyValue')
    kubini.write(open('cfg.ini', "w")) 
```  