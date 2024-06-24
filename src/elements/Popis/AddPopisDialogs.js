import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import UpdatePopisDialog from "@/elements/Popis/Dialogs/UpdatePopisDialog";
import CreatePopisDialog from "@/elements/Popis/Dialogs/CreatePopisDialog";
import DeletePopisDialog from "@/elements/Popis/Dialogs/DeletePopisDialog";
import React from "react";

const AddPopisDialogs = ({}) => {
    const {state} = useListActions();

    return (
       <>
           <UpdatePopisDialog isOpen={state.type == listAction.UPDATE}/>
           <DeletePopisDialog isOpen={state.type == listAction.DELETE}/>
           <CreatePopisDialog isOpen={state.type == listAction.CREATE}/>
       </>
    );
}

export default AddPopisDialogs;