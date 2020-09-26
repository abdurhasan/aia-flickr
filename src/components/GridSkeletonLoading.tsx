import GridListTile from '@material-ui/core/GridListTile';
import Skeleton from 'react-loading-skeleton';
import GridList from '@material-ui/core/GridList';
import React from 'react';

const GridSkeletonLoading = ({ className }: { className: any }) => {

    return (
        <GridList cellHeight={400} className={className}>
            <GridListTile key='skeleton-1'>
                <Skeleton width='99%' height='79%' duration={0.5} />
                <Skeleton width="100%" height="19%" style={{ background: 'rgba(0, 0, 0, 0.5)' }} />
            </GridListTile>
            <GridListTile key='skeleton-2'>
                <Skeleton width='99%' height='79%' duration={0.5} />
                <Skeleton width="100%" height="19%" style={{ background: 'rgba(0, 0, 0, 0.5)' }} />
            </GridListTile>

        </GridList>
    )
}

export default GridSkeletonLoading;