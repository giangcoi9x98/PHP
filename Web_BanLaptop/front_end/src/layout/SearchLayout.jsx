import React, { Component } from 'react';
import {withSnackbar} from 'notistack';
class Default extends Component {
    
  render() {
    return (
      <div style={{ height: '100%' }}>
        <main
          style={{
            paddingTop: 50,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgb(241, 240, 241)',
          }}
        >
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default withSnackbar(Default)