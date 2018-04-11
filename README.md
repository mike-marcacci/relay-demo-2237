- [video](https://www.youtube.com/watch?v=in84djn-oBI&feature=youtu.be)
- [issue](https://github.com/facebook/relay/issues/2237)

This repo demonstrates the problem described in [this relay issue](https://github.com/facebook/relay/issues/2237). This bug is currently effecting [Boltline](https://www.boltline.org/) in production (albiet in beta), but is likely crashing apps across the web under hard-to-reproduce conditions. I recorded a quick video walkthrough of this demo [here](https://www.youtube.com/watch?v=in84djn-oBI&feature=youtu.be), which should be a helpful place to start.

### About the Entity/Object pattern used in this demo
Because the nature of Boltline requires support for offline modifications, we  separate the timeless "concept" of a particular climb/area/etc from its point-in-time state in the database. So in this case:

- A `Climb` is an `Entity` which represents the *idea* of a specific climb. It points to the "current" `ClimbObject`.
- A `ClimbObject` holds the data that describes this climb. This is immutable, and allows idempotent API calls when syncronizing offline state.

This is very similar to how git and other source control systems think about data, and it allows us to intelligently merge changes that were applied concurrently, such as while one client is offline. It also lets us time travel, look at previous versions of an entity, rolling back vandalism, etc.

While this pattern exacerbates the issue, the runtime exceptions are possible whenever more than one query is run, including all setups with more than one `QueryRenderer`, any `refetchContainer`, any `paginationContainer`, any call to `commitMutation`, or any manually executed relay queries.
