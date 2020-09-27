import GridListTile from '@material-ui/core/GridListTile';
import Skeleton from 'react-loading-skeleton';
import GridList from '@material-ui/core/GridList';
import React from 'react';

const GridSkeletonLoading = ({ className, cols }: { className: any, cols: number }) => {
    const loopSkeleton = [...Array(cols).keys()]
    return (
        <GridList cellHeight={400} className={className} cols={cols}>
            {loopSkeleton.map((snap) => (
                <GridListTile key={'skeleton-' + snap}>
                    <Skeleton width='99%' height='79%' duration={0.5} />
                    <Skeleton width="100%" height="19%" style={{ background: 'rgba(0, 0, 0, 0.6)' }} duration={0.6}/>
                </GridListTile>
            ))}

        </GridList>


    )
}

export default GridSkeletonLoading;