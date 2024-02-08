import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
import { clearErrors, deleteSingleContact, getAllContacts } from "../../actions/contactAction";
import { DELETE_CONTACT_RESET } from "../../constants/contactConstants";

const Inbox = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, contacts } = useSelector((state) => state.contacts);
  //jiss name se store main saved hai ussi name se access krte hain useSelector se
  const { error: deleteError, isDeleted } = useSelector((state) => state.deleteContact);

  const deleteContactHandler = (id) => {
    dispatch(deleteSingleContact(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Contact Deleted Successfully");
      history.push("/admin/inbox");
      dispatch({ type: DELETE_CONTACT_RESET });
    }

    dispatch(getAllContacts());
  }, [dispatch, alert, error, history,deleteError,isDeleted]);

  const columns = [
    { field: "id", headerName: "Contact ID", minWidth: 150, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "address",
      headerName: "Address",
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: "message",
      headerName: "Message",
      minWidth: 200,
      flex: 0.8,
    },

    {
      field: "createdAt",
      headerName: "Time",
      minWidth: 120,
      flex: 0.4,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/message/${params.getValue(params.id, "id")}`}>
              <ChromeReaderModeIcon />
            </Link>

            <Button
              onClick={() =>
                deleteContactHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  contacts &&
    contacts.forEach((contact) => {
      rows.push({
        id: contact._id,
        name: contact.name,
        address: contact.address,
        message: contact.message,
        createdAt: contact.createdAt.slice(0,10),
      });
    });

  return (
    <Fragment>
      <MetaData title={`Inbox - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">All Messages</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Inbox;
