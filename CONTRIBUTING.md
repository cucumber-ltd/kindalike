## Release process

    # IMPORTANT!!!!!!
    # Bump version in bower.json to what the version in package.json *will* be
    npm version patch
    npm publish
    git push && git push --tags
