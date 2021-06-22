import React, {useEffect, useMemo, useState} from 'react';
import {
    useTable,
    useSortBy,
    useFilters,
    usePagination,
} from 'react-table';
import {COLUMNS} from '../../dummy_data/data';
import {
    Thead,
    Tbody,
    Pagination,
    PageSize,
} from './views';
import axios from "axios";
import {AllMusic} from "../../store/Store";
import {Spinner, Filter} from "../../components";
import {observer} from 'mobx-react';

const DataTable = () => {
    const columns = useMemo(() => COLUMNS, []);
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        if(AllMusic.getMusicList()){
            AllMusic.setMusicList(AllMusic.getMusicList());
        }else {
            AllMusic.toggleLoading();
            axios('/api/music')
                .then(res => {
                    AllMusic.setMusicList(res.data);
                })
                .catch(err => {
                    console.error(err);
                })
        }
    }, []);

    const tableInstance = useTable({
            columns,
            data: AllMusic.music,
        },
        useFilters,
        useSortBy,
        usePagination
    );

    const {
        //=======TABLE=======
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        //=======PAGINATION=======
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        state,
        pageOptions,
        setPageSize,
        gotoPage,
    } = tableInstance;

    const {pageIndex} = state;

    useEffect(() => {
        const arr = [];
        headerGroups.forEach(headerGroup => (
            headerGroup.headers.forEach(col => {
                if (col.canFilter) {
                    arr.push(col.render('Filter'));
                }
            })
        ));
        setFilters(arr);
    }, [headerGroups]);

    return (
        <div className="row mt-5">
            <div className="col-9">
                <div className="card">
                    <h5 className="card-header">Плейлист</h5>
                    <div className="card-body">
                        {AllMusic.loading ? <Spinner/> : (
                            <table className="table table-bordered table-hover" {...getTableProps()}>
                                <Thead headerGroups={headerGroups}/>
                                <Tbody getTableBodyProps={getTableBodyProps} page={page} prepareRow={prepareRow}/>
                            </table>
                        )}
                    </div>
                    <div className="card-footer">
                        <div className="d-flex justify-content-between">
                            <Pagination
                                canPreviousPage={canPreviousPage}
                                previousPage={previousPage}
                                pageOptions={pageOptions}
                                pageIndex={pageIndex}
                                gotoPage={gotoPage}
                                canNextPage={canNextPage}
                                nextPage={nextPage}
                            />
                            <PageSize setPageSize={setPageSize}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-3">
                <div className="card">
                    <h5 className="card-header">Фильтр</h5>
                    <div className="card-body">
                        <Filter filters={filters} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(DataTable);
