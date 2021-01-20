# Orange & Bronze (O&B) Website

Orange & Bronze Software Labs developes mission-critical systems using the Spring Framework, handling millions of transactions for companies.

*Want to write a blog post on O&B's site?* [Please read this](README-blog-post.md).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

##### Jekyll

The site is powered by our static site generator, Jekyll. To install Jekyll and Bundler gems through RubyGems:

```
$ gem install bundler jekyll
```

##### Node

We'll be using NPM as our package manager. To install via homebrew:

```
$ brew install node
```

### Running The Site Locally

1.  Clone the git repo — `git clone git@bitbucket.org:orangeandbronze/orange-bronze.git`

2.  Build the site on a preview server `bundle exec jekyll serve`

3.  Open your browser and navigate to `http://localhost:4000`

### Setup Development Environment

A step by step series of examples that tell you how to get a development env running:

1.  While the site is powered by Jeykll, we are using Gulp for automating time-consuming tasks in our development workflow (minifying code, prefixing, optimizing assets, ect.). To start, we need to install the dependencies needed in the project with `npm install --save-dev`

2.  To detect any changes in our sass files, run the watch gulp task with `gulp watch`

3.  And when you're happy with your changes, you can compile it with `gulp build`
