import React, { Component, ReactNode } from 'react';
import { withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { styles, IState, IProps } from '../interfaces'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import GridSkeletonLoading from './GridSkeletonLoading'
import InfiniteScroll from 'react-infinite-scroller';

const tileData = [
  {
    img: 'https://live.staticflickr.com/65535/50384942723_f4886a59fa_b.jpg',
    title: 'mantapp',
    author: 'author',
  },
  {
    img: 'https://live.staticflickr.com/65535/50384942723_f4886a59fa_b.jpg',
    title: 'mantapp',
    author: 'author',
  },
  {
    // img: 'https://live.staticflickr.com/65535/50384942723_f4886a59fa_b.jpg',
    title: '',
    author: '',
  }
]

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      searchPlaceHolder: '#Tags .. ',
      searchTags: ''
    }

  }


  updatePlaceHolder(e: any) {
    console.log(e.target.key)

  }

  render(): ReactNode {
    const { classes } = this.props;
    return (

      <AppBar position="static" color="default">
        <Toolbar>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder={this.state.searchPlaceHolder}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              key=''
              onChange={(e) => this.setState({ searchTags: e.target.value })}
            />
          </div>
        </Toolbar>

        <div className={classes.root}>

          <GridSkeletonLoading className={classes.gridList} />

          <GridList cellHeight={400} className={classes.gridList}>

            {tileData.map((tile) => (
              <GridListTile key={tile.img}>
                <img src={tile.img} alt={tile.title} /> */}
              <GridListTileBar
                  title={tile.title}
                  subtitle={<span>by: </span>}
                />
              </GridListTile>
            ))}
          </GridList>

        </div>
      </AppBar>
    );
  }
}



export default withStyles(styles)(App);

