/**
 * @flow
 * @relayHash 3304a63d597e9a56a32784e7a16ac937
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AppDetailQueryVariables = {|
  id: string,
|};
export type AppDetailQueryResponse = {|
  +climb: ?{|
    +id: string,
    +object: ?{|
      +id: string,
      +name: string,
      +coordinates: {|
        +lat: number,
        +lng: number,
      |},
      +description: ?string,
    |},
  |},
|};
*/


/*
query AppDetailQuery(
  $id: ID!
) {
  climb(id: $id) {
    id
    object {
      id
      name
      coordinates {
        lat
        lng
      }
      description
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "id",
    "type": "ID!",
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
    "name": "climb",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id",
        "type": "ID!"
      }
    ],
    "concreteType": "Climb",
    "plural": false,
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
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "coordinates",
            "storageKey": null,
            "args": null,
            "concreteType": "PointCoordinates",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "lat",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "lng",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "description",
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
  "name": "AppDetailQuery",
  "id": null,
  "text": "query AppDetailQuery(\n  $id: ID!\n) {\n  climb(id: $id) {\n    id\n    object {\n      id\n      name\n      coordinates {\n        lat\n        lng\n      }\n      description\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "AppDetailQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v2
  },
  "operation": {
    "kind": "Operation",
    "name": "AppDetailQuery",
    "argumentDefinitions": v0,
    "selections": v2
  }
};
})();
(node/*: any*/).hash = 'a399658cbc3159ceabaff2010adc4c50';
module.exports = node;
