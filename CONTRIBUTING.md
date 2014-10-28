Contributing
====

Building
---

	grunt

Publishing
---

	tin -v VERSION
	grunt
	git add -A
	git commit -m 'VERSION'
	git tag vVERSION
	git push origin master --tags
	npm publish

or, you can use: [tin-grunt](https://gist.github.com/redgeoff/9f69b36b186e1714e923), e.g.

	tin-grunt 0.0.1

Updating gh-pages
---

    git checkout gh-pages
    git merge master
    git push

Setup for gh-pages (only do once)
---

	git checkout -b gh-pages
	git push

Setup Travis CI (only do once)
---

	[Setup Travis CI](http://docs.travis-ci.com/user/getting-started/)
	Make small change to any file, e.g. add _Testing_ to the end of [README.md](README.md)
	git add -A
	git commit -m "feat(travis): first build for travis"
	git push