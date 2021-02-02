# Thank You for Choosing to Write for O&B's Blog

The website is powered by [Jekyll](https://jekyllrb.com/). The blog posts are written in [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) and are converted to HTML by Jekyll. Most code editors and IDEs have support for Markdown files.

In a nutshell, here's what you'll do:

1. Run the website locally and browse [http://localhost:4000/blogs](http://localhost:4000/blogs).
2. Create a **feature branch** and start writing your new blog post. Preview it in the locally running website.
3. When you're satisfied, submit your blog post for publication by creating a **pull request**.
4. Reviewers will add comments and suggestions.
5. When all is well, your branch will be merged, and your blog post will be published.

Alternatively, you can submit the Markdown files and other assets (like images) and we'll have someone create the branch and merge it for publication.

## Running Locally

Here are the prerequisites:

1. Ruby 2.4

Installing Ruby will also install RubyGems (a package manager for Ruby). RubyGems is run via `gem` command.

1. Clone the git repo — `git clone git@bitbucket.org:orangeandbronze/orange-bronze.git`
2. In the project folder, run `gem install bundler jekyll`. This installs Bundler and Jekyll through RubyGems.
3. Build the site locally: `bundle exec jekyll serve`
4. Open your browser and navigate to [http://localhost:4000/blogs](http://localhost:4000/blogs)

## Create a Branch and Start Writing Your New Blog Post

- Create a **feature branch**, starting from **source**: `feature/yyyy-mm-dd-john-doe-hello-world`.
	- For example, `feature/2021-02-08-calen-legaspi-rule-the-world`
- Add a Markdown file under `blogs/_posts` and name it as: `YEAR-MONTH-DAY-title.md`.
	- For example, `2021-02-08-how-to-write-a-blog.md`
- Use any Markdown editor
- Add following [**FrontMatter**](http://jekyllrb.com/docs/frontmatter/) tags on the top of your post (you can also copy-paste this from another post)
	- layout: blog
	- title: {title}
	- tags: {tag(s)}
	- authors: {author(s)}
- Write your blog post (like the one below)
- For images, create a new folder under `assets/images`. The folder should have the same name as the Markdown file. E.g. for `2021-02-08-how-to-write-a-blog.md`, add images to `assets/images/2021-02-08-how-to-write-a-blog` folder, and reference them as such.
- Tweak and commit your changes until you feel satisfied with it
- Links to external websites should open in a new tab as we want our readers to stay on our blog as long as possible
    - eg: `[foo](http://bar.com){:target="_blank" rel="noopener noreferrer"}`

~~~markdown
---
layout:  blog
title:   How to Write a Blog Post
tags:    [creative, writing, sales, marketing]
authors: Calen Legaspi
---

This is not really about writing a blog post. It's more about showing you what you can do in your Markdown file.

![](/assets/images/2021-02-08-how-to-write-a-blog/sample-screenshot.png)

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello world!");
    }
}
```
~~~

## Submit a Pull Request

- Create a **pull request** and ask people to proof read your new blog post (we don't want to have any spelling mistakes, do we? 😉)

## Apply Changes from Reviews

- If changes need to be made, you can just commit and push to the original feature branch
- When your blog post has been reviewed, someone will approve and merge your pull request
- Congratulations! Your blog post is now visible to the whole world! 😎
- Don't forget to share your post with your colleagues and the social media (Twitter, LinkedIn, ...)!

## Reviewing Blog Posts

- The reviewing of blog posts is not only limited to leads, everybody may review blog posts!
- We even appreciate it if you would like to review a blog post.
- Reviewing is done on GitHub itself by navigating to the **Files changed**-tab of a pull request.
- Once there you can add comments to each line of a specific file.
- Feel free to use GitHub's new **suggestion** functionality to suggest changes as this allows the author to easily merge your suggestions into their post.

We want our blog posts to ooze quality. As a reviewer you should verify the following things:

- Professional English is used without any typos.
- The styling fits both on desktop browsers and mobile devices (images, videos and presentations must scale down correctly)
- Feel free to share your opinion about something for example if you would like see a specific part explained more clearly or if you want the author to cover something that is missing.
