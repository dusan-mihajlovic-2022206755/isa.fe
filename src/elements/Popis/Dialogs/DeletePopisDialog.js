import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import {AxiosAuth, del} from "@/core/httpClient";
import {toast} from "react-toastify";

const DeletePopisDialog = ({isOpen}) => {
    const {state, dispatch} = useListActions();

    const toggle = () => dispatch({
        type: listAction.RESET
    });
    console.log(state.row.active);
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Da li ste sigurni?</ModalHeader>
            <ModalBody>
                <p>Id: {state.row.id}</p>
                <p>Naziv: {state.row.naziv}</p>
                <p>Napomena: {state.row.napomena}</p>
                <p>Aktivan: {state.row.active ? "Da" : "Ne"}</p>
            </ModalBody>
            <ModalFooter>
                <Button className="btn btn-success" type="button" onClick={async () => {
                    let result = await AxiosAuth.post(`/popis/delete?popisID=${state.row.id}`);

                    if (result && result.status === 200) {
                        toast.success("Uspešno izbrisan popis!");
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

export default DeletePopisDialog;