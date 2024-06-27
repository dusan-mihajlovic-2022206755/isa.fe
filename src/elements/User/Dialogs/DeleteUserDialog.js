import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import {toast} from "react-toastify";
import {AxiosAuth} from "@/core/httpClient";

const DeleteUserDialog = ({isOpen}) => {
    const {state, dispatch} = useListActions();

    const toggle = () => dispatch({
        type: listAction.RESET
    });

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Are you sure?</ModalHeader>
            <ModalBody>
                <p>Id: {state.row.id}</p>
                <p>First name: {state.row.firstName}</p>
                <p>Last name: {state.row.lastName}</p>
                <p>Email: {state.row.email}</p>
                <p>Contact number: {state.row.contactNumber}</p>
            </ModalBody>
            <ModalFooter>
                <Button className="btn btn-success" type="button" onClick={async () => {
                    let result = await AxiosAuth.post(`/users/delete?userId=${state.row.id}`);

                    if (result && result.status === 200) {
                        toast.success("Successfully created!");
                        dispatch({
                            type: listAction.RELOAD
                        });
                    }
                }}>
                    Submit
                </Button>
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default DeleteUserDialog;