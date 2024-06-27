import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import {useForm} from "react-hook-form";
import {AxiosAuth, post, put} from "@/core/httpClient";
import {useEffect} from "react";
import {toast, ToastContainer} from "react-toastify";

const UpdateUserDialog = ({isOpen}) => {
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
        setValue("firstName", state.row.firstName);
        setValue("lastName", state.row.lastName);
        setValue("email", state.row.email);
        setValue("id", state.row.id);
        setValue("contactNumber", state.row.contactNumber);
    }, [state]);

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
            <ModalBody>
                <Row className="mb-3">
                    <Col md={6} className="mb-1">
                        <input type="text" className="form-control" placeholder="First name" {...register("firstName", {
                            required: "First name is required!",
                            maxLength: 50,
                            minLength: 3,
                        })} />
                        {errors && errors.firstName && (
                            <span className="text-danger">{errors.firstName.message}</span>
                        )}
                    </Col>
                    <Col md={6}>
                        <input type="text" className="form-control" placeholder="Last name" {...register("lastName", {
                            required: "Last name is required!",
                            maxLength: 50,
                            minLength: 3,
                        })}/>
                        {errors && errors.lastName && (
                            <span className="text-danger">{errors.lastName.message}</span>
                        )}
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6} className="mb-1">
                        <input type="text" className="form-control" placeholder="Email" {...register("email", {
                            required: "Email is required!"
                        })} />
                        {errors && errors.email && (
                            <span className="text-danger">{errors.email.message}</span>
                        )}
                    </Col>
                    <Col md={6}>
                        <input type="text" className="form-control"
                               placeholder="Contact number" {...register("contactNumber", {
                            required: "Contact number is required!",
                            validate: (value) => {
                                if (!/^[0-9]*$/.test(value)) {
                                    return "You can enter only numbers";
                                }
                            }
                        })}/>
                        {errors && errors.contactNumber && (
                            <span className="text-danger">{errors.contactNumber.message}</span>
                        )}
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6} className="mb-1">
                        <input type="password" className="form-control"
                               placeholder="Password" {...register("password", {
                            required: "Password is required!"
                        })} />
                        {errors && errors.password && (
                            <span className="text-danger">{errors.password.message}</span>
                        )}
                    </Col>
                    <Col md={6}></Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button className="btn btn-success" type="button" onClick={() => {
                    handleSubmit(async (data) => {
                        let result = await AxiosAuth.post("/users/update", data);

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

export default UpdateUserDialog;