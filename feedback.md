# Section 1:

## Question 4: 

This would not work because the you are trying to spread a variable without defined the type.
should either be an object or an array

```javascript
this.collection = [...collection]
// or
this.collection = {...collection}
```

no suitable option in the list