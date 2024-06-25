import {Button, Col, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import {useForm} from "react-hook-form";
import {AxiosAuth, post, put} from "@/core/httpClient";
import {useEffect} from "react";
import {toast, ToastContainer} from "react-toastify";

const UpdatePopisDialog = ({isOpen}) => {
    const {state, dispatch} = useListActions();

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
        mode: "onSubmit",
        defaultValues: state.row
    });

    useEffect(() => {
        setValue("naziv", state.row.naziv);
        setValue("napomena", state.row.napomena);
        setValue("active", state.row.active);
        setValue("id", state.row.id);
        setValue("id_user", state.row.userId);
    }, [state]);

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
                        <input type="checkbox" className="" placeholder="Aktivan" {...register("active", {})} />
                        {errors && errors.email && (
                            <span className="text-danger">{errors.active.message}</span>
                        )}
                    </Col>

                </Row>
            </ModalBody>
            <ModalFooter>
                <Button className="btn btn-success" type="button" onClick={() => {
                    handleSubmit(async (data) => {
                        let result = await AxiosAuth.post("/popis/update", data);

                        if (result && result.status === 200) {
                            toast.success("Successfully updated!");
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

export default UpdatePopisDialog;