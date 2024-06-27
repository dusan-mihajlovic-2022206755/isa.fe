'use client';
import useListData from "@/hooks/useListData";
import DataTable from "react-data-table-component";
import {useEffect, useState} from "react";
import {Button, Card, CardBody, CardHeader, Row, Spinner} from "reactstrap";
import {CiCalculator1, CiEdit, CiTrash} from "react-icons/ci";
import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import {IoAddCircleOutline} from "react-icons/io5";
import {signIn, useSession} from "next-auth/react";
import AddPopisDialogs from "@/elements/Popis/AddPopisDialogs";

export const tableColumns = [
    {
        name: 'Naziv',
        selector: (row) => `${row.naziv}`,
        sortable: false
    },
    {
        name: 'Napomena',
        selector: (row) => `${row.napomena}`,
        sortable: false
    },
    {
        name: 'Active',
        selector: (row) => `${row.active ? "Da" : "Ne"}`,
        sortable: false
    },
    {
        name: 'Options',
        selector: (row) => `${row.naziv}`,
        cell: (row) => {
            const {dispatch} = useListActions();

            return (
                <>
                    <Button className="btn btn-primary me-3" variant="outline-light" onClick={() => {
                        dispatch({
                            type: listAction.OPENSTAVKE,
                            payload: row
                        });
                    }}>
                        <CiCalculator1/>
                    </Button>
                    <Button className="btn btn-primary me-3" variant="outline-light" onClick={() => {
                        dispatch({
                            type: listAction.UPDATE,
                            payload: row
                        });
                    }}>
                        <CiEdit/>
                    </Button>
                    <Button className="btn btn-danger" variant="outline-light" onClick={() => {
                        dispatch({
                            type: listAction.DELETE,
                            payload: row
                        });
                    }}>
                        <CiTrash/>
                    </Button>
                </>
            );
        },
        sortable: false
    }
]
export default function PopisList() {
    const {data: session} = useSession();
    const userID = session?.decoded?.id;
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const {state, dispatch} = useListActions();

    const url = `popis/get-page-list?userID=${userID}&pageNumber=${pageNumber - 1}&pageSize=${pageSize}`;
    const {
        getData,
        loading,
        data
    } = useListData(url);

    useEffect(() => {
        if (userID){
            getData(url);
        }
    }, [pageSize, pageNumber]);

    useEffect(() => {
        if (state.reload && userID) {
            getData(url);
        }
    }, [state, userID]);

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
                        Kreiraj Popis <IoAddCircleOutline/>
                    </Button>
                </CardHeader>
                <CardBody>
                    {data != null && <DataTable data={data.listPopis}
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

            <AddPopisDialogs/>
        </>
    );
}
