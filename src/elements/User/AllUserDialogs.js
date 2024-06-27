import UpdateUserDialog from "@/elements/User/Dialogs/UpdateUserDialog";
import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import DeleteUserDialog from "@/elements/User/Dialogs/DeleteUserDialog";
import CreateUserDialog from "@/elements/User/Dialogs/CreateUserDialog";

const AllUserDialogs = ({}) => {
    const {state} = useListActions();

    return (
       <>
           <UpdateUserDialog isOpen={state.type == listAction.UPDATE}/>
           <DeleteUserDialog isOpen={state.type == listAction.DELETE}/>
           <CreateUserDialog isOpen={state.type == listAction.CREATE}/>
       </>
    );
}

export default AllUserDialogs;