# New Probation Services: National Search

[![GitHub version](https://badge.fury.io/gh/ministryofjustice%2Fnational-search-fe.svg)](https://badge.fury.io/gh/ministryofjustice%2Fnational-search-fe)
[![Dependencies](https://david-dm.org/ministryofjustice/national-search-fe.svg)](https://david-dm.org/ministryofjustice/national-search-fe)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

[![CircleCI](https://circleci.com/gh/ministryofjustice/national-search-fe/tree/master.svg?style=svg)](https://circleci.com/gh/ministryofjustice/national-search-fe/tree/master)

Install elasticsearch:

https://www.elastic.co/downloads/elasticsearch

Edit the configuration file:

``` sudo nano /usr/local/etc/elasticsearch/elasticsearch.yml ```

Paste these two lines at the bottom of that file.

```
    http.cors.enabled: true
    http.cors.allow-origin: /https?:\/\/localhost(:[0-9]+)?/
```

Save & exit (CTRL + X, Y, ENTER)

In Terminal start elasticsearch:

``` elasticsearch ```

Navigate to the ***national-search-fe*** folder in a separate Terminal window.

Add the sample/test data to the elasticsearch database: 

``` curl -H "Content-Type: application/json" -XPOST 'localhost:9200/offenders/_bulk?pretty&refresh' --data-binary "@working.json" ``` 

**N.B. The above only needs to be done the first time you do this.**

Now start the application

``` npm start ```