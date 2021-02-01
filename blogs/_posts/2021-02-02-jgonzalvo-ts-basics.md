---
layout:       blog
title:        "TypeScript: An Introduction"
authors:      Jerome Gonzalvo
tags:         typescript
header-image: 
---

## What is TypeScript?

In a nutshell, it is simply JavaScript... but with **types**! 

According to [typescriptlang.org](typescriptlang.org), it is an open-source language which builds on JavaScript -- the programming language of the web -- **by adding static type definitions**.

In longer terms, it is a superset of JavaScript. It contains the features of JavaScript (both good, and... *bad*), and the features that are *proposed* to be added. That means, not only does it use JavaScript's widely-supported features, it also uses experimental features that are not yet widely-supported by browsers!

These features are good and all, but surely there is a motivation on why TypeScript was even made. Before getting to that, a little bit of history is in order.

## A Little Bit of History (and Motivation)

TypeScript is first released in 2012... at least that's the oldest version found in here: [TypeScript 1.1.0.1](https://github.com/microsoft/TypeScript/releases/tag/v1.1.0.1). It is an open-source language developed by Microsoft. That's all there is to it for TypeScript. To understand TypeScript better, one must know first about JavaScript -- the good, the bad, and the ugly.

JavaScript (also known as ECMAScript), is the programming language of the web. It was originally used for short snippets of code. Over time, it gained popularity as web developers used it. Right now, it can also be used outside the context of browsers (NodeJS)! There's even full-stack JavaScript now! (Go figure!).

### JavaScript (some of) the (MANY) Bad Parts

JavaScript is considered a dynamic programming language, and there are a *lot* of things that can be done in JavaScript -- even things that do not normally make sense in other programming languages. With this flexibility though, JavaScript got its bad parts.

#### Equality Checking

In most programming languages, there is only one syntax used to check the equality of things -- that is `==` (or `!=` for checking inequality). But in JavaScript, there are two syntaxes used. Consider these lines of code:

```javascript
console.log(5 == "5");
console.log(5 === "5");
```

Now, if someone who has not yet seen JavaScript code and came from a different background were to determine the output of this code, they would probably think that both of these lines would print `false`. Believe it or not, the first line outputs `true` while the second line outputs `false`.

The first line of code is uses the comparison called **Abstract Equality Comparison**. It first performs a type conversion to make both sides have similar types. After that their values are compared. In other words, only values are considered when comparing with `==`.

The second line of code uses the comparison called **Strict Equality Comparison**. Unlike the first comparison, not only values are compared but also types. If the types differ, `false` is returned.

It is recommended to use `===` in checking for the equality of two things in JavaScript. But the point is in JavaScript, one is allowed to compare two things of different types and still (somehow) arrive at a conclusion that they are both equal. In TypeScript, like any other statically typed programming language, does not allow this kind of comparison.

Consider this other example:

```javascript
console.log("" == "0");
console.log(0 == "");
```

The first line of code outputs `false` since a blank string is considered a *falsy* value in JavaScript. Now, if one were to think that the second line of code would also output `false`, they would be wrong. The second line of code outputs `true`. That is because `0` is also a *falsy* value in JavaScript. In TypeScript, the comparison in the second line of code is not allowed.

#### Accessing Object Properties that are not Present

Consider these lines of code:

```javascript
const obj = { width: 10, height: 15 };
const area = obj.width * obj.heigth;
console.log(area);
```

Other programming languages would immediately tell the developer that `heigth` does not exist in the object `obj`. JavaScript, would not immediately tell the developer this. Instead, it will run these lines of code then, and only then, the developer will know that something is not right. How so? `area` will have the value of `NaN` (Not a Number). TypeScript would tell the developer that they are trying to access an object property that does not exist even before running the code. 

This brings up another cool thing about TypeScript. TypeScript immediately indicates erring lines of code. Like most programming languages, TypeScript throws errors on compile time. JavaScript on the other hand only throws error on run time which makes debugging harder. In the example earlier, all it took was a simple misspelling to make the code go off the rails.

#### Other Nonsensical Things

In JavaScript, these things can also be done:

```javascript
[] + []; // JS: ""
{} + []; // JS: "[object Object]"
{} + {}; // JS: NaN or [object Object]... depending on the browser
```

One might ask, "Why would one even want to do these things?". If there's a lesson to be learned in JavaScript, that would be "Just because you can, it does not mean you should". TypeScript prevents one from doing these things.

### Why TypeScript?

The bad (and the ugly) stuff one can do with JavaScript are some of the motivations on why TypeScript was made. TypeScript enhances code quality, and understandability. It also catches errors at compile time. It also provides better documentation through function signatures.

But one might ask, "Aren't type unnecessarily ceremonious? Isn't the barrier to entry high like other statically typed languages?". The barrier to entry in TypeScript is, in fact, lower than that of other programming languages because...

#### JavaScript is TypeScript!

One disadvantage of TypeScript is that it is not supported by browsers. In order to "use" TypeScript, TypeScript files need to be compiled into JavaScript. This leads to the main purpose of TypeScript: to provide **compile time type safety** for JavaScript code. Types are completely optional in TypeScript too!

#### Types can be Implicit

Another good thing about TypeScript is that one does need to add types immediately. This is valid TypeScript code:

```typescript
var foo = 123;
```

Wait, isn't this just JavaScript code? As mentioned earlier, JavaScript is TypeScript! In this line of code, TypeScript already knows that the variable `foo` is of type `number`. If a reassignment were to be made like this:

```typescript
foo = '456';
```

TypeScript would already give out an error and say `Error: cannot assign "string" to "number"`.

#### Types can be Explicit

One can explicitly indicate the type of a variable in TypeScript like so:

```typescript
var foo: number = 123;
```

This is not really required as types can be implicit in TypeScript. But, while it is convenient to leave it to TypeScript to determine the types of variables, it is still a best practice to explicitly indicate types. TypeScript tries its best to infer types but only to a certain extent (a discussion for another time). By explicitly indicating types, one can help the compiler, and more importantly help the next developer to understand the code better (including them!).

#### Types are Structural

In some languages like Java:

```java
Coffee myCoffee = new Coffee();
```

These variable declarations are seen everywhere which brings up one criticism to static typing: it results to this unnecessary ceremony because even though one knows that the code will work just fine, the language semantics force one to copy stuff around. Consider these lines of code in TypeScript:

```typescript
interface Point2D {
   x: number;
   y: number;
}
interface Point3D {
   x: number;
   y: number;
   z: number;
}

var point2D: Point2D = { x: 0, y: 10 };

function iTakePoint2D(point: Point2D) { /* do something */ } 
iTakePoint2D(point2D); // exact match okay
iTakePoint2D(point3D); // extra info okay
iTakePoint2D({ x: 0 }); // Error: missing info `y`
```

While this is just syntactic sugar, it still is convenient to not have to copy stuff around.

#### TypeScript Emits Valid JavaScript Code the Best It Can

Consider this TypeScript code again:

```typescript
var foo = 123;
foo = '456'; // Error: cannot assign a `string` to a `number`
```

While TypeScript does tell the developer that there is an error in the second line of code, it does not stop the developer from compiling this code. The compiled JavaScript code is this:

```javascript
var foo = 123;
foo = '456';
```

Wait, don't they look the same? They are! Since, again, JavaScript is TypeScript!

If one were to migrate from JavaScript to TypeScript, one would not need to overhaul the entire project in one go. One can incrementally migrate from JavaScript to TypeScript. It can be as simple as changing JavaScript files to TypeScript files! (i.e. modifying the extension from `.js` to `.ts`). Then, add the ~cool~ TypeScript features to each file later. This is very different from how most language compilers work.

#### Easily Use Existing JavaScript Libraries in TypeScript

```javascript
$('.awesome').show()
```

Doesn't this look familiar? This is jQuery code! Now, does this work in TypeScript? No... not yet at least. TypeScript would give this error: `Error: cannot find name "$"`. In order to make this work, a **type definition** would be required. Definitions for most of the popular JavaScript libraries (including jQuery) have already been written for developers by the <a href='https://github.com/DefinitelyTyped/DefinitelyTyped'>DefinitelyTyped community</a>. Should a type definition not exist, one can do a quick fix:

```typescript
declare var $: any;
$('.awesome').show(); // Okay!
```

Or, to be more specific:

```typescript
declare var $: {
    (selector:string): any;
};

$('.awesome').show(); // Okay!
$(123).show(); // Error: selector needs to be a string
```

#### Future JS => Now

As mentioned earlier, TypeScript can use experimental features that are not yet widely-supported in browsers such that when compiled, it will still yield JavaScript code that is widely-supported by browsers. Consider this class definition:

```typescript
class Point {
    constructor(private x: number, private y: number) {
    }
    public add(point: Point) {
        return new Point(this.x + point.x, this.y + point.y);
    }
}
```

`private`, and `public`  accessors? These features are not yet supported in the current JavaScript! And yet, TypeScript can utilize these features. Also, some ES6 features like arrow functions can be used in TypeScript.

## "Great! So, where do I start?"

While one might be eager already to jump into writing code with TypeScript, it is still needed to study the fundamentals of JavaScript. Fortunately, O&B offers a training course on [JavaScript Fundamentals](https://university.orangeandbronze.com/other_courses/javascript/) where one can learn how to code with JavaScript, and the best practices in coding with JavaScript. Though some programming experience in any programming language and in [HTML and CSS](https://university.orangeandbronze.com/other_courses/html-css/) is good to have, it is not required.