import {Button, Col, Dropdown, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import {useForm} from "react-hook-form";
import {AxiosAuth, post} from "@/core/httpClient";
import {toast} from "react-toastify";
import {useSession} from "next-auth/react";

const CreatePopisStavkaDialog = ({isOpen}) => {
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
    const {data: session} = useSession();
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Kreiranje stavke popisa</ModalHeader>
            <ModalBody>
                <Row className="mb-3">
                    <Col md={6} className="mb-1">
                        <input type="text" className="form-control" placeholder="Naziv" {...register("nazivArtikla", {
                            required: "Naziv je neophodan!",
                            maxLength: 50,
                            minLength: 3,
                        })} />
                        {errors && errors.naziv && (
                            <span className="text-danger">{errors.nazivArtikla.message}</span>
                        )}
                    </Col>
                    <Col md={6}>
                        <input type="text" className="form-control" placeholder="Barkod" {...register("barkod", {
                            maxLength: 50,
                            minLength: 8,
                        })}/>
                        {errors && errors.barkod && (
                            <span className="text-danger">{errors.barkod.message}</span>
                        )}
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6} className="mb-1">
                        <input type="text" className="form-control" placeholder="Količina" {...register("kolicina", {
                            required: "Količina je neophodna!",
                            maxLength: 50,
                            minLength: 1,
                        })} />
                        {errors && errors.kolicina && (
                            <span className="text-danger">{errors.kolicina.message}</span>
                        )}
                    </Col>

                </Row>

            </ModalBody>
            <ModalFooter>
                <Button className="btn btn-success" type="button" onClick={() => {
                    handleSubmit(async (data) => {
                        data.userID = session?.decoded?.id;
                        data.popisID = idParam;
                        let result = await AxiosAuth.post("/popis-stavka/create", data);
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

export default CreatePopisStavkaDialog;