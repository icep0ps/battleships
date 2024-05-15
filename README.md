# BattleShips

A JavaScript project from the odin project. The pupose of this project was focused on testing. I have learned what Test Driven Development(TDD ) is and why it is important. i learned it through [The Odin Project JavaScript Course](https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript).

**Concepts learned include:**

- Test Driven Development(TDD )
- Benefits of Test Driven Development
- What exaclty we need to test
- Mocking
- Pure Functions

# Demo

Live Preview : [Play BattleShips](icep0ps.github.io/calculator/)

# Lessons Learned

From my understanding, this is when we write our tests first before writing our code. Some reasons why we do this are that it helps us avoid a lot of debugging, thus speeding up development. It also improves our design, encourages refactoring, and builds a safety net to defend against other programmers. There are test runners that we can use, such as Mocha, Jasmine, Tape, and Jest.

I also learned that when unit testing a query message (this is a value that doesn't produce any side effects, think of it as a pure function), we want to test the interface, not the implementation (how we got our result). If we can test the interface, it means we can change the implementation without breaking the test, and that's the goal!

Finally, I learned about pure functions, which are functions that produce the same result when passed the same arguments. They don't rely on any data or state during execution; they only depend on the input arguments and do not produce any observable side effects (any interaction with the outside world from within a function, such as changing a variable that exists outside the function or calling another method from within a function). So why are pure functions necessary when it comes to writing tests? Well, they are immediately testable. They will always produce the same result if you pass in the same arguments, as mentioned before. They also make maintaining and refactoring code much easier. You can change a pure function and not have to worry about unintended side effects messing up the entire application and ending up in debugging hell.

I am yet to fully understand the concept of mocking and creating mock functions, though.

**Problem**

If you try to access a variable that has been modified in another module from anywhere else other than the module itself, it will return the initial value. In the example below, the `checkout` function will always return false because `purchaseConfirmed` is a primitive. You can't change its value assigned to it in the other module when it's a primitive; you can only change the value `purchaseConfirmed` has been assigned in the scope of the current module.

```js
const purchases = (() => {
  let purchaseConformed = false;

  return { purchaseConformed };
})();

const checkout = () => {
  purchaseConformed = true;
  if (purchases.purchaseConformed) {
    return true;
  }
};
```

**Solution**

To fix this we should note that we can change the value using a funtion like below

```js
const purchases = (() => {
  let purchaseConfirmed = false;
  const getPurchaseconfirmed = () => purchaseConfirmed;
  const setPurchaseConfirmed = (value) => (purchaseConfirmed = value);
  return { getPurchaseconfirmed, setPurchaseConfirmed };
})();

const checkout = () => {
  purchases.setPurchaseConfirmed(true);
  if (purchases.getPurchaseconfirmed()) {
    return true;
  }
};
```

Also found out that classList selector has terrible performance issues

# Acknowledgements

[The Odin Project](https://www.theodinproject.com)
