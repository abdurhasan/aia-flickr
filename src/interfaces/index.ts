import { createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";

export interface IData {
    id: string,
    image: string,
    title: string,
    author: string,
}

export interface IState {
    searchPlaceHolder: string;
    data: IData[];
    page: number,
    deviceCols: number;
    isLoading: boolean

}

export const baseUrl: string = 'https://aia-flicker-be.herokuapp.com/';

export interface IProps extends WithStyles<typeof styles> { }


export const styles = (theme: Theme) => createStyles({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.black, 0.15),
        '&:hover': { borderColor: "red" },
        marginLeft: 0,
        width: '100%',
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'black',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '120ch',
        },
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridList: {
        // backgroundColor: 'red',
        width: '150%',
        height: '55%',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
})


// container
// spacing={0}
// direction="column"
// alignItems="center"
// justify="center"
// style={{ minHeight: '100vh' }}
