import axios from "axios";
import { AiFillCloseCircle } from "react-icons/ai";
import Swal from "sweetalert2";


const EditModal = (props: { updateData: any, handleEditModalClose: any, refetch: any }) => {



    const handleUpdateTask = (e: any) => {
        e.preventDefault()

        const form = e.target;
        const title = form.title.value;
        const desc = form.desc.value;
        const status = form.status.value;

        // const update task = { title, desc, status }

        axios.put(`https://rs-task-management-server.vercel.app/task/${props.updateData._id}`, { title: title, desc: desc, status: status })
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount) {
                    Swal.fire(
                        'User updated successfully!',
                        'You clicked the OK button!',
                        'success'
                    )
                    props.handleEditModalClose();
                    props.refetch()
                    form.reset()
                }
                if (res.data.message) {
                    Swal.fire(
                        `${res.data.message}`,
                        'Please try again!',
                        'error'
                    )
                }
            })

    }


    return (
        <div>
            <div className="modal-wrapper"> </div>
            <div className="modal-container">
                <div className="md:w-[30rem] w-[20rem] bg-white p-5 rounded-xl">
                    <div className="border-b-2 pb-2 flex justify-between items-center">
                        <h2 className="text-xl" >Edit Task</h2>
                        <button onClick={props.handleEditModalClose} title='close' ><AiFillCloseCircle className='text-2xl text-red-600' /></button>
                    </div>
                    <form onSubmit={handleUpdateTask} className='flex flex-col gap-5 my-5' >
                        <input defaultValue={props.updateData.title} type="text" name='title' placeholder='Enter Title*' required />
                        <input defaultValue={props.updateData.desc} type="text" name='desc' placeholder='Enter Description' required />
                        <div className="" >
                            <label htmlFor="" className="text-slate-600">Status</label>
                            <select name="status" id="" className="mt-2 ms-2 bg-slate-200 px-2 py-1" value={props.updateData.status}>
                                <option value="Todo" className="px-2 py-1" >Todo</option>
                                <option value="Progress" className="px-2 py-1" >Progress</option>
                                <option value="Completed" className="px-2 py-1" >Completed</option>
                            </select>
                        </div>
                        <button type='submit' className='bg-[#9ea1ff] px-3 py-1 font-semibold text-white hover:bg-[#6b70ff] mx-auto' >Add</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditModal;