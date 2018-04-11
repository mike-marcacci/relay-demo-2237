// @flow

import React, { Component } from 'react';
import { graphql, QueryRenderer } from "react-relay";

type Props = {
  environment: *
};

type State = {
  detailId: ?string,
  search: string
};

class App extends Component<Props, State> {
  state = {
    detailId: 'three',
    search: 'e'
  };

  render() {
    return (
      <div style={{display: "flex"}}>
        <div style={{
          flex: 3,
          background: 'whitesmoke',
          margin: '10px',
          padding: '10px',
        }}>
          <h4 style={{marginTop: '0', textAlign: 'center'}}>Climb Details</h4>
          {this.state.detailId ? <QueryRenderer
            environment={this.props.environment}
            query={graphql`
              query AppDetailQuery($id: ID!) {
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
            `}
            variables={{
              id: this.state.detailId
            }}
            render={({props, error}) => {
              if (!props)
                return <div>Loading...</div>;

              if (!props.climb)
                return <div>The climb does not exist.</div>;

              if (!props.climb.object)
                return <div>This climb has been deleted.</div>;

              return (
                <div>
                  <h2>Name: {props.climb.object.name}</h2>
                  <h5>Coordinates</h5>
                  <div>Lat: {props.climb.object.coordinates.lat}</div>
                  <div>Lng: {props.climb.object.coordinates.lng}</div>

                  {props.climb.object.description && (
                    <div>
                      <h5>Description</h5>
                      {props.climb.object.description}
                    </div>
                  )}
                </div>
              );
            }}
          /> : "No Climb Selected"}
        </div>
        <div style={{flex: 1, margin: '10px'}}>
          <h4 style={{marginTop: '0', textAlign: 'center'}}>Search</h4>
          <input
            type="search"
            style={{
              fontSize: '18px',
              marginBottom: '10px',
              width: '100%'
            }}
            value={this.state.search} onChange={this._onSearchChange} />
          <div>
            {this.state.search
              ? <QueryRenderer
                environment={this.props.environment}
                query={graphql`
                  query AppSearchQuery($query: String!) {
                    search(query: $query) {
                      id
                      object {
                        id
                        name
                      }
                    }
                  }
                `}
                variables={{
                  query: this.state.search
                }}
                render={({props, error}) => {

                  if (!props)
                    return <div>Loading...</div>;

                  if (!props.search || !props.search.length)
                    return <div>No results.</div>;

                  return (
                    <div>
                      {props.search.map((climb) => climb && climb.object && (
                        <div
                          key={climb.id}
                          data-climb-id={climb.id}
                          onClick={this._onSearchResultClick}
                          style={{
                            borderBottom: '1px solid whitesmoke',
                            padding: '10px',
                            cursor: 'pointer',
                            background: climb.id === this.state.detailId
                              ? '#79c4ff'
                              : 'white'
                          }}
                          >
                          {climb.object.name}
                        </div>
                      ))}
                    </div>
                  );
                }}
              />
              : <div>Type to search.</div>}
          </div>
        </div>
      </div>
    );
  }

  _onSearchChange = (e: SyntheticInputEvent<>) => {
    this.setState({
      search: e.target.value
    });
  }

  _onSearchResultClick = (e: SyntheticMouseEvent) => {
    const detailId = e.target.getAttribute('data-climb-id');
    this.setState((state) => ({
      detailId: state.detailId === detailId ? null : detailId
    }));
  };
}

export default App;
