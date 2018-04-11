// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Environment, Network, RecordSource, Store } from "relay-runtime";
import v4 from 'uuid/v4';
import App from './App';
import { graphql, buildSchema } from 'graphql';

// use the schema
import schemaSource from "./schema.graphql";
const schema = buildSchema(schemaSource);

// the database
const objects = {
  '1869f854-1d5f-4474-9683-88a147a372c7': {
    __typename: 'ClimbObject',
    id: '1869f854-1d5f-4474-9683-88a147a372c7',
    name: 'Apple',
    description: 'This is a description for Apple!',
    coordinates: {
      lat: 1,
      lng: 1
    }
  },
  '14a594a7-3299-47bc-bc8b-61a159b0fff6': {
    __typename: 'ClimbObject',
    id: '14a594a7-3299-47bc-bc8b-61a159b0fff6',
    name: 'Butter (1)',
    description: 'This is a description for Butter!',
    coordinates: {
      lat: 2,
      lng: 2
    }
  },
  '0f603359-ff52-4f34-875f-c126565c714c': {
    __typename: 'ClimbObject',
    id: '0f603359-ff52-4f34-875f-c126565c714c',
    name: 'Celery',
    description: 'This is a description for Celery!',
    coordinates: {
      lat: 3,
      lng: 3
    }
  },
  'a8ae813f-c949-4399-b2ab-afbd800ede81': {
    __typename: 'ClimbObject',
    id: 'a8ae813f-c949-4399-b2ab-afbd800ede81',
    name: 'Dolma',
    description: 'This is a description for Dolma!',
    coordinates: {
      lat: 4,
      lng: 4
    }
  },
  'e2d76d4a-0582-482f-ac7a-68225b2a4193': {
    __typename: 'ClimbObject',
    id: 'e2d76d4a-0582-482f-ac7a-68225b2a4193',
    name: 'Egg',
    description: 'This is a description for Egg!',
    coordinates: {
      lat: 5,
      lng: 5
    }
  },
};

class Climb {
  id: string;
  objectId: ?string;

  constructor (id: string, objectId: ?string) {
    this.id = id;
    this.objectId = objectId;
  }

  object () {
    return objects[this.objectId] || null;
  }
}

const entities = {
  one: new Climb('one', '1869f854-1d5f-4474-9683-88a147a372c7'),
  two: new Climb('two', '14a594a7-3299-47bc-bc8b-61a159b0fff6'),
  three: new Climb('three', '0f603359-ff52-4f34-875f-c126565c714c'),
  four: new Climb('four', 'a8ae813f-c949-4399-b2ab-afbd800ede81'),
  five: new Climb('five', 'e2d76d4a-0582-482f-ac7a-68225b2a4193'),
};

function simulateExternalMutation () {
  const beforeObject = entities.two.object();

  // add the new object
  const id = v4();
  const afterObject = objects[id] = {
    ...beforeObject,
    id: id,
    name: beforeObject.name.replace(/\(([0-9]+)\)/, (match, p1) => `(${parseInt(p1, 10) + 1})`)
  };

  console.log(`Simulating an update by a 3rd party, changing the climb's name from "${beforeObject.name}" to "${afterObject.name}" `);

  // update the entity to point to the new object
  entities.two.objectId = id;
}

// update the "Butter" entry every 5 seconds
setInterval(simulateExternalMutation, 5000);

// the root resolver
const root = {
  climb: ({id}) => {
    return entities[id] || null;
  },
  search: ({query}) => {
    return Object.keys(entities)
    .map((id) => entities[id])
    .filter((climb) => {
      const object = climb && climb.object();
      return object && object.name.toLocaleLowerCase().includes(query.toLocaleLowerCase());
    });
  }
};

const source = new RecordSource();
const store = new Store(source);
const network = Network.create(async function(
  operation: *,
  variables: *,
  cacheConfig: *,
  uploadables: *
) {
  return graphql(
    schema,
    operation.text,
    root,
    {},
    variables,
  );
});

const environment = new Environment({
  handlerProvider: null,
  network,
  store
});

ReactDOM.render(<App environment={environment} />, document.getElementById('root'));
