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

Updating gh-pages
----

    git checkout gh-pages
    git merge master
    git push

