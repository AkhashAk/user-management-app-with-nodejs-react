import React, { useEffect, useState, useReducer } from "react";
import "./UpdateModal.css";
import axios from "../http-common";
import { Form, Button, Checkbox, Grid, Header } from "semantic-ui-react";

const initialMessages = [
  {
    type: "NOTHING",
    message: <h4>&nbsp;</h4>,
    color: "grey"
  },
  {
    type: 'UPDATE',
    message: 'Updated Successfully!',
    color: "green"
  },
  {
    type: 'NO_UPDATE',
    message: 'Do some changes to update...',
    color: "red"
  },
  {
    type: 'USER_EXISTS',
    message: 'Email ID already exists..!',
    color: "red"
  },
  {
    type: 'FORM_INCOMPLETE',
    message: 'Input all the required fields!',
    color: "red"
  },
  {
    type: "INVALID_EMAILID",
    message: "please enter valid email ID",
    color: "red"
  }
];

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return initialMessages.find(msg => {
        if (msg.type === "UPDATE") {
          return msg;
        } else return null;
      });
    case 'NO_UPDATE':
      return initialMessages.find(msg => {
        if (msg.type === "NO_UPDATE") {
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
    case 'USER_EXISTS':
      return initialMessages.find(msg => {
        if (msg.type === "USER_EXISTS") {
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

export const UpdateModal = ({ onSubmit, closeModal, currentUser }) => {
  const [updatedUser, setUpdatedUser] = useState({});
  const [message, dispatch] = useReducer(reducer, initialMessages[0]);

  useEffect(() => {
    setUpdatedUser(currentUser);
  }, [currentUser]);

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailRegex.test(email)) {
      return true;
    }
    return false;
  };

  const postData = async () => {
    if (updatedUser.firstName !== null && updatedUser.firstName !== "" && updatedUser.emailID !== null && updatedUser.emailID !== "") {
      if (!validateEmail(updatedUser.emailID)) return dispatch({ type: "INVALID_EMAILID" });
      const dbUsers = (await axios.get("")).data;
      if (updatedUser.emailID !== currentUser.emailID && dbUsers.some(item => item.emailID === updatedUser.emailID)) return dispatch({ type: "USER_EXISTS" });

      let dbUser = dbUsers.find(item => item.id === updatedUser.id);

      if ((currentUser.emailID === updatedUser.emailID || (updatedUser.emailID !== currentUser.emailID && updatedUser.emailID !== dbUser.emailID)) &&
        (dbUser.firstName !== updatedUser.firstName ||
          dbUser.lastName !== updatedUser.lastName ||
          dbUser.checked !== updatedUser.checked ||
          dbUser.emailID !== updatedUser.emailID)) {
        await axios
          .put(`${currentUser.id}`, {
            id: updatedUser.id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            emailID: updatedUser.emailID,
            checked: updatedUser.checked,
          })
          .then(() => {
            dispatch({ type: "UPDATE" });
            onSubmit();
            setTimeout(() => {
              closeModal();
            }, 2000);
          })
          .catch(() => {
            alert("Error occured!");
          });
      } else {
        dispatch({ type: "NO_UPDATE" })
      }
    } else {
      dispatch({ type: "FORM_INCOMPLETE" })
    }
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container")
          closeModal("Modal was closed");
      }}
    >
      <div className="modal">
        <div className="modal-header">
          <p onClick={() => closeModal("Modal was closed")} className="close">
            &times;
          </p>
        </div>
        {/*<Update onSubmit={onSubmit} onCancel={onCancel} currentUser={currentUser} />*/}
        <Form size="large">
          <Form.Field>
            <label>First Name</label>
            <input
              value={updatedUser.firstName}
              onChange={(e) => setUpdatedUser({ ...updatedUser, firstName: e.target.value })}
              placeholder="Enter your First Name"
              maxLength={30}
            />
          </Form.Field>
          <br />
          <Form.Field>
            <label>Last Name</label>
            <input
              value={updatedUser.lastName}
              onChange={(e) => setUpdatedUser({ ...updatedUser, lastName: e.target.value })}
              placeholder="Enter your Last Name"
              maxLength={40}
            />
          </Form.Field>
          <br />
          <Form.Field>
            <label>EmailID</label>
            <input
              value={updatedUser.emailID}
              onChange={(e) => setUpdatedUser({ ...updatedUser, emailID: e.target.value })}
              placeholder="Enter your mail ID"
            />
          </Form.Field>
          <br />
          <Form.Field>
            <Checkbox
              toggle
              checked={updatedUser.checked}
              onChange={() => setUpdatedUser({ ...updatedUser, checked: !updatedUser.checked })}
              label="Completed the course"
            />
          </Form.Field>
          <br />
          <Form.Field color={message.color}>
            {(message.type !== "NOTHING") ? (
              <Header as='h4' textAlign='center' color={message.color}>
                {message.message}
              </Header>
            ) : (
              <Header textAlign='center' color={message.color}>
                {message.message}
              </Header>
            )}
          </Form.Field>
          <br />
          <Grid>
            <Grid.Column textAlign="center">
              <Button color="green" onClick={postData}>
                Update
              </Button>
            </Grid.Column>
          </Grid>
        </Form>
      </div>
    </div>
  );
};