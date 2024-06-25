import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import {useForm} from "react-hook-form";
import {AxiosAuth, post} from "@/core/httpClient";
import {toast} from "react-toastify";

const CreatePopisDialog = ({isOpen}) => {
    const {dispatch} = useListActions();

    const toggle = () => dispatch({
        type: listAction.RESET
    });

    const {
        register,
        watch,
        handleSubmit,
        formState: {errors},
        setValue
    } = useForm({
        mode: "onSubmit"
    });

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
            <ModalBody>
                <Row className="mb-3">
                    <Col md={6} className="mb-1">
                        <input type="text" className="form-control" placeholder="Naziv" {...register("naziv", {
                            required: "Naziv je neophodan!",
                            maxLength: 50,
                            minLength: 3,
                        })} />
                        {errors && errors.datum && (
                            <span className="text-danger">{errors.datum.message}</span>
                        )}
                    </Col>
                    <Col md={6}>
                        <input type="text" className="form-control" placeholder="Napomena" {...register("napomena", {
                            maxLength: 200,
                            minLength: 0,
                        })}/>
                        {errors && errors.napomena && (
                            <span className="text-danger">{errors.napomena.message}</span>
                        )}
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6} className="mb-1">
                        <input type="checkbox" className="" placeholder="Aktivan" {...register("active", {
                            required: "Aktivan is required!"
                        })} />
                        {errors && errors.email && (
                            <span className="text-danger">{errors.active.message}</span>
                        )}
                    </Col>

                </Row>
            </ModalBody>
            <ModalFooter>
                <Button className="btn btn-success" type="button" onClick={() => {
                    handleSubmit(async (data) => {
                        let result = await AxiosAuth.post("/popis/create", data);
debugger;
                        if (result && result.status === 200) {
                            toast.success("Successfully created!");
                            dispatch({
                                type: listAction.RELOAD
                            });
                        }
                    })();
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

export default CreatePopisDialog;