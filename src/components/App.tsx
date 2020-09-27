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



class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      searchPlaceHolder: '#Tags .. ',
      searchTags: '',
      isPagination: true,
      deviceCols: 6,
      data: []
    }
    this.windowHandleResize = this.windowHandleResize.bind(this)
    window.addEventListener('resize', this.windowHandleResize)

  }



  windowHandleResize = () => {
    console.log('windowHandleResize is running ...')

    const windowWith: number = Number(window.innerWidth) | 0;
    let deviceCols: number;
    switch (true) {
      case windowWith >= 1200:
        deviceCols = 6
        break;
      case windowWith >= 992 && windowWith <= 1200:
        deviceCols = 4
        break;
      default: {
        deviceCols = 1
        break;
      }
    }
    this.setState({
      deviceCols: deviceCols
    })
    console.log(this.state.deviceCols)
  }

  generateRandomData = () => {
    console.log('generateRandomData',this.state.deviceCols)
    let result = [];
    for (let i = 0; i < this.state.deviceCols; i++) {
      result.push({
        id: Math.floor(Math.random() * 1000) + '',
        img: 'https://live.staticflickr.com/65535/50384942723_f4886a59fa_b.jpg',
        title: 'title',
        author: 'hasan',
      });
    }
    return result;
  };

  fetchMoreData = () => {
    this.setState({
      data: [...this.state.data, ...this.generateRandomData()]
    })
  }


  updatePlaceHolder(e: any) {
    console.log(e.target.key)

  }

  render(): ReactNode {
    const { classes } = this.props;
    const { data, isPagination, deviceCols } = this.state;
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
              // key=''
              onChange={(e) => this.setState({ searchTags: e.target.value })}
            />
          </div>
        </Toolbar>


        <div className={classes.root}>
          <InfiniteScroll
            initialLoad={false}
            loadMore={this.fetchMoreData}
            hasMore={isPagination}
            loader={(
              <GridSkeletonLoading className={classes.gridList} cols={deviceCols} />
            )}
          >
            <GridList cellHeight={400} className={classes.gridList} cols={deviceCols}>
              {data.map((snap) => (
                <GridListTile key={snap.id}>
                  <img src={snap.img} alt={snap.title} /> */}
                  <GridListTileBar
                    title={snap.title}
                    subtitle={<span>by: ${snap.author} </span>}
                  />
                </GridListTile>
              ))}
            </GridList>
          </InfiniteScroll>
        </div>
      </AppBar>
    );
  }
}



export default withStyles(styles)(App);

