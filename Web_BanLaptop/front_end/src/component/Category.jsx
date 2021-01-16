import React, { Component } from 'react';
import { Grid, Card } from '@material-ui/core';
import Image from 'material-ui-image';
import { connect } from 'react-redux';
import { addKey } from '../store/actions/countAction';
import { withRouter } from 'react-router-dom';

class Category extends Component {
  constructor(props) {
    super(props);
  }
  handleSearch = async () => {
    await this.props.addKey(this.props.category.display);
    console.log(this.props.category.display);
    this.props.history.push(`/search/${this.props.category.display}?page=1`);
  };

  render() {
    return (
      <div>
        <Grid
          style={{
            padding: 5,
            justifyContent: 'center',
            minWidth: 100,
            maxWidth: 100,
            flexFlow: 'wrap',
          }}
        >
          <Card style={{ height: 80, width: 80 }}>
            <Image
              onClick={this.handleSearch}
              src={this.props.category.imageUrl}
            ></Image>
          </Card>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    product: state.product,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addKey: (key) => dispatch(addKey(key)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Category),
);
