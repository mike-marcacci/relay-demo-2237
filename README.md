This demonstrates the issues described by [this relay issue](https://github.com/facebook/relay/issues/2237). This bug is currently effecting [Boltline](https://www.boltline.org/) in production (albiet in beta).

Because the nature of this project requires support for offline modifications, we conceptually separate the timeless "idea" of a particular climb/area/etc from the point-in-time state in the database.

A "Climb" is an "Entity" which represents the *idea* of a specific climb.

A "ClimbObject" holds the data that describes this climb.

This is very similar to how git and other source control systems think about data, and it allows us to intelligently merge changes that were applied concurrently, such as while one client is offline. It also lets us time travel, look at previous versions of an entity, rolling back vandalism, etc.


---

This is a template for creating demos with react and relay. Because our test GraphQL server is running in the browser, these demos can be hosted on github pages or any static host.

Use the command `yarn relay` to run the relay compiler.
Use the command `yarn start` to run a development server.
Use the command `yarn build` to build the static site to the `/build` directory.
Use the command `yarn deploy` to deploy the static site using github pages.

Before deploying, **make sure you change the `homepage` property in `package.json`**!!