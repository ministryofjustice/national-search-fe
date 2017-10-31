# New Probation Services: National Search

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