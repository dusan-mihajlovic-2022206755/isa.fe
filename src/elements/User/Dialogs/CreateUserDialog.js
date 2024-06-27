import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import {useForm} from "react-hook-form";
import {AxiosAuth, post} from "@/core/httpClient";
import {toast} from "react-toastify";
import {useSession} from "next-auth/react";

const CreateUserDialog = ({isOpen}) => {
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
    // const options = [
    //     { value: 'admin', label: 'Administrator' },
    //     { value: 'employee', label: 'Employee' },
    // ];
    //
    // const handleSelect = (option) => {
    //     console.log('Selected option:', option);
    // };
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create user</ModalHeader>
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
                            maxLength: 14,
                            minLength: 9,
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
                        <input type="password" className="form-control" placeholder="Password" {...register("password", {
                            required: "Password is required!"
                        })} />
                        {errors && errors.password && (
                            <span className="text-danger">{errors.password.message}</span>
                        )}
                    </Col>
                    <Col md={6}></Col>
                </Row>
                <Row className="mb-3">
                    {/*<h3>Rola</h3>*/}
                    {/*<Dropdown options={options} onSelect={handleSelect}/>*/}
                    <Col md={6} className="mb-1">
                        <label>Rola</label>
                        <label>1-Administrator, 2-Employee</label>
                        <input min="1" max="2" value="2" type="number" className="form-control" placeholder="Rola" {...register("roleID", {
                            maxLength: 1,
                            minLength: 1,
                            required: true,
                        })}/>
                        {errors && errors.rola && (
                            <span className="text-danger">{errors.rola.message}</span>
                        )}
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button className="btn btn-success" type="button" onClick={() => {
                    handleSubmit(async (data) => {
                        let result = await AxiosAuth.post("/users/create", data);
                        if (result && result.status === 200) {
                            toast.success("User created successfully!");
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

export default CreateUserDialog;