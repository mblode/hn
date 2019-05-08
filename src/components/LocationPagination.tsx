import React from 'react';
import Pagination from '../components/Pagination';

class LocationPagination extends React.Component {
    static getRequestQuery(pathname) {
        return pathname.split('/').filter(v => !!v);
    }

    constructor(props) {
        super(props);
        this.handlePaginate = this.handlePaginate.bind(this);
    }

    componentWillMount() {
        const { done, feedCount } = this.props;
        const [type, stringPage] = LocationPagination.getRequestQuery(this.props.location.pathname);
        const page = parseInt(stringPage, 10);

        if (type && !Number.isNaN(page) && feedCount === 0) {
            this.props.onPaginate(type, parseInt(page, 10)).then(done, done);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            const [type, page] = LocationPagination.getRequestQuery(nextProps.location.pathname);
            this.props.onPaginate(type, parseInt(page, 10));
        }
    }

    handlePaginate(page) {
        const [type] = LocationPagination.getRequestQuery(this.props.location.pathname);
        this.props.history.push(`/${type}/${page}`);
    }

    render() {
        const { currentPage } = this.props;

        return (
            <Pagination
                currentPage={currentPage}
                onPaginate={this.handlePaginate}
            />
        );
    }
}

export default LocationPagination;
