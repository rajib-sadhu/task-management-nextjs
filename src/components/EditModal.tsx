import axios from "axios";
import { AiFillCloseCircle } from "react-icons/ai";
import Swal from "sweetalert2";


const EditModal = (props: { updateData: any, handleEditModalClose: any, refetch: any }) => {

    console.log('update data', props.updateData)
    
    const handleUpdateTask = (e: any) => {
        e.preventDefault()

        const form = e.target;
        const title = form.title.value;
        const desc = form.desc.value;
        const status = form.status.value;

        const updatetask = { title, desc, status }

        axios.put('http://localhost:5000/tasks', updatetask)
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
                            <div className="flex items-center gap-2 ms-3">
                                Todo <input type="radio" name="status" value="todo"  />
                                Progress <input type="radio" name="status" value="progress" />
                                Complete <input type="radio" name="status" value="complete" />
                            </div>
                        </div>
                        <button type='submit' className='bg-[#9ea1ff] px-3 py-1 font-semibold text-white hover:bg-[#6b70ff] mx-auto' >Add</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditModal;