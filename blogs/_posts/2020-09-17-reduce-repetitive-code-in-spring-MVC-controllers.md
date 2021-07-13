---
layout:       blog
title:        "Reduce Repetitive Code in Spring MVC Controllers"
authors:      Lorenzo Dee
tags:         [java, spring]
header-image: /assets/images/2020-09-17-reduce-repetitive-code-in-spring-MVC-controllers/ReduceRepetitiveCodeISpringMVCControllers-banner.png
---
After spending some time doing sustained engineering (a.k.a. maintaining legacy code), I ventured to reduce repetitive code in Spring MVC `@Controllers`. I started with an abstract base controller class. But I soon found out that it was a dead-end because @RequestMapping is not inherited from (or combined with) parent classes and/or interfaces (see [Spring MVC @RequestMapping Inheritance](https://github.com/spring-projects/spring-framework/issues/14722){:target="_blank"}).

With some free time to further think about this, I took different approach.

```java
@Controller
public class RepositoryCrudController {
 
    private final Repositories repositories;
    private final RepositoryInvokerFactory repositoryInvokerFactory;
 
    // ...
 
    @RequestMapping("/{repository}")
    String index(@PathVariable("repository") String repositoryKey,
            Pageable pageable, Model model) {
        // ... (only if repository has findAll(Pageable) method)
        return repositoryKey + "/index";
    }
 
    @GetMapping("/{repository}/{id}")
    String show(@PathVariable("repository") String repositoryKey,
            @PathVariable("id") Object id, Model model) {
        // ... (only if repository has findById method)
        return repositoryKey + "/show";
    }
 
    @GetMapping(path = "/{repository}", param = "create")
    String create(...) {
        // ... (only if repository has save method)
        return repositoryKey + "/create";
    }
 
    @PostMapping("/{repository}")
    String save(...) {
        // ... (only if repository has save method)
        return "redirect:/" + repositoryKey + "/{id}";
    }
 
    @GetMapping(path = "/{repository}/{id}", param = "edit")
    // ... edit (only if repository has findById and save methods)
    @PutMapping("/{repository}/{id}")
    // ... update (only if repository has save method)
    // @DeleteMapping("/{repository}/{id}")
    // ... delete (only if repository has deleteById method)
}
```

This approach is largely inspired by `RepositoryEntityController` of Spring Data REST.

Instead of defining an abstract base controller class, I created a concrete controller class with the *default* (or repetitive) behavior. The *default* behavior relies on invoking methods on Spring Data repositories.

For custom controllers, instead of creating subclasses (of the abstract base class), the controller can simply define handler methods that behave differently. For example:

```java
@Entity
public class Article {...}
 
// Spring Data JPA
public interface ArticleRepository extends CrudRepository<Article, ...> {...}
 
@Controller
@RequestMapping("/articles")
public class ArticlesController {
 
    // no need for index() handler method
    // just set-up "articles/index" view
 
    // no need for show() handler method
    // just set-up "articles/show" view
 
    @GetMapping(param = "create")
    String create(Model model) {
        // Do something that is _not_ *default* behavior
        // e.g. provide options for dropdowns, or use form-backing object/JavaBean
        // ...
        return "articles/create";
    }
 
    // no need for save() handler method
    // just set-up "articles/show" view
 
    @GetMapping(path = "/{id}", param = "edit")
    String edit(@PathVariable("id") ... id, Model model) {
        // Do something that is _not_ *default* behavior
        // e.g. provide options for dropdowns, or use form-backing object/JavaBean
        // ...
        return "articles/edit";
    }
 
    // no need for update() handler method
    // just set-up "articles/show" view
 
}
```
The above will work because Spring MVC chooses the more specific mapping first. When a `GET /articles?create` request is received, the `ArticlesController` will be chosen to handle it (and not `RepositoryCrudController`). But if `ArticlesController` handler methods were not defined, the `GET /articles?create` request would have been handled by the `RepositoryCrudController`.

With this simple *fall-back* controller that has the *default* behavior, developers (team mates) can then focus on the domain, creating views, or creating controllers with custom behavior (e.g. Ajax, Server-generated JavaScript Responses).

That's all for now.

Originally posted at: [Reduce Repetitive Code in Spring MVC Controllers](https://lorenzo-dee.blogspot.com/2020/09/reduce-repetitive-code-in-spring-mvc.html){:target="_blank"}

