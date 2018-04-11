/**
 * @flow
 * @relayHash aedafd7c1fbf6e46490f83fb5e9fa689
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AppSearchQueryVariables = {|
  query: string,
|};
export type AppSearchQueryResponse = {|
  +search: ?$ReadOnlyArray<?{|
    +id: string,
    +object: ?{|
      +id: string,
      +name: string,
    |},
  |}>,
|};
*/


/*
query AppSearchQuery(
  $query: String!
) {
  search(query: $query) {
    id
    object {
      id
      name
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "query",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "search",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "query",
        "variableName": "query",
        "type": "String!"
      }
    ],
    "concreteType": "Climb",
    "plural": true,
    "selections": [
      v1,
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "object",
        "storageKey": null,
        "args": null,
        "concreteType": "ClimbObject",
        "plural": false,
        "selections": [
          v1,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "name",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "AppSearchQuery",
  "id": null,
  "text": "query AppSearchQuery(\n  $query: String!\n) {\n  search(query: $query) {\n    id\n    object {\n      id\n      name\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "AppSearchQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v2
  },
  "operation": {
    "kind": "Operation",
    "name": "AppSearchQuery",
    "argumentDefinitions": v0,
    "selections": v2
  }
};
})();
(node/*: any*/).hash = '938ad110013ae9977069cd2cb721d493';
module.exports = node;
