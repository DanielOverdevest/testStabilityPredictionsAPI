# Test the stability of Predictions API's
Async amount of requests and check if outcome is steady using deepStrictEqual.
Originally needed to test if TensorFlow 2 is thread safe.

## TL;DR
> npm install  
> npm run fetch -- --url https://jsonplaceholder.typicode.com/todos/1 --count 3

### Returns
```
>  node test.js "-u" "https://jsonplaceholder.typicode.com/todos/1" "-c" "3"

Check if https://jsonplaceholder.typicode.com/todos/1 gives equal response. 
Total amount of requests: 3.
individualRequest: 135.848ms
individualRequest: 136.855ms
individualRequest: 137.291ms
AllRequestsFinished: 138.473ms
```
```javascript
Raw response:
{ userId: 1, id: 1, title: 'delectus aut autem', completed: false }
```
```
All are deep equal!
```

## Assert
Run following command (--assert) to add request count number at end of the url to see how it looks like if there are differences in the response data.
> npm run fetch -- --url https://jsonplaceholder.typicode.com/todos/1 --count 2 --assert  

AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:
```javascript
+ actual - expected

  {
    completed: true,
+   id: 12,
+   title: 'ipsa repellendus fugit nisi',
-   id: 11,
-   title: 'vero rerum temporibus dolor',
    userId: 1
  }
```
