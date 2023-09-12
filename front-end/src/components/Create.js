import { useState, useReducer } from "react";
import { Form, Button, Header } from "semantic-ui-react";
import axios from '../http-common';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";

const initialMessages = [
    {
        type: "NOTHING",
        message: <h4>&nbsp;</h4>,
        color: "grey"
    },
    {
        type: 'ERROR',
        message: 'Something went wrong! Try again',
        color: "red"
    },
    {
        type: 'FORM_INCOMPLETE',
        message: 'Input all the required fields!',
        color: "red"
    },
    {
        type: 'USER_EXIST',
        message: 'Email ID already exists..!',
        color: "orange"
    },
    {
        type: "INVALID_EMAILID",
        message: "please enter valid email ID",
        color: "red"
    },
    {
        type: "ADDED_USER",
        message: "User created successfully!",
        color: "green"
    }
];

const reducer = (state, action) => {
    switch (action.type) {
        case 'ERROR':
            return initialMessages.find(msg => {
                if (msg.type === "ERROR") {
                    return msg;
                } else return null;
            });
        case 'INVALID_EMAILID':
            return initialMessages.find(msg => {
                if (msg.type === "INVALID_EMAILID") {
                    return msg;
                } else return null;
            });
        case 'FORM_INCOMPLETE':
            return initialMessages.find(msg => {
                if (msg.type === "FORM_INCOMPLETE") {
                    return msg;
                } else return null;
            });
        case 'ADDED_USER':
            return initialMessages.find(msg => {
                if (msg.type === "ADDED_USER") {
                    return msg;
                } else return null;
            });
        case 'USER_EXIST':
            return initialMessages.find(msg => {
                if (msg.type === "USER_EXIST") {
                    return msg;
                } else return null;
            });
        default:
            return initialMessages.find(msg => {
                if (msg.type === "NOTHING") {
                    return msg;
                } else return null;
            });
    }
}

export default function Create() {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        emailID: ""
    });
    const [message, dispatch] = useReducer(reducer, initialMessages[0]);
    const navigate = useNavigate();

    const backToHome = () => {
        navigate('/');
    }

    const validateEmail = (email) => {
        // Regular expression for email validation
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (emailRegex.test(email)) {
            return true;
        } else {
            return false;
        }
    };

    const postData = async (e) => {
        e.preventDefault();
        if (user.firstName !== null && user.firstName !== "" && user.emailID !== null && user.emailID !== "") {
            if (!validateEmail(user.emailID)) return dispatch({ type: "INVALID_EMAILID" });
            let allUsers = await axios.get(``);
            let isEmailIDPresent = allUsers.data.some(item => item.emailID === user.emailID);
            if (!isEmailIDPresent) {
                await axios.post('', {
                    id: uuidv4(),
                    firstName: user.firstName,
                    lastName: user.lastName,
                    emailID: user.emailID,
                    checked: false
                }).then(() => {
                    dispatch({ type: "ADDED_USER" });
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
                }).catch((err) => {
                    console.log(err);
                    // alert("Error occured!")
                    dispatch({ type: "ERROR" });
                });
            } else return dispatch({ type: "USER_EXIST" });
        } else {
            // alert("Input all the required fields!");
            dispatch({ type: "FORM_INCOMPLETE" });
        }
    }

    return (
        <div className="form">
            <Form size="large" onSubmit={postData}>
                <Form.Field required={true}>
                    <label>First Name</label>
                    <input
                        value={user.firstName}
                        onChange={(e) => setUser({
                            ...user,
                            firstName: e.target.value
                        })}
                        placeholder="Enter your First Name" />
                </Form.Field><br />
                <Form.Field>
                    <label>Last Name</label>
                    <input
                        value={user.lastName}
                        onChange={(e) => setUser({
                            ...user,
                            lastName: e.target.value
                        })}
                        placeholder="Enter your Last Name" />
                </Form.Field><br />
                <Form.Field required={true}>
                    <label>EmailID</label>
                    <input
                        value={user.emailID}
                        onChange={(e) => setUser({
                            ...user,
                            emailID: e.target.value
                        })}
                        placeholder="Enter your email ID" />
                </Form.Field><br />
                {(message.type !== "NOTHING") ? (
                    <Form.Field>
                        <Header as='h4' textAlign='center' color={message.color}>
                            {message.message}
                        </Header>
                    </Form.Field>
                ) : (
                    <Form.Field>
                        <Header textAlign='center' color={message.color}>
                            {message.message}
                        </Header>
                    </Form.Field>
                )}
                <Form.Field>
                    <Button className="btn-1" color="green">Create</Button>
                    <Button className="btn-2" color="red" onClick={backToHome}>Cancel</Button>
                </Form.Field>
            </Form>
        </div>
    )
}