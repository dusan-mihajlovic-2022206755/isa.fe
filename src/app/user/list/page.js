'use client';
import useListData from "@/hooks/useListData";
import DataTable from "react-data-table-component";
import {useEffect, useState} from "react";
import {Button, Card, CardBody, CardHeader, Row, Spinner} from "reactstrap";
import {useTestActions} from "@/contexts/testContext";
import {CiEdit, CiTrash} from "react-icons/ci";
import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import AllUserDialogs from "@/elements/User/AllUserDialogs";
import {IoAddCircleOutline} from "react-icons/io5";
import {signIn, useSession} from "next-auth/react";
import useAuth from "@/hooks/useAuth";
import storageKey from "@/core/storageKey";

export const tableColumns = [
    {
        name: 'First name',
        selector: (row) => `${row.firstName}`,
        sortable: false
    },
    {
        name: 'Last name',
        selector: (row) => `${row.lastName}`,
        sortable: false
    },
    {
        name: 'Contact number',
        selector: (row) => `${row.contactNumber}`,
        sortable: false
    },
    {
        name: 'Options',
        selector: (row) => `${row.lastName}`,
        cell: (row) => {
            const {dispatch} = useListActions();

            return (
                <>
                    <Button className="btn btn-primary me-3" variant="outline-light" onClick={() => {
                        dispatch({
                            type: listAction.UPDATE,
                            payload: row
                        })
                    }}>
                        <CiEdit/>
                    </Button>
                    <Button className="btn btn-danger" variant="outline-light" onClick={() => {
                        dispatch({
                            type: listAction.DELETE,
                            payload: row
                        })
                    }}>
                        <CiTrash/>
                    </Button>
                </>
            );
        },
        sortable: false
    }
]

export default function UserList() {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const {state, dispatch} = useListActions();
    const url = `users/get-page-list?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`;
    const {
        getData,
        loading,
        data
    } = useListData(url);
    useEffect(() => {
        getData(url);
    }, [pageSize, pageNumber]);

    useEffect(() => {
        if (state.reload) {
            getData(url);
        }
    }, [state]);

    const handlePageChange = async (page) => {
        setPageNumber(page);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        setPageNumber(page);
        setPageSize(newPerPage);
    };
    return (
        <>
            <Card>
                <CardHeader className="d-flex justify-content-end">
                    <Button className="btn btn-success me-3" variant="outline-light" onClick={() => {
                        dispatch({
                            type: listAction.CREATE
                        })
                    }}>
                        Create User <IoAddCircleOutline/>
                    </Button>
                </CardHeader>
                <CardBody>
                    {data != null && <DataTable data={data.users}
                                                columns={tableColumns}
                                                striped={true}
                                                noHeader={true}
                                                pagination
                                                paginationServer
                                                progressPending={loading}
                                                paginationTotalRows={data.totalElements}
                                                onChangePage={handlePageChange}
                                                onChangeRowsPerPage={handlePerRowsChange}
                                                progressComponent={<Spinner color="danger">Ocitavanje...</Spinner>}
                                                highlightOnHover
                    />}
                </CardBody>
            </Card>

            <AllUserDialogs/>
        </>
    );
}
