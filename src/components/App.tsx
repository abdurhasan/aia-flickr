import React, { Component, ReactNode } from 'react';
import { withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { styles, IState, IProps, baseUrl, IData } from '../interfaces'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import GridSkeletonLoading from './GridSkeletonLoading'
import Axios from 'axios';



class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      searchPlaceHolder: '#Tags .. ',
      isPagination: true,
      deviceCols: 6,
      data: [],
      page: 0,
      isLoading: true
    }



  }

  componentDidMount() {

    // const self = this
    // setInterval(function () {
    //   console.log(self.state.data)
    // }, 1000)

    window.addEventListener('resize', this.windowHandleResize)
    window.addEventListener('scroll', this.windowHandleScroll)

    this.getFeed()
  }

  async getFeed() {
    this.setState({ isLoading: true })
    const fetchGetFeed: IData[] = (await Axios.get(baseUrl + `getFeed?=${this.state.page}`))?.data
    const setNewData = [...this.state.data, ...fetchGetFeed]

    this.setState({
      isLoading: false,
      data: setNewData.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i)
    })
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

  windowHandleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight
    ) {
      this.getFeed()
    }
  }



  searchTag = async (tags: string) => {
    this.setState({ isLoading: true })
    const getDataByTags: IData[] = (await Axios.get(baseUrl + `searchTag?=${this.state.page}`))?.data
    this.setState({
      isLoading: false,
      data: getDataByTags
    })
  }


  render(): ReactNode {
    const { classes } = this.props;
    const { data, isLoading, isPagination, deviceCols } = this.state;

    return (

      <AppBar position="sticky" color="default">
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
              onChange={(e) => this.searchTag(e.target.value)}
            />
          </div>
        </Toolbar>


        <div className={classes.root}>
          {isLoading ? <GridSkeletonLoading className={classes.gridList} cols={deviceCols} />
            :
            <GridList cellHeight={400} className={classes.gridList} cols={deviceCols}>
              {data.map((snap) => (
                <GridListTile key={snap.id}>
                  <img src={snap.image} alt={snap.title} /> */}
                    <GridListTileBar
                    title={snap.title}
                    subtitle={<span>by: ${snap.author} </span>}
                  />
                </GridListTile>))}
            </GridList>
          }

        </div>
      </AppBar>
    );
  }
}



export default withStyles(styles)(App);

