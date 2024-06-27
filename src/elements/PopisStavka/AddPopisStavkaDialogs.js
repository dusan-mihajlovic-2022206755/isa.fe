import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import UpdatePopisStavkaDialog from "@/elements/PopisStavka/Dialogs/UpdatePopisStavkaDialog";
import CreatePopisStavkaDialog from "@/elements/PopisStavka/Dialogs/CreatePopisStavkaDialog";
import DeletePopisStavkaDialog from "@/elements/PopisStavka/Dialogs/DeletePopisStavkaDialog";
import React from "react";

const AddPopisStavkaDialogs = ({}) => {
    const {state} = useListActions();

    return (
       <>
           <UpdatePopisStavkaDialog isOpen={state.type == listAction.UPDATE}/>
           <DeletePopisStavkaDialog isOpen={state.type == listAction.DELETE}/>
           <CreatePopisStavkaDialog isOpen={state.type == listAction.CREATE}/>
       </>
    );
}

export default AddPopisStavkaDialogs;