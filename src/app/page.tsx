"use client"
import toast from 'react-hot-toast';
import Image from 'next/image'

import { useQuery } from 'react-query';
import axios from 'axios';

import { AiOutlinePlus, AiFillDelete, AiFillEdit } from 'react-icons/ai';

import { useState } from 'react';

import AddModal from '@/components/AddModal';
import Swal from 'sweetalert2';
import EditModal from '@/components/EditModal';

export default function Home() {


  const [showAddNewModal, setShowAddNewModal] = useState(false);
  const handleAddNewModalClose = () => setShowAddNewModal(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [updateData, setUpdateData] = useState({});

  const handleEditModalClose = () => {
    setShowEditModal(false)
    setUpdateData({})
  };

  // Update task data function
  const dataUpdate = (id: string) => {
    setShowEditModal(true)
    axios('https://rs-task-management-server.vercel.app/tasks')
      .then(res => {
        const allUsers = res.data;
        const filterUser = allUsers.filter((user: any) => user._id === id);
        setUpdateData(filterUser[0])
      })
  }

  // Show / fetch task data
  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axios('https://rs-task-management-server.vercel.app/tasks')
      return res.data;
    }
  })


  // Delete task
  const handleDelete = (id: any) => {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://rs-task-management-server.vercel.app/tasks/${id}`)
          .then(res => {
            console.log(res.data);
            if (res.data.deletedCount) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              refetch()
            }
          })
      }
    })
  }


  return (
    <div className='relative overflow-hidden'>
      <div className='main-body min-h-screen w-full absolute -z-10'></div>
      <div className='flex justify-center items-center min-h-screen'>
        <div className='w-[80%] mx-auto md:h-[38rem] h-[calc(100vh-5rem)] bg-white rounded-md overflow-hidden shadow-xl show_all_users' >
          <div className='sticky top-0 bg-white'>
            <div className='flex items-center justify-between border-b-2 pb-3 p-5'>
              <h3 className='md:text-xl text-sm font-semibold'>Task <span className='text-[#131e9f]' >Management</span></h3>
              <button title='Add new user' onClick={() => setShowAddNewModal(true)} className='md:text-base text-xs flex items-center md:gap-2 gap-1 md:border-2 border border-blue-600 md:px-2 px-1 py-1 rounded-md text-blue-600 font-semibold hover:text-white hover:bg-blue-600 duration-200'> <AiOutlinePlus /> Add New</button>
            </div>
            <div>
              {showAddNewModal && <AddModal handleAddNewModalClose={handleAddNewModalClose} refetch={refetch} />}
              {showEditModal && <EditModal updateData={updateData} handleEditModalClose={handleEditModalClose} refetch={refetch} />}
            </div>
          </div>
          {
            isLoading ?
              <div className='h-[20rem] w-full grid place-content-center' ><span className="loading loading-spinner loading-lg"></span> </div>
              :
              <div className='grid md:grid-cols-3 grid-cols-1 gap-5 pt-5 px-5 '>
                {
                  users.map((v: any) => <div key={v._id} className='shadow-xl bg-slate-50 rounded-xl flex justify-between overflow-hidden'>
                    <div className='p-4 text-sm space-y-2'>
                      <h1><span className='font-semibold'>Title:</span> {v.title.length > 20 ? v.title.slice(0, 20) + '...' : v.title} </h1>
                      <h1><span className='font-semibold'>Description:</span> {v.desc.length > 20 ? v.desc.slice(0, 20) + '...' : v.desc}</h1>
                      <h1><span className='font-semibold'>Status:</span>
                        <select name="status" id="" value={v.status} className='ms-1 px-3 bg-slate-100'
                          onChange={(event) => {
                            const select = event.target.value;
                            axios.patch(`https://rs-task-management-server.vercel.app/task/${v._id}`, { status: select })
                              .then(res => {
                                console.log(res.data);
                                if (res.data.modifiedCount) {
                                  refetch();
                                  toast.success(`Status changed to ${select}`)
                                }
                              })
                          }} >
                          <option value="Todo" className="px-2 py-1" >Todo</option>
                          <option value="Progress" className="px-2 py-1" >Progress</option>
                          <option value="Completed" className="px-2 py-1" >Completed</option>
                        </select></h1>
                    </div>
                    <div className='flex flex-col justify-between' >
                      <button title='Delete user' onClick={() => handleDelete(v._id)} className='bg-red-500 p-2 text-red-200 flex-1 hover:opacity-75' ><AiFillDelete /></button>
                      <button title='Edit user' onClick={() => dataUpdate(v._id)} className='bg-green-400 p-2 text-green-800 flex-1 hover:opacity-75' ><AiFillEdit /></button>
                    </div>
                  </div>)
                }
              </div>
          }
        </div>
      </div>
    </div>
  )
}
